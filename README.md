# Tech Mission Rio - Empowering Rio's Next Generation of Tech Leaders

A modern, responsive web application built with Next.js 16 to support tech education and career development for young people in Rio de Janeiro's underserved communities.

## 🚀 Mission

Tech Mission Rio provides laptops, coding training, and mentorship to create pathways to tech careers for youth in Rio's underserved communities. Your donations directly fund:

- **Laptops & Equipment** - Essential tools for learning to code
- **Coding Workshops** - Hands-on technical training  
- **Mentorship Programs** - Career guidance from industry professionals
- **Community Projects** - Real-world experience building tech solutions

## 🌟 Features

- **🎨 Modern UI/UX** - Beautiful, responsive design with Tailwind CSS
- **💳 Secure Donations** - Stripe integration for safe payment processing
- **📱 Mobile Optimized** - Works seamlessly on all devices
- **⚡ Lightning Fast** - Built with Next.js 16 and optimized for performance
- **🔒 Enterprise Security** - Secure by default with best practices

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS
- **Payments**: Stripe
- **Deployment**: Vercel
- **Type Safety**: TypeScript
- **Icons**: Lucide React

## 🎯 How It Works

1. **Choose Your Impact** - Select from preset donation amounts or enter a custom amount
2. **One-time or Monthly** - Choose between single donations or recurring support
3. **Secure Processing** - Your donation is processed safely through Stripe
4. **Real Impact** - 100% of funds go directly to supporting our programs

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
# Add your Stripe API keys to .env.local
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) to see the application.

## 📝 Environment Variables

Create a `.env.local` file in the root directory:

```env
# Stripe (Required for donations)
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# PostHog Analytics (Optional)
NEXT_PUBLIC_POSTHOG_KEY=phc_...
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
```

## 🤝 How to Contribute

We welcome contributions! Here's how you can help:

### Code Contributions
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Non-Code Contributions
- **Donate** - Every dollar helps us reach more young people
- **Mentor** - Share your tech expertise with our fellows
- **Spread the Word** - Help us reach more supporters

## 📊 Impact Dashboard

Coming soon! Track your donation's impact and see real results from our programs.

## 🔧 Development Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
npm run test     # Run tests
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Next.js Enterprise Boilerplate](https://github.com/Blazity/next-enterprise)
- Payment processing powered by [Stripe](https://stripe.com)
- Icons by [Lucide](https://lucide.dev)

---

**🌟 Together, we're building Rio's tech future, one young leader at a time.**
