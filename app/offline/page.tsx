"use client"

import React, { useState, useEffect } from "react"
import { WifiOff, Home, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function OfflinePage() {
  const [isOnline, setIsOnline] = useState(typeof window !== "undefined" ? navigator.onLine : true)

  useEffect(() => {
    if (typeof window === "undefined") return

    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)
    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  return (
    <div className="bg-black text-white min-h-screen relative overflow-hidden flex items-center justify-center p-6">
      {/* Background visual light overlay */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full max-w-7xl h-[400px] bg-gradient-to-b from-yellow-950/10 via-transparent to-transparent pointer-events-none" />

      <main className="max-w-md w-full bg-gradient-to-br from-blue-950/20 to-black border border-blue-500/20 rounded-3xl p-8 text-center space-y-6 relative z-10 shadow-2xl">
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto text-yellow-400 animate-pulse">
          <WifiOff className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-black tracking-tight">Connection Interrupted</h1>
          <p className="text-gray-400 text-sm leading-relaxed">
            You are currently offline. But don't worry—the TechMission Rio standalone app is engineered to operate offline.
          </p>
        </div>

        <div className="bg-black/50 border border-gray-900 rounded-2xl p-4 text-xs text-gray-400 leading-normal text-left space-y-2">
          <div className="flex items-start gap-2">
            <span className="text-green-400 font-bold">&bull;</span>
            <span>Local Caches are fully preserved and responsive.</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-green-400 font-bold">&bull;</span>
            <span>Nomination logs and supply orders will sync automatically on reconnect.</span>
          </div>
        </div>

        {isOnline ? (
          <div className="pt-4 space-y-3">
            <div className="text-xs text-green-400 font-bold flex items-center justify-center gap-1.5 animate-bounce">
              <span>●</span> Connection Restored!
            </div>
            <Link href="/dashboard">
              <span className="bg-green-500 hover:bg-green-600 text-black font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 transition cursor-pointer text-sm font-bold">
                Return to Dashboard Portal
              </span>
            </Link>
          </div>
        ) : (
          <div className="pt-4 grid grid-cols-2 gap-4">
            <Link href="/">
              <span className="border border-gray-800 hover:bg-white/5 text-gray-400 hover:text-white font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition cursor-pointer text-xs">
                <Home className="w-3.5 h-3.5" />
                Home Page
              </span>
            </Link>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition cursor-pointer text-xs"
            >
              Retry Connection
            </button>
          </div>
        )}
      </main>
    </div>
  )
}
