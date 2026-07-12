"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { 
  Heart, 
  CheckCircle2, 
  LogOut, 
  Users, 
  Calendar, 
  Flame, 
  Video, 
  Globe, 
  BookOpen, 
  Download, 
  PlusCircle, 
  Loader2 
} from "lucide-react"
import Link from "next/link"
import { collection, getDocs } from "firebase/firestore"
import { auth, db } from "@/lib/firebase"
import { useAuth } from "@/app/components/AuthContext"
import { signOut } from "firebase/auth"

export default function DonorDashboardPage() {
  const { user, profile, orgProfile, loading: authLoading } = useAuth()
  const router = useRouter()

  // Donation history from Firestore
  const [donations, setDonations] = useState<any[]>([])
  const [loadingDonations, setLoadingDonations] = useState(false)

  // Auth gate checks
  useEffect(() => {
    if (!authLoading) {
      if (!user || (profile?.profileType !== "individual" && profile?.profileType !== "organization")) {
        router.replace("/login")
      }
    }
  }, [user, profile, authLoading, router])

  // Fetch real donations from Firestore when user changes
  useEffect(() => {
    if (user) {
      const fetchDonations = async () => {
        setLoadingDonations(true)
        try {
          const colRef = collection(db, "users", user.uid, "donations")
          const qSnap = await getDocs(colRef)
          const list = qSnap.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }))
          // Sort by date descending
          list.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime())
          setDonations(list)
        } catch (error) {
          console.error("Error loading donations:", error)
        } finally {
          setLoadingDonations(false)
        }
      }
      fetchDonations()
    }
  }, [user])

  // Get a readable list of donations (with fallback if empty)
  const getDonationsList = () => {
    if (donations.length > 0) return donations
    
    // Fallback display if no real donations exist yet
    if (profile?.profileType === "organization") {
      return [
        { id: "tx_mock_1", date: "2026-06-15", amount: 12000, type: "Adopt-a-Classroom Sponsor (Demo)", status: "Processed" },
        { id: "tx_mock_2", date: "2026-05-15", amount: 1000, type: "Monthly Cohort Sponsor (Demo)", status: "Processed" },
        { id: "tx_mock_3", date: "2026-04-10", amount: 2500, type: "Equipment Drive (10 Laptops - Demo)", status: "Processed" },
      ]
    } else {
      return [
        { id: "tx_mock_1", date: "2026-06-20", amount: 100, type: "Monthly Support (Demo)", status: "Processed" },
        { id: "tx_mock_2", date: "2026-05-20", amount: 100, type: "Monthly Support (Demo)", status: "Processed" },
        { id: "tx_mock_3", date: "2026-04-12", amount: 50, type: "One-Time Donation (Demo)", status: "Processed" },
      ]
    }
  }

  const handleLogout = async () => {
    try {
      await signOut(auth)
      router.replace("/login")
    } catch (error) {
      console.error("Sign-out error:", error)
    }
  }

  if (authLoading || !user || (profile?.profileType !== "individual" && profile?.profileType !== "organization")) {
    return (
      <div className="bg-black text-white min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-green-400" />
      </div>
    )
  }

  return (
    <div className="bg-black text-white min-h-screen relative overflow-hidden pt-24 pb-16">
      {/* Background gradients */}
      <div className="absolute top-0 left-0 w-full h-[300px] bg-gradient-to-b from-blue-900/10 via-green-900/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 py-12 relative z-10 space-y-8">
        
        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-gradient-to-r from-blue-900/20 via-black to-green-900/20 border border-blue-500/20 rounded-3xl p-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-green-500/20 border border-green-500/30 rounded-full py-1.5 px-3.5 mb-3">
              <CheckCircle2 className="w-4 h-4 text-green-400" />
              <span className="text-xs font-semibold text-green-400 tracking-wider uppercase">
                {profile?.profileType === "organization" ? "US Organization Partner" : "Individual Fellow Partner"}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white">
              Welcome, {profile?.name || user.email?.split("@")[0].toUpperCase()}!
            </h1>
            <p className="text-gray-400 mt-1">
              Managing support from {user.email}
            </p>
          </div>
          <button 
            onClick={handleLogout}
            className="bg-red-500/15 hover:bg-red-500/30 text-red-400 border border-red-500/30 px-5 py-2.5 rounded-xl flex items-center gap-2 transition cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>

        {/* Impact Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-950/20 to-black border border-blue-500/20 rounded-2xl p-6 text-center">
            <Heart className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <h3 className="text-gray-400 text-sm font-semibold uppercase tracking-wider">Total Contribution</h3>
            <div className="text-3xl font-black text-white mt-1">
              ${getDonationsList().reduce((sum, item) => sum + item.amount, 0).toLocaleString()}
            </div>
            <p className="text-xs text-green-400 mt-1">Tax-deductible (501c3 status)</p>
          </div>

          <div className="bg-gradient-to-br from-blue-950/20 to-black border border-blue-500/20 rounded-2xl p-6 text-center">
            <Users className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <h3 className="text-gray-400 text-sm font-semibold uppercase tracking-wider">Sponsored Fellows</h3>
            <div className="text-3xl font-black text-white mt-1">
              {profile?.profileType === "organization" ? "12 Trainees (Cohort)" : "2 Fellows"}
            </div>
            <p className="text-xs text-blue-400 mt-1">Directly learning development</p>
          </div>

          <div className="bg-gradient-to-br from-blue-950/20 to-black border border-blue-500/20 rounded-2xl p-6 text-center">
            <Calendar className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
            <h3 className="text-gray-400 text-sm font-semibold uppercase tracking-wider">Active Sponsorships</h3>
            <div className="text-3xl font-black text-white mt-1">
              Active
            </div>
            <p className="text-xs text-yellow-400 mt-1">Direct community integration</p>
          </div>
        </div>

        {/* B2B / US Christian Church Features (Conditional) */}
        {profile?.profileType === "organization" && (
          <div className="bg-gradient-to-br from-blue-900/30 to-black border border-blue-500/20 rounded-3xl p-8 space-y-6">
            <div className="flex items-center gap-3">
              <Flame className="w-7 h-7 text-green-400" />
              <h2 className="text-2xl font-bold">⛪ US Christian Church Partnership Hub</h2>
            </div>
            
            <p className="text-gray-300">
              Welcome {orgProfile?.name ? `${orgProfile.name} (${orgProfile.denomination})` : "Partner Church"}! As an international organizational sponsor, you have access to exclusive collaboration systems:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Feature 1: Prayer Alignment */}
              <div className="bg-black/40 border border-gray-700/60 rounded-2xl p-6 hover:border-green-500/50 transition">
                <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                  <Heart className="w-5 h-5 text-red-400" />
                  Prayer & Encouragement Board
                </h3>
                <p className="text-sm text-gray-400 mb-4">
                  Share monthly prayer requests or scriptures from your congregation. These are translated and displayed to your sponsored students in Rio.
                </p>
                <textarea 
                  placeholder="Enter a message of prayer or encouragement..." 
                  className="w-full h-24 bg-black/60 border border-gray-600 rounded-lg p-3 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-green-500 mb-3"
                  aria-label="Enter a message of prayer or encouragement"
                />
                <button 
                  onClick={() => alert("Prayer message submitted to the Rio team! They will translate and deliver it to your cohort.")}
                  className="bg-green-500 hover:bg-green-600 text-white font-bold text-xs py-2 px-4 rounded-lg transition cursor-pointer"
                >
                  Submit Message
                </button>
              </div>

              {/* Feature 2: Zoom Video Call Scheduler */}
              <div className="bg-black/40 border border-gray-700/60 rounded-2xl p-6 hover:border-green-500/50 transition">
                <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                  <Video className="w-5 h-5 text-blue-400" />
                  Live Youth Group Exchange
                </h3>
                <p className="text-sm text-gray-400 mb-4">
                  Schedule a live Q&A session with your sponsored student cohort in Rio and your US youth group or missions committee.
                </p>
                <div className="space-y-2 mb-4">
                  <input 
                    type="date" 
                    className="w-full bg-black/60 border border-gray-600 rounded-lg p-2.5 text-xs text-white" 
                    aria-label="Select date for Youth Group Exchange"
                  />
                  <select 
                    className="w-full bg-black/60 border border-gray-600 rounded-lg p-2.5 text-xs text-white"
                    aria-label="Select time slot for Youth Group Exchange"
                  >
                    <option>Sunday Afternoon (Best for churches)</option>
                    <option>Wednesday Evening (Best for Youth Group)</option>
                    <option>Saturday Morning</option>
                  </select>
                </div>
                <button 
                  onClick={() => alert("Zoom request sent. The Rio coordinator will contact you with links and translation support details.")}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold text-xs py-2 px-4 rounded-lg transition cursor-pointer"
                >
                  Request Live Exchange
                </button>
              </div>

              {/* Feature 3: Rio Mission Trip Alignment */}
              <div className="bg-black/40 border border-gray-700/60 rounded-2xl p-6 hover:border-green-500/50 transition">
                <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-yellow-400" />
                  Rio Mission Trip Collaboration
                </h3>
                <p className="text-sm text-gray-400 mb-4">
                  Is your church planning a mission trip? Register your dates here. TMR coordinates local service projects, computer lab visits, and joint tech camps with local churches in Rio.
                </p>
                <button 
                  onClick={() => alert("Missions department notified! We will send you our complete Church Trip guide and Rio logistics toolkit.")}
                  className="border border-yellow-500 text-yellow-400 hover:bg-yellow-500 hover:text-black font-bold text-xs py-2.5 px-4 rounded-lg transition cursor-pointer"
                >
                  Connect with Missions Director
                </button>
              </div>

              {/* Feature 4: Cohort Learning Milestones */}
              <div className="bg-black/40 border border-gray-700/60 rounded-2xl p-6 hover:border-green-500/50 transition">
                <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-purple-400" />
                  Cohort Progress Reports
                </h3>
                <p className="text-sm text-gray-400 mb-4">
                  View recent progress notes, coding achievements, and local testimonies of the 12 youth technical trainees sponsored by your church.
                </p>
                <div className="bg-black/80 rounded-xl p-3 text-xs border border-gray-800 space-y-2">
                  <div>📖 **Milestone 1**: 100% finished HTML/CSS Basics.</div>
                  <div>💻 **Milestone 2**: Currently building first static site projects.</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Donation History Table */}
        <div className="bg-gradient-to-br from-blue-900/10 via-black to-blue-900/10 border border-blue-500/20 rounded-3xl p-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-2">
            <div>
              <h2 className="text-2xl font-bold">📊 Contribution History & Tax Receipts</h2>
              <p className="text-gray-400 text-sm mt-1">Download official receipts for B2B financial accounting and 501(c)(3) deductions.</p>
            </div>
            <Link href="/donate">
              <span className="bg-green-500 hover:bg-green-600 text-white font-bold py-2.5 px-5 rounded-xl flex items-center gap-2 transition text-sm cursor-pointer">
                <PlusCircle className="w-4 h-4" />
                New Contribution
              </span>
            </Link>
          </div>

          {loadingDonations ? (
            <div className="py-6 text-center text-gray-500">Loading donation list...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-800 text-gray-400 text-sm font-semibold">
                    <th className="py-4 px-3">Transaction ID</th>
                    <th className="py-4 px-3">Date</th>
                    <th className="py-4 px-3">Type</th>
                    <th className="py-4 px-3">Amount</th>
                    <th className="py-4 px-3">Status</th>
                    <th className="py-4 px-3 text-center">Receipt</th>
                  </tr>
                </thead>
                <tbody>
                  {getDonationsList().map((item) => (
                    <tr key={item.id} className="border-b border-gray-900 hover:bg-white/5 transition text-sm">
                      <td className="py-4 px-3 text-gray-500">{item.id}</td>
                      <td className="py-4 px-3">{item.date}</td>
                      <td className="py-4 px-3">{item.type}</td>
                      <td className="py-4 px-3 font-semibold text-green-400">${item.amount.toLocaleString()}</td>
                      <td className="py-4 px-3">
                        <span className="bg-green-500/20 border border-green-500/30 text-green-400 text-xs py-1 px-2.5 rounded-full font-bold">
                          {item.status}
                        </span>
                      </td>
                      <td className="py-4 px-3 text-center">
                        <button 
                          onClick={() => alert(`Downloading PDF tax statement for transaction ${item.id}...`)}
                          className="text-blue-400 hover:text-blue-300 inline-flex items-center gap-1 transition cursor-pointer"
                        >
                          <Download className="w-4 h-4" />
                          PDF
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
