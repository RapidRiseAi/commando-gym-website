# Security & Backend Notes

This documents security posture and the items that **cannot be fixed from the
frontend alone**. Each has a concrete recommended fix for the owner/backend.

## What was hardened in this branch

- **Security headers** on every response (see `next.config.ts` and
  `public/_headers`): a strict `Content-Security-Policy`, `Strict-Transport-Security`
  (HSTS, 2 years, preload), `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`,
  `Referrer-Policy: strict-origin-when-cross-origin`, a locked-down `Permissions-Policy`,
  and `Cross-Origin-Opener-Policy`. `X-Powered-By` is disabled.
- **No third-party origins** are loaded by the browser: fonts are self-hosted via
  `next/font`, images are self-hosted/pre-optimized, and form posts go to first-party
  `/api/*` routes. The CSP therefore allows only `'self'` (plus `data:`/`blob:` images).
- **Consent**: every form that collects personal information has an explicit consent
  checkbox linked to the Privacy Policy, and the consent flag is sent with the submission.
- **Privacy Policy** rewritten to be POPIA-specific (South Africa).

## Open items for the owner / backend (cannot be fixed in the frontend)

### 1. Form endpoints have no rate limiting or bot protection (highest priority)
`/api/join`, `/api/contact`, and `/api/interest` accept unauthenticated POSTs and
forward them to the Google Apps Script webhook. There is no rate limiting, CAPTCHA,
or honeypot, so they can be scripted to spam the inbox/sheet or burn webhook quota.

**Recommended fixes:**
- Add **Cloudflare Turnstile** to the forms and verify the token server-side in the
  API routes before forwarding (free, privacy-friendly; would require adding
  `challenges.cloudflare.com` to the CSP `script-src`/`frame-src`).
- Add a **Cloudflare WAF rate-limiting rule** on `/api/*` (e.g. N requests/min/IP).
- Add a hidden **honeypot field** and reject submissions that fill it.

### 2. Webhook shared secret is duplicated into the request body
In the API routes the secret is sent both as the `X-Webhook-Secret` header **and** as a
`webhook_secret` field in the JSON body. The body copy is unnecessary and is more likely
to end up in logs/spreadsheet rows.

**Recommended fix:** verify the secret from the header only in Apps Script, and remove
`webhook_secret` from the body. Rotate the secret if it has been stored in a sheet.

### 3. Apps Script endpoint must validate the secret and reject anonymous writes
The webhook URL itself is effectively a bearer capability. If the Apps Script web app is
deployed as "Anyone can access", anyone with the URL can write rows.

**Recommended fix:** in the Apps Script `doPost`, reject any request whose
`X-Webhook-Secret` does not match, and keep the deploy URL out of client-visible code
(it already lives only in server env vars / Wrangler secrets).

### 4. CSP uses `'unsafe-inline'` for scripts and styles
Next.js injects inline bootstrap/hydration scripts and `next/font` injects an inline
`<style>`, so the CSP currently allows `'unsafe-inline'` for `script-src`/`style-src`.

**Recommended fix (optional hardening):** switch to a nonce-based CSP via middleware.
This requires the pages to render dynamically (per-request nonce) instead of being fully
static, which is a deliberate tradeoff for a mostly-static marketing site.

### 5. `/spa` mobile redirect is User-Agent based
`src/middleware.ts` redirects mobile User-Agents away from `/spa` unless the referer is
internal. UA sniffing is easy to spoof and can misfire on new devices. This appears to be
intentional business logic, so it was left unchanged. If the intent is to gate sensitive
(intimate waxing) pricing, consider a clearer in-page control rather than UA sniffing.

### 6. Dependency advisories are build-tooling only
`npm audit` reports issues in `esbuild`, `wrangler`, `miniflare`, and `ws`. These are
**dev/build dependencies** (local dev server and the Cloudflare build toolchain) and do
not ship in the production Worker runtime. `npm audit fix --force` would downgrade
`next` to v9 and `@opennextjs/cloudflare` to v0.2 (both breaking), so it was not applied.
`next` was bumped 15.2.4 -> 15.5.19 (security + the OpenNext peer requirement) and the
direct `postcss` dependency was bumped to `^8.5.10`.

## Image optimization note
Images are pre-optimized to responsive WebP at build time (`npm run optimize:images`) and
served as static assets, because the OpenNext/Cloudflare runtime returns original images
unchanged unless a Cloudflare **Images** binding is configured. If you later add an
`images` binding in `wrangler.jsonc`, you could re-enable `next/image` runtime
optimization, but it is not required with the current static pipeline.
