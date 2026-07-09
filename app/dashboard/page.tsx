"use client"

import React, { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { useAuth } from "@/app/components/AuthContext"

export default function DashboardGatePage() {
  const { user, profile, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (loading) return

    if (!user) {
      router.replace("/login?redirect=/dashboard")
      return
    }

    // Role-based redirection logic
    const isAdminUser = 
      profile?.isAdmin === true || 
      user.email === "admin@techmissionrio.org" || 
      user.email === "techmissionrio@gmail.com"

    if (isAdminUser) {
      router.replace("/dashboard/admin")
    } else if (profile?.profileType === "fellow") {
      router.replace("/dashboard/fellow")
    } else {
      // Directs both individuals and organization donors to donor dashboard
      router.replace("/dashboard/donor")
    }
  }, [user, profile, loading, router])

  return (
    <div className="bg-black text-white min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-green-400" />
        <p className="text-gray-400 text-sm">Redirecting to your dashboard portal...</p>
      </div>
    </div>
  )
}
