# 🗺️ TechMission Rio: 6-Month Master Marketing & Product Plan (2026)

This document maps out the strategic marketing campaigns and product improvements for **TechMission Rio (TMR)** over the next six months. Our focus is connecting US organizations (especially Christian churches and businesses) with tech talent, equipment, and cohorts in Rio's underserved communities.

---

## 📅 Part 1: The 6-Month Marketing & Outreach Plan

Our marketing strategy targets two primary stakeholders: **US Christian Churches/Organizations** (funding & mentorship) and **Rio de Janeiro Technical Schools** (student pipeline).

```
  MONTH 1-2                 MONTH 3-4                 MONTH 5-6
  [Pipeline & Mentors]     [B2B Church Outreach]     [Missions & Retention]
  * FAETEC & IFRJ pilots   * Direct B2B Campaigns    * Rio Tech Summer Camps
  * BRASA chapters drive   * Youth-Group Exchanges   * Annual Impact Report
```

### 🔹 Months 1–2: Student Pipeline & Mentorship Sourcing
* **Rio School Partnerships**:
  * Establish official cooperation agreements with **FAETEC** (Santa Cruz & Quintino campuses) and **IFRJ** (Rio de Janeiro and Duque de Caxias campuses).
  * Set up the nomination flow: local IT teachers nominate the top 10% highest-potential, low-income students.
* **US University Mentorship Drive**:
  * Pitch to **BRASA** (Brazilian Student Association) chapters at top US technical universities (MIT, Stanford, Georgia Tech, Harvard).
  * Onboard 30 native Portuguese-speaking tech students/alumni as virtual mentors.

### 🔹 Months 3–4: B2B Christian Organization & Church Campaigns
* **Target Audience**: US Christian churches (Nondenominational, Baptist, Presbyterian) and faith-based businesses seeking high-impact international missions.
* **Direct Outreach**:
  * Package TMR as an "Adopt-a-Classroom" cohort sponsorship (sponsoring 12 students' laptops and 6 months of training for $12,000/year).
  * Promote the portal's B2B features: **Prayer Board** integrations and **Live Youth Group Exchange** schedules.
* **Digital Campaign**:
  * Distribute a video series showing Rio fellows receiving laptops and coding workshops.
  * Focus marketing on "Tech for Stewardship: Empowering the Next Generation."

### 🔹 Months 5–6: Rio Mission Trips & Donor Retention Loop
* **Missions Trip Collaboration**:
  * Run pilot in-person Tech Missions trips where US church teams travel to Rio to co-host 1-week coding camps with local churches.
* **Annual Impact & Transparency**:
  * Publish the first automated **Annual Impact Report** detailing where every dollar was spent, laptop serial numbers, and student graduation outcomes.
  * Direct mail and email campaigns to initial donors showing individual progress notes of their sponsored fellows.

---

## 🛠️ Part 2: The 6-Month App Product Roadmap

Our Next.js 16 (App Router) product roadmap builds out the features needed to execute the marketing plan.

### 🚀 Month 1: Payments & Portal Activation (Completed)
* **Stripe & PIX Gateways**: Integrated Stripe test credit card processing and local Brazilian PIX payments (BRL currency) via dedicated checkout APIs.
* **FCM Configuration**: Configured Firebase Cloud Messaging credentials during the Auth SDK setup.

### 🚀 Month 2: Public Student Impact Dashboard & Page Consolidation (Current Sprint)
* **Route Consolidation**: 
  * Merge `/about` and `/mission` into a unified `/about` page (featuring the Ken Burns Rio carousel, foundling story, Romans 12:2, and core pillars).
  * Merge `/connect` and `/partner` into a unified `/partner` dashboard (combining stakeholder matching, educator nominations, and hardware logs).
* **Live Firestore Bindings**: Refactor dashboard metrics fetches to utilize real-time listeners (`onSnapshot`) instead of one-time `getDoc` calls.
* **Stripe Webhook Idempotency**: Guard the webhook route against duplicate events by logging processed Stripe Event IDs to a `stripe_events` Firestore collection.

### 🚀 Month 3: Student Video Profiles & Verification Badges (`/fellows`)
* **Elevator Pitches**: Enable short 60-second video introductions for fellows with dynamic browser playback.
* **Verification Badges**: Add **"Teacher Endorsed" labels** and verified academic metrics to fellow profiles to bolster sponsorship credibility.
* **Social Links & Tracking**: Display clickable GitHub, LinkedIn, and personal portfolio links with PostHog event tracking.

### 🚀 Month 4: School Partner & B2B Portal (`/partner`)
* **Gated Educator Portal**: School nominations forms and hardware request logs gated behind Firebase authentication.
* **Adopt-a-Classroom Checkout**: Integrate a dedicated checkout flow for the $12,000 cohort package, protected by a secure Radix confirmation dialog.

### 🚀 Month 5: PWA Push Notifications & Messaging
* **PWA Alerts**: Implement service-worker push alerts using FCM to notify sponsors when sponsored students complete learning milestones.
* **Student Chat**: Integrate a simple chat tool for fellows to communicate with their US mentors directly.

### 🚀 Month 6: Multi-Language & Regional Support
* **i18n Localization**: Add full English / Portuguese language toggles based on the browser locale.
* **Tax Document Portal**: Store and archive tax-exempt receipts automatically in B2B profiles.
