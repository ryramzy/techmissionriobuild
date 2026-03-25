"use client"

import * as Dialog from "@radix-ui/react-dialog"
import { Calendar, Grid, Heart, Home, Target, X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

export function BottomNav() {
  const pathname = usePathname()
  const [donateOpen, setDonateOpen] = useState(false)

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
      
      <Link href="/mission" className="flex flex-col items-center justify-center w-full h-full">
        <Target 
          className={`w-6 h-6 mb-1 ${pathname === "/mission" ? "text-[#5ae0a0] fill-current" : "text-white/40 fill-none"}`}
        />
        <span className={`text-[10px] ${pathname === "/mission" ? "text-[#5ae0a0]" : "text-white/40"}`}>Mission</span>
      </Link>
      
      <Link href="/events" className="flex flex-col items-center justify-center w-full h-full">
        <Calendar 
          className={`w-6 h-6 mb-1 ${pathname === "/events" ? "text-[#5ae0a0] fill-current" : "text-white/40 fill-none"}`}
        />
        <span className={`text-[10px] ${pathname === "/events" ? "text-[#5ae0a0]" : "text-white/40"}`}>Events</span>
      </Link>

      <Dialog.Root open={donateOpen} onOpenChange={setDonateOpen}>
        <Dialog.Trigger asChild>
          <button className="flex flex-col items-center justify-center w-full h-full">
            <Heart 
              className={`w-6 h-6 mb-1 ${donateOpen ? "text-[#5ae0a0] fill-current" : "text-white/40 fill-none"}`}
            />
            <span className={`text-[10px] ${donateOpen ? "text-[#5ae0a0]" : "text-white/40"}`}>Donate</span>
          </button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100]" />
          <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#0a1219] border border-white/10 p-6 rounded-xl w-[90vw] max-w-sm shadow-2xl z-[101]">
            <Dialog.Title className="text-xl font-bold text-white mb-2">Donate to TechMission</Dialog.Title>
            <Dialog.Description className="text-white/70 mb-6 text-sm">
              Your support empowers Brazilian youth through technology, education, and faith.
            </Dialog.Description>
            <div className="flex flex-col gap-3">
              <button className="bg-[#5ae0a0] text-[#0e5c38] font-bold py-3 rounded-lg hover:bg-opacity-90 transition-opacity">
                Make a Donation
              </button>
              <Dialog.Close asChild>
                <button className="text-white/60 hover:text-white py-2 text-sm transition-colors">
                  Cancel
                </button>
              </Dialog.Close>
            </div>
            <Dialog.Close asChild>
              <button className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors focus:outline-none">
                <X className="w-5 h-5" />
                <span className="sr-only">Close</span>
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      <Link href="/more" className="flex flex-col items-center justify-center w-full h-full">
        <Grid 
          className={`w-6 h-6 mb-1 ${pathname === "/more" ? "text-[#5ae0a0] fill-current" : "text-white/40 fill-none"}`}
        />
        <span className={`text-[10px] ${pathname === "/more" ? "text-[#5ae0a0]" : "text-white/40"}`}>More</span>
      </Link>
    </div>
  )
}
