import { Metadata } from "next"
import { Button } from "components/Button/Button"

export const metadata: Metadata = {
  title: "Sobre Nós | TechMission Rio",
  description: "Conheça nossa história, missão e motivação bíblica para transformar vidas através da tecnologia",
}

export default function AboutPage() {
  return (
    <main className="container mx-auto px-4 py-16">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-8 text-4xl font-bold">Sobre Nós</h1>

        <div className="space-y-12">
          <section className="rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800">
            <h2 className="mb-4 text-2xl font-semibold">Nossa História</h2>
            <p className="mb-4 text-gray-600 dark:text-gray-300">
              TechMission Rio nasceu da visão de unir tecnologia e fé para transformar vidas. 
              Reconhecendo a necessidade de acesso à tecnologia e educação de qualidade para jovens 
              em comunidades carentes do Rio de Janeiro, nos dedicamos a criar um espaço onde 
              educação, carreira e crescimento espiritual caminham juntos.
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              Nossa jornada começou com um pequeno grupo de profissionais cristãos da área de 
              tecnologia, unidos pelo desejo de fazer a diferença na vida de jovens brasileiros.
            </p>
          </section>

          <section className="rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800">
            <h2 className="mb-4 text-2xl font-semibold">Nossa Motivação</h2>
            <blockquote className="mb-6 border-l-4 border-blue-600 pl-4 italic text-gray-600 dark:border-blue-500 dark:text-gray-300">
              "Não se amoldem ao padrão deste mundo, mas transformem-se pela renovação da sua mente, 
              para que sejam capazes de experimentar e comprovar a boa, agradável e perfeita vontade de Deus."
              <br />
              <span className="mt-2 block text-sm">— Romanos 12:2</span>
            </blockquote>
            <p className="text-gray-600 dark:text-gray-300">
              Acreditamos que a tecnologia pode ser uma ferramenta poderosa para transformar mentes 
              e corações. Nosso objetivo é capacitar jovens a desenvolverem suas habilidades técnicas 
              enquanto crescem em sua fé e propósito em Cristo.
            </p>
          </section>

          <section className="rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800">
            <h2 className="mb-4 text-2xl font-semibold">Nossa Equipe</h2>
            <p className="mb-6 text-gray-600 dark:text-gray-300">
              Nossa equipe é composta por profissionais cristãos apaixonados por tecnologia e 
              educação. Cada membro traz sua experiência única e compromisso com a missão de 
              transformar vidas através do conhecimento e da fé.
            </p>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                <h3 className="mb-2 font-semibold">Liderança</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Nossos líderes combinam experiência em tecnologia com um profundo compromisso 
                  com o desenvolvimento espiritual dos jovens.
                </p>
              </div>
              <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                <h3 className="mb-2 font-semibold">Voluntários</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Nossa rede de voluntários inclui profissionais de tecnologia, educadores e 
                  mentores dedicados a compartilhar seu conhecimento e fé.
                </p>
              </div>
            </div>
          </section>

          <div className="text-center">
            <Button href="/get-involved" size="lg">
              Envolva-se
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
} 