# TechMission Rio — Updated Agile Sprint Plan
# QA-reviewed version with blockers resolved

## 🧭 Sprint Execution Principles

### Capacity Allocation
Every 2-week sprint allocates developer capacity to ensure system health:
- ➔ **70% Feature Development**: New capabilities & core validation.
- ➔ **20% Bug Fixes**: Prompt resolution of production and validation issues.
- ➔ **10% Technical Debt**: Code refactoring, test coverage, and dependency cleanup.

### Definition of Done (DoD)
A sprint backlog item is only marked as complete when it satisfies:
- [x] Feature deployed to production.
- [x] QA testing completed successfully.
- [x] Documentation updated (README.md, REPO_NOTES.md).
- [x] Lighthouse scores unchanged or improved.
- [x] Accessibility standards verified.
- [x] PostHog custom analytics events added.
- [x] Zero critical/major bugs outstanding.

---

## 🏁 Sprint 1: Validation Refinements ✅ COMPLETE
- PWA caching, offline donate blocker, pre-cached /about & /fellows.
- Lesson: cache-first on images reduces favela loading delays significantly.

---

## 💬 Sprint 2: Push Notifications & Messaging (Weeks 1–2)

### Pre-sprint decision required (resolve before coding begins):
- **Option A**: Use your 12th (final) Vercel function slot for `/api/notifications/send`
- **Option B**: Upgrade to Vercel Pro ($20/mo) before this sprint — removes ceiling and also unblocks Sprint 5 PDF renderer.
- **Recommendation**: Upgrade now. Sprint 5 will hit the ceiling regardless.

### FCM Setup
- `public/firebase-messaging-sw.js` — register service worker
- Firestore collection: `device_tokens/{uid}/tokens/{tokenId}`
  - `{ token: string, platform: "web", createdAt: Timestamp }`
