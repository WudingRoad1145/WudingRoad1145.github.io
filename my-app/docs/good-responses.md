# The “good” conversation

The homepage follows Yan’s handwritten sketch. “Make” and “humans” have handwritten margin notes. “Good” initially has no definition. Hovering the word opens a blue sticky note with a slight tilt, paper shadow, and folded corner; clicking, tapping, or pressing Enter also opens it and focuses the answer field. Escape or the close button returns focus to the word only when focus was inside the note, without scrolling. The note omits the former sharing helper line.

The note asks “What is good to you?” below “quality, character, virtue.” It explains that submitted words are shared anonymously. Only after a successful save does it reveal Yan’s reflection and up to three previous replies. No example visitor replies are seeded. With fewer than three responses, the copy reflects the actual number.

## Local review

`next dev` uses `.local/good-responses.json` when no portfolio-specific Supabase configuration exists. This file is ignored by Git, shared across local browser sessions, and survives a server restart. It keeps at most 200 recent browser visitors. `GOOD_RESPONSES_FILE` can point to a separate file for browser tests. Test replies must never be seeded into the normal review notebook.

The success view explicitly labels local replies as staying on this computer. Production never falls back to a local file, because the deployed host may have an ephemeral filesystem.

## Data contract

`POST /api/good-responses` accepts `{ "answer": "..." }` and returns `{ "answer": "...", "previous": ["..."], "mode": "local" | "shared" }`.

- Same-origin JSON requests only; compare Origin to the public Host, since Next may normalize its internal URL to localhost.
- Limit the body to 2 KiB and the normalized answer to 160 UTF-16 code units. Trim and collapse whitespace/control characters.
- A random, HttpOnly, SameSite cookie identifies a browser visitor; no email, name, or IP is collected by this feature. HTTPS cookies are Secure. Clearing cookies or using another browser creates another visitor; this is not identity verification.
- The latest three other browser visitors are read before saving. Repeating the same answer is idempotent. The same browser can change its answer after one minute. This is a light per-browser cooldown, not abuse-proof rate limiting.
- Responses are plain text rendered by React, never injected as HTML. Network errors keep the typed answer and do not claim it was shared.
- Local writes are queued and atomically renamed. Shared storage uses a primary-key upsert; concurrent other visitors can finish between the history read and write, so the three replies are a snapshot immediately before this submission, not a live feed.

## Shared public-site setup — pending

No live project, schema, or hosting environment has been changed. Use a **new isolated project**, proposed name `yan-portfolio-good`, rather than an existing BabyMilu database.

1. Review and apply `good-responses-schema.sql` to that isolated project. This is proposed installation SQL, not an applied migration. It enables RLS, removes browser-role access, and grants only the server role select/insert/update on the one table.
2. Set server-only `PORTFOLIO_SUPABASE_URL` and `PORTFOLIO_SUPABASE_SECRET_KEY` on the portfolio hosting environment. Never use `NEXT_PUBLIC_` names. The adapter accepts the current secret key through `apikey`, or a legacy service-role JWT using both headers.
3. Run a real insert/read query and Supabase database advisors there, then validate the flow with separate browser sessions on a preview deployment before enabling it publicly. Cloud SQL and the real service connection have **not** been verified yet.
4. With no shared configuration, production returns a clear 503 response and preserves the form input; it never fabricates visitor quotes or silently loses them to temporary storage.

Relevant upstream documentation: [Supabase API keys](https://supabase.com/docs/guides/getting-started/api-keys), [Row Level Security](https://supabase.com/docs/guides/database/postgres/row-level-security).

## Checks

Use Node 20:

```sh
node scripts/test-good-responses.mjs
node node_modules/typescript/bin/tsc --noEmit --incremental false
```

The script uses only temporary files and a mocked shared-service transport. It checks normalization, real prior-response order, duplicate exclusion, idempotency, cooldown, concurrent local writes, production fail-closed behavior, and the server-only REST adapter. It does not claim to test a real Supabase database.

Browser checks cover initial hidden state, hover and keyboard/touch entry, successful saves across independent browser contexts, error retention, last-three ordering, Escape/focus return, 320/390/1080/1440px layouts, reduced motion, and continued drag/navigation behavior. Stop dev before `next build` since they share `.next`.

## Scroll discovery

If a visitor has seen the opening but scrolls past almost all of it without opening Good, open the same blue note once in its original position beneath Good. It is part of the document, never fixed to the viewport. Scrolling into the next section leaves it open back in the opening; returning upward reveals it again. Do not steal focus or programmatically scroll the page. Hover/click/keyboard discovery and automatic discovery both set the tab-session flag `portfolio-good-note-seen`; subsequent scrolling, reloads, or navigation back in that tab do not auto-open it again. Storage failures fall back to the mounted component’s in-memory guard. Direct entry below the opening does not auto-open the note until the visitor has actually seen the opening.

The note remains manually available through Good. Escape or its close control dismisses it; closing it while focus is elsewhere leaves that focus alone; closing from within the note returns focus to Good without scrolling. Open native dialogs retain Escape priority. The response form and backend contract are unchanged. Browser submission checks use a mocked response so the real local notebook is not polluted.
