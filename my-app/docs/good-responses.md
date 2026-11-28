# The “good” conversation

The homepage follows Yan’s handwritten sketch. “Make” and “humans” have handwritten margin notes. “Good” initially has no definition. Hovering the word opens a blue sticky note with a slight tilt, paper shadow, and folded corner; clicking, tapping, or pressing Enter also opens it and focuses the answer field. Escape or the close button returns focus to the word only when focus was inside the note, without scrolling. The note omits the former sharing helper line.

The note asks “What is good to you?” below “quality, character, virtue.” It explains that submitted words are shared anonymously. Only after a successful save does it reveal Yan’s reflection and up to three previous replies. No example visitor replies are seeded. With fewer than three responses, the copy reflects the actual number.

## Local review

`next dev` uses `.local/good-responses.json` when no Google notebook configuration exists. This file is ignored by Git, shared across local browser sessions, and survives a server restart. It keeps at most 200 recent browser visitors. `GOOD_RESPONSES_FILE` can point to a separate file for browser tests. Test replies must never be seeded into the normal review notebook.

The success view explicitly labels local replies as staying on this computer. Production never falls back to a local file, because the deployed host may have an ephemeral filesystem.

## Data contract

`POST /api/good-responses` accepts `{ "answer": "..." }` and returns `{ "answer": "...", "previous": ["..."], "mode": "local" | "shared" }`.

- Same-origin JSON requests only; compare Origin to the public Host, since Next may normalize its internal URL to localhost.
- Limit the body to 2 KiB and the normalized answer to 160 UTF-16 code units. Trim and collapse whitespace/control characters.
- A random, HttpOnly, SameSite cookie identifies a browser visitor; no email, name, or IP is collected by this feature. HTTPS cookies are Secure. Clearing cookies or using another browser creates another visitor; this is not identity verification.
- The latest three other browser visitors are read before saving. Repeating the same answer is idempotent. The same browser can change its answer after one minute. This is a light per-browser cooldown, not abuse-proof rate limiting.
- Responses are plain text rendered by React, never injected as HTML. Network errors keep the typed answer and do not claim it was shared.
- Local writes are queued and atomically renamed. Google Sheets writes run under an Apps Script lock, which serializes the prior-response read, cooldown check, and save. Replies are a snapshot at submission time, not a live feed.

## Google Sheets connection

