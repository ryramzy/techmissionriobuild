# TechMission Rio — Google Cloud Run Deployment Guide

This guide details how to build, publish, and deploy the containerized TechMission Rio Next.js PWA onto **Google Cloud Run** using Google Cloud Artifact Registry and Secret Manager.

---

## 🏗️ Architecture Architecture
- **Host**: Google Cloud Run (Fully managed serverless container host)
- **Container Repository**: GCP Artifact Registry
- **Secrets Management**: Google Cloud Secret Manager
- **CI/CD**: GitHub Actions pipeline

---

## 🛠️ Step 1: Initialize Google Cloud CLI
Ensure you have the Google Cloud SDK installed locally and authenticated to your project:

```bash
gcloud auth login
gcloud config set project techmission-rio
```

---

## 📦 Step 2: Set Up Artifact Registry Repository
Create a Docker registry repository in your target region (e.g. `us-east1`):

```bash
gcloud artifacts repositories create techmission-repo \
    --repository-format=docker \
    --location=us-east1 \
    --description="TechMission Rio container repository"
```

Configure local docker authentication to access the registry:
```bash
gcloud auth configure-docker us-east1-docker.pkg.dev
```

---

## 🔒 Step 3: Configure Environment Secrets (GCP Secret Manager)
Sensitive configurations must be stored securely in GCP Secret Manager and mounted as environment variables in Cloud Run:

Create secrets for:
1. **Stripe Private Key**: `stripe-api-key`
2. **Stripe Webhook Secret**: `stripe-webhook-secret`
3. **Firebase Admin JSON Cert**: `firebase-admin-json`

To create a secret:
```bash
echo -n "YOUR_SECRET_VALUE" | gcloud secrets create stripe-api-key --data-file=-
```

Bind the Cloud Run service account access permissions to access the secrets:
```bash
# Grant Secret Manager Secret Accessor role to the default Compute service account
gcloud projects add-iam-policy-binding techmission-rio \
    --member="serviceAccount:YOUR_PROJECT_NUMBER-compute@developer.gserviceaccount.com" \
    --role="roles/secretmanager.secretAccessor"
```

---

## 🚀 Step 4: Build and Deploy Locally (via Cloud Build)
To trigger a build and push directly to Artifact Registry:

```bash
gcloud builds submit --tag us-east1-docker.pkg.dev/techmission-rio/techmission-repo/tmr-app:latest .
```

Once pushed, deploy the service onto Cloud Run, mapping the Secret Manager secrets into environment variables:

```bash
gcloud run deploy tmr-service \
    --image=us-east1-docker.pkg.dev/techmission-rio/techmission-repo/tmr-app:latest \
    --region=us-east1 \
    --allow-unauthenticated \
    --port=3000 \
    --set-secrets="STRIPE_API_KEY=stripe-api-key:latest,STRIPE_WEBHOOK_SECRET=stripe-webhook-secret:latest,FIREBASE_ADMIN_SERVICE_ACCOUNT_JSON=firebase-admin-json:latest" \
    --set-env-vars="NODE_ENV=production,NEXT_PUBLIC_FIREBASE_PROJECT_ID=techmission-rio"
```

---

## 🚦 Step 5: Startup & Health Probes Configuration
Google Cloud Run automatically triggers health checks using the `/api/health` path to verify that the container is ready to receive traffic.
- If a container boot crashes or fails to respond within the timeout (default 240 seconds), Cloud Run rolls back the revision to avoid downtime.
- Ensure the probe port is set to `3000` (which matches our exposed Docker port).
