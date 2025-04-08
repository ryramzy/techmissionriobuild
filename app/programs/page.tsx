import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Nossos Programas | TechMission Rio",
  description: "Conheça nossos programas de educação e desenvolvimento em tecnologia",
}

export default function ProgramsPage() {
  return (
    <main className="container mx-auto px-4 py-16">
      <h1 className="mb-8 text-4xl font-bold">Nossos Programas</h1>
      
      <div className="grid gap-8 md:grid-cols-2">
        <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold">Bootcamp Full-Stack</h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Programa intensivo de 12 semanas para se tornar um desenvolvedor full-stack.
            Aprenda as tecnologias mais demandadas do mercado.
          </p>
          <ul className="mb-6 list-inside list-disc space-y-2 text-gray-600 dark:text-gray-300">
            <li>HTML, CSS, JavaScript</li>
            <li>React e Next.js</li>
            <li>Node.js e Express</li>
            <li>Banco de dados SQL e NoSQL</li>
          </ul>
          <button className="rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-700">
            Saiba mais
          </button>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold">Mentoria Tech</h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Programa de mentoria personalizada com profissionais experientes da área tech.
            Receba orientação para sua carreira.
          </p>
          <ul className="mb-6 list-inside list-disc space-y-2 text-gray-600 dark:text-gray-300">
            <li>Mentoria individual</li>
            <li>Desenvolvimento de carreira</li>
            <li>Networking</li>
            <li>Projetos práticos</li>
          </ul>
          <button className="rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-700">
            Saiba mais
          </button>
        </div>
      </div>
    </main>
  )
} 