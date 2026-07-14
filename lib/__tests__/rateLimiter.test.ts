import { checkRateLimit } from "../rateLimiter"

describe("checkRateLimit", () => {
  it("allows requests under the limit", () => {
    for (let i = 0; i < 5; i++) {
      expect(checkRateLimit("1.2.3.4", "/test", 5).allowed).toBe(true)
    }
  })

  it("blocks the request that exceeds the limit", () => {
    const ip = "5.6.7.8"
    for (let i = 0; i < 5; i++) checkRateLimit(ip, "/test2", 5)
    const result = checkRateLimit(ip, "/test2", 5)
    expect(result.allowed).toBe(false)
    expect(result.retryAfter).toBeGreaterThan(0)
  })

  it("allows requests after window resets", async () => {
    // Use a 100ms window for test speed
    checkRateLimit("9.9.9.9", "/test3", 1, 100)
    checkRateLimit("9.9.9.9", "/test3", 1, 100) // hits limit
    await new Promise((r) => setTimeout(r, 110))
    expect(checkRateLimit("9.9.9.9", "/test3", 1, 100).allowed).toBe(true)
  })
})
