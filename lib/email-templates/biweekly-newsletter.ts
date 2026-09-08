export interface BiweeklyNewsletterData {
  issueNumber?: number | string
  issueDate?: string
  issueTitle: string
  foundersNote: string
  classroomHighlights?: string[] | string
  studentSpotlight?: {
    name: string
    track: string
    highlight: string
  }
  prayerAndSupportRequests?: string[] | string
  ctaText?: string
  ctaUrl?: string
  subscriberName?: string
  unsubscribeUrl?: string
}

export function renderBiweeklyNewsletterEmail(data: BiweeklyNewsletterData): {
  html: string
  text: string
  subject: string
} {
  const issueNum = data.issueNumber ? `Issue #${data.issueNumber}` : "Bi-Weekly Dispatch"
  const issueDate = data.issueDate || new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })
  const subject = `[TMR ${issueNum}] ${data.issueTitle}`
  const ctaUrl = data.ctaUrl || "https://techmissionrio.org/donate?utm_source=newsletter&utm_medium=email"
  const ctaText = data.ctaText || "Support the Current Cohort &rarr;"

  const highlightsList = Array.isArray(data.classroomHighlights)
    ? data.classroomHighlights
    : data.classroomHighlights
    ? [data.classroomHighlights]
    : [
        "Cohorts 3 and 4 completed their React fundamentals module and pushed their first live portfolio projects.",
        "8 new student laptops delivered to FAETEC Santa Cruz high school participants.",
        "Conducted 24 live 1-on-1 virtual pairing calls between US software mentors and Rio fellows.",
      ]

  const prayerList = Array.isArray(data.prayerAndSupportRequests)
    ? data.prayerAndSupportRequests
    : data.prayerAndSupportRequests
    ? [data.prayerAndSupportRequests]
    : [
        "Pray for reliable electricity and safety in the Western Zone neighborhoods during heavy winter rains.",
        "Wisdom for our 12 students preparing for their first technical interview evaluations this month.",
        "Ongoing partnership conversations with churches in Chicago and Atlanta considering classroom sponsorships.",
      ]

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
  <style>
    body { margin: 0; padding: 0; background-color: #0b0f19; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #e2e8f0; }
    .container { max-width: 620px; margin: 0 auto; background-color: #0d1322; border: 1px solid #1e293b; border-radius: 16px; overflow: hidden; }
    .header { background: linear-gradient(135deg, #064e3b 0%, #0f172a 100%); padding: 36px 32px; border-bottom: 1px solid rgba(16, 185, 129, 0.2); }
    .meta-bar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; }
    .badge { display: inline-block; background-color: rgba(16, 185, 129, 0.2); border: 1px solid rgba(16, 185, 129, 0.4); color: #34d399; font-size: 11px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; padding: 4px 12px; border-radius: 9999px; }
    .date-tag { font-size: 12px; color: #94a3b8; font-weight: 600; }
    .title { font-size: 24px; font-weight: 800; color: #ffffff; line-height: 1.3; margin: 0; }
    .content { padding: 36px 32px; font-size: 15px; line-height: 1.7; color: #cbd5e1; }
    .section-header { font-size: 13px; font-weight: 800; color: #34d399; text-transform: uppercase; letter-spacing: 1.5px; margin: 32px 0 12px 0; border-bottom: 1px solid #1e293b; padding-bottom: 6px; }
    .founders-note { font-size: 15.5px; color: #e2e8f0; line-height: 1.75; white-space: pre-line; }
    .list-item { margin-bottom: 12px; padding-left: 24px; position: relative; color: #cbd5e1; font-size: 14.5px; }
    .list-item::before { content: "•"; color: #10b981; font-size: 20px; position: absolute; left: 6px; top: -3px; }
    .spotlight-card { background: linear-gradient(180deg, #111827 0%, #0b1120 100%); border: 1px solid rgba(59, 130, 246, 0.3); border-radius: 14px; padding: 22px; margin: 24px 0; }
    .spotlight-tag { display: inline-block; background-color: rgba(59, 130, 246, 0.2); color: #60a5fa; font-size: 10.5px; font-weight: 700; padding: 2px 8px; border-radius: 6px; text-transform: uppercase; margin-bottom: 8px; }
    .spotlight-name { font-size: 16.5px; font-weight: 700; color: #ffffff; margin: 0 0 6px 0; }
    .spotlight-body { font-size: 13.5px; color: #94a3b8; font-style: italic; line-height: 1.6; margin: 0; }
    .cta-card { background: linear-gradient(135deg, rgba(16, 185, 129, 0.12) 0%, rgba(15, 23, 42, 0.9) 100%); border: 1px solid rgba(16, 185, 129, 0.4); border-radius: 14px; padding: 26px; text-align: center; margin: 36px 0 12px 0; }
    .btn { display: inline-block; background-color: #10b981; color: #ffffff !important; text-decoration: none; font-size: 14.5px; font-weight: 700; padding: 13px 30px; border-radius: 10px; text-align: center; box-shadow: 0 4px 14px rgba(16, 185, 129, 0.35); }
    .footer { background-color: #080c14; padding: 30px 24px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #1e293b; }
    .footer a { color: #10b981; text-decoration: none; }
  </style>
</head>
<body>
  <div style="padding: 24px 12px;">
    <div class="container">
      <!-- Header -->
      <div class="header">
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 12px;">
          <tr>
            <td style="text-align: left;">
              <span class="badge">${issueNum}</span>
            </td>
            <td style="text-align: right;">
              <span class="date-tag">${issueDate}</span>
            </td>
          </tr>
        </table>
        <h1 class="title">${data.issueTitle}</h1>
      </div>

      <!-- Content -->
      <div class="content">
        <!-- Founder's Note -->
        <div class="section-header">Field Update & Founder's Note</div>
        <div class="founders-note">${data.foundersNote}</div>

        <!-- Classroom Highlights -->
        <div class="section-header">Classroom Highlights (Last 14 Days)</div>
        <div style="margin: 14px 0;">
          ${highlightsList.map(item => `<div class="list-item">${item}</div>`).join("")}
        </div>

        <!-- Student Spotlight -->
        ${data.studentSpotlight ? `
        <div class="spotlight-card">
          <span class="spotlight-tag">Student of the Fortnight</span>
          <h3 class="spotlight-name">${data.studentSpotlight.name} — ${data.studentSpotlight.track}</h3>
          <p class="spotlight-body">"${data.studentSpotlight.highlight}"</p>
        </div>
        ` : ""}

        <!-- Prayer & Support Requests -->
        <div class="section-header">Prayer & Partnership Requests</div>
        <div style="margin: 14px 0;">
          ${prayerList.map(req => `<div class="list-item">${req}</div>`).join("")}
        </div>

        <!-- Call to Action -->
        <div class="cta-card">
          <div style="font-size: 16px; font-weight: 700; color: #ffffff; margin-bottom: 8px;">
            Walk Alongside Rio's Next Generation of Engineers
          </div>
          <p style="font-size: 13px; color: #94a3b8; margin: 0 0 20px 0;">
            100% of your tax-deductible gift goes directly to student hardware and mentoring support.
          </p>
          <a href="${ctaUrl}" class="btn" target="_blank">${ctaText}</a>
        </div>
      </div>

      <!-- Footer -->
      <div class="footer">
        <p style="margin: 0 0 8px 0;">
          <strong>TechMission Rio</strong> &bull; Bi-Weekly Field Dispatches
        </p>
        <p style="margin: 0 0 12px 0;">
          <a href="https://techmissionrio.org" target="_blank">Home</a> &bull; 
          <a href="https://techmissionrio.org/fellows" target="_blank">Student Fellows</a> &bull; 
          <a href="https://techmissionrio.org/impact" target="_blank">Impact Dashboard</a>
        </p>
        <p style="font-size: 11px; color: #475569; margin: 0;">
          You are receiving this because you subscribed to TechMission Rio updates.<br>
          <a href="${data.unsubscribeUrl || 'https://techmissionrio.org'}" style="color: #64748b;">Unsubscribe or manage preferences</a>
        </p>
      </div>
    </div>
  </div>
</body>
</html>
`

  const text = `
TECHMISSION RIO — ${issueNum} (${issueDate})
${data.issueTitle}
============================================================

FIELD UPDATE:
${data.foundersNote}

CLASSROOM HIGHLIGHTS (LAST 14 DAYS):
${highlightsList.map(item => `* ${item}`).join("\n")}

${data.studentSpotlight ? `
STUDENT OF THE FORTNIGHT:
${data.studentSpotlight.name} (${data.studentSpotlight.track})
"${data.studentSpotlight.highlight}"
` : ""}

PRAYER & PARTNERSHIP REQUESTS:
${prayerList.map(req => `* ${req}`).join("\n")}

HOW YOU CAN HELP:
${ctaText}
${ctaUrl}

============================================================
TechMission Rio | https://techmissionrio.org
`

  return { html, text, subject }
}
