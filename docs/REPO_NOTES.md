# TechMission Rio - Repository Notes

## 📋 Repository Overview

### Project Status: ✅ PRODUCTION READY
**Primary Mission**: Established over three years ago, a lightweight donation platform connecting Brazilian youth tech talent with US stakeholders, churches, and angel investors.

### 🏗️ Architecture
- **Framework**: Next.js 16.2.10 with App Router (Turbopack optimized)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS with custom TMR theme
- **UI Components**: Radix UI (minimal set)
- **Database / Auth**: GCP Firebase Authentication & Cloud Firestore
- **Deployment**: Vercel CI/CD

---

## 🎯 Core Features Implemented

1. **Donation Platform (`/donate`)**
   - Multiple giving tiers ($25, $100, $500)
   - Custom amount options
   - Support for both USD ($) and local Brazilian PIX (R$ currency) payments
   - Integration with Stripe checkout sessions (passing authenticated `userId` in metadata)

2. **GCP Firebase Auth & Repeat Donor Portal (`/login`)**
   - Client-side individual donor and B2B Organization registration and logins
   - Firestore mapping for `users` and `organizations` collections
   - Specialized Church Hub dashboard widgets: prayer boards, cohort milestone progress trackers, Zoom Q&A exchange scheduler, and mission trip registries

3. **Public Student Impact Dashboard (`/dashboard`)**
   - Real-time impact counters loaded dynamically from Firestore (`dashboard_stats/global_metrics`)
   - Interactive SVG mapping of Rio de Janeiro showing partnering campuses (FAETEC, IFRJ) and student allocations
   - Budget transparency graph illustrating equipment, bootcamp training, and operation percentages
   - Secure Admin statistics editor (`/dashboard/admin`) for organization partners to update metrics dynamically in the database

4. **Youth Video Profiles (`/fellows`)**
   - Meet page featuring active TMR coding fellows
   - Integrated 60-second video elevator pitch modals with dynamic browser playback
   - Clickable developer social links (GitHub, LinkedIn, and personal portfolio websites)

5. **PWA Integration & Favicon Compilation**
   - High-resolution PWA assets compiled directly from vector SVG parameters representing the exact TMR nav bar logo
   - Resized icons (192px, 256px, 384px, 512px) generated via `npm run generate-icons` using `sharp`
   - Unified homescreen and Chrome installer visuals with navigation header styling

6. **Installable PWA & Offline Support**
   - **Service Worker (`public/sw.js`)**: Configured with custom caching strategies: Cache First for static images, Stale While Revalidate for JS/CSS resource bundles, and Network First with Offline Fallback for HTML routing.
   - **Registration Component (`components/PWARegister.tsx`)**: Registered on client-side mount, restricted strictly to `production` environments to preserve development efficiency.
   - **Offline Fallback Page (`/offline`)**: Custom styled, brand-consistent warning page displaying last sync timestamps and previous session restore buttons. Excludes sensitive endpoints (auth, API, admin dashboards) from stale pre-caches.

7. **PostHog Analytics Integration**
   - Lazy PostHog provider configuration preventing pre-rendering build-time crash warnings
   - Custom events: page views, social profile clicks, video watch times, donation conversions, and funnel milestones

---

## 🐛 Error Handling & Graceful Degradation

Our architecture is designed to fail gracefully without disrupting the user experience when API keys or server credentials are unconfigured:

### 1. Firebase Client SDK Fallback
* **Problem**: Next.js evaluates file imports at compile time to pre-render static pages (`_not-found`, `/about`). If Firebase env variables are missing, the client SDK immediately throws an `auth/invalid-api-key` error and halts compilation.
* **Solution**: `lib/firebase.ts` evaluates the presence of `NEXT_PUBLIC_FIREBASE_API_KEY`. If empty, it initializes Firebase with dummy credentials, allowing compilation to proceed successfully.

### 2. Stripe Webhook Resiliency
* **Problem**: In test/preview serverless environments, GCP service account credentials (`FIREBASE_SERVICE_ACCOUNT_KEY`) might be missing, causing server-side firestore writes to crash the webhook endpoint.
* **Solution**: `lib/firebase-admin.ts` checks for required cert details. If missing, it log warnings (`console.warn`) and skips writes, returning a successful `200 OK` response to Stripe.

### 3. PostHog Tracking Fallback
* **Problem**: If PostHog keys are missing, capturing events will throw undefined errors.
* **Solution**: `hooks/useAnalytics.ts` detects the state of PostHog initialization. If null, it exports a mock API container containing no-op functions (`noop = () => {}`) that drop the events without throwing runtime exceptions.

### 4. Interactive Form Validations
* Form components enforce strict regex parameters for credentials, minimum password lengths (6+ characters), and statistical ratios (budget edits must sum to exactly 100% before publishing).

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

### Phase 3 (Next Sprints)
- [ ] FCM (Firebase Cloud Messaging) service worker logic for PWA push alerts
- [ ] Real-time student-to-mentor messaging portal
- [ ] Multi-language i18n localization (EN / PT toggles)
- [ ] Automated tax receipt generation for US churches

---

## 📞 Support & Maintenance
- **Documentation**: `DEBUGGING.md`, `MCP_RULES.md`, `MASTER_PLAN.md`
- **Updates**: Regular dependency updates + security patches
- **Last Updated**: 2026-07-09
- **Maintainer**: Antigravity Developer Agent
- **Deployment**: Vercel CI/CD Active
