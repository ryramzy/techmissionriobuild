"use client"

import { Users, Grid, Heart, Home, Info } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function BottomNav() {
  const pathname = usePathname()

  return (
    <div 
      className="md:hidden flex justify-around items-center fixed bottom-0 left-0 right-0 z-50"
      style={{
        backdropFilter: "blur(12px)",
        backgroundColor: "rgba(15, 25, 35, 0.92)",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        height: "calc(64px + env(safe-area-inset-bottom))",
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      <Link href="/" className="flex flex-col items-center justify-center w-full h-full">
        <Home 
          className={`w-6 h-6 mb-1 ${pathname === "/" ? "text-[#5ae0a0] fill-current" : "text-white/40 fill-none"}`}
        />
        <span className={`text-[10px] ${pathname === "/" ? "text-[#5ae0a0]" : "text-white/40"}`}>Home</span>
      </Link>
      
      <Link href="/about" className="flex flex-col items-center justify-center w-full h-full">
        <Info 
          className={`w-6 h-6 mb-1 ${pathname === "/about" ? "text-[#5ae0a0] fill-current" : "text-white/40 fill-none"}`}
        />
        <span className={`text-[10px] ${pathname === "/about" ? "text-[#5ae0a0]" : "text-white/40"}`}>About</span>
      </Link>
      
      <Link href="/fellows" className="flex flex-col items-center justify-center w-full h-full">
        <Users 
          className={`w-6 h-6 mb-1 ${pathname === "/fellows" ? "text-[#5ae0a0] fill-current" : "text-white/40 fill-none"}`}
        />
        <span className={`text-[10px] ${pathname === "/fellows" ? "text-[#5ae0a0]" : "text-white/40"}`}>Fellows</span>
      </Link>

      <Link href="/donate" className="flex flex-col items-center justify-center w-full h-full">
        <Heart 
          className={`w-6 h-6 mb-1 ${pathname === "/donate" ? "text-[#5ae0a0] fill-current" : "text-white/40 fill-none"}`}
        />
        <span className={`text-[10px] ${pathname === "/donate" ? "text-[#5ae0a0]" : "text-white/40"}`}>Donate</span>
      </Link>

      <Link href="/more" className="flex flex-col items-center justify-center w-full h-full">
        <Grid 
          className={`w-6 h-6 mb-1 ${pathname === "/more" ? "text-[#5ae0a0] fill-current" : "text-white/40 fill-none"}`}
        />
        <span className={`text-[10px] ${pathname === "/more" ? "text-[#5ae0a0]" : "text-white/40"}`}>More</span>
      </Link>
    </div>
  )
}
