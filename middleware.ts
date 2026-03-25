import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

/**
 * Middleware applies security headers to all responses.
 * Runs at the Edge for minimal latency.
 * Rate limiting would require external store (e.g. Upstash); Vercel provides DDoS mitigation.
 */
export function middleware(request: NextRequest) {
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
  if (request.nextUrl.pathname === "/api/health") {
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
