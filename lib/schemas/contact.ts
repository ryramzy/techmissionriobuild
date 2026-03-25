import { z } from "zod"

/**
 * Contact form schema. Shared for client validation and future API route.
 * Bounded lengths prevent oversized payloads and abuse.
 */
export const contactFormSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(200, "Name must be 200 characters or less")
    .trim(),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email address")
    .max(254, "Email must be 254 characters or less")
    .trim()
    .toLowerCase(),
  subject: z.enum(["volunteer", "partnership", "donation", "programs", "other"], {
    required_error: "Please select a subject",
  }),
  message: z
    .string()
    .min(1, "Message is required")
    .max(5000, "Message must be 5000 characters or less")
    .trim(),
})

export type ContactFormData = z.infer<typeof contactFormSchema>
