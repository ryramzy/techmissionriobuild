import Link from "next/link"
import { Button } from "components/Button/Button"

export function Navigation() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-800 bg-black/80 backdrop-blur-sm">
      <nav className="container mx-auto flex h-16 items-center justify-between px-4" aria-label="Main navigation">
        <Link href="/" className="text-xl font-bold text-white">
          TechMission Rio
        </Link>

        <div className="hidden space-x-8 md:flex">
          <Link href="/about" className="text-gray-300 hover:text-white" aria-label="Sobre nós">
            Sobre
          </Link>
          <Link href="/programs" className="text-gray-300 hover:text-white" aria-label="Nossos programas">
            Programas
          </Link>
          <Link href="/get-involved" className="text-gray-300 hover:text-white" aria-label="Envolva-se">
            Envolva-se
          </Link>
          <Link href="/contact" className="text-gray-300 hover:text-white" aria-label="Contato">
            Contato
          </Link>
        </div>

        <Link href="/donate">
          <Button variant="primary" size="sm">
            Doar
          </Button>
        </Link>
      </nav>
    </header>
  )
} 