The selected spreadsheet is [yanffyy.xyz](https://docs.google.com/spreadsheets/d/12Daqo8vr9VJcmBPFkYOkVzWmqaL5ob40pIi5-Cy1XOw/edit#gid=559632055). The dedicated **Notebook** tab (sheet ID `559632055`) has three columns: `Answer`, `Updated (UTC)`, and `Anonymous visitor`. The original `Sheet1` is untouched. No sample replies were inserted.

`google-notebook.gs` is the standalone Apps Script source. Its saved editor is [Yan portfolio notebook](https://script.google.com/home/projects/1aZapEtUFA3yvOEnn19OkfAbu86yqfw6RE7eH2ewoQgyBF-wtPknskZE_/edit). It is deliberately separate from the publicly editable Sheet so spreadsheet editors do not inherit access to the script or its token. The site does not need the spreadsheet to be public; restrict sharing before collecting real replies if possible. Public editors can otherwise change or delete responses.

### Finish setup

1. In the script editor, select `checkNotebook` and Run. Review Google's requested Sheets access and authorize with the account that owns the script. The check only reads the headers and writes no replies. A standalone script requests the Google Sheets scope; although its code targets this one spreadsheet, the OAuth scope is broader than one file.
2. Generate a random connection token of at least 32 characters. Store it as `NOTEBOOK_TOKEN` in **Project Settings → Script properties**. Keep it out of spreadsheet cells, source control, public browser code, and chat.
3. **Deploy → New deployment → Web app**. Execute as the script owner; access **Anyone** so the website server can call it without a Google sign-in. The handler checks the token before accessing the spreadsheet. Copy the deployment URL ending in `/exec`, not the editor or `/dev` URL.
4. Set server-only `GOOGLE_NOTEBOOK_URL` to that URL and `GOOGLE_NOTEBOOK_TOKEN` to the same token in the portfolio hosting environment, then redeploy the site with this change. Existing hosting environment mutations require the workspace's explicit confirmation immediately before the change. Never use `NEXT_PUBLIC_` variables.
5. Verify a real save and previous-reply read with clearly labeled disposable test data, then remove those test rows. Until this live check passes, do not describe the notebook as connected. Changes to the script require updating the deployed version.

### Behavior and limits

- The server sends one JSON POST to Apps Script; it follows Google's Content Service redirect and validates the returned receipt. A Google login page or `{ok:false}` response never counts as success.
- The URL is restricted to Google's deployed Apps Script URL format. The secret travels only server-to-server in the request body.
- The handler validates the visitor ID and answer again, locks before reading/writing, updates the existing visitor row or appends a new one, and releases the lock on failure.
- Visitor answers are written as literal text with a leading apostrophe escape, preventing spreadsheet formulas. Existing manual edits remain untrusted text and are length checked before returning to the website.
- You may edit an answer or delete its entire row in the Sheet; keep the headers and anonymous IDs intact. Timestamps are UTC ISO strings. No email, name, or IP is stored.
- This is for a small personal notebook, subject to Apps Script quotas. A 10,000-response bound avoids unbounded reads and fails clearly instead of deleting old responses. The per-browser cooldown is not abuse-proof rate limiting.
- Production with missing configuration fails with 503. It never falls back to an ephemeral local file or fabricates visitor quotes. Supabase credentials are no longer used by this feature; the old SQL file is historical, not required setup.

References: [Apps Script web apps](https://developers.google.com/apps-script/guides/web), [Content Service redirects](https://developers.google.com/apps-script/guides/content), [script locks](https://developers.google.com/apps-script/reference/lock/lock-service).

### Setup status

The Notebook tab and standalone script have been prepared. Google authorization, token configuration, web-app deployment, production environment settings, and live end-to-end verification are still pending. No hosting settings have been changed.

## Checks

Use Node 20:

```sh
node scripts/test-good-responses.mjs
node scripts/test-google-notebook.mjs
node node_modules/typescript/bin/tsc --noEmit --incremental false
```

The script uses only temporary files and a mocked shared-service transport. It checks normalization, real prior-response order, duplicate exclusion, idempotency, cooldown, concurrent local writes, production fail-closed behavior, and the server-only Apps Script adapter. A separate VM harness exercises the actual Apps Script source with mocked Google services: authentication, normalization, prior-reply order, literal formula-like text, idempotency, cooldown, and lock/write failures. These tests do not claim to verify a live Google deployment.

Browser checks cover initial hidden state, hover and keyboard/touch entry, successful saves across independent browser contexts, error retention, last-three ordering, Escape/focus return, 320/390/1080/1440px layouts, reduced motion, and continued drag/navigation behavior. Stop dev before `next build` since they share `.next`.

## Scroll discovery

If a visitor has seen the opening but scrolls past almost all of it without opening Good, open the same blue note once in its original position beneath Good. It is part of the document, never fixed to the viewport. Scrolling into the next section leaves it open back in the opening; returning upward reveals it again. Do not steal focus or programmatically scroll the page. Hover/click/keyboard discovery and automatic discovery both set the tab-session flag `portfolio-good-note-seen`; subsequent scrolling, reloads, or navigation back in that tab do not auto-open it again. Storage failures fall back to the mounted component’s in-memory guard. Direct entry below the opening does not auto-open the note until the visitor has actually seen the opening.

The note remains manually available through Good. Escape or its close control dismisses it; closing it while focus is elsewhere leaves that focus alone; closing from within the note returns focus to Good without scrolling. Open native dialogs retain Escape priority. The response form and backend contract are unchanged. Browser submission checks use a mocked response so the real local notebook is not polluted.
