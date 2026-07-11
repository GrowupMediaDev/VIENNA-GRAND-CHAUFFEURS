# Contact & Booking Forms — Setup & Handoff

Status doc for the two working forms on this site. Read this first if you're
picking up the form/email work in a new session.

_Last updated: 2026-07-12_

---

## Overview

The site has **two** submitting forms, both backed by **Cloudflare Pages
Functions → Resend** (transactional email) with **Cloudflare Turnstile** +
honeypot spam protection. Each sends **two branded emails**: an internal admin
notification (German) and a customer confirmation (DE or EN, based on the page).

| Form | Page routes | Function | Endpoint |
|---|---|---|---|
| Contact | `/kontakt`, `/en/kontakt` | `functions/api/contact.js` | `POST /api/contact` |
| Booking | `/online-buchung`, `/en/online-buchung` | `functions/api/booking.js` | `POST /api/booking` |

The **homepage "booking bar"** (`HomePage.astro`, `data-booking-slot`) is **not a
form** — it's a static teaser that links to `/online-buchung`. Working as designed.

---

## Architecture / flow

1. Visitor submits the form → JS `fetch()` POSTs `FormData` to the endpoint
   (contact submits inline with status messages; booking redirects to
   `/buchung-abschluss` on success).
2. The Pages Function:
   - rejects if honeypot `_gotcha` is filled (silent 200, sends nothing),
   - verifies the Turnstile token server-side (`cf-turnstile-response`),
   - validates required fields,
   - sends the **admin** email (fatal if it fails → returns error),
   - sends the **customer** confirmation (best-effort → never fails the request),
   - returns `{ ok: true }`.
3. Admin email goes to `ADMIN_TO`; `reply_to` is set to the customer so hitting
   "Reply" answers them directly. Customer email's `reply_to` is `ADMIN_TO`.

Both functions are **self-contained** (email chrome/helpers duplicated) so they
stay independent — edit one without touching the other. Keep the brand constants
at the top of each file in sync.

---

## Frontend wiring (Astro)

Each form page:
- Reads the public site key: `const turnstileSiteKey = import.meta.env.PUBLIC_TURNSTILE_SITE_KEY;`
- Loads the Turnstile script in `<Fragment slot="head">`.
- Includes in the form: honeypot `input[name=_gotcha]` (hidden), hidden
  `input[name=lang]` (for DE/EN customer email), and
  `<div class="cf-turnstile" data-sitekey={turnstileSiteKey}>`.
- On error, resets the widget via `window.turnstile.reset()`.

`PUBLIC_TURNSTILE_SITE_KEY` is **inlined at build time** — it must be present in
the environment for BOTH the local build and the Cloudflare Pages build.

---

## Environment variables (Cloudflare Pages → Settings → Environment variables)

| Name | Type | Used by | Notes |
|---|---|---|---|
| `PUBLIC_TURNSTILE_SITE_KEY` | Plaintext | Build (frontend) | Public. **New widget:** `0x4AAAAAADzd8w9N5yd2a_20`. Needed at build time. |
| `RESEND_API_KEY` | **Secret** | Both functions | Resend API key. Never in code. |
| `TURNSTILE_SECRET_KEY` | **Secret** | Both functions | Turnstile secret. Never in code. |

- Locally, `.env` (gitignored) holds only `PUBLIC_TURNSTILE_SITE_KEY` so
  `npm run build` inlines a real site key. Secrets are **never** put in any file.
- `.env.example` (committed) documents the three variable names.
- Both functions reuse the **same** secrets — no per-form config.
- ⚠️ There was an **old** Turnstile key pair (`0x4AAAAAADg5O4uKravheYX0`) from the
  first message; it's superseded. A different client project (luxoravip.de) still
  uses the old key — don't copy keys between projects.

---

## Email delivery (Resend + Cloudflare Email Routing)

- **Sending:** domain `viennagrandchauffeurs.at` is **verified in Resend**.
  From address: `noreply@viennagrandchauffeurs.at` (`FROM` constant).
- **Receiving:** `viennagrandchauffeurs.at` DNS is on **Cloudflare**. There is no
  mailbox host, so `office@…` only receives via **Cloudflare Email Routing**
  (forwarding). A routing rule forwards `office@viennagrandchauffeurs.at` →
  `development@growupmedia.at` (the current lead inbox).
- Resend verification (sending, on a `send.` subdomain) and Email Routing (MX/SPF
  on the root) coexist. Watch for a duplicate root SPF TXT if issues arise.
- **Bounce history:** the first live test bounced "Recipient not found" because
  `office@` had no mailbox yet (before Email Routing). After fixing, `office@`
  must be **removed from Resend's suppression list** or re-sends stay blocked.

`ADMIN_TO` in both functions is currently `office@viennagrandchauffeurs.at`.
If the lead inbox should change, update `ADMIN_TO` in **both** function files.

---

## ⚠️ Placeholders still in the code (update when real values arrive)

- `PHONE = '+43 660 123 4567'` in both functions — placeholder phone in the email
  signatures. Replace in `contact.js` and `booking.js`.
- `LEGAL`, `CONTACT_EMAIL` constants — confirm against the real business details.

---

## Remaining / how to test

1. Cloudflare Email Routing rule `office@` → verified destination must be
   **Active**; disable any Catch-all set to **Drop**.
2. Remove `office@viennagrandchauffeurs.at` from **Resend → Suppressions**.
3. **Test live** (Functions do NOT run in `npm run dev` — only on the deployed
   Cloudflare site): submit `/kontakt` and `/online-buchung`. Each should send
   an admin email (to the routed inbox) + a customer confirmation (to the
   address entered). Check Turnstile passes and the booking redirect works.

---

## Conventions for this repo

- **Never** commit `RESEND_API_KEY` or `TURNSTILE_SECRET_KEY` (or any `re_…`
  value). `grep -rn "re_[A-Za-z0-9]" src/ functions/` must return nothing.
- Commits are authored as the user (**Robiu Eruda**) with **no** Claude/Anthropic
  co-author or "Generated with" attribution.
- Static Astro site (`output: 'static'`) on Cloudflare **Pages** (not Workers).
- Design tokens (email styling mirrors the site): accent `#c46a2d`, dark
  `#0d0703`, cream `#f4efe9` — from `src/styles/global.css`.
