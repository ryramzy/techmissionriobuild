# TechMission Rio - Repository Notes

## 📋 Repository Overview

### Project Status: ✅ PRODUCTION READY (v2.0 Active)
**Primary Mission**: Established over three years ago, a lightweight donation platform connecting Brazilian youth tech talent with US stakeholders, churches, and angel investors.

### 🏗️ Architecture
- **Framework**: Next.js 16.2.10 with App Router (Turbopack optimized)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS with custom TMR theme
- **UI Components**: Radix UI (minimal set)
- **Database / Auth**: GCP Firebase Authentication & Cloud Firestore
- **Deployment**: Vercel CI/CD & GCP Cloud Run (Dockerized)

---

## 🎯 Core Features Implemented

1. **Production Stripe Payments & Webhooks**
   - Multi-currency USD and BRL checkout sessions.
   - Raw request body parsing (`req.text()`) to verify webhook signatures using Stripe’s dynamic constructors.
   - Database writes to `users/{uid}/donations/{session.id}` with legacy metrics fields preserved.
   - **Idempotency Guard**: Event logs added to `stripe_events` collection to intercept duplicate webhook retries.
   - **Auto Emails**: Webhook event logs added to `mail` collection triggering the **Firebase Trigger Email Extension**.

2. **Server-side PDF Receipts Engine**
   - Branded PDF statement documents dynamically generated via `@react-pdf/renderer`.
   - Secure POST `/api/receipts/generate` endpoint verifying caller ID tokens.
   - Seamless PDF downloads on the donor dashboard contribution tables.

3. **GCP Firebase Auth & Repeat Donor Portal (`/login`)**
   - Client-side individual donor and B2B Organization registration and logins.
   - Firestore mapping for `users` and `organizations` collections.
   - Specialized Church Hub dashboard widgets: prayer boards, Zoom Q&A scheduling, and mission trip registries.

4. **Public Student Impact Dashboard (`/dashboard`)**
   - Real-time impact counters loaded dynamically from Firestore (`dashboard_stats/global_metrics`).
   - Interactive SVG mapping of Rio de Janeiro showing partnering campuses (FAETEC, IFRJ).
   - Budget transparency graph illustrating equipment, bootcamp training, and operation percentages.
   - Secure Admin statistics editor (`/dashboard/admin`) for organization partners.

5. **Youth Video Profiles & Endorsements (`/fellows`)**
   - Meet page featuring active TMR coding fellows with verified `"✓ Teacher Endorsed"` trust badges.
   - Integrated 60-second video elevator pitch modals with dynamic browser playback.
   - Clickable developer social links (GitHub, LinkedIn, and portfolios).

6. **PWA Integration & Caching**
   - High-resolution PWA assets compiled via `sharp` and registered service worker caching strategies (`public/sw.js`).
   - Custom styled `/offline` session recovery screens.

7. **Clean i18n Routing (EN/PT)**
   - Clean, URL prefix-free multilingual experiences via cookie resolution across all public screens and private dashboards.
   - Bilingual language selectors embedded in nav headers.

8. **PostHog-Gated Cookie Consent**
   - GDPR/LGPD compliant cookie banner that gates PostHog initialization until user acceptance.

9. **Bilingual Terms of Service**
   - Bilingual `/terms` page containing acceptance clauses, donation disclaimers, and LGPD minor nominations rules.

10. **Edge-aligned API Throttling & Sentry (v1.1)**
    - Multi-stage Next.js middleware rate limiting sensitive endpoints (excluding payment webhooks and notification retry loops).
    - Sentry configurations for Client, Server, and Edge runtime monitoring.

11. **Launch Marketing & Communications (v1.1)**
    - Dynamic sitemaps, robots.txt, structured JSON-LD schemas, and dynamic OG images generated at the Edge.
    - Automated loops triggering welcome and volunteer onboarding confirmation emails.

12. **Mobile & TWA Store Package configuration (v1.1)**
    - Complete pre-seeded Bubblewrap `twa-manifest.json` and digital asset link `assetlinks.json` configurations.

13. **Cloud Containerization & CD Pipeline (v1.2)**
    - Standalone Dockerfile setup, GCP Artifact Registry deployment, and automatic GitHub Actions pipelines.
    - Lightweight `/api/health` probes target endpoint.

14. **Local Caching & Database Index Scaling (v1.2)**
    - Local multi-tab client persistence caching enabled in Firebase.
    - CDN cache-control header mappings, and `firestore.indexes.json` definitions.

15. **AI Student-Mentor Matching Engine (v2.0)**
    - Secure `/api/ai/match` route linking student and mentor parameters using OpenAI models or local heuristic tracking backups.
    - Admin interface panel matching student listings and displaying compatibility gauges.

16. **Production Launch Checklist (v2.0)**
    - Comprehensive `docs/RELEASE_CHECKLIST.md` mapping DNS domains setup, Stripe live credentials switches, Firestore security rule audits, and telemetry tracking metrics checks.

17. **Live Impact Maps & Donor Feed (v3.0)**
    - Dynamic `public_feed` collection populated by Stripe Webhooks.
    - Pulsing SVG World Map geolocation overlays and Recent Activity Ticker panel displays on the `/impact` page.
    - Real-time average donation size, YTD nominations, and matches counts displayed inside the Admin dashboard using `collectionGroup` queries.

