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

### 🚀 Month 1: Payments & Portal Activation
* **Stripe Live Rollout**: Transition Stripe credentials from simulation mode to live processing.
* **PIX Integration**: Integrate PIX (Brazil's instant payment system) to enable local Brazilians and partners to donate easily.

### 🚀 Month 2: Public Student Impact Dashboard (`/dashboard`)
* Build a public-facing dashboard displaying real-time metrics:
  * Total Laptops Distributed.
  * Cumulative Hours of Mentorship.
  * Live interactive map pinning partnering FAETEC/IFRJ schools in Rio.
  * Budget transparency graph showing exactly how donation funds are allocated.

### 🚀 Month 3: Student Video Profiles on `/fellows`
* Enable short 60-second video introductions for fellows.
* Support video uploads via the student dashboard so fellows can record progress updates.
* Embed clickable GitHub, LinkedIn, and personal portfolio links on fellow detail cards.

### 🚀 Month 4: School Partner Portal (`/partner`)
* Implement a secure page for FAETEC/IFRJ educators.
* Features:
  * Student nomination form (grades, tech interests, financial justification).
  * Hardware request logs for classroom updates.

### 🚀 Month 5: PWA Push Notifications & Engagement
* Implement service-worker push notifications.
* Notify US sponsors when:
  * A sponsored student completes a major learning milestone (e.g. "Lucas just learned React!").
  * A new prayer request is posted on the church board.
  * A Zoom Q&A exchange is confirmed.

### 🚀 Month 6: Multi-Language & Regional Support
* Add full i18n support with a simple EN / PT toggle.
* Automatically localize dashboard data based on the visitor's browser locale.