- `/api/notifications/send` route (function #12 or Pro):
  - POST `{ uid, title, body, data? }`
  - Server calls FCM HTTP v1 API with Firebase Admin SDK

### Student-to-Mentor Chat MVP (`/dashboard/chat`)
- Firestore collection: `chats/{chatId}/messages/{messageId}`
  - `{ senderUid, text, createdAt, readBy: string[] }`
- `onSnapshot` listener — client-side, no function slot needed
- Simple UI: message list + text input + send button
- Auth gate: only fellows and mentors can access

### Success Metrics:
- **OLD**: "25 active mentor/student conversations"
- **NEW (Measurable)**: Chat infrastructure live, tested end-to-end with 3 internal test accounts. FCM delivers push within 2s on test device. (Set the 25-conversation target for Sprint 4 when real users exist).

### Add to REPO_NOTES.md:
- `onSnapshot` chat listeners are ONLY permitted under `/dashboard/chat`.
- Never import or render chat components under `/partner`.

---

## ♿ Sprint 3: Accessibility Auditing WCAG 2.2 AA (Weeks 3–4)

### Contrast audit — run manually, don't rely on Lighthouse alone
Check every text/background pair with WebAIM contrast checker:
- **PASS**: `#5ae0a0` on `#000000` = ~7.5:1 ✓
- **FAIL**: `rgba(255,255,255,0.55)` on `#000` = ~3.9:1 ✗ → raise to 0.70+ opacity
- **CHECK**: all carousel text overlays
- **CHECK**: fellow card muted descriptions
- **CHECK**: secondary labels throughout dark theme

*Minimum ratios: 4.5:1 normal text · 3:1 large text (18px+ bold)*

### Schema update for Sprint 4 prep (do in this sprint to avoid conflict)
Update `fellows/{id}` bio field from:
  `bio: string`
To:
  `bio: { en: string | null, pt: string | null }`

Update Firestore rules — add "bio" to the whitelisted self-edit fields (the nested object write is permitted by the existing `hasOnly` rule if "bio" is in the allowed keys list).

Update `/dashboard/fellow` editor to show two textarea inputs:
  Bio (English) · Bio (Português)

### Other WCAG items
- All iframe elements: `title` attribute with fellow name.
- Form inputs: explicit label association (`htmlFor` + `id`).
- Focus rings: visible on all interactive elements (add Tailwind `focus-visible:ring-2 focus-visible:ring-[#5ae0a0]`).
- Skip-to-content link at top of `app/layout.tsx`.
- All icon-only buttons: `aria-label` set.
- Lighthouse Accessibility target: > 95.

---

## 🌐 Sprint 4: i18n Translation & Localization (Weeks 5–6)

### Library: `next-intl` (NOT `react-i18next`)
`next-intl` supports Next.js 14 App Router Server Components natively. `react-i18next` requires "use client" everywhere — breaks `/partner` Server Component architecture.
- Run: `npm install next-intl`

Structure:
```
messages/
  en.json   — all English strings
  pt.json   — all Portuguese strings
```

### Key pages to translate (priority order):
1. `/` (home) — donation CTA must be in PT for Brazilian visitors.
2. `/about` — mission statement, scripture.
3. `/fellows` — card labels, badges, empty state.
4. `/partner` — form labels, status values, LGPD consent text.
5. `/privacy` — already bilingual, migrate to i18n keys.
6. `/donate` — amount labels, confirmation text.
7. `/dashboard/*` — UI labels.

### Dynamic content (Firestore)
- Fellow bios: `bio.en` / `bio.pt` (schema updated in Sprint 3).
- Read: `const bio = locale === "pt" ? fellow.bio.pt : fellow.bio.en`

### Language switcher
- Simple toggle button in `Navigation.tsx`: EN | PT.
- Store preference in `localStorage("tmr_locale")`.
- Detect browser locale on first visit as default.

### Risk mitigation — PT text length
Portuguese strings are typically 20-30% longer than English. Test all grid layouts with PT strings before marking done. Add flex-wrap or truncation where needed.

---

## 📄 Sprint 5: Tax Receipt Generators (Weeks 7–8)

### Pre-sprint requirement: Vercel Pro must be active
The PDF renderer is a new serverless function. If not already upgraded in Sprint 2, upgrade now. This is non-negotiable.

### PDF library: `@react-pdf/renderer` (~180kb)
DO NOT use `puppeteer-core` — 50MB cold start, overkill for a receipt. `@react-pdf/renderer` renders React components to PDF server-side.
- Run: `npm install @react-pdf/renderer`

### Receipt content
- TechMission Rio letterhead (text only — no image)
- Donor name + email
- Donation amount + date + currency (USD)
- PayPal or Stripe order ID
- "This receipt is provided for your records."
- For US church donors: note that 501(c)(3) status confirmation is pending — do not claim tax deductibility until confirmed.

### Serverless route: `/api/receipts/generate`
POST `{ donationId, userId }`
- Fetch donation from `users/{uid}/donations/{donationId}`
- Render PDF with `@react-pdf/renderer`
- Return as PDF blob (`Content-Type: application/pdf`)
- Client triggers download: `URL.createObjectURL(blob)`

*Do NOT use GCP Storage for receipts — generates on demand, no storage cost. Donor downloads directly from the API response.*

### Email dispatch
On Stripe webhook `payment_intent.succeeded`:
- Call `/api/receipts/generate` internally.
- Send via Firebase Extensions: "Trigger Email" extension (uses Firestore trigger — no extra function slot).

### Stripe webhook idempotency (already planned — confirm it's implemented)
- `stripe_events` Firestore collection must guard against duplicate receipt sends.

---

## 🐳 Sprint 6: Cloud Run Porting & Containerization (Weeks 9–10)

### Pre-sprint: add to `next.config.js` NOW (not in Sprint 6)
- `output: "standalone"` is already configured in `next.config.js`. This reduces Docker image from 500MB+ to ~40MB and is required to hit the <3 second cold start target.

### Zero-downtime DNS cutover checklist
Run through this IN ORDER before switching DNS:
- [ ] Cloud Run service deployed and health-checked at Cloud Run URL.
- [ ] All Stripe webhook endpoints updated to `techmissionrio.org` (already set).
- [ ] PayPal return URLs verified (already set).
- [ ] Firebase Auth authorized domains: add Cloud Run URL temporarily.
- [ ] Set `techmissionrio.org` DNS TTL → 300 seconds (48h before cutover).
- [ ] Switch DNS A record to Cloud Run Load Balancer IP.
- [ ] Monitor for 2h — check Stripe webhooks firing, auth working.
- [ ] Keep Vercel deployment live for 72h as rollback target.
- [ ] After 72h stable: cancel Vercel Pro if no longer needed.

### Secret Manager bindings
All env vars migrate from Vercel dashboard to GCP Secret Manager:
`ADMIN_UID` · `STRIPE_SECRET_KEY` · `PAYPAL_SECRET` · `FIREBASE_ADMIN_SERVICE_ACCOUNT_JSON` · All `NEXT_PUBLIC_FIREBASE_*` vars.

### Cold start target: <3 seconds
Achievable with standalone output + `min-instances: 1` in Cloud Run config. `min-instances: 1` costs ~$5/month but eliminates cold starts entirely.

---

## 🛠️ Technical Debt Backlog (prioritized)
1. Refactor duplicate Firestore hooks into reusable `lib/firestore.ts` actions.
2. Consolidate layout components — remove deprecated classes.
3. Optimize `/fellows` bundle — lazy load video iframes below fold.
4. Add unit tests for: `toYouTubeEmbedUrl()`, `getPayPalAccessToken()`, nomination rate-limit check (target: 80% coverage on utils).
5. Run next/bundle-analyzer — `/partner` must stay under 50kb gzipped.