18. **Social Media Integrations & Annual Impact Report (v3.0)**
    - Home page card grid displaying Instagram/Facebook updates and classroom accomplishments.
    - Interactive share overlay assets compiler for TikTok/Instagram.
    - POST API under `/api/admin/reports/annual-impact` compiling YTD metrics, generating simulated PDF Base64 documents, and sending emails to all active donors via the Firebase Trigger Email queue, manually triggerable from the Admin panel.

19. **Automated Video Room & Zoom Scheduler (v3.0)**
    - POST API under `/api/admin/matches/confirm` creating confirmed matches, auto-generating video links (Zoom API or falling back to Jitsi rooms), and setting sessions.
    - Confirm button inside Admin AI Matcher tab enabling manual pairing confirmation.
    - Live calendar and video room widgets on both the Fellow (student) dashboard and Mentor (donor) dashboard portals.

20. **AI Resume Screeners & Practice Board (v3.0)**
    - Profile Editor vs AI Practice Hub tab switches in the Fellow (student) dashboard.
    - Resume plain text scanner checking target keywords (TypeScript, Next.js, Jest, Docker) and outputting impact verbs, score ratings, and formatting suggestions.
    - Practice Board mock interviewer chatbot conducting track-specific coding/systems evaluations and generating feedback scores.

---

## 🐛 Error Handling & Graceful Degradation

Our architecture is designed to fail gracefully without disrupting the user experience when API keys or server credentials are unconfigured:

### 1. Firebase Client SDK Fallback
* **Problem**: Next.js pre-renders static pages at compile time. Missing keys crash compilation.
* **Solution**: `lib/firebase.ts` evaluates client variables and initializes dummy credentials when empty.

### 2. Stripe Webhook Resiliency
* **Problem**: Missing GCP service credentials cause Firestore writes to crash the webhook endpoint.
* **Solution**: `lib/firebase-admin.ts` logs warnings and returns `200 OK` to Stripe to bypass terminal exceptions in dev.

### 3. PostHog Tracking Fallback
* **Problem**: Uninitialized PostHog instances cause click events to throw exceptions.
* **Solution**: `hooks/useAnalytics.ts` maps Mock no-op functions when PostHog variables are absent.

### 4. AI Matching Backup Heuristics
* **Problem**: Missing `OPENAI_API_KEY` credentials crash AI matching requests.
* **Solution**: `/api/ai/match` triggers local heuristic matching comparing student IT tracks and skill overlaps.

---

## 📅 Roadmap Execution Progress

### Phase 1 (Completed)
- [x] Core donation landing page and contact forms
- [x] Youth profiles
- [x] Stakeholder connections

### Phase 2 (Completed)
- [x] Firebase authentication & Firestore user schemas
- [x] PWA icon generation matching header logo
- [x] Video pitch overlays on fellows profiles
- [x] Multi-currency checkout (USD / BRL PIX payments)
- [x] Real-time impact dashboard & admin portal

### Phase 3 (Completed)
- [x] FCM (Firebase Cloud Messaging) service worker logic for PWA push alerts
- [x] Real-time student-to-mentor messaging portal
- [x] Multi-language i18n localization (EN / PT toggles with clean URLs)
- [x] Production payments webhook idempotency & signatures
- [x] Server-side PDF tax receipt generation

### Phase 4 (Completed)
- [x] Bubblewrap / TWA store package compilation for Google Play Store.
- [x] Observability setup (Sentry, PostHog logs, Uptime monitoring).
- [x] Containerization (Docker, Artifact Registry, GCP Cloud Run, Secret Manager).
- [x] AI Student-Mentor Matching engine (v2.0)
- [x] Public Launch checklist release sheet (v2.0)

---

## 📞 Support & Maintenance
- **Documentation**: `docs/DEBUGGING.md`, `docs/MCP_RULES.md`, `docs/MASTER_PLAN.md`, `docs/TWA_BUILD_GUIDE.md`, `docs/GCP_DEPLOY_GUIDE.md`, `docs/RELEASE_CHECKLIST.md`
- **Updates**: Regular dependency updates + security patches
- **Last Updated**: 2026-07-21
- **Maintainer**: Antigravity Developer Agent
- **Deployment**: Vercel CI/CD & GCP Cloud Run Active

---

## 🕊️ Post-Launch Operational Insights & Developer Hand-off

As we complete the engineering phase (v3.0) and hand the platform over to real-world operations, these structural notes guide next-sprint developers:

### 1. PIX Integration via Mercado Pago (Extensibility Guide)
* **Webhook Blueprint**: Mercado Pago webhooks follow an identical pattern to Stripe webhooks. Set up signature verification, raw body validation, database idempotency guards (checking transaction ID write-locks), and write actions.
* **Instant Processing**: PIX payments are instant and irrevocable. No payment-failure retries or chargeback reconciliation states are required on webhook routes.

### 2. Operational Trust vs. Technical Credibility
* **Nomination Pipes**: The `/partner` nominating pipeline and AI match recommendation logs are fully integrated and tested. The primary bottleneck is non-technical: physical outreach to teachers at FAETEC / IFRJ campuses in Rio to submit nominations.
* **Donor Conversion**: The `/donate` and "Adopt-a-Classroom" portals are functional and transparent. However, enterprise donations will convert through local personal conversations and community presentations rather than organic search, using the website as verification.

### 3. Production Hardening Features
* **Stateless Scaling**: To transition from in-memory rate limiters to stateless horizontal instances on GCP Cloud Run, configure Upstash Redis rate-limit adapters (see Sprint 10 targets).
* **Metric KPIs tracking**: Integrate UTM parameters on email report links sent via Firebase Trigger Email to log open rates directly inside PostHog dashboards.

