# TechMission Rio — Production Release & Launch Checklist

This document details the critical pre-flight operations and verification checks required to release the TechMission Rio platform to the public.

---

## 🌐 1. DNS & Domain Configuration
- [ ] **Domain Mapping**: Ensure `techmissionrio.org` and `www.techmissionrio.org` are mapped to the Vercel project or GCP Cloud Run load balancer.
- [ ] **SSL Certificates**: Verify that the SSL profile resolves correctly without insecure protocol warnings.
- [ ] **Redirects**: Confirm that HTTP traffic automatically redirects to HTTPS, and root apex traffic redirects correctly.

---

## 💳 2. Payments & Compliance (Stripe Live Mode)
- [ ] **Live Credentials**: Replace test mode publishable and secret keys with production Stripe keys:
  - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
  - `STRIPE_API_KEY`
- [ ] **Webhook Subscriptions**: Create a Stripe Webhook endpoint targeting `https://techmissionrio.org/api/stripe/webhooks` listening to:
  - `checkout.session.completed`
  - `invoice.payment_succeeded`
- [ ] **Webhook Signing Secret**: Set `STRIPE_WEBHOOK_SECRET` to match the newly generated live webhook key.
- [ ] **Pending 501(c)(3) Callout**: Confirm the donation screens display pending US tax-exempt statuses.
- [ ] **GDPR & LGPD Consent**: Confirm cookie consent banners function correctly before initializing PostHog.

---

## 🔒 3. Firebase Database & Authentication Hardening
- [ ] **Firebase Rules**: Ensure `firestore.rules` is deployed to production with write restrictions on:
  - `fellows` details (admin only).
  - `stripe_events` logs (server only, client blocked).
  - `mail` queues (client allowed only to write welcome requests, no read access).
- [ ] **Google Play Accreditations**: Verify `.well-known/assetlinks.json` displays the correct Google Play Console SHA-256 fingerprint value.

---

## 📣 4. Search Engine Indexing (SEO)
- [ ] **Sitemap Validation**: Verify that `https://techmissionrio.org/sitemap.xml` returns valid sitemap XML paths.
- [ ] **Robots Checks**: Verify `robots.txt` is accessible and permits crawls to public directories while blocking `/dashboard` and `/api`.
- [ ] **JSON-LD Schema**: Verify that landing pages render structured NGO microdata.
- [ ] **Open Graph Sharing**: Test URL shares on WhatsApp, Facebook, and Twitter to verify dynamic header images load correctly.

---

## 📈 5. Telemetry & Monitoring
- [ ] **Sentry Logs**: Confirm that exceptions successfully map to the Sentry dashboard under the `production` environment tag.
- [ ] **PostHog Analytics**: Verify custom event counts (e.g. donation clicks, watches) are logging on the PostHog platform.
- [ ] **Uptime Checks**: Set up external uptime monitoring (e.g., UptimeRobot, Pingdom) targeting `https://techmissionrio.org/api/health`.

---

## 🛠️ Pre-Flight Verification Sign-Off
Before final routing switches, run verification command passes locally:

```bash
# Verify type consistency and lint checks
npm run build
```
Confirm that no warnings or static compilation errors are returned.
