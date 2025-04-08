import { Metadata } from "next"
import { Button } from "components/Button/Button"

export const metadata: Metadata = {
  title: "Junte-se a Nós | TechMission Rio",
  description: "Faça parte da comunidade tech do Rio de Janeiro",
}

export default function JoinPage() {
  return (
    <main className="container mx-auto px-4 py-16">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-8 text-4xl font-bold">Junte-se a Nós</h1>
        
        <div className="rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800">
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
                Nome completo
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="interest" className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
                Área de interesse
              </label>
              <select
                id="interest"
                name="interest"
                className="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-500"
                required
              >
                <option value="">Selecione uma opção</option>
                <option value="bootcamp">Bootcamp Full-Stack</option>
                <option value="mentorship">Programa de Mentoria</option>
                <option value="volunteer">Voluntariado</option>
                <option value="partnership">Parceria Empresarial</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
                Mensagem
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-500"
              ></textarea>
            </div>

            <Button type="submit" size="lg" className="w-full">
              Enviar
            </Button>
          </form>
        </div>
      </div>
    </main>
  )
} 