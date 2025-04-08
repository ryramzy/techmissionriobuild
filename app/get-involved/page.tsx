import { Metadata } from "next"
import Link from "next/link"
import { Button } from "components/Button/Button"

export const metadata: Metadata = {
  title: "Envolva-se | TechMission Rio",
  description: "Descubra como você pode fazer parte da transformação de vidas através da tecnologia",
}

export default function GetInvolvedPage() {
  return (
    <main className="container mx-auto px-4 py-16">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-8 text-4xl font-bold">Envolva-se</h1>
        
        <div className="space-y-8">
          <div className="rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800">
            <h2 className="mb-4 text-2xl font-semibold">Voluntariado</h2>
            <p className="mb-6 text-gray-600 dark:text-gray-300">
              Seja um mentor, tutor ou instrutor. Compartilhe seu conhecimento e faça a diferença na vida de jovens.
            </p>
            <Link href="/contact">
              <Button variant="secondary">
                Quero Ser Voluntário
              </Button>
            </Link>
          </div>

          <div className="rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800">
            <h2 className="mb-4 text-2xl font-semibold">Parcerias</h2>
            <p className="mb-6 text-gray-600 dark:text-gray-300">
              Empresas e organizações podem apoiar através de:
            </p>
            <ul className="mb-6 list-inside list-disc space-y-2 text-gray-600 dark:text-gray-300">
              <li>Doação de equipamentos</li>
              <li>Patrocínio de programas</li>
              <li>Oportunidades de estágio</li>
              <li>Workshops e palestras</li>
            </ul>
            <Link href="/contact">
              <Button variant="secondary">
                Seja um Parceiro
              </Button>
            </Link>
          </div>

          <div className="rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800">
            <h2 className="mb-4 text-2xl font-semibold">Doações</h2>
            <p className="mb-6 text-gray-600 dark:text-gray-300">
              Sua contribuição ajuda a manter nossos programas e expandir nosso impacto.
            </p>
            <div className="mb-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                <h3 className="mb-2 font-semibold">Doação Mensal</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Apoie mensalmente nossos programas e ajude a sustentar nossa missão.
                </p>
              </div>
              <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                <h3 className="mb-2 font-semibold">Doação Única</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Contribua com um valor único para projetos específicos ou necessidades imediatas.
                </p>
              </div>
            </div>
            <Link href="/donate">
              <Button variant="primary" className="w-full">
                Faça uma Doação
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
} 