import type { Metadata } from "next"
import { Inter, Syne } from "next/font/google"
import "./globals.css"
import { BottomNav } from "@/components/BottomNav"
import { Navigation } from "@/components/Navigation/Navigation"
import { SplashScreen } from "@/components/SplashScreen"
import { AnalyticsProvider } from "@/components/AnalyticsProvider"

export const viewport = {
  themeColor: '#0B1F3A',
}

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const syne = Syne({ subsets: ["latin"], variable: "--font-syne" })

export const metadata: Metadata = {
  title: "TechMission Rio - Empowering Youth Through Technology",
  description: "Empowering Brazilian youth through technology, education, and faith",
  metadataBase: new URL("https://techmissionrio.org"),
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "TechMission Rio",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    title: "TechMission Rio - Empowering Youth Through Technology",
    description: "Empowering Brazilian youth through technology, education, and faith",
    url: "https://techmissionrio.org",
    siteName: "TechMission Rio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/hero landing.jpg",
        width: 1200,
        height: 630,
        alt: "TechMission Rio - Empowering Youth Through Technology",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TechMission Rio - Empowering Youth Through Technology",
    description: "Empowering Brazilian youth through technology, education, and faith",
    creator: "@techmissionrio",
    images: ["/hero landing.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon.svg", sizes: "any", type: "image/svg+xml" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-256.png", sizes: "256x256", type: "image/png" },
      { url: "/icons/icon-384.png", sizes: "384x384", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-code",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={`h-full ${inter.variable} ${syne.variable}`}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="alternate icon" href="/favicon.png" type="image/png" />
      </head>
      <body className="font-inter flex min-h-full flex-col relative bg-black text-white">
        <AnalyticsProvider>
          <SplashScreen />
          <Navigation />
          <BottomNav />
          <main className="flex-1 pb-16">{children}</main>
        </AnalyticsProvider>
      </body>
    </html>
  )
}
