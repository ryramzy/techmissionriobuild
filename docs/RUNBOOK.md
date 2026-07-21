# TechMission Rio — Runbook & Operational Guide

This document defines step-by-step procedures to resolve core infrastructure failures and maintain service continuity for the TechMission Rio platform.

---

## 💳 1. Stripe Payment Gateway Outage
If Stripe services are down or payments fail:
1. **Verify Outage**: Check [Stripe Status Page](https://status.stripe.com).
2. **Enable Fallback Bank Transfer Alert**:
   - Access Google Cloud Secret Manager (or local `.env.local`).
   - If emergency fallback is needed, update the donation card components to highlight the offline direct bank wire-transfer routes or Mercado Pago fallback options.
3. **Webhook Failures**:
   - If webhook deliveries are failing with `5xx` errors, inspect server logs via GCP Logging.
   - Go to Stripe Dashboard -> Developers -> Webhooks -> Click on Endpoint -> Select Failed Deliveries. Click "Resend" once server health is restored.

---

## 🔥 2. Firebase / Firestore Outage
If Firestore or Firebase Authentication experiences latency or outages:
1. **Verify Outage**: Check [Google Cloud Status Dashboard](https://status.cloud.google.com).
2. **Offline Mode Recovery**:
   - The application client utilizes persistent offline Firestore caching. Ensure that visitors are notified of delayed syncs via the client-side connection banner.
3. **Firestore Rules Rollback**:
   - If a rules release breaks write permissions:
     ```bash
     # Revert firestore.rules to a known-stable version (e.g. git checkout HEAD~1 firestore.rules)
     # Deploy stable rules
     firebase deploy --only firestore:rules
     ```

---

## 🐳 3. Cloud Run Deploy Failure or Rollback
If a container deploy crashes or introduces critical regression:
1. **Immediate Rollback**:
   - Go to GCP Console -> Cloud Run -> Select `techmission-rio-service`.
   - Click on the **Revisions** tab.
   - Select the last known working revision.
   - Click **Manage Traffic** and route 100% of traffic back to the stable revision. Click Save.
2. **Alternative CLI Rollback**:
   ```bash
   gcloud run services update-traffic techmission-rio-service --to-revisions=techmission-rio-service-stable-revision=100
   ```

---

## 🌐 4. DNS / CDN Cache Outage
If domain DNS resolves with errors or routing fails:
1. **Vercel / Cloudflare Rollback**:
   - Access the DNS registrar control panel.
   - Check if nameservers are pointing correctly.
   - If Cloud Run load balancer is failing, verify the dynamic CNAME or A-records mappings.
2. **Purge Cache**:
   - If stale assets are cached, purge the CDN edge cache from the hosting console (Vercel/GCP Load Balancer).
