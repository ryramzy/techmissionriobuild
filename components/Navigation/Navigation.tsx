import Link from "next/link"
import { Button } from "components/Button/Button"

export function Navigation() {
  return (
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-900/80">
      <nav className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold">TechMission Rio</span>
        </Link>

        <div className="hidden space-x-8 md:flex">
          <Link
            href="/about"
            className="text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
          >
            Sobre
          </Link>
          <Link
            href="/programs"
            className="text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
          >
            Programas
          </Link>
          <Link
            href="/get-involved"
            className="text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
          >
            Envolva-se
          </Link>
          <Link
            href="/contact"
            className="text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
          >
            Contato
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <Button href="/donate" intent="primary" size="sm">
            Doar
          </Button>
          <button
            type="button"
            className="rounded-lg p-2.5 text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:text-gray-300 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
          >
            <span className="sr-only">Toggle dark mode</span>
            <svg
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
            </svg>
          </button>
        </div>
      </nav>
    </header>
  )
} 