import Link from "next/link"
import Image from "next/image"

export function Navigation() {
  return (
    <header className="hidden md:block sticky top-0 z-50 w-full border-b border-tmr-green/20 bg-tmr-blue/80 backdrop-blur-tmr">
      <nav className="container mx-auto flex h-16 items-center justify-between px-4" aria-label="Main navigation">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-8 h-8 rounded-lg overflow-hidden bg-tmr-gradient p-1 animate-tmr-pulse-glow">
            <div className="w-full h-full bg-tmr-blue rounded flex items-center justify-center">
              <span className="text-white font-bold text-xs">TMR</span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold text-white font-syne">TechMission</span>
            <span className="text-sm font-bold text-tmr-green font-syne">Rio</span>
          </div>
          <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-tmr-gradient group-hover:w-full transition-all duration-300"></div>
        </Link>

        <div className="hidden space-x-8 md:flex">
          <Link href="/about" className="text-gray-300 hover:text-tmr-green transition-colors relative group" aria-label="About us">
            About
            <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-tmr-gradient group-hover:w-full transition-all duration-300"></div>
          </Link>
          <Link href="/mission" className="text-gray-300 hover:text-tmr-green transition-colors relative group" aria-label="Mission">
            Mission
            <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-tmr-gradient group-hover:w-full transition-all duration-300"></div>
          </Link>
          <Link href="/fellows" className="text-gray-300 hover:text-tmr-green transition-colors relative group" aria-label="Meet our fellows">
            Fellows
            <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-tmr-gradient group-hover:w-full transition-all duration-300"></div>
          </Link>
          <Link href="/dashboard" className="text-gray-300 hover:text-tmr-green transition-colors relative group" aria-label="Verified impact dashboard">
            Dashboard
            <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-tmr-gradient group-hover:w-full transition-all duration-300"></div>
          </Link>
          <Link href="/programs" className="text-gray-300 hover:text-tmr-green transition-colors relative group" aria-label="Our programs">
            Programs
            <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-tmr-gradient group-hover:w-full transition-all duration-300"></div>
          </Link>
          <Link href="/contact" className="text-gray-300 hover:text-tmr-green transition-colors relative group" aria-label="Contact">
            Contact
            <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-tmr-gradient group-hover:w-full transition-all duration-300"></div>
          </Link>
        </div>

        <Link href="/donate">
          <button 
            className="bg-tmr-gradient hover:shadow-lg hover:shadow-tmr-green/25 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300"
          >
            Donate
          </button>
        </Link>
      </nav>
    </header>
  )
}