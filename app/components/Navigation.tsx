'use client'

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { motion } from "framer-motion"

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-primary via-primary to-accent text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2 group">
          <div className="relative w-10 h-10">
            <Image
              src="/images/logo.png"
              alt="TechMission Rio Logo"
              fill
              className="object-contain group-hover:scale-105 transition"
            />
          </div>
          <span className="text-lg font-bold tracking-wide group-hover:text-highlight transition">TechMission Rio</span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="space-x-6 hidden md:flex">
          <Link href="/about" className="hover:text-highlight transition">About</Link>
          <Link href="/programs" className="hover:text-highlight transition">Programs</Link>
          <Link href="/get-involved" className="hover:text-highlight transition">Get Involved</Link>
          <Link href="/contact" className="hover:text-highlight transition">Contact</Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 hover:bg-white/10 rounded-lg transition"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          <svg 
            className="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            {isMobileMenuOpen ? (
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Navigation */}
      <motion.div 
        className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
      >
        <div className="px-4 pt-2 pb-3 space-y-1 bg-primary/95 backdrop-blur-sm">
          <Link 
            href="/about" 
            className="block px-3 py-2 rounded-md hover:bg-white/10 transition"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            About
          </Link>
          <Link 
            href="/programs" 
            className="block px-3 py-2 rounded-md hover:bg-white/10 transition"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Programs
          </Link>
          <Link 
            href="/get-involved" 
            className="block px-3 py-2 rounded-md hover:bg-white/10 transition"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Get Involved
          </Link>
          <Link 
            href="/contact" 
            className="block px-3 py-2 rounded-md hover:bg-white/10 transition"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Contact
          </Link>
        </div>
      </motion.div>
    </nav>
  )
} 