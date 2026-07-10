# Tech Mission Rio - Empowering Rio's Next Generation of Tech Leaders

Established over three years ago, Tech Mission Rio is a lightweight, responsive web application built with Next.js 16 (App Router) to connect underserved Brazilian youth with tech training, mentorship, and angel opportunities in the United States.

---

## 🚀 Mission

For more than three years, Tech Mission Rio has provided laptops, coding training, and mentorship to create pathways to tech careers for youth in Rio's underserved communities. Your donations directly fund:

- **Laptops & Equipment** - Essential tools for learning to code
- **Coding Workshops** - Hands-on technical training  
- **Mentorship Programs** - Career guidance from industry professionals
- **Community Projects** - Real-world experience building tech solutions

---

## 🌟 Core Features

- **🎨 Modern UI/UX** - Beautiful, responsive dark-themed designs with custom Tailwind CSS styles.
- **💳 Multi-Currency Checkout** - Safe donation processing supporting cards (USD) and local Brazilian PIX (BRL currency) payments via Stripe.
- **🔒 GCP Firebase Auth & Profiles** - Dynamic logins supporting standard credentials and Google Sign-in authentication.
- **🔀 Dynamic Role Dashboard Gateway** - A unified gate at `/dashboard` dynamically routing users to `/dashboard/admin`, `/dashboard/fellow`, or `/dashboard/donor` based on their authenticated Firestore profiles.
- **⛪ B2B Church Hub** - Dedicated dashboard tools featuring prayer request walls, Zoom Q&A exchange schedulers, and trip coordinators.
- **📊 Public Impact Dashboard** - Real-time stats (Laptops distributed, mentorship hours) powered by Cloud Firestore. Includes pulsing maps showing Rio technical school sites (FAETEC, IFRJ) and audit budget breakdown ratios at `/impact`.
- **🎬 Video Pitch Profiles** - Dynamic fellows roster at `/fellows` with 60-second YouTube video pitch embeds and interactive modal playback. Includes verified `"✓ Teacher Endorsed"` trust badges.
- **📱 PWA Optimized** - High-resolution homescreen and Chrome installer icons generated directly from vector SVG parameters representing the header logo.
- **📈 Lazy Analytics** - Non-blocking PostHog event captures tracking page views, clicks, and donation conversions.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16.2.10 (App Router, Turbopack)
- **Styling**: Tailwind CSS
- **Database / Auth**: GCP Firebase & Cloud Firestore
- **Server SDK**: Firebase Admin
- **Payments**: Stripe
- **Analytics**: PostHog (custom event tracking)
- **Asset Processing**: Sharp (SVG to PWA icon compilation)
- **Type Safety**: TypeScript (Strict Mode)

---

## 🚀 Quick Start

1. Clone the repository:
```bash
git clone https://github.com/ryramzy/techmissionriobuild.git
cd techmissionriobuild
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
# Add your Stripe and Firebase configurations to .env.local
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## 📝 Environment Variables

Create a `.env.local` file in the root directory:

```env
# Stripe Payment Configuration
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
NEXT_PUBLIC_URL=http://localhost:3000

# Firebase Client SDK Configuration (Auth & Firestore)
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=techmission-rio.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=techmission-rio
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=techmission-rio.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=1080225659809
NEXT_PUBLIC_FIREBASE_APP_ID=1:1080225659809:web:1234

# Firebase Admin SDK Configuration (Webhook Server-side Writes)
FIREBASE_ADMIN_SERVICE_ACCOUNT_JSON={"type": "service_account", "project_id": "techmission-rio", ...}
ADMIN_UID=your-admin-auth-uid-from-firebase-console

# PostHog Tracking Configuration
NEXT_PUBLIC_POSTHOG_KEY=phc_...
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
```

---

## 🐛 Error Handling & Degradation

This platform is engineered to prevent build-time crashes or server crashes if environment variables are not configured in local or preview deployment instances:
- **Build Fallback**: Firebase client SDK dynamically falls back to mock configurations if credentials are missing during static rendering compile checks.
- **PostHog Safelock**: Analytics capturing delegates to a no-op handler if keys are absent, avoiding runtime console exceptions.
- **Security Check Enforcement**: Server-side admin mutations (e.g. approve/archive) are strictly verified using Firebase ID Token decoding against the private server-only `ADMIN_UID` environment variable.
- **Cross-Device Passwordless Auth Validation**: The onboarding action page handles situations where invitation links are opened on alternate devices (where localStorage is absent) by presenting an interactive email verification input.
- **Graceful DB Fallbacks**: If Cloud Firestore collection schemas/indices are absent, queries gracefully load seed/mock arrays inside client portals rather than throwing application crashes.

---

## 🔧 Development Scripts

```bash
npm run dev             # Start local development server
npm run build           # Compile build artifacts for production
npm run start           # Run production compiled server instance
npm run lint            # Run ESLint quality checks
npm run generate-icons  # Compile vector SVG parameters to high-res PWA png/ico assets
```

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
