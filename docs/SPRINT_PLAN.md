# 🏃‍♂️ TechMission Rio: Agile Sprint Plan

This document outlines the 2-week Agile Sprint cycles aligned with the **TechMission Rio Master Product Plan** and the **Product Maturity Model**.

---

## 📅 Sprint Schedule Overview

```
 [Sprint 1: Refined Validation] ➔ [Sprint 2: Push & Messaging] ➔ [Sprint 3: i18n Toggles]
               ↓                                ↓                               ↓
          Weeks 1 - 2                      Weeks 3 - 4                     Weeks 5 - 6
```

---

## 🏁 Sprint 1: Validation Refinements (Current Sprint)
**Primary Goal**: Stabilize B2B Sponsored Classrooms, implement production PWA caching security guards, and block offline transactions gracefully.

### 📋 Checklist & Tasks
- [x] **Service Worker Strategies**: Deploy Cache-First (images), Stale-While-Revalidate (styles/scripts), and Network-First (HTML navigations).
- [x] **Production Registries**: Enforce production-only service worker registration checks in `PWARegister.tsx`.
- [x] **Connection Failovers**: Implement `navigator.onLine` block gates on `/donate` checkout inputs to display friendly connection alerts.
- [x] **Refined Offline Page**: Expand the `/offline` fallback layout to support dynamic session sync timers and window history go-back actions.
- [x] **Sync Logs & Documentation**: Overwrite MASTER_PLAN schemas and repository notes directories.

---

## 💬 Sprint 2: Push Notifications & Messaging Gateway (Weeks 3 – 4)
**Primary Goal**: Build background alert mechanisms and communication channels between fellows and US mentors.

### 📋 Scope & Deliverables
* **Firebase Cloud Messaging Integration**:
  * Set up background PWA service worker listeners in `public/firebase-messaging-sw.js`.
  * Create Firestore collections (`notifications/` and `tokens/`) to store device registration tokens.
  * Deployed API endpoint `/api/notifications/register` to bind users to device Pushes.
* **Student-to-Mentor Messaging MVP**:
  * Create `messages/` collection in Firestore.
  * Build simple real-time chat interface components (`/dashboard/chat`) using Firestore snapshot bindings for active student-mentor couplings.

---

## 🌐 Sprint 3: i18n Translation & Localization (Weeks 5 – 6)
**Primary Goal**: Add native language switching (EN/PT) to ensure accessibility for US donors and Brazilian educators/students.

### 📋 Scope & Deliverables
* **Bilingual Switcher**:
  * Set up i18n configuration structures using next-intl or a custom React Context provider.
  * Translate navigation menus, static headers, footer components, and landing pages.
* **Dynamic Content Locales**:
  * Define localized fields in Firestore collections (e.g., `story_en` / `story_pt` for fellows).
  * Automatically display PT descriptions for local educators/students and EN descriptions for US donors.

---

## 📄 Sprint 4: Tax Receipt Generators & PDF Exporters (Weeks 7 – 8)
**Primary Goal**: Automate donation receipt processing to reduce administration overhead for B2B church and angel partners.

### 📋 Scope & Deliverables
* **PDF Exporter Engine**:
  * Build serverless API route (`/api/donations/receipt`) to dynamically generate PDF receipts for tax purposes (501(c)(3) declarations).
  * Save generated documents to GCP Cloud Storage under `/receipts` and link access routes inside donor dashboards.
* **Email Recipient Gate**:
  * Hook Stripe Webhook events (`payment_intent.succeeded`) to automatically trigger receipt generation and dispatch PDF emails to donors.

---

## ♿ Sprint 5: Accessibility Auditing (WCAG 2.2 AA) (Weeks 9 – 10)
**Primary Goal**: Refine the visual interface to ensure WCAG compliance for low-vision and assistive technology users.

### 📋 Scope & Deliverables
* **Contrast & Controls**:
  * audit UI components to guarantee text-to-background contrast ratios of at least 4.5:1.
  * Ensure full keyboard navigation capability (tab controls and visual focus outlines) on forms, buttons, and portals.
* **Screen Readers**:
  * Enforce semantic HTML components (`<main>`, `<header>`, `<nav>`, `<button>`).
  * Add descriptive `aria-label` elements to all visual cards and media pitch modal controls.

---

## 🐳 Sprint 6: Cloud Run Porting & Containerization (Weeks 11 – 12)
**Primary Goal**: Containerize Next.js and move the backend pipelines from Vercel Serverless to GCP Cloud Run.

### 📋 Scope & Deliverables
* **Docker Packaging**:
  * Create production-ready `Dockerfile` and `.dockerignore` for Next.js builds.
  * Set up GitHub Actions CI/CD workflows to build and push container images to GCP Artifact Registry.
* **GCP Cloud Run Deployments**:
  * Configure Cloud Run service profiles with GCP Secret Manager variables (Firebase keys, Stripe tokens).
  * Set up Cloud Load Balancing, secure HTTPS certificates, and Cloud Armor firewalls.
