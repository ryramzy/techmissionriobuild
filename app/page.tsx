import { Metadata } from "next"
import { Button } from "components/Button/Button"

export const metadata: Metadata = {
  title: "TechMission Rio - Empowering Youth Through Technology",
  twitter: {
    card: "summary_large_image",
    title: "TechMission Rio",
    description: "Empowering Brazilian youth through technology, education, and faith",
  },
  openGraph: {
    title: "TechMission Rio",
    description: "Empowering Brazilian youth through technology, education, and faith",
    url: "https://techmission.rio/",
    images: [
      {
        width: 1200,
        height: 630,
        url: "/images/og-image.png",
      },
    ],
  },
}

export default function Home() {
  return (
    <>
      <section className="bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="mx-auto grid max-w-7xl px-4 py-16 text-center lg:py-24">
          <div className="mx-auto place-self-center">
            <h1 className="mb-6 max-w-4xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-5xl font-extrabold tracking-tight text-transparent md:text-6xl xl:text-7xl">
              Transformando Vidas Através da Tecnologia
            </h1>
            <p className="mb-8 max-w-2xl text-lg font-light text-gray-600 md:text-xl lg:mb-12 dark:text-gray-300">
              Uma iniciativa cristã dedicada a capacitar jovens brasileiros através da tecnologia,
              conectando educação, carreira e crescimento espiritual.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button href="/get-involved" className="w-full sm:w-auto">
                Envolva-se
              </Button>
              <Button href="/donate" intent="secondary" className="w-full sm:w-auto">
                Faça uma Doação
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 dark:bg-gray-900 lg:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
              Nossa Missão
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              "Não se amoldem ao padrão deste mundo, mas transformem-se pela renovação da sua mente"
              <br />
              <span className="mt-2 block text-sm">— Romanos 12:2</span>
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg bg-gray-50 p-8 dark:bg-gray-800">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">Acesso à Tecnologia</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Estação de acesso gratuito a computadores e internet de alta velocidade para jovens de 10-18 anos.
              </p>
            </div>

            <div className="rounded-lg bg-gray-50 p-8 dark:bg-gray-800">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">Preparação Acadêmica</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Apoio para ENEM, orientação para faculdade, tutoria e mentoria personalizada.
              </p>
            </div>

            <div className="rounded-lg bg-gray-50 p-8 dark:bg-gray-800">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">Crescimento Espiritual</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Workshops sobre identidade, propósito e vocação, integrando fé e tecnologia.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-blue-50 to-white py-16 dark:from-gray-900 dark:to-gray-800 lg:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800">
            <h2 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">
              Como Você Pode Ajudar
            </h2>
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
                  Doações Mensais
                </h3>
                <ul className="space-y-4 text-gray-600 dark:text-gray-300">
                  <li>Aluguel do espaço: R$400/mês</li>
                  <li>Equipe local: R$1.400/mês</li>
                  <li>Materiais didáticos: R$200/mês</li>
                </ul>
              </div>
              <div>
                <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
                  Doações Únicas
                </h3>
                <ul className="space-y-4 text-gray-600 dark:text-gray-300">
                  <li>Equipamentos (laptops, móveis): R$8.000</li>
                  <li>Patrocínio de um estudante</li>
                  <li>Doação de equipamentos usados</li>
                </ul>
              </div>
            </div>
            <div className="mt-8 text-center">
              <Button href="/donate" size="lg">
                Faça Sua Doação
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
