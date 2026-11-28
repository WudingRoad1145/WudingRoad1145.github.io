import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import vm from "node:vm";
import { randomUUID } from "node:crypto";
const source = await readFile("docs/google-notebook.gs", "utf8");
const token = "test-only-not-a-live-token-00000000";
function harness() {
  const rows = [["Answer", "Updated (UTC)", "Anonymous visitor"]];
  let acquired = false;
  let writes = 0;
  const settings = { busy: false, failFlush: false };
  const lock = {
    tryLock: () => (acquired = !settings.busy),
    hasLock: () => acquired,
    releaseLock: () => {
      acquired = false;
    },
  };
  const sheet = {
    getLastRow: () => rows.length,
    getMaxRows: () => 1000,
    insertRowsAfter: () => {},
    getRange: (row, col, height, width) => ({
      getDisplayValues: () =>
        rows
          .slice(row - 1, row - 1 + height)
          .map((r) => r.slice(col - 1, col - 1 + width)),
      setNumberFormat: () => ({
        setValues: (values) => {
          writes++;
          assert.ok(
            values[0][0].startsWith("'"),
            "input must be escaped as literal text",
          );
          rows[row - 1] = [values[0][0].slice(1), ...values[0].slice(1)];
        },
      }),
    }),
  };
  const context = vm.createContext({
    ContentService: {
      MimeType: { JSON: "json" },
      createTextOutput: (contents) => ({
        setMimeType: () => JSON.parse(contents),
      }),
    },
    PropertiesService: {
      getScriptProperties: () => ({ getProperty: () => token }),
    },
    LockService: { getScriptLock: () => lock },
    SpreadsheetApp: {
      openById: (id) => {
        assert.equal(id, "12Daqo8vr9VJcmBPFkYOkVzWmqaL5ob40pIi5-Cy1XOw");
        return { getSheetById: () => sheet };
      },
      flush: () => {
        if (settings.failFlush) throw new Error("offline");
      },
    },
    console,
  });
  vm.runInContext(source, context);
  return {
    rows,
    settings,
    send: (visitor, answer, secret = token) =>
      context.doPost({
        postData: {
          contents: JSON.stringify({
            token: secret,
            visitor_id: visitor,
            answer,
          }),
        },
      }),
    locked: () => acquired,
    writes: () => writes,
  };
}
await test("Apps Script authenticates and validates before writing", () => {
  const h = harness();
  const id = randomUUID();
  assert.equal(h.send(id, "care", "wrong").status, 403);
  assert.equal(h.send("not-a-visitor", "care").status, 400);
  for (const answer of ["", null, "x".repeat(161)])
    assert.equal(h.send(id, answer).status, 400);
  assert.equal(h.writes(), 0);
});
await test("Apps Script shares real replies, retries idempotently, and enforces cooldown", () => {
  const h = harness();
  const a = randomUUID(),
    b = randomUUID();
  assert.deepEqual(h.send(a, "  care\n counts  "), {
    ok: true,
    answer: "care counts",
    previous: [],
  });
  assert.deepEqual(h.send(b, "patience").previous, ["care counts"]);
  h.send(b, "patience");
  assert.equal(h.writes(), 2);
  assert.equal(h.send(b, "another thought").status, 429);
  h.rows[2][1] = "2020-01-01T00:00:00.000Z";
  assert.equal(h.send(b, "another thought").ok, true);
  assert.equal(h.rows.length, 3);
  assert.equal(h.locked(), false);
});
await test("Apps Script orders the three latest other visitors and treats formulas as text", () => {
  const h = harness();
  for (let i = 0; i < 5; i++)
    h.rows.push([
      "reply " + i,
      `2020-01-0${i + 1}T00:00:00.000Z`,
      randomUUID(),
    ]);
  const id = randomUUID();
  const formula = '=IMPORTXML("https://example.invalid", "//x")';
  const result = h.send(id, formula);
  assert.deepEqual(result.previous, ["reply 4", "reply 3", "reply 2"]);
  assert.equal(h.rows.at(-1)[0], formula);
  assert.equal(h.send(randomUUID(), "'quoted").ok, true);
  assert.equal(h.rows.at(-1)[0], "'quoted");
});
await test("Apps Script fails closed on busy locks, changed headers, and failed writes", () => {
  const h = harness();
  h.settings.busy = true;
  assert.equal(h.send(randomUUID(), "busy").status, 503);
  assert.equal(h.writes(), 0);
  h.settings.busy = false;
  h.rows[0][0] = "changed";
  assert.equal(h.send(randomUUID(), "bad headers").status, 503);
  assert.equal(h.locked(), false);
  h.rows[0][0] = "Answer";
  h.settings.failFlush = true;
  assert.equal(h.send(randomUUID(), "write failure").status, 503);
  assert.equal(h.locked(), false);
});
