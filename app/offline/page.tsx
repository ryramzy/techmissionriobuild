"use client"

import React, { useState, useEffect } from "react"
import { WifiOff, Home, RefreshCw, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function OfflinePage() {
  const [isOnline, setIsOnline] = useState(typeof window !== "undefined" ? navigator.onLine : true)
  const [syncTime, setSyncTime] = useState<string>("")

  useEffect(() => {
    // Generate a simulated last sync time on mount
    setSyncTime(new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", second: "2-digit" }))

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
      {/* Background radial visual lights */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full max-w-7xl h-[400px] bg-gradient-to-b from-yellow-950/10 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-md w-full bg-gradient-to-br from-blue-950/20 to-black border border-blue-500/20 rounded-3xl p-8 text-center space-y-6 relative z-10 shadow-2xl">
        {/* TMR Brand Branding Logo */}
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="text-xl font-black tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500 uppercase">
            TechMission Rio
          </span>
        </div>

        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto text-yellow-400 animate-pulse">
          <WifiOff className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-black tracking-tight">Connection Interrupted</h1>
          <p className="text-gray-300 text-sm leading-relaxed">
            You are currently offline. But don't worry—the TechMission Rio standalone PWA app is configured to operate offline.
          </p>
        </div>

        <div className="bg-black/50 border border-gray-900 rounded-2xl p-4 text-xs text-gray-300 leading-normal text-left space-y-2">
          <div className="flex justify-between border-b border-gray-900 pb-2 mb-2 font-bold">
            <span>PWA Status:</span>
            <span className="text-yellow-400">Offline Shell Ready</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-green-400 font-bold">&bull;</span>
            <span>Local cached pages and media pitches remain fully accessible.</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-green-400 font-bold">&bull;</span>
            <span>Nominations and hardware requests will auto-sync on reconnect.</span>
          </div>
          {syncTime && (
            <div className="text-[10px] text-gray-400 text-center pt-2">
              Last dynamic session check: <span className="font-semibold text-gray-300">{syncTime}</span>
            </div>
          )}
        </div>

        {isOnline ? (
          <div className="pt-4 space-y-3">
            <div className="text-xs text-green-400 font-bold flex items-center justify-center gap-1.5 animate-bounce">
              <span>●</span> Connection Restored!
            </div>
            <button
              onClick={() => {
                if (typeof window !== "undefined") {
                  if (window.history.length > 1) {
                    window.history.back()
                  } else {
                    window.location.href = "/"
                  }
                }
              }}
              className="w-full bg-green-500 hover:bg-green-600 text-black font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 transition cursor-pointer text-sm font-bold shadow-lg"
            >
              Resume Previous Session
            </button>
          </div>
        ) : (
          <div className="pt-4 space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <Link href="/">
                <span className="border border-gray-800 hover:bg-white/5 text-gray-400 hover:text-white font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition cursor-pointer text-xs">
                  <Home className="w-3.5 h-3.5" />
                  Return Home
                </span>
              </Link>
              <button
                onClick={() => window.location.reload()}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition cursor-pointer text-xs shadow-md"
              >
                <RefreshCw className="w-3.5 h-3.5 animate-spin-slow" />
                Retry Connection
              </button>
            </div>
            
            <button
              type="button"
              onClick={() => {
                if (typeof window !== "undefined" && window.history.length > 1) {
                  window.history.back()
                } else {
                  window.location.href = "/"
                }
              }}
              className="w-full border border-gray-900 hover:bg-white/5 text-gray-400 hover:text-white py-2 px-4 rounded-xl text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Go Back
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
