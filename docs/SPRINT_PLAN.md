# 🏃‍♂️ TechMission Rio: Agile Sprint Plan

This document outlines the Agile Sprint cycles aligned with the **TechMission Rio Master Product Plan** and the **Product Maturity Model**.

---

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

## 📅 Sprint Schedule Overview

```
 [Sprint 1: Validation] ➔ [Sprint 2: Push/Messaging] ➔ [Sprint 3: Accessibility] ➔ [Sprint 4: i18n] ➔ [Sprint 5: Receipts] ➔ [Sprint 6: Cloud Run]
          ↓                          ↓                         ↓                      ↓                     ↓                     ↓
     (Completed)                Weeks 1 - 2               Weeks 3 - 4            Weeks 5 - 6           Weeks 7 - 8           Weeks 9 - 10
```

---

## 🏁 Sprint 1: Validation Refinements (Completed)
* **Sprint Type**: Validation
* **Goal**: Stabilize B2B Sponsored Classrooms, implement production PWA caching security guards, and block offline transactions gracefully.
* **Release Notes**:
  * **Completed**: Pre-cached `/about` & `/fellows`, production-only service workers registar, offline donate blocker check.
  * **Not Completed**: None.
  * **Known Issues**: Firebase auth is online-only.
  * **Lessons Learned**: Cache-first on images dramatically reduces favela loading delays.

---

## 💬 Sprint 2: Push Notifications & Messaging (Weeks 1 – 2)
* **Sprint Type**: Validation
* **Goal Metric**: 
  * ➔ 90% FCM notification delivery success rates.
  * ➔ <2 second average message latency.
  * ➔ 25 active mentor/student test conversations logged.

### 📋 Scope & Deliverables
* **Firebase Cloud Messaging**:
  * Set up `public/firebase-messaging-sw.js` and device registration collections.
  * API endpoints for push delivery.
* **Student-to-Mentor Chat MVP**:
  * Build simple real-time chat overlays (`/dashboard/chat`) using Firestore onSnapshot listeners.

### ⚠️ Risks & Dependencies
* **Dependencies**: User tokens must be securely stored in Firestore.
* **Risks**: Browser permissions block push registers; user switches devices.

---

## ♿ Sprint 3: Accessibility Auditing (WCAG 2.2 AA) (Weeks 3 – 4)
* **Sprint Type**: Optimization
* **Goal Metric**:
  * ➔ 100% WCAG 2.2 AA compliance on key donation and onboarding pages.
  * ➔ Lighthouse Accessibility Score > 95.

### 📋 Scope & Deliverables
* **Contrast & keyboard flow**: Enforce high contrast (minimum 4.5:1), visible focus rings, and proper form tab flow.
* **Assistive Technologies**: Semantic HTML validation and explicit aria labels on media players.

### ⚠️ Risks & Dependencies
* **Dependencies**: External custom components must support custom tabIndex attributes.
* **Risks**: Screen reader support varies by OS and browser combination.

---

## 🌐 Sprint 4: i18n Translation & Localization (Weeks 5 – 6)
* **Sprint Type**: Optimization
* **Goal Metric**:
  * ➔ 100% translation of core pages (English/Portuguese).
  * ➔ Zero compilation errors due to localized strings.

### 📋 Scope & Deliverables
* **Bilingual Switcher**: Translate all static and dynamic text (headers, footers, fields).
* **Database translations**: support PT and EN bios for student profiles.

### ⚠️ Risks & Dependencies
* **Dependencies**: i18n context framework integration.
* **Risks**: PT/EN text length mismatch breaking grid visual designs.

---

## 📄 Sprint 5: Tax Receipt Generators & PDF Exporters (Weeks 7 – 8)
* **Sprint Type**: Optimization
* **Goal Metric**:
  * ➔ 100% automated receipt generation on donation events.
  * ➔ Average receipt delivery time < 5 seconds post-payment.

### 📋 Scope & Deliverables
* **PDF Exporter Engine**: Serverless receipt rendering and GCP Storage integration.
* **Email webhook hooks**: Automate dispatch on successful Stripe notifications.

### ⚠️ Risks & Dependencies
* **Dependencies**: Stripe test webhook triggers must operate with 100% reliability.
* **Risks**: PDF creation libraries bloating serverless memory footprint.

---

## 🐳 Sprint 6: Cloud Run Porting & Containerization (Weeks 9 – 10)
* **Sprint Type**: Scale
* **Goal Metric**:
  * ➔ 100% successful build-to-deploy CI/CD automation.
  * ➔ Cold start latency < 3 seconds.

### 📋 Scope & Deliverables
* **Docker Packaging**: Containerize the Next.js app and configure Artifact Registry publishing.
* **Cloud Run Deployment**: Setup Load Balancing, Domain links, and Secret Manager environment bindings.

### ⚠️ Risks & Dependencies
* **Dependencies**: GCP billing enabled, Artifact Registry created, Secret Manager configured.
* **Risks**: Docker image size limits, cold starts, DNS cutover downtime.

---

## 🛠️ Technical Debt Backlog
- Refactor duplicate Firestore hooks into reusable actions.
- Improve unit test coverage to 80% across critical components.
- Optimize image sizes and Next.js bundle footprint.
- Consolidate layout components and remove deprecated styling classes.

---

## 📊 Board / Grant Reporting Template
```markdown
# TechMission Rio: Sprint Summary

### 🚀 What Shipped
- Brief summary of shipped features.

### 🎓 Student Impact
- Laptops distributed, classes sponsored, and candidate nominations logged.

### 💳 Donor Impact
- Total funding processed and active B2B sponsors matched.

### 📈 Budget & Risks
- Cloud service fees, Stripe processing overhead, and risk mitigation status.

### 🎯 Next Priorities
- Sprints milestones ahead.
```
