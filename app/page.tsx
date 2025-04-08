import { Metadata } from "next"
import Link from "next/link"
import { Button } from "../components/Button/Button"

export const metadata: Metadata = {
  title: "TechMission Rio - Empowering Youth Through Technology",
  description: "Empowering Brazilian youth through technology, education, and faith",
  twitter: {
    card: "summary_large_image",
    title: "TechMission Rio - Empowering Youth Through Technology",
    description: "Empowering Brazilian youth through technology, education, and faith",
    creator: "@techmissionrio",
  },
  openGraph: {
    title: "TechMission Rio - Empowering Youth Through Technology",
    description: "Empowering Brazilian youth through technology, education, and faith",
    url: "https://techmissionrio.org",
    siteName: "TechMission Rio",
    locale: "pt_BR",
    type: "website",
  },
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black p-4 text-white">
      <div className="container mx-auto max-w-4xl text-center">
        <h1 className="mb-6 animate-fade-in text-4xl font-bold md:text-6xl">
          Transforming Lives Through Technology
        </h1>
        <p className="mb-8 animate-fade-in text-lg text-gray-300 md:text-xl">
          Join us in our mission to empower communities through technology education and faith-based initiatives.
        </p>
        <div className="flex animate-fade-in-up flex-col gap-4 sm:flex-row sm:justify-center">
          <Link href="/get-involved" className="transition-transform hover:scale-105">
            <Button variant="primary" size="lg">
              Get Involved
            </Button>
          </Link>
          <Link href="/about" className="transition-transform hover:scale-105">
            <Button variant="secondary" size="lg">
              Learn More
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
