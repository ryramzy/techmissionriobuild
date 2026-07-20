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
  Award,
  Globe,
  Heart,
  Loader2
} from "lucide-react"
import Link from "next/link"
import { doc, onSnapshot, collection, query, orderBy, limit } from "firebase/firestore"
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

  const [feedItems, setFeedItems] = useState<any[]>([])
  const [feedLoading, setFeedLoading] = useState(true)
  const [nominationsCount, setNominationsCount] = useState(48)
  const [fellowsCount, setFellowsCount] = useState(32)
  const [matchesCount, setMatchesCount] = useState(14)

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

  // Listeners for public feed & live operational counts (KPIs)
  useEffect(() => {
    const feedQuery = query(collection(db, "public_feed"), orderBy("createdAt", "desc"), limit(5))
    const unsubFeed = onSnapshot(feedQuery, (snap) => {
      const items: any[] = []
      snap.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() })
      })
      setFeedItems(items)
      setFeedLoading(false)
    }, (err) => {
      console.warn("Could not bind real-time public feed:", err)
      setFeedLoading(false)
    })

    const unsubNominations = onSnapshot(collection(db, "nominations"), (snap) => {
      if (!snap.empty) setNominationsCount(snap.size)
    })

    const unsubFellows = onSnapshot(collection(db, "fellows"), (snap) => {
      if (!snap.empty) setFellowsCount(snap.size)
    })

    const unsubMatches = onSnapshot(collection(db, "matches"), (snap) => {
      if (!snap.empty) setMatchesCount(snap.size)
    })

    return () => {
      unsubFeed()
      unsubNominations()
      unsubFellows()
      unsubMatches()
    }
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
  const analytics = { trackEngagement: (event: string, data: any) => console.log(event, data) }

  return (
    <div className="bg-black text-white min-h-screen relative overflow-hidden pt-24 pb-16">
      {/* Background Radial Light */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full max-w-7xl h-[400px] bg-gradient-to-b from-blue-900/10 via-green-900/5 to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 py-12 relative z-10 space-y-12">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-green-500/20 border border-green-500/30 rounded-full py-1.5 px-3 mb-6">
            <Activity className="w-4 h-4 text-green-400" />
            <span className="text-xs font-semibold text-green-400 tracking-wider uppercase">Live Operations Metrics</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
            Our Measurable Impact
          </h1>
          <p className="text-gray-300 text-sm md:text-base max-w-xl mx-auto mt-4 leading-relaxed">
            TechMission Rio is committed to 100% financial transparency and verified metrics tracking.
          </p>
        </div>

        {/* Live donor feed ticker */}
        {feedItems.length > 0 && (
          <div className="max-w-3xl mx-auto bg-blue-950/20 border border-blue-500/20 rounded-2xl px-6 py-3.5 flex items-center justify-between gap-4 overflow-hidden animate-pulse">
            <div className="flex items-center gap-2.5 text-xs text-blue-400">
              <Globe className="w-4 h-4 animate-spin text-blue-400" />
              <span className="font-bold uppercase tracking-wider text-[10px]">Live:</span>
              <span className="text-gray-300 font-semibold">{feedItems[0].displayText}</span>
            </div>
            <span className="text-[9px] text-gray-500 font-bold uppercase tracking-wider whitespace-nowrap">Feed Synced</span>
          </div>
        )}

        {/* Top grid stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Metric 1 */}
          <div className="bg-gradient-to-br from-blue-950/20 to-black border border-blue-500/20 rounded-3xl p-8 text-center relative group hover:border-blue-500/40 transition duration-300">
            <div className="absolute top-4 right-4 bg-blue-500/10 border border-blue-500/20 rounded-full p-1.5">
              <Laptop className="w-5 h-5 text-blue-400" />
            </div>
            <h2 className="text-gray-300 text-xs font-bold uppercase tracking-widest">Laptops Delivered</h2>
            <div className="text-5xl font-black text-white mt-4 tracking-tight">
              {loading ? "..." : metrics.laptopsDistributed}
            </div>
            <p className="text-xs text-gray-400 mt-2">Essential hardware tracking index</p>
          </div>

          {/* Metric 2 */}
          <div className="bg-gradient-to-br from-blue-950/20 to-black border border-blue-500/20 rounded-3xl p-8 text-center relative group hover:border-blue-500/40 transition duration-300">
            <div className="absolute top-4 right-4 bg-green-500/10 border border-green-500/20 rounded-full p-1.5">
              <Clock className="w-5 h-5 text-green-400" />
            </div>
            <h2 className="text-gray-300 text-xs font-bold uppercase tracking-widest">Mentorship Hours</h2>
            <div className="text-5xl font-black text-white mt-4 tracking-tight">
              {loading ? "..." : metrics.mentorshipHours.toLocaleString()}
            </div>
            <p className="text-xs text-gray-400 mt-2">Classroom and virtual sessions</p>
          </div>

          {/* Metric 3 */}
          <div className="bg-gradient-to-br from-blue-950/20 to-black border border-blue-500/20 rounded-3xl p-8 text-center relative group hover:border-blue-500/40 transition duration-300">
            <div className="absolute top-4 right-4 bg-yellow-500/10 border border-yellow-500/20 rounded-full p-1.5">
              <Building2 className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-gray-300 text-xs font-bold uppercase tracking-widest">Active Partner Schools</h2>
            <div className="text-5xl font-black text-white mt-4 tracking-tight">
              {loading ? "..." : metrics.activePartners}
            </div>
            <p className="text-xs text-gray-400 mt-2">FAETEC & IFRJ campuses</p>
          </div>
        </div>

        {/* Secondary Grid: Operational KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Nominations */}
          <div className="bg-gradient-to-br from-gray-950 to-black border border-gray-900 rounded-3xl p-6 text-center relative group hover:border-gray-800 transition duration-300">
            <h3 className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">Nominations Sourced</h3>
            <div className="text-4xl font-extrabold text-white mt-2">
              {nominationsCount}
            </div>
            <p className="text-[10px] text-gray-500 mt-1">YTD Technical applications</p>
          </div>

          {/* Fellows */}
          <div className="bg-gradient-to-br from-gray-950 to-black border border-gray-900 rounded-3xl p-6 text-center relative group hover:border-gray-800 transition duration-300">
            <h3 className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">Fellows Approved</h3>
            <div className="text-4xl font-extrabold text-green-400 mt-2">
              {fellowsCount}
            </div>
            <p className="text-[10px] text-gray-500 mt-1">Active student coding fellows</p>
          </div>

          {/* Matches */}
          <div className="bg-gradient-to-br from-gray-950 to-black border border-gray-900 rounded-3xl p-6 text-center relative group hover:border-gray-800 transition duration-300">
            <h3 className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">Matches Made</h3>
            <div className="text-4xl font-extrabold text-blue-400 mt-2">
              {matchesCount}
            </div>
            <p className="text-[10px] text-gray-500 mt-1">Bilingual mentor-student pairings</p>
          </div>
        </div>

        {/* Mid grid: Pulse Map & Budget */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Pulsing Partner Map */}
          <div className="bg-gradient-to-br from-blue-900/10 via-black to-blue-900/10 border border-blue-500/20 rounded-3xl p-8 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold flex items-center gap-2 mb-2">
                <MapPin className="w-6 h-6 text-green-400" />
                Rio School Partnerships
              </h2>
              <p className="text-sm text-gray-300 mb-6">
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
                  <p className="text-gray-300 text-xs flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-gray-400" />
                    {activeSchool.location}
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="bg-black/50 border border-gray-900 rounded-xl p-2.5">
                    <div className="text-xl font-black text-green-400">{activeSchool.students}</div>
                    <div className="text-[10px] text-gray-400 uppercase font-semibold">Trainees</div>
                  </div>
                  <div className="bg-black/50 border border-gray-900 rounded-xl p-2.5">
                    <div className="text-xl font-black text-blue-400">{activeSchool.laptops}</div>
                    <div className="text-[10px] text-gray-400 uppercase font-semibold">Laptops</div>
                  </div>
                </div>

                <p className="text-xs text-gray-300 leading-relaxed border-t border-gray-900 pt-3">
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

            <p className="text-[10px] text-gray-400 leading-snug border-t border-gray-900 pt-6 mt-6">
              💰 TMR operations are audited annually by third-party non-profit watchdogs. 501(c)(3) religious/educational exemption documents are available for download in your donor profile portal.
            </p>
          </div>
        </div>

        {/* Global Donor Map & Feed Section */}
        <div className="bg-gradient-to-br from-blue-900/10 via-black to-blue-900/10 border border-blue-500/20 rounded-3xl p-8 space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Globe className="w-6 h-6 text-blue-400" />
                Global Donor Operations Map
              </h2>
              <p className="text-sm text-gray-300">
                Pulsing geographic overlays tracking live supporter contributions.
              </p>
            </div>
            <div className="flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-xl px-4 py-2">
              <span className="relative flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-blue-500"></span>
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-400">Live Network Feed</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* SVG World Map */}
            <div className="lg:col-span-8 bg-black/60 border border-gray-800 rounded-2xl p-6 relative h-[320px] overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(#1f2937_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />
              {/* Stylized custom world map outlines as premium dots/grid */}
              <svg className="w-full h-full opacity-30" viewBox="0 0 1000 500" fill="none" stroke="currentColor">
                {/* Simple outline representing Americas, Europe, Brazil */}
                {/* North America */}
                <path d="M 150,100 L 250,80 L 400,120 L 350,220 L 200,200 Z M 150,100 L 100,50 Z" stroke="#374151" strokeWidth="2" fill="#0f172a" />
                {/* South America */}
                <path d="M 300,250 L 400,300 L 450,420 L 350,450 L 280,350 Z" stroke="#374151" strokeWidth="2" fill="#0f172a" />
                {/* Europe */}
                <path d="M 450,80 L 600,60 L 650,150 L 500,180 Z" stroke="#374151" strokeWidth="2" fill="#0f172a" />
                {/* Brazil outline accent */}
                <path d="M 320,280 Q 420,330 380,410" fill="none" stroke="#22c55e/40" strokeWidth="2" strokeDasharray="4" />
              </svg>

              {/* Static Pulsing coordinates overlays for donor hubs */}
              <div className="absolute top-[45%] left-[32%] group cursor-pointer">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                </span>
                <span className="absolute left-4 top-1/2 -translate-y-1/2 bg-black border border-gray-800 text-[10px] text-white px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-20">Dallas, US</span>
              </div>

              <div className="absolute top-[35%] left-[42%] group cursor-pointer">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                </span>
                <span className="absolute left-4 top-1/2 -translate-y-1/2 bg-black border border-gray-800 text-[10px] text-white px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-20">New York, US</span>
              </div>

              <div className="absolute top-[52%] left-[38%] group cursor-pointer">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                </span>
                <span className="absolute left-4 top-1/2 -translate-y-1/2 bg-black border border-gray-800 text-[10px] text-white px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-20">Orlando, US</span>
              </div>

              <div className="absolute top-[40%] left-[20%] group cursor-pointer">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                </span>
                <span className="absolute left-4 top-1/2 -translate-y-1/2 bg-black border border-gray-800 text-[10px] text-white px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-20">San Francisco, US</span>
              </div>

              <div className="absolute top-[75%] left-[45%] group cursor-pointer">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                <span className="absolute left-4 top-1/2 -translate-y-1/2 bg-black border border-gray-800 text-[10px] text-white px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-20">Rio de Janeiro, BR (Hub)</span>
              </div>
            </div>

            {/* Live Feed side panel */}
            <div className="lg:col-span-4 bg-black/40 border border-gray-800 rounded-2xl p-5 flex flex-col h-[320px] justify-between">
              <div>
                <h3 className="font-bold text-white text-base mb-3 flex items-center gap-1.5 font-bold uppercase tracking-wider text-xs">
                  <Heart className="w-4 h-4 text-red-500 animate-pulse" />
                  Recent Activity Ticker
                </h3>
                {feedLoading ? (
                  <div className="flex items-center justify-center h-[180px]">
                    <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
                  </div>
                ) : feedItems.length === 0 ? (
                  <div className="text-gray-400 text-xs text-center py-16">
                    Waiting for live transaction items...
                  </div>
                ) : (
                  <div className="space-y-3.5 max-h-[200px] overflow-y-auto pr-1">
                    {feedItems.map((item) => (
                      <div key={item.id} className="p-3 border border-gray-900 bg-black/60 rounded-xl flex items-start gap-2 text-xs transition hover:border-gray-800">
                        <MapPin className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-gray-200 leading-snug">{item.displayText}</p>
                          <span className="text-[10px] text-gray-500 mt-1 block">
                            {item.createdAt ? new Date(item.createdAt.seconds * 1000).toLocaleDateString() : "Just now"}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="text-[10px] text-gray-500 border-t border-gray-900 pt-3">
                Live activities are fully anonymized to protect donor privacy credentials.
              </div>
            </div>
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
              <p className="text-sm text-gray-300">
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
      </div>
    </div>
  )
}
