import "./globals.css"
import { Metadata } from "next"
import { Footer } from "components/Footer/Footer"
import { Navigation } from "components/Navigation/Navigation"

export const metadata: Metadata = {
  title: "TechMission Rio",
  description: "Transforming lives through technology, education, and faith",
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow"
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-black font-sans antialiased">
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
