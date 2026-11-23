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
  if (
    process.env.PORTFOLIO_SUPABASE_URL &&
    process.env.PORTFOLIO_SUPABASE_SECRET_KEY
  )
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

async function databaseRequest(query: string, init: RequestInit = {}) {
  const base = process.env.PORTFOLIO_SUPABASE_URL!;
  const secret = process.env.PORTFOLIO_SUPABASE_SECRET_KEY!;
  if (new URL(base).protocol !== "https:")
    throw new Error("Shared notebook requires HTTPS");
  const response = await fetch(
    `${base.replace(/\/$/, "")}/rest/v1/portfolio_good_responses${query}`,
    {
      ...init,
      headers: {
        apikey: secret,
        ...(secret.startsWith("eyJ")
          ? { Authorization: `Bearer ${secret}` }
          : {}),
        "Content-Type": "application/json",
        ...init.headers,
      },
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
    },
  );
  if (!response.ok) throw new Error("Shared notebook request failed");
  return response;
}

async function saveShared(
  visitor: string,
  answer: string,
): Promise<ThoughtReceipt> {
  const existing: StoredThought[] = await (
    await databaseRequest(
      `?visitor_id=eq.${visitor}&select=visitor_id,answer,created_at&limit=1`,
    )
  ).json();
  checkCooldown(existing[0], answer);
  const previous: { answer: string }[] = await (
    await databaseRequest(
      `?visitor_id=neq.${visitor}&select=answer&order=created_at.desc,visitor_id.desc&limit=3`,
    )
  ).json();
  if (existing[0]?.answer !== answer) {
    await databaseRequest("?on_conflict=visitor_id", {
      method: "POST",
      headers: { Prefer: "resolution=merge-duplicates,return=minimal" },
      body: JSON.stringify({
        visitor_id: visitor,
        answer,
        created_at: new Date().toISOString(),
      }),
    });
  }
  return {
    answer,
    previous: previous.map((thought) => thought.answer),
    mode: "shared",
  };
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
