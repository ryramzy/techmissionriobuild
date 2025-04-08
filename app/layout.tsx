import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navigation } from "../components/Navigation/Navigation"
import { Footer } from "../components/Footer/Footer"

const inter = Inter({ subsets: ["latin"] })

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
    <html lang="en" className="h-full">
      <body className={`${inter.className} flex min-h-full flex-col`}>
        <Navigation />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
