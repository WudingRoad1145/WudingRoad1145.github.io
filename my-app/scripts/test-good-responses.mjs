import test from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { createRequire } from "node:module";
import { randomUUID } from "node:crypto";

const temporary = await mkdtemp(join(tmpdir(), "portfolio-good-test-"));
execFileSync(
  process.execPath,
  [
    "node_modules/typescript/bin/tsc",
    "src/lib/good-responses.ts",
    "--outDir",
    temporary,
    "--module",
    "commonjs",
    "--target",
    "es2022",
    "--skipLibCheck",
    "--esModuleInterop",
  ],
  { stdio: "inherit" },
);
const require = createRequire(import.meta.url);
const { saveThought, normalizeAnswer } = require(
  join(temporary, "good-responses.js"),
);
const previousEnv = { ...process.env };
const originalFetch = globalThis.fetch;
process.env.NODE_ENV = "test";
process.env.GOOD_RESPONSES_FILE = join(temporary, "notebook.json");
delete process.env.PORTFOLIO_SUPABASE_URL;
delete process.env.PORTFOLIO_SUPABASE_SECRET_KEY;

try {
  await test("normalizes input and rejects empty or excessive replies", () => {
    assert.equal(normalizeAnswer("  being\n kind  "), "being kind");
    for (const value of [null, 5, "  ", "x".repeat(161)])
      assert.throws(() => normalizeAnswer(value));
  });
  await test("real prior replies persist and the current visitor is excluded", async () => {
    const ids = [randomUUID(), randomUUID(), randomUUID(), randomUUID()];
    assert.deepEqual((await saveThought(ids[0], "TEST: care")).previous, []);
    await saveThought(ids[1], "TEST: patience");
    await saveThought(ids[2], "TEST: integrity");
    const receipt = await saveThought(ids[3], "TEST: showing up");
    assert.deepEqual(receipt.previous, [
      "TEST: integrity",
      "TEST: patience",
      "TEST: care",
    ]);
    assert.equal(receipt.mode, "local");
    const retry = await saveThought(ids[3], "TEST: showing up");
    assert.deepEqual(retry.previous, receipt.previous);
    assert.equal(
      JSON.parse(await readFile(process.env.GOOD_RESPONSES_FILE, "utf8"))
        .length,
      4,
    );
    await assert.rejects(
      saveThought(ids[3], "TEST: different"),
      (error) => error.status === 429,
    );
  });
  await test("concurrent local visitors do not overwrite each other", async () => {
    await Promise.all(
      Array.from({ length: 8 }, (_, i) =>
        saveThought(randomUUID(), `TEST: concurrent ${i}`),
      ),
    );
    assert.equal(
      JSON.parse(await readFile(process.env.GOOD_RESPONSES_FILE, "utf8"))
        .length,
      12,
    );
  });
  await test("production refuses ephemeral local storage", async () => {
    process.env.NODE_ENV = "production";
    await assert.rejects(
      saveThought(randomUUID(), "TEST: production"),
      (error) => error.status === 503,
    );
  });
  await test("shared adapter sends server credentials and reads only three other visitors", async () => {
    process.env.PORTFOLIO_SUPABASE_URL = "https://isolated-portfolio.example";
    process.env.PORTFOLIO_SUPABASE_SECRET_KEY = "sb_secret_TEST_ONLY";
    const id = randomUUID();
    const requests = [];
    globalThis.fetch = async (url, init) => {
      requests.push({ url, init });
      if (init.method === "POST") return new Response(null, { status: 204 });
      return Response.json(
        url.includes("visitor_id=eq.") ? [] : [{ answer: "TEST: earlier" }],
      );
    };
    const result = await saveThought(id, "TEST: now");
    assert.deepEqual(result.previous, ["TEST: earlier"]);
    assert.equal(result.mode, "shared");
    assert.equal(requests.length, 3);
    assert.ok(requests[1].url.includes(`visitor_id=neq.${id}`));
    assert.ok(requests[1].url.includes("limit=3"));
    assert.equal(requests[2].init.headers.apikey, "sb_secret_TEST_ONLY");
    assert.equal(requests[2].init.headers.Authorization, undefined);
    assert.equal(JSON.parse(requests[2].init.body).answer, "TEST: now");
    globalThis.fetch = async () => new Response("Unavailable", { status: 503 });
    await assert.rejects(saveThought(id, "TEST: fail"));
  });
} finally {
  globalThis.fetch = originalFetch;
  for (const key of [
    "NODE_ENV",
    "GOOD_RESPONSES_FILE",
    "PORTFOLIO_SUPABASE_URL",
    "PORTFOLIO_SUPABASE_SECRET_KEY",
  ]) {
    if (previousEnv[key] === undefined) delete process.env[key];
    else process.env[key] = previousEnv[key];
  }
  await rm(temporary, { recursive: true, force: true });
}
