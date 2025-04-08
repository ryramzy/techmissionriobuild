import { Metadata } from "next"
import Link from "next/link"
import { Button } from "components/Button/Button"

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

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <div className="flex max-w-4xl flex-col items-center gap-4">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            Transformando Vidas Através da Tecnologia
          </h1>
          <p className="text-center text-xl">
            Uma iniciativa cristã dedicada a capacitar jovens brasileiros através da tecnologia e educação.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/get-involved">
              <Button className="w-full sm:w-auto">
                Envolva-se
              </Button>
            </Link>
            <Link href="/donate">
              <Button variant="secondary" className="w-full sm:w-auto">
                Faça uma Doação
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
          <div className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20">
            <h3 className="text-2xl font-bold">Acesso à Tecnologia</h3>
            <div className="text-lg">
              Fornecendo computadores, internet e recursos tecnológicos para jovens em comunidades carentes.
            </div>
          </div>
          <div className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20">
            <h3 className="text-2xl font-bold">Preparação Acadêmica</h3>
            <div className="text-lg">
              Cursos de programação, robótica e desenvolvimento de software para jovens talentosos.
            </div>
          </div>
          <div className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20">
            <h3 className="text-2xl font-bold">Crescimento Espiritual</h3>
            <div className="text-lg">
              Integrando valores cristãos e desenvolvimento de caráter em todos os nossos programas.
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2">
          <p className="text-center text-2xl">
            Como você pode ajudar?
          </p>
          <div className="text-center">
            <Link href="/get-involved">
              <Button size="lg">
                Envolva-se
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
