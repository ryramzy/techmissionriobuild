"use client"

import React, { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Loader2, Award, BookOpen, Calendar, Video, ShieldAlert, LogOut } from "lucide-react"
import { useAuth } from "@/app/components/AuthContext"
import { signOut } from "firebase/auth"
import { auth } from "@/lib/firebase"

export default function FellowDashboardPage() {
  const { user, profile, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading) {
      if (!user || profile?.profileType !== "fellow") {
        router.replace("/login")
      }
    }
  }, [user, profile, loading, router])

  const handleLogout = async () => {
    try {
      await signOut(auth)
      router.replace("/login")
    } catch (err) {
      console.error("Logout failed:", err)
    }
  }

  if (loading || !user || profile?.profileType !== "fellow") {
    return (
      <div className="bg-black text-white min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-green-400" />
      </div>
    )
  }

  return (
    <div className="bg-black text-white min-h-screen relative overflow-hidden pt-24 pb-16">
      {/* Background overlay */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full max-w-7xl h-[400px] bg-gradient-to-b from-blue-900/10 via-transparent to-transparent pointer-events-none" />

      <main className="max-w-4xl mx-auto px-6 relative z-10 space-y-8">
        
        {/* Header */}
        <div className="border-b border-gray-900 pb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-green-500/20 border border-green-500/30 rounded-full py-1.5 px-3 mb-2">
              <Award className="w-4 h-4 text-green-400" />
              <span className="text-xs font-semibold text-green-400 tracking-wider uppercase">Fellow Portal</span>
            </div>
            <h1 className="text-3xl font-black tracking-tight">Welcome, {profile?.name || "Student Fellow"}</h1>
            <p className="text-gray-400 text-sm mt-1">Your coding roadmap, assignments, and virtual mentorship syncs.</p>
          </div>
          <button 
            onClick={handleLogout}
            className="border border-gray-800 hover:bg-white/5 text-gray-400 hover:text-white font-bold py-2.5 px-4 rounded-xl transition text-xs flex items-center gap-1.5 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            Sign Out
          </button>
        </div>

        {/* Informational Message */}
        <div className="bg-gradient-to-r from-blue-950/20 to-black border border-blue-500/20 rounded-3xl p-6 flex items-start gap-4">
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-3 flex-shrink-0 text-blue-400">
            <BookOpen className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="font-bold text-white text-base">Portal Setup Underway</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Your cohort profiles and mentorship pipelines are currently being generated. In Month 3, you will receive full access to upload your 60-second elevator pitch re-recordings, link your GitHub/LinkedIn portfolios, and submit assignments directly to your US mentors.
            </p>
          </div>
        </div>

        {/* Dashboard Stubs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          {/* Milestone checklist */}
          <div className="bg-black border border-gray-900 rounded-3xl p-6 space-y-4">
            <h3 className="font-bold text-sm text-white flex items-center gap-2 border-b border-gray-900 pb-3">
              <Award className="w-4 h-4 text-green-400" />
              Course Progress Milestones
            </h3>
            <div className="space-y-3 text-xs text-gray-400">
              <div className="flex justify-between items-center bg-white/5 p-3 rounded-xl">
                <span>HTML & CSS Layouts</span>
                <span className="text-[10px] font-bold py-0.5 px-2 bg-green-500/10 border border-green-500/25 text-green-400 rounded-full">Completed</span>
              </div>
              <div className="flex justify-between items-center bg-white/5 p-3 rounded-xl">
                <span>JavaScript Basics & Logic</span>
                <span className="text-[10px] font-bold py-0.5 px-2 bg-green-500/10 border border-green-500/25 text-green-400 rounded-full">Completed</span>
              </div>
              <div className="flex justify-between items-center bg-white/5 p-3 rounded-xl">
                <span>React Hooks & Dynamic Forms</span>
                <span className="text-[10px] font-bold py-0.5 px-2 bg-yellow-500/10 border border-yellow-500/25 text-yellow-400 rounded-full">In Progress</span>
              </div>
              <div className="flex justify-between items-center bg-white/5 p-3 rounded-xl opacity-50">
                <span>Next.js API Routing</span>
                <span className="text-[10px] font-bold py-0.5 px-2 bg-gray-500/10 border border-gray-500/20 text-gray-400 rounded-full">Staged</span>
              </div>
            </div>
          </div>

          {/* Mentors / Sync schedule */}
          <div className="bg-black border border-gray-900 rounded-3xl p-6 space-y-4">
            <h3 className="font-bold text-sm text-white flex items-center gap-2 border-b border-gray-900 pb-3">
              <Calendar className="w-4 h-4 text-blue-400" />
              Upcoming Mentorship Syncs
            </h3>
            <div className="space-y-3 text-xs text-gray-400">
              <div className="flex justify-between items-start bg-white/5 p-3 rounded-xl gap-2">
                <div className="space-y-1">
                  <div className="font-bold text-white">Bilingual Code Review Q&A</div>
                  <div className="text-[10px] text-gray-500">Host: BRASA Stanford Chapter</div>
                </div>
                <span className="text-[10px] font-bold text-blue-400 flex items-center gap-1 mt-0.5">
                  <Video className="w-3 h-3" />
                  July 15, 20:00
                </span>
              </div>
              <div className="flex justify-between items-start bg-white/5 p-3 rounded-xl gap-2 opacity-50">
                <div className="space-y-1">
                  <div className="font-bold text-white">Stripe Checkout Webhooks Demo</div>
                  <div className="text-[10px] text-gray-500">Host: TechMission Staff</div>
                </div>
                <span className="text-[10px] font-bold text-gray-500 flex items-center gap-1 mt-0.5">
                  <Video className="w-3 h-3" />
                  July 22, 19:30
                </span>
              </div>
            </div>
          </div>
        </div>

      </main>
    </div>
  )
}
