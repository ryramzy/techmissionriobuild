# Security & Abuse Resistance

TechMission Rio is a public-facing platform. This document captures security posture and guidance for contributors.

## Current Hardening

- **Security headers** (middleware): X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy
- **Health route** (`/api/health`): Cache-Control for edge caching to reduce DoS impact
- **Static rendering**: Pages use `force-static` where possible to avoid dynamic server load
- **Env safety**: @t3-oss/env-nextjs with server-only vars; no client env leakage
- **Contact form**: Client-side Zod validation with bounded lengths; schema reusable for future API

## Route Abuse Notes

| Route | Risk | Mitigation |
|-------|------|------------|
| `/api/health` | Repeated GETs for DoS | Edge cache 60s; CDN absorbs traffic |
| `/api/contact` (future) | Spam, abuse, DoS | **Must** validate with Zod, apply rate limiting (e.g. Upstash), reject oversized payloads |
| Page routes | Repeated loads | Static rendering; CDN cache |

## Future API Routes Checklist

When adding API routes that accept user input:

1. **Validate** all input with Zod (query, body, headers)
2. **Rate limit** using external store (e.g. Upstash Ratelimit); serverless has no shared state
3. **Bounds** on strings, arrays, objects (e.g. `z.string().max(5000)`)
4. **Avoid** expensive sync work, unbounded loops, large JSON parsing
5. **Do not** leak env vars to response; use server env only
