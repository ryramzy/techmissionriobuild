interface WindowEntry {
  count: number
  resetAt: number
}

const store = new Map<string, WindowEntry>()

export function checkRateLimit(
  ip: string,
  route: string,
  limit: number,
  windowMs = 60_000
): { allowed: boolean; retryAfter?: number } {
  const key = `${ip}:${route}`
  const now = Date.now()
  const entry = store.get(key)

  if (!entry || now > entry.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowMs })
    return { allowed: true }
  }

  if (entry.count >= limit) {
    return {
      allowed: false,
      retryAfter: Math.ceil((entry.resetAt - now) / 1000),
    }
  }

  entry.count++
  return { allowed: true }
}
