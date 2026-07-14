import { NextRequest, NextResponse } from "next/server"
import { checkRateLimit } from "@/lib/rateLimiter"

// CRITICAL: These routes must NEVER be rate limited.
// /api/stripe/webhooks: Stripe retries on 429 → donations lost.
// /api/notifications/send: FCM retries must not be blocked.
const RATE_LIMIT_EXCLUDED = [
  "/api/stripe/webhooks",
  "/api/notifications/send",
]

// Strict limits for high-risk routes (requests per minute)
const STRICT_ROUTES: Record<string, number> = {
  "/api/stripe/checkout": 5,
  "/api/receipts/generate": 5,
  "/api/admin/nomination-action": 10,
}

const DEFAULT_LIMIT = 60

export function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname

  // Apply rate limiting to API routes
  if (path.startsWith("/api/")) {
    // Skip excluded routes — no rate limiting whatsoever
    if (!RATE_LIMIT_EXCLUDED.some(r => path.startsWith(r))) {
      const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim()
        ?? req.headers.get("x-real-ip")
        ?? "unknown"

      const limit = Object.entries(STRICT_ROUTES).find(
        ([route]) => path.startsWith(route)
      )?.[1] ?? DEFAULT_LIMIT

      const result = checkRateLimit(ip, path, limit)

      if (!result.allowed) {
        return NextResponse.json(
          { error: "Too many requests. Please slow down." },
          {
            status: 429,
            headers: {
              "Retry-After": String(result.retryAfter ?? 60),
              "X-RateLimit-Limit": String(limit),
            },
          }
        )
      }
    }
  }

  // Get next response
  const response = NextResponse.next()

  // Security headers - reduce XSS, clickjacking, MIME sniffing
  response.headers.set("X-Frame-Options", "DENY")
  response.headers.set("X-Content-Type-Options", "nosniff")
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin")
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), interest-cohort=()"
  )

  // Cache health checks at edge to reduce DoS impact
  if (path === "/api/health") {
    response.headers.set(
      "Cache-Control",
      "public, s-maxage=60, stale-while-revalidate=120"
    )
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Apply to all routes except static assets.
     * Skip _next/static, _next/image, favicon.ico.
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
}
