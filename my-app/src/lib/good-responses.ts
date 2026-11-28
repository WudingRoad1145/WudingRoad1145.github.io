import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { randomUUID } from "node:crypto";

export type StoredThought = {
  visitor_id: string;
  answer: string;
  created_at: string;
};
export type ThoughtReceipt = {
  answer: string;
  previous: string[];
  mode: "local" | "shared";
};
export class ThoughtError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
  }
}

export function normalizeAnswer(value: unknown): string {
  if (typeof value !== "string")
    throw new ThoughtError("Leave a word, or a few, before sharing", 400);
  const answer = value
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (!answer || answer.length > 160)
    throw new ThoughtError(
      "Please keep your thought between 1 and 160 characters",
      400,
    );
  return answer;
}

function checkCooldown(existing: StoredThought | undefined, answer: string) {
  if (
    existing &&
    existing.answer !== answer &&
    Date.now() - Date.parse(existing.created_at) < 60_000
  ) {
    throw new ThoughtError(
      "Give that thought a moment You can change it in a minute",
      429,
    );
  }
}

function storeMode() {
  if (process.env.GOOGLE_NOTEBOOK_URL && process.env.GOOGLE_NOTEBOOK_TOKEN)
    return "shared";
  if (process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test")
    return "local";
  throw new ThoughtError(
    "The shared notebook isn’t connected yet Please come back soon",
    503,
  );
}

// The local notebook is shared by local browser sessions and survives restarts.
// A single-process queue plus atomic rename prevents overlapping writes in dev.
const state = globalThis as typeof globalThis & {
  goodThoughtQueue?: Promise<unknown>;
};
async function saveLocal(
  visitor: string,
  answer: string,
): Promise<ThoughtReceipt> {
  const file =
    process.env.GOOD_RESPONSES_FILE ||
    join(process.cwd(), ".local", "good-responses.json");
  const transaction = async () => {
    let thoughts: StoredThought[] = [];
    try {
      thoughts = JSON.parse(await readFile(file, "utf8"));
      if (
        !Array.isArray(thoughts) ||
        thoughts.some(
          (thought) =>
            typeof thought.answer !== "string" ||
            typeof thought.visitor_id !== "string" ||
            typeof thought.created_at !== "string",
        )
      )
        throw new Error("Invalid local notebook");
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
    }
    const existing = thoughts.find((thought) => thought.visitor_id === visitor);
    checkCooldown(existing, answer);
    const previous = thoughts
      .filter((thought) => thought.visitor_id !== visitor)
      .slice(0, 3)
      .map((thought) => thought.answer);
    if (existing?.answer !== answer) {
      thoughts = [
        { visitor_id: visitor, answer, created_at: new Date().toISOString() },
        ...thoughts.filter((thought) => thought.visitor_id !== visitor),
      ].slice(0, 200);
      await mkdir(dirname(file), { recursive: true });
      const temporary = `${file}.${randomUUID()}.tmp`;
      await writeFile(temporary, JSON.stringify(thoughts), { mode: 0o600 });
      await rename(temporary, file);
    }
    return { answer, previous, mode: "local" as const };
  };
  const pending = (state.goodThoughtQueue || Promise.resolve()).then(
    transaction,
  );
  state.goodThoughtQueue = pending.catch(() => undefined);
  return pending;
}

async function saveShared(
  visitor: string,
  answer: string,
): Promise<ThoughtReceipt> {
  const endpoint = new URL(process.env.GOOGLE_NOTEBOOK_URL!);
  if (
    endpoint.origin !== "https://script.google.com" ||
    !/^\/macros\/s\/[A-Za-z0-9_-]+\/exec$/.test(endpoint.pathname) ||
    endpoint.search ||
    endpoint.hash ||
    endpoint.username ||
    endpoint.password
  )
    throw new Error("Use the deployed Google Apps Script web app URL");
  const response = await fetch(endpoint.toString(), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      token: process.env.GOOGLE_NOTEBOOK_TOKEN,
      visitor_id: visitor,
      answer,
    }),
    cache: "no-store",
    signal: AbortSignal.timeout(15000),
  });
  if (!response.ok) throw new Error("Google notebook request failed");
  const result = await response.json();
  if (result?.ok === false && result?.status === 429) {
    throw new ThoughtError(
      "Give that thought a moment. You can change it in a minute.",
      429,
    );
  }
  // Apps Script returns application errors in JSON with HTTP 200. Never claim
  // success for an authorization page, malformed response, or failed write.
  if (
    result?.ok !== true ||
    result.answer !== answer ||
    !Array.isArray(result.previous) ||
    result.previous.length > 3 ||
    result.previous.some(
      (item: unknown) =>
        typeof item !== "string" || !item.trim() || item.length > 160,
    )
  )
    throw new Error("Google notebook returned an invalid receipt");
  return { answer, previous: result.previous, mode: "shared" };
}

export async function saveThought(
  visitor: string,
  value: unknown,
): Promise<ThoughtReceipt> {
  const answer = normalizeAnswer(value);
  return storeMode() === "shared"
    ? saveShared(visitor, answer)
    : saveLocal(visitor, answer);
}
