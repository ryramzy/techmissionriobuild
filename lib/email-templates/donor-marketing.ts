export interface DonorMarketingEmailData {
  donorName?: string
  organizationName?: string
  customNote?: string
  featuredFellowName?: string
  featuredFellowTrack?: string
  featuredFellowStory?: string
  donateUrl?: string
}

export function renderDonorMarketingEmail(data: DonorMarketingEmailData = {}): {
  html: string
  text: string
  subject: string
} {
  const donorGreeting = data.donorName ? `Dear ${data.donorName},` : "Dear Friend,"
  const orgMention = data.organizationName ? ` and the team at ${data.organizationName}` : ""
  const donateLink = 
    data.donateUrl || 
    "https://techmissionrio.org/donate?utm_source=email&utm_medium=donor_marketing&utm_campaign=classroom_sponsorship"
  
  const fellowName = data.featuredFellowName || "Gabriel"
  const fellowTrack = data.featuredFellowTrack || "Full-Stack Web Development"
  const fellowStory = data.featuredFellowStory || 
    "Growing up in Santa Cruz, West Rio, Gabriel taught himself basic HTML on a borrowed mobile phone. Through TechMission Rio's sponsored cohort, he received a refurbished ThinkPad laptop, 400+ hours of rigorous React/TypeScript curriculum, and weekly 1-on-1 mentorship with a senior engineer from Chicago."

  const subject = data.organizationName 
    ? `Partnering with TechMission Rio — Transforming Lives Through Technology`
    : `Invest in the Future: Equipping Rio's Youth for Global Tech Careers`

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
  <style>
    body { margin: 0; padding: 0; background-color: #0b0f19; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #e2e8f0; }
    .container { max-width: 600px; margin: 0 auto; background-color: #0d1322; border: 1px solid #1e293b; border-radius: 16px; overflow: hidden; }
    .header { background: linear-gradient(135deg, #064e3b 0%, #0f172a 100%); padding: 40px 32px; text-align: center; border-bottom: 1px solid rgba(16, 185, 129, 0.2); }
    .logo-badge { display: inline-block; background-color: rgba(16, 185, 129, 0.15); border: 1px solid rgba(16, 185, 129, 0.4); color: #34d399; font-size: 11px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; padding: 6px 14px; border-radius: 9999px; margin-bottom: 16px; }
    .title { font-size: 26px; font-weight: 800; color: #ffffff; line-height: 1.25; margin: 0 0 12px 0; }
    .subtitle { font-size: 15px; color: #94a3b8; line-height: 1.5; margin: 0; }
    .content { padding: 36px 32px; font-size: 15px; line-height: 1.65; color: #cbd5e1; }
    .custom-note { background-color: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 16px 20px; border-radius: 0 12px 12px 0; margin: 24px 0; font-style: italic; color: #93c5fd; }
    .stat-grid { display: table; width: 100%; margin: 28px 0; border-collapse: separate; border-spacing: 10px; }
    .stat-cell { display: table-cell; width: 33.33%; background-color: rgba(15, 23, 42, 0.8); border: 1px solid #1e293b; border-radius: 12px; padding: 18px 12px; text-align: center; }
    .stat-number { font-size: 26px; font-weight: 800; color: #10b981; margin-bottom: 4px; }
    .stat-label { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: #94a3b8; }
    .card { background-color: #111827; border: 1px solid #1f2937; border-radius: 14px; padding: 24px; margin: 28px 0; }
    .card-tag { display: inline-block; background-color: rgba(16, 185, 129, 0.15); color: #10b981; font-size: 11px; font-weight: 700; padding: 3px 10px; border-radius: 6px; text-transform: uppercase; margin-bottom: 10px; }
    .card-title { font-size: 17px; font-weight: 700; color: #f8fafc; margin: 0 0 8px 0; }
    .card-desc { font-size: 13.5px; color: #94a3b8; line-height: 1.6; margin: 0; }
    .tier-box { background: linear-gradient(180deg, rgba(16, 185, 129, 0.08) 0%, rgba(15, 23, 42, 0.6) 100%); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 14px; padding: 24px; margin: 28px 0; text-align: center; }
    .tier-title { font-size: 18px; font-weight: 800; color: #ffffff; margin-bottom: 8px; }
    .tier-price { font-size: 32px; font-weight: 900; color: #10b981; margin-bottom: 6px; }
    .tier-desc { font-size: 13.5px; color: #cbd5e1; margin-bottom: 20px; line-height: 1.5; }
    .btn-container { text-align: center; margin: 32px 0 16px 0; }
    .btn { display: inline-block; background-color: #10b981; color: #ffffff !important; text-decoration: none; font-size: 15px; font-weight: 700; padding: 14px 34px; border-radius: 10px; text-align: center; box-shadow: 0 4px 14px rgba(16, 185, 129, 0.35); }
    .footer { background-color: #080c14; padding: 32px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #1e293b; }
    .footer a { color: #10b981; text-decoration: none; }
    .disclaimer { font-size: 11px; color: #475569; margin-top: 16px; line-height: 1.5; }
  </style>
</head>
<body>
  <div style="padding: 24px 12px;">
    <div class="container">
      <!-- Header -->
      <div class="header">
        <div class="logo-badge">TechMission Rio</div>
        <h1 class="title">Empowering Young Coders in Rio's Favelas</h1>
        <p class="subtitle">Hardware • World-Class Curriculum • 1-on-1 Bilingual Mentorship</p>
      </div>

      <!-- Main Content -->
      <div class="content">
        <p style="margin-top: 0;">${donorGreeting}</p>

        <p>
          We are reaching out to you${orgMention} to share the life-changing impact happening right now through <strong>TechMission Rio</strong>.
        </p>

        <p>
          Talent is equally distributed in Rio de Janeiro, but opportunity is not. Talented young minds in the favelas of Santa Cruz, Quintino, and Duque de Caxias are hungry to build software, yet lack the single most essential tool: a dependable laptop and a trusted guide.
        </p>

        ${data.customNote ? `
        <div class="custom-note">
          "${data.customNote}"
        </div>
        ` : ""}

        <!-- Impact Proof Points -->
        <div class="stat-grid">
          <div class="stat-cell">
            <div class="stat-number">40+</div>
            <div class="stat-label">Laptops Deployed</div>
          </div>
          <div class="stat-cell">
            <div class="stat-number">100%</div>
            <div class="stat-label">Tuition-Free</div>
          </div>
          <div class="stat-cell">
            <div class="stat-number">350+</div>
            <div class="stat-label">Mentoring Hours</div>
          </div>
        </div>

        <!-- Student Spotlight -->
        <div class="card">
          <span class="card-tag">Student Story</span>
          <h3 class="card-title">${fellowName} — ${fellowTrack}</h3>
          <p class="card-desc">
            "${fellowStory}"
          </p>
        </div>

        <!-- The Ask / Adopt a Classroom -->
        <div class="tier-box">
          <div class="tier-title">Adopt-a-Classroom Cohort Sponsorship</div>
          <div class="tier-price">$12,000</div>
          <p class="tier-desc">
            Equips a full cohort of <strong>12 students</strong> with refurbished enterprise laptops, 6 months of instructor-led programming, internet subsidies, and native bilingual US mentorship.
          </p>
          <div style="font-size: 13px; color: #94a3b8; margin-bottom: 20px;">
            Individual sponsorships start at <strong>$25/mo</strong> (student internet) or <strong>$500</strong> (full laptop package).
          </div>
          <a href="${donateLink}" class="btn" target="_blank">Sponsor a Student or Classroom &rarr;</a>
        </div>

        <p style="font-size: 14px; color: #94a3b8;">
          Every dollar is tracked transparently on our live public impact dashboard. Donors receive official 501(c)(3) tax receipts and direct progress dispatches from their sponsored students.
        </p>

        <p style="margin-bottom: 0;">
          With gratitude and hope,<br>
          <strong style="color: #ffffff;">The TechMission Rio Team</strong><br>
          <span style="font-size: 13px; color: #64748b;">Rio de Janeiro &bull; Chicago &bull; San Francisco</span>
        </p>
      </div>

      <!-- Footer -->
      <div class="footer">
        <p style="margin: 0 0 10px 0;">
          TechMission Rio &bull; Non-Profit Youth Technology Education
        </p>
        <p style="margin: 0 0 10px 0;">
          <a href="https://techmissionrio.org" target="_blank">Visit Website</a> &bull; 
          <a href="https://techmissionrio.org/impact" target="_blank">Live Impact Map</a> &bull; 
          <a href="https://techmissionrio.org/partner" target="_blank">Partner with Us</a>
        </p>
        <div class="disclaimer">
          You received this email because of your leadership with partner churches, foundations, or community organizations dedicated to education equity.
        </div>
      </div>
    </div>
  </div>
</body>
</html>
`

  const text = `
TECHMISSION RIO — Transforming Lives Through Technology
Hardware • World-Class Curriculum • 1-on-1 Bilingual Mentorship

${donorGreeting}

We are reaching out to you${orgMention} to share the life-changing impact happening right now through TechMission Rio.

Talent is equally distributed in Rio de Janeiro, but opportunity is not. Talented young minds in the favelas of Santa Cruz, Quintino, and Duque de Caxias are hungry to build software, yet lack the single most essential tool: a dependable laptop and a trusted guide.

${data.customNote ? `\nNote: "${data.customNote}"\n` : ""}

OUR IMPACT TO DATE:
- 40+ Laptops Deployed
- 100% Tuition-Free for all youth
- 350+ Hours of 1-on-1 Bilingual Mentorship

STUDENT SPOTLIGHT: ${fellowName} (${fellowTrack})
"${fellowStory}"

HOW YOU CAN PARTNER:
- Adopt-a-Classroom Cohort: $12,000 equips a full cohort of 12 students with laptops, curriculum, and mentorship for 6 months.
- Student Laptop Package: $500 one-time
- Monthly Fellow Support: $25 - $100/mo

Partner with us online:
${donateLink}

Every dollar is tracked transparently on our live impact dashboard. Donors receive official tax receipts and direct progress dispatches from their sponsored students.

With gratitude and hope,
The TechMission Rio Team
https://techmissionrio.org
`

  return { html, text, subject }
}
