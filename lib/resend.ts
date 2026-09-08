import { Resend } from "resend"

const resendApiKey = process.env.RESEND_API_KEY
export const resend = resendApiKey ? new Resend(resendApiKey) : null

export const DEFAULT_FROM_EMAIL = 
  process.env.RESEND_FROM_EMAIL || "TechMission Rio <updates@techmissionrio.org>"

export const DEFAULT_REPLY_TO = 
  process.env.RESEND_REPLY_TO || "info@techmissionrio.org"

export interface SendEmailOptions {
  to: string | string[]
  subject: string
  html: string
  text?: string
  from?: string
  replyTo?: string
  tags?: Array<{ name: string; value: string }>
}

export interface SendEmailResult {
  success: boolean
  id?: string
  simulated?: boolean
  error?: string
}

/**
 * Robust email dispatcher using Resend with graceful fallback/simulation mode
 * when RESEND_API_KEY is not yet configured in development/preview environments.
 */
export async function sendEmail({
  to,
  subject,
  html,
  text,
  from = DEFAULT_FROM_EMAIL,
  replyTo = DEFAULT_REPLY_TO,
  tags,
}: SendEmailOptions): Promise<SendEmailResult> {
  const recipients = Array.isArray(to) ? to : [to]

  if (!resend) {
    console.warn(
      `[Resend Simulation] RESEND_API_KEY is not set. Simulating email send to ${recipients.join(", ")} | Subject: "${subject}"`
    )
    return {
      success: true,
      id: `sim_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      simulated: true,
    }
  }

  try {
    const { data, error } = await resend.emails.send({
      from,
      to: recipients,
      replyTo,
      subject,
      html,
      text: text || html.replace(/<[^>]*>?/gm, " ").replace(/\s+/g, " ").trim(),
      tags,
    })

    if (error) {
      console.error("[Resend Error]:", error)
      return {
        success: false,
        error: error.message || "Failed to send email via Resend",
      }
    }

    return {
      success: true,
      id: data?.id,
    }
  } catch (err: any) {
    console.error("[Resend Exception]:", err)
    return {
      success: false,
      error: err.message || "Unexpected error dispatching email via Resend",
    }
  }
}
