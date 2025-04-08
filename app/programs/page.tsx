import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Our Programs | TechMission Rio",
  description: "Learn about our technology education and development programs",
}

export default function ProgramsPage() {
  return (
    <main className="container mx-auto px-4 py-16">
      <h1 className="mb-8 text-4xl font-bold">Our Programs</h1>
      
      <div className="grid gap-8 md:grid-cols-2">
        <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold">Full-Stack Bootcamp</h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Intensive 12-week program to become a full-stack developer.
            Learn the most in-demand technologies in the market.
          </p>
          <ul className="mb-6 list-inside list-disc space-y-2 text-gray-600 dark:text-gray-300">
            <li>HTML, CSS, JavaScript</li>
            <li>React and Next.js</li>
            <li>Node.js and Express</li>
            <li>SQL and NoSQL databases</li>
          </ul>
          <button className="rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-700">
            Learn more
          </button>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
          <h2 className="mb-4 text-2xl font-semibold">Tech Mentorship</h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Personalized mentorship program with experienced tech professionals.
            Receive guidance for your career.
          </p>
          <ul className="mb-6 list-inside list-disc space-y-2 text-gray-600 dark:text-gray-300">
            <li>One-on-one mentorship</li>
            <li>Career development</li>
            <li>Networking</li>
            <li>Practical projects</li>
          </ul>
          <button className="rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-700">
            Learn more
          </button>
        </div>
      </div>
    </main>
  )
} 