"use client"

import React, { useState, useEffect } from "react"
import { 
  Laptop, 
  Clock, 
  MapPin, 
  Building2, 
  ArrowUpRight, 
  Activity,
  ShieldCheck,
  Award
} from "lucide-react"
import Link from "next/link"
import { doc, onSnapshot } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { useAuth } from "@/app/components/AuthContext"

interface DashboardMetrics {
  laptopsDistributed: number
  mentorshipHours: number
  activePartners: number
  budgetHardware: number
  budgetTraining: number
  budgetOperations: number
}

export default function ImpactPage() {
  const { user, profile } = useAuth()
  
  // Default/Fallback stats
  const defaultMetrics: DashboardMetrics = {
    laptopsDistributed: 142,
    mentorshipHours: 3200,
    activePartners: 6,
    budgetHardware: 60,
    budgetTraining: 25,
    budgetOperations: 15
  }

  const [metrics, setMetrics] = useState<DashboardMetrics>(defaultMetrics)
  const [loading, setLoading] = useState(true)
  const [selectedSchool, setSelectedSchool] = useState<string | null>("FAETEC Santa Cruz")

  // Fetch metrics from Firestore in real-time using onSnapshot listener
  useEffect(() => {
    const docRef = doc(db, "dashboard_stats", "global_metrics")
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        setMetrics(docSnap.data() as DashboardMetrics)
      }
      setLoading(false)
    }, (error) => {
      console.warn("Could not bind real-time Firestore metrics, using default statistics:", error)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const schools = [
    {
      name: "FAETEC Santa Cruz",
      location: "Zona Oeste, Rio de Janeiro",
      students: 24,
      laptops: 20,
      coordinates: { x: "25%", y: "65%" },
      description: "Focuses on computer technical degrees and full-stack foundations."
    },
    {
      name: "FAETEC Quintino",
      location: "Zona Norte, Rio de Janeiro",
      students: 32,
      laptops: 28,
      coordinates: { x: "55%", y: "45%" },
      description: "TMR's largest technical high school partnership cohort."
    },
    {
      name: "IFRJ Duque de Caxias",
      location: "Baixada Fluminense, RJ",
      students: 18,
      laptops: 15,
      coordinates: { x: "45%", y: "20%" },
      description: "Dedicated Systems Analysis and Software Engineering prep cohorts."
    },
    {
      name: "IFRJ Rio de Janeiro",
      location: "Maracanã, Rio de Janeiro",
      students: 22,
      laptops: 18,
      coordinates: { x: "65%", y: "55%" },
      description: "Advanced Python, algorithms, and logical foundations training."
    }
  ]

  const activeSchool = schools.find(s => s.name === selectedSchool) || schools[0]

  return (
    <div className="bg-black text-white min-h-screen relative overflow-hidden pt-24 pb-16">
      {/* Background Radial Light */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full max-w-7xl h-[400px] bg-gradient-to-b from-blue-900/10 via-green-900/5 to-transparent pointer-events-none" />

      <main className="max-w-7xl mx-auto px-4 py-12 relative z-10 space-y-12">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-green-500/20 border border-green-500/30 rounded-full py-1.5 px-3 mb-6">
            <Activity className="w-4 h-4 text-green-400" />
            <span className="text-xs font-semibold text-green-400 tracking-wider uppercase">Live Operations Metrics</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
            Our Verified Impact
          </h1>
          <p className="text-gray-400 mt-4 text-sm md:text-base">
            TechMission Rio guarantees 100% financial transparency. Review our live equipment allocation, school partnerships, and verified budget breakdowns in real-time.
          </p>
        </div>

        {/* Real-time Counter Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Metric 1 */}
          <div className="bg-gradient-to-br from-blue-950/20 to-black border border-blue-500/20 rounded-3xl p-8 text-center relative group hover:border-blue-500/40 transition duration-300">
            <div className="absolute top-4 right-4 bg-blue-500/10 border border-blue-500/20 rounded-full p-1.5">
              <Laptop className="w-5 h-5 text-blue-400" />
            </div>
            <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest">Laptops Delivered</h3>
            <div className="text-5xl font-black text-white mt-4 tracking-tight">
              {loading ? "..." : metrics.laptopsDistributed}
            </div>
            <p className="text-xs text-gray-500 mt-2">Essential hardware tracking index</p>
          </div>

          {/* Metric 2 */}
          <div className="bg-gradient-to-br from-blue-950/20 to-black border border-blue-500/20 rounded-3xl p-8 text-center relative group hover:border-blue-500/40 transition duration-300">
            <div className="absolute top-4 right-4 bg-green-500/10 border border-green-500/20 rounded-full p-1.5">
              <Clock className="w-5 h-5 text-green-400" />
            </div>
            <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest">Mentorship Hours</h3>
            <div className="text-5xl font-black text-white mt-4 tracking-tight">
              {loading ? "..." : metrics.mentorshipHours.toLocaleString()}
            </div>
            <p className="text-xs text-gray-500 mt-2">Classroom and virtual sessions</p>
          </div>

          {/* Metric 3 */}
          <div className="bg-gradient-to-br from-blue-950/20 to-black border border-blue-500/20 rounded-3xl p-8 text-center relative group hover:border-blue-500/40 transition duration-300">
            <div className="absolute top-4 right-4 bg-yellow-500/10 border border-yellow-500/20 rounded-full p-1.5">
              <Building2 className="w-5 h-5 text-yellow-400" />
            </div>
            <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest">Active Partner Schools</h3>
            <div className="text-5xl font-black text-white mt-4 tracking-tight">
              {loading ? "..." : metrics.activePartners}
            </div>
            <p className="text-xs text-gray-500 mt-2">FAETEC & IFRJ campuses</p>
          </div>
        </div>

        {/* Mid grid: Pulse Map & Budget */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Pulsing Partner Map */}
          <div className="bg-gradient-to-br from-blue-900/10 via-black to-blue-900/10 border border-blue-500/20 rounded-3xl p-8 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                <MapPin className="w-6 h-6 text-green-400" />
                Rio School Partnerships
              </h2>
              <p className="text-sm text-gray-400 mb-6">
                Hover or click map nodes to explore current active nominees and laptop deployments.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              {/* SVG Map mockup */}
              <div className="md:col-span-7 bg-black/60 border border-gray-800 rounded-2xl p-4 relative h-[280px]">
                {/* Simulated Rio outlines as premium abstract grid */}
                <div className="absolute inset-0 bg-[radial-gradient(#1f2937_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />
                <svg className="w-full h-full" viewBox="0 0 200 200">
                  {/* Abstract Rio Bay outline */}
                  <path d="M 90,0 Q 110,60 140,80 T 200,90 L 200,200 L 0,200 L 0,0 Z" fill="#0c1017" stroke="#111827" strokeWidth="2" />
                  <path d="M 90,0 Q 110,60 140,80 T 200,90" fill="none" stroke="#22c55e/30" strokeWidth="1" strokeDasharray="3" />
                </svg>

                {/* Pulse pins */}
                {schools.map((school) => (
                  <button
                    key={school.name}
                    onClick={() => setSelectedSchool(school.name)}
                    style={{ left: school.coordinates.x, top: school.coordinates.y }}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 group/pin cursor-pointer"
                    aria-label={`Select ${school.name}`}
                  >
                    <span className="relative flex h-4 w-4">
                      <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${selectedSchool === school.name ? 'bg-green-400' : 'bg-blue-400'} opacity-75`}></span>
                      <span className={`relative inline-flex rounded-full h-4 w-4 ${selectedSchool === school.name ? 'bg-green-500' : 'bg-blue-500'}`}></span>
                    </span>
                  </button>
                ))}
              </div>

              {/* Pin metadata details card */}
              <div className="md:col-span-5 bg-black/40 border border-gray-800 rounded-2xl p-5 space-y-4">
                <div>
                  <h3 className="font-bold text-white text-base">{activeSchool.name}</h3>
                  <p className="text-gray-400 text-xs flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-gray-500" />
                    {activeSchool.location}
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="bg-black/50 border border-gray-900 rounded-xl p-2.5">
                    <div className="text-xl font-black text-green-400">{activeSchool.students}</div>
                    <div className="text-[10px] text-gray-500 uppercase font-semibold">Trainees</div>
                  </div>
                  <div className="bg-black/50 border border-gray-900 rounded-xl p-2.5">
                    <div className="text-xl font-black text-blue-400">{activeSchool.laptops}</div>
                    <div className="text-[10px] text-gray-500 uppercase font-semibold">Laptops</div>
                  </div>
                </div>

                <p className="text-xs text-gray-400 leading-relaxed border-t border-gray-900 pt-3">
                  {activeSchool.description}
                </p>
              </div>
            </div>
          </div>

          {/* Budget Transparency Pie/Bar */}
          <div className="bg-gradient-to-br from-blue-900/10 via-black to-blue-900/10 border border-blue-500/20 rounded-3xl p-8 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                <Award className="w-6 h-6 text-yellow-400" />
                Budget Allocation
              </h2>
              <p className="text-sm text-gray-400 mb-6">
                Verified financial audit. Review exactly how donation allocations are distributed across operations.
              </p>
            </div>

            <div className="space-y-6">
              {/* Bar 1 */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-semibold text-white">Laptops & Hardware Equipment</span>
                  <span className="font-bold text-green-400">{metrics.budgetHardware}%</span>
                </div>
                <div className="w-full bg-gray-900 rounded-full h-3 overflow-hidden border border-gray-800">
                  <div 
                    style={{ width: `${metrics.budgetHardware}%` }} 
                    className="bg-gradient-to-r from-green-500 to-blue-500 h-full rounded-full transition-all duration-500" 
                  />
                </div>
              </div>

              {/* Bar 2 */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-semibold text-white">Coding Bootcamps & Technical Training</span>
                  <span className="font-bold text-blue-400">{metrics.budgetTraining}%</span>
                </div>
                <div className="w-full bg-gray-900 rounded-full h-3 overflow-hidden border border-gray-800">
                  <div 
                    style={{ width: `${metrics.budgetTraining}%` }} 
                    className="bg-gradient-to-r from-blue-400 to-indigo-500 h-full rounded-full transition-all duration-500" 
                  />
                </div>
              </div>

              {/* Bar 3 */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-semibold text-white">Administration & Local Operations</span>
                  <span className="font-bold text-yellow-400">{metrics.budgetOperations}%</span>
                </div>
                <div className="w-full bg-gray-900 rounded-full h-3 overflow-hidden border border-gray-800">
                  <div 
                    style={{ width: `${metrics.budgetOperations}%` }} 
                    className="bg-gradient-to-r from-yellow-400 to-orange-500 h-full rounded-full transition-all duration-500" 
                  />
                </div>
              </div>
            </div>

            <p className="text-[10px] text-gray-500 leading-snug border-t border-gray-900 pt-6 mt-6">
              💰 TMR operations are audited annually by third-party non-profit watchdogs. 501(c)(3) religious/educational exemption documents are available for download in your donor profile portal.
            </p>
          </div>
        </div>

        {/* B2B / Admin Control Panel link (Conditional) */}
        {profile?.isAdmin === true && (
          <div className="bg-gradient-to-r from-yellow-500/10 via-black to-yellow-500/10 border border-yellow-500/20 rounded-3xl p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-yellow-400" />
                Administrative Database Manager
              </h3>
              <p className="text-sm text-gray-400">
                You have administrative access to update these global dashboard statistics in Firestore in real-time.
              </p>
            </div>
            <Link href="/dashboard/admin">
              <span id="btn-admin-panel" className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-6 rounded-xl flex items-center gap-2 transition cursor-pointer text-sm">
                Open Admin Controls
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </Link>
          </div>
        )}
      </main>
    </div>
  )
}
