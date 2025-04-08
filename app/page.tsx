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
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <div className="flex max-w-4xl flex-col items-center gap-4">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            TechMission Rio
          </h1>
          <p className="text-center text-xl text-white">
            Transforming lives through technology, education, and faith.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/get-involved">
              <Button variant="primary" size="lg">
                Get Involved
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="secondary" size="lg">
                Learn More
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
          <div className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20">
            <h3 className="text-2xl font-bold">Technology Access</h3>
            <div className="text-lg">
              Providing computers, internet, and technological resources to youth in underserved communities.
            </div>
          </div>
          <div className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20">
            <h3 className="text-2xl font-bold">Academic Preparation</h3>
            <div className="text-lg">
              Programming, robotics, and software development courses for talented youth.
            </div>
          </div>
          <div className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20">
            <h3 className="text-2xl font-bold">Spiritual Growth</h3>
            <div className="text-lg">
              Integrating Christian values and character development into all our programs.
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2">
          <p className="text-center text-2xl text-white">
            How can you help?
          </p>
          <div className="text-center">
            <Link href="/get-involved">
              <Button size="lg">
                Get Involved
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
