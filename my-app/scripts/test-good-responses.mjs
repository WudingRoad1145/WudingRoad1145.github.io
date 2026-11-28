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
delete process.env.GOOGLE_NOTEBOOK_URL;
delete process.env.GOOGLE_NOTEBOOK_TOKEN;

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
  await test("Google adapter sends credentials only server-side and validates receipts", async () => {
    process.env.GOOGLE_NOTEBOOK_URL =
      "https://script.google.com/macros/s/TEST_DEPLOYMENT/exec";
    process.env.GOOGLE_NOTEBOOK_TOKEN = "test-only-token";
    const id = randomUUID();
    const requests = [];
    globalThis.fetch = async (url, init) => {
      requests.push({ url, init });
      return Response.json({
        ok: true,
        answer: "TEST: now",
        previous: ["TEST: earlier"],
      });
    };
    const result = await saveThought(id, "TEST: now");
    assert.deepEqual(result, {
      answer: "TEST: now",
      previous: ["TEST: earlier"],
      mode: "shared",
    });
    assert.equal(requests.length, 1);
    assert.equal(requests[0].init.cache, "no-store");
    assert.deepEqual(JSON.parse(requests[0].init.body), {
      token: "test-only-token",
      visitor_id: id,
      answer: "TEST: now",
    });
    assert.ok(!requests[0].url.includes("token"));
    for (const payload of [
      { ok: false, status: 403 },
      { ok: false, status: 503 },
      {},
      { ok: true, answer: "wrong", previous: [] },
      { ok: true, answer: "TEST: now", previous: [1] },
      { ok: true, answer: "TEST: now", previous: ["x".repeat(161)] },
      { ok: true, answer: "TEST: now", previous: ["a", "b", "c", "d"] },
    ]) {
      globalThis.fetch = async () => Response.json(payload);
      await assert.rejects(saveThought(id, "TEST: now"));
    }
    globalThis.fetch = async () => Response.json({ ok: false, status: 429 });
    await assert.rejects(saveThought(id, "TEST: now"), (e) => e.status === 429);
    globalThis.fetch = async () => new Response("Sign in", { status: 200 });
    await assert.rejects(saveThought(id, "TEST: now"));
    globalThis.fetch = async () => new Response("Unavailable", { status: 503 });
    await assert.rejects(saveThought(id, "TEST: now"));
    globalThis.fetch = async () => {
      throw new Error("Network timeout");
    };
    await assert.rejects(saveThought(id, "TEST: now"));
    for (const badUrl of [
      "http://script.google.com/macros/s/id/exec",
      "https://example.com/macros/s/id/exec",
      "https://script.google.com/macros/s/id/dev",
    ]) {
      process.env.GOOGLE_NOTEBOOK_URL = badUrl;
      await assert.rejects(
        saveThought(id, "TEST: now"),
        /deployed Google Apps Script/,
      );
    }
  });
} finally {
  globalThis.fetch = originalFetch;
  for (const key of [
    "NODE_ENV",
    "GOOD_RESPONSES_FILE",
    "GOOGLE_NOTEBOOK_URL",
    "GOOGLE_NOTEBOOK_TOKEN",
  ]) {
    if (previousEnv[key] === undefined) delete process.env[key];
    else process.env[key] = previousEnv[key];
  }
  await rm(temporary, { recursive: true, force: true });
}
