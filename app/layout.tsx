import type { Metadata } from "next"
import { Inter, Syne } from "next/font/google"
import "./globals.css"
import { BottomNav } from "@/components/BottomNav"
import { Navigation } from "@/components/Navigation/Navigation"
import { SplashScreen } from "@/components/SplashScreen"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const syne = Syne({ subsets: ["latin"], variable: "--font-syne" })

export const metadata: Metadata = {
  title: "TechMission Rio - Empowering Youth Through Technology",
  description: "Empowering Brazilian youth through technology, education, and faith",
  metadataBase: new URL("https://techmissionrio.org"),
  openGraph: {
    title: "TechMission Rio - Empowering Youth Through Technology",
    description: "Empowering Brazilian youth through technology, education, and faith",
    url: "https://techmissionrio.org",
    siteName: "TechMission Rio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TechMission Rio - Empowering Youth Through Technology",
    description: "Empowering Brazilian youth through technology, education, and faith",
    creator: "@techmissionrio",
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
      <body className="font-inter flex min-h-full flex-col relative bg-off-white text-forest-green">
        <SplashScreen />
        <Navigation />
        <BottomNav />
        <main className="flex-1 pb-16">{children}</main>
      </body>
    </html>
  )
}
