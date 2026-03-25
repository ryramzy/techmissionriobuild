import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
  server: {
    ANALYZE: z
      .enum(["true", "false"])
      .optional()
      .transform((value) => value === "true"),
    /** PayPal hosted button ID for donate page. Server-only to avoid client exposure. */
    PAYPAL_BUTTON_ID: z.string().optional().default("YOUR_PAYPAL_BUTTON_ID"),
  },
  client: {},
  runtimeEnv: {
    ANALYZE: process.env.ANALYZE,
    PAYPAL_BUTTON_ID: process.env.PAYPAL_BUTTON_ID,
  },
})
