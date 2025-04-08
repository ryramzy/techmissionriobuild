import "styles/tailwind.css"
import { Metadata } from "next"
import { Navigation } from "components/Navigation/Navigation"
import { Footer } from "components/Footer/Footer"
import "./globals.css"

export const metadata: Metadata = {
  title: "TechMission Rio - Empowering Youth Through Technology",
  description: "Transformando vidas através da tecnologia, educação e fé",
  keywords: ["TechMission Rio", "educação", "tecnologia", "jovens", "Rio de Janeiro"],
  authors: [{ name: "TechMission Rio" }],
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className="min-h-screen bg-white font-sans antialiased dark:bg-gray-900">
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  )
}
