import Link from "next/link"
import { Button } from "components/Button/Button"

export function Navigation() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-800 bg-black/80 backdrop-blur-sm transition-all duration-300">
      <nav className="container mx-auto flex h-16 items-center justify-between px-4" aria-label="Main navigation">
        <Link 
          href="/" 
          className="text-xl font-bold text-white transition-transform hover:scale-105"
        >
          TechMission Rio
        </Link>

        <div className="hidden space-x-8 md:flex">
          <Link 
            href="/about" 
            className="text-gray-300 transition-colors hover:text-white" 
            aria-label="About us"
          >
            About
          </Link>
          <Link 
            href="/programs" 
            className="text-gray-300 transition-colors hover:text-white" 
            aria-label="Our programs"
          >
            Programs
          </Link>
          <Link 
            href="/get-involved" 
            className="text-gray-300 transition-colors hover:text-white" 
            aria-label="Get involved"
          >
            Get Involved
          </Link>
          <Link 
            href="/contact" 
            className="text-gray-300 transition-colors hover:text-white" 
            aria-label="Contact"
          >
            Contact
          </Link>
        </div>

        <Link href="/donate">
          <Button variant="primary" size="sm" className="transition-transform hover:scale-105">
            Donate
          </Button>
        </Link>
      </nav>
    </header>
  )
} 