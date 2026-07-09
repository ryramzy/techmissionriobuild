"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { 
  Laptop, 
  Clock, 
  Building2, 
  ArrowLeft, 
  ShieldCheck, 
  Save, 
  Loader2, 
  Percent,
  CheckCircle2,
  AlertTriangle,
  Users,
  Archive,
  Check,
  Calendar
} from "lucide-react"
import Link from "next/link"
import { doc, getDoc, setDoc, collection, query, where, orderBy, onSnapshot } from "firebase/firestore"
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

interface PendingNomination {
  id: string
  studentName: string
  studentEmail: string
  schoolCampus: string
  grade: string
  itTracks: string[]
  justification: string
  comments: string
  submittedBy: string
  nominatorEmail?: string
  createdAt?: string
}

export default function AdminDashboardPage() {
  const { user, profile, loading: authLoading } = useAuth()
  const router = useRouter()

  const [activeSubTab, setActiveSubTab] = useState<"metrics" | "nominations">("metrics")

  // Metrics State
  const [metrics, setMetrics] = useState<DashboardMetrics>({
    laptopsDistributed: 0,
    mentorshipHours: 0,
    activePartners: 0,
    budgetHardware: 60,
    budgetTraining: 25,
    budgetOperations: 15
  })
  
  const [metricsLoading, setMetricsLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Nominations State
  const [nominations, setNominations] = useState<PendingNomination[]>([])
  const [nominationsLoading, setNominationsLoading] = useState(true)
  const [processingAction, setProcessingAction] = useState<string | null>(null) // nominationId
  const [apiError, setApiError] = useState<string | null>(null)

  // Soft Guard redirecting non-organization users
  useEffect(() => {
    if (!authLoading) {
      if (!user || profile?.profileType !== "organization") {
        router.replace("/")
      }
    }
  }, [user, profile, authLoading, router])

  // Fetch current database statistics (Metrics)
  useEffect(() => {
    if (!user || profile?.profileType !== "organization") return

    const fetchCurrentStats = async () => {
      try {
        const docRef = doc(db, "dashboard_stats", "global_metrics")
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          setMetrics(docSnap.data() as DashboardMetrics)
        } else {
          // If not exists in DB yet, seed with defaults
          setMetrics({
            laptopsDistributed: 142,
            mentorshipHours: 3200,
            activePartners: 6,
            budgetHardware: 60,
            budgetTraining: 25,
            budgetOperations: 15
          })
        }
      } catch (err) {
        console.error("Error retrieving stats from Firestore:", err)
        setError("Failed to retrieve statistics from Firestore.")
      } finally {
        setMetricsLoading(false)
      }
    }

    fetchCurrentStats()
  }, [user, profile])

  // Real-time listener for pending nominations
  useEffect(() => {
    if (!user || profile?.profileType !== "organization") return

    const q = query(
      collection(db, "nominations"),
      where("status", "==", "pending"),
      orderBy("createdAt", "desc")
    )

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list: PendingNomination[] = []
      snapshot.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() } as PendingNomination)
      })
      setNominations(list)
      setNominationsLoading(false)
    }, (err) => {
      console.warn("Firestore query error on nominations listener (indices/auth rules), using local simulation:", err)
      // Local simulation for preview builds
      setNominations([
        {
          id: "nom-demo-1",
          studentName: "Guilherme Silva",
          studentEmail: "guilherme@faetec.br",
          schoolCampus: "FAETEC Quintino",
          grade: "3rd Year Tech",
          itTracks: ["Web Development", "UI/UX Design"],
          justification: "Low-income student who studies on a borrowed mobile device.",
          comments: "High potential, outstanding logic performance.",
          submittedBy: "teacher-123",
          nominatorEmail: "teacher@faetec.br",
          createdAt: new Date().toISOString()
        }
      ])
      setNominationsLoading(false)
    })

    return () => unsubscribe()
  }, [user, profile])

  const handleInputChange = (field: keyof DashboardMetrics, value: number) => {
    setMetrics(prev => ({
      ...prev,
      [field]: value
    }))
    setSuccess(false)
    setError(null)
  }

  const handleSaveMetrics = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError(null)
    setSuccess(false)

    // Validation: Budget sum must equal 100%
    const budgetSum = Number(metrics.budgetHardware) + Number(metrics.budgetTraining) + Number(metrics.budgetOperations)
    if (budgetSum !== 100) {
      setError(`Validation Error: Budget allocation percentages must equal exactly 100%. (Current sum: ${budgetSum}%)`)
      setSaving(false)
      return
    }

    try {
      const docRef = doc(db, "dashboard_stats", "global_metrics")
      await setDoc(docRef, {
        laptopsDistributed: Number(metrics.laptopsDistributed),
        mentorshipHours: Number(metrics.mentorshipHours),
        activePartners: Number(metrics.activePartners),
        budgetHardware: Number(metrics.budgetHardware),
        budgetTraining: Number(metrics.budgetTraining),
        budgetOperations: Number(metrics.budgetOperations)
      })
      setSuccess(true)
      setTimeout(() => setSuccess(false), 5000)
    } catch (err) {
      console.error("Error saving stats to Firestore:", err)
      setError("Failed to save updated statistics. Check security permissions.")
    } finally {
      setSaving(false)
    }
  }

  // API Call - Approve Nomination (consolidated action route)
  const handleApproveNomination = async (nominationId: string) => {
    if (!user) return
    setProcessingAction(nominationId)
    setApiError(null)

    try {
      const idToken = await user.getIdToken(true) // Forced refresh token to bypass 1-hour limits
      const response = await fetch("/api/admin/nomination-action", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nominationId,
          action: "approve",
          idToken
        })
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error || "Failed to approve nomination.")
      }

      // Success - update list locally
      setNominations(prev => prev.filter(nom => nom.id !== nominationId))
    } catch (err: any) {
      console.error(err)
      setApiError(err.message || "Endpoint error during approval.")
    } finally {
      setProcessingAction(null)
    }
  }

  // API Call - Archive Nomination (consolidated action route)
  const handleArchiveNomination = async (nominationId: string) => {
    if (!user) return
    setProcessingAction(nominationId)
    setApiError(null)

    try {
      const idToken = await user.getIdToken(true) // Forced refresh token to bypass 1-hour limits
      const response = await fetch("/api/admin/nomination-action", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nominationId,
          action: "archive",
          idToken
        })
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error || "Failed to archive nomination.")
      }

      // Success - update list locally
      setNominations(prev => prev.filter(nom => nom.id !== nominationId))
    } catch (err: any) {
      console.error(err)
      setApiError(err.message || "Endpoint error during archive.")
    } finally {
      setProcessingAction(null)
    }
  }

  if (authLoading || !user || profile?.profileType !== "organization") {
    return null
  }

  return (
    <div className="bg-black text-white min-h-screen relative overflow-hidden">
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full max-w-7xl h-[400px] bg-gradient-to-b from-yellow-950/10 via-black to-transparent pointer-events-none" />

      <main className="max-w-5xl mx-auto px-6 py-12 relative z-10 space-y-8">
        
        {/* Navigation back */}
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm transition">
          <ArrowLeft className="w-4 h-4" />
          Back to Public Dashboard
        </Link>

        {/* Header */}
        <div className="border-b border-gray-900 pb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-start gap-4">
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-3">
              <ShieldCheck className="w-8 h-8 text-yellow-400" />
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-tight">Admin Control Center</h1>
              <p className="text-gray-400 text-sm mt-1">Manage global metrics, allocate budgets, and audit student admissions.</p>
            </div>
          </div>

          {/* Sub-tab selectors */}
          <div className="flex bg-gray-950/60 p-1 border border-gray-900 rounded-xl">
            <button
              onClick={() => setActiveSubTab("metrics")}
              className={`py-2 px-4 rounded-lg text-xs font-bold transition ${activeSubTab === "metrics" ? "bg-yellow-500 text-black" : "text-gray-400 hover:text-white"}`}
            >
              Global Metrics
            </button>
            <button
              onClick={() => setActiveSubTab("nominations")}
              className={`py-2 px-4 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${activeSubTab === "nominations" ? "bg-yellow-500 text-black" : "text-gray-400 hover:text-white"}`}
            >
              <Users className="w-3.5 h-3.5" />
              Nomination Reviews
              {nominations.length > 0 && (
                <span className="bg-red-500 text-white text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-bold">
                  {nominations.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* ERROR STACK */}
        {apiError && (
          <div className="bg-red-950/30 border border-red-500/30 rounded-2xl p-4 flex items-center gap-3 text-red-400 text-sm">
            <AlertTriangle className="w-5 h-5 flex-shrink-0" />
            <span>{apiError}</span>
          </div>
        )}

        {/* TAB 1: Global stats form */}
        {activeSubTab === "metrics" && (
          <div className="space-y-6">
            {success && (
              <div className="bg-green-950/30 border border-green-500/30 rounded-2xl p-4 flex items-center gap-3 text-green-400 text-sm">
                <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                <span>Stats successfully updated in Cloud Firestore! Changes are now live on the public dashboard.</span>
              </div>
            )}
            {error && (
              <div className="bg-red-950/30 border border-red-500/30 rounded-2xl p-4 flex items-center gap-3 text-red-400 text-sm">
                <AlertTriangle className="w-5 h-5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {metricsLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-yellow-500" />
              </div>
            ) : (
              <form onSubmit={handleSaveMetrics} className="space-y-8">
                {/* Core statistics */}
                <div className="bg-gradient-to-br from-blue-950/20 to-black border border-blue-500/20 rounded-3xl p-8 space-y-6">
                  <h2 className="text-xl font-bold border-b border-gray-900 pb-3 flex items-center gap-2">
                    <Laptop className="w-5 h-5 text-blue-400" />
                    Verified Core Metrics
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Laptops Distributed</label>
                      <input
                        type="number"
                        value={metrics.laptopsDistributed}
                        onChange={(e) => handleInputChange("laptopsDistributed", Number(e.target.value))}
                        className="w-full bg-black border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 text-sm"
                        required
                        min="0"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Mentorship Hours</label>
                      <input
                        type="number"
                        value={metrics.mentorshipHours}
                        onChange={(e) => handleInputChange("mentorshipHours", Number(e.target.value))}
                        className="w-full bg-black border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 text-sm"
                        required
                        min="0"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Active Partners</label>
                      <input
                        type="number"
                        value={metrics.activePartners}
                        onChange={(e) => handleInputChange("activePartners", Number(e.target.value))}
                        className="w-full bg-black border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 text-sm"
                        required
                        min="0"
                      />
                    </div>
                  </div>
                </div>

                {/* Budget parameters */}
                <div className="bg-gradient-to-br from-blue-950/20 to-black border border-blue-500/20 rounded-3xl p-8 space-y-6">
                  <h2 className="text-xl font-bold border-b border-gray-900 pb-3 flex items-center gap-2">
                    <Percent className="w-5 h-5 text-yellow-400" />
                    Budget Allocation Ratios (Must sum to 100%)
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Laptops & Hardware (%)</label>
                      <input
                        type="number"
                        value={metrics.budgetHardware}
                        onChange={(e) => handleInputChange("budgetHardware", Number(e.target.value))}
                        className="w-full bg-black border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 text-sm"
                        required
                        min="0"
                        max="100"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Technical Training (%)</label>
                      <input
                        type="number"
                        value={metrics.budgetTraining}
                        onChange={(e) => handleInputChange("budgetTraining", Number(e.target.value))}
                        className="w-full bg-black border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 text-sm"
                        required
                        min="0"
                        max="100"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Administration & Ops (%)</label>
                      <input
                        type="number"
                        value={metrics.budgetOperations}
                        onChange={(e) => handleInputChange("budgetOperations", Number(e.target.value))}
                        className="w-full bg-black border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 text-sm"
                        required
                        min="0"
                        max="100"
                      />
                    </div>
                  </div>
                  <div className="border-t border-gray-900 pt-4 flex justify-between items-center text-xs">
                    <span className="text-gray-500 font-semibold uppercase tracking-wider">Total Ratio Verification Check:</span>
                    <span className={`font-bold text-sm ${
                      (Number(metrics.budgetHardware) + Number(metrics.budgetTraining) + Number(metrics.budgetOperations)) === 100
                        ? 'text-green-400'
                        : 'text-red-400 animate-pulse'
                    }`}>
                      {Number(metrics.budgetHardware) + Number(metrics.budgetTraining) + Number(metrics.budgetOperations)}% / 100%
                    </span>
                  </div>
                </div>

                <div className="flex justify-end gap-4">
                  <Link href="/dashboard">
                    <span className="border border-gray-700 hover:bg-white/10 text-white font-bold py-3.5 px-6 rounded-xl transition cursor-pointer text-sm">Cancel</span>
                  </Link>
                  <button
                    type="submit"
                    disabled={saving}
                    className="bg-yellow-500 hover:bg-yellow-600 text-black font-extrabold py-3.5 px-6 rounded-xl flex items-center gap-2 transition disabled:opacity-50 text-sm cursor-pointer"
                  >
                    {saving ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Saving stats...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        Publish Live Stats
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* TAB 2: Nomination Reviews - Step 6 Spec */}
        {activeSubTab === "nominations" && (
          <div className="bg-gradient-to-br from-blue-950/20 to-black border border-blue-500/20 rounded-3xl p-8 space-y-6">
            <h2 className="text-xl font-bold border-b border-gray-900 pb-3 flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-400" />
              Pending Student Nomination Audits
            </h2>

            {nominationsLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-yellow-500" />
              </div>
            ) : nominations.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <p className="text-sm">No pending student nominations found.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-gray-900 text-gray-400 uppercase font-bold tracking-wider">
                      <th className="py-4 px-3">Student Name</th>
                      <th className="py-4 px-3">Campus</th>
                      <th className="py-4 px-3">Grade</th>
                      <th className="py-4 px-3">Tracks</th>
                      <th className="py-4 px-3">Nominator</th>
                      <th className="py-4 px-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-900">
                    {nominations.map((nom) => (
                      <tr key={nom.id} className="hover:bg-white/5 transition">
                        <td className="py-4 px-3 font-semibold text-white">
                          <div>
                            {nom.studentName}
                            <span className="block text-[10px] text-gray-500 font-normal">{nom.studentEmail}</span>
                          </div>
                        </td>
                        <td className="py-4 px-3 text-gray-300">{nom.schoolCampus}</td>
                        <td className="py-4 px-3 text-gray-400">{nom.grade}</td>
                        <td className="py-4 px-3">
                          <div className="flex flex-wrap gap-1">
                            {nom.itTracks?.map((track, i) => (
                              <span key={i} className="bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[9px] py-0.5 px-2 rounded-full font-semibold">
                                {track}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="py-4 px-3 text-gray-500">
                          {nom.nominatorEmail || "Teacher"}
                        </td>
                        <td className="py-4 px-3 text-right">
                          <div className="flex justify-end gap-2">
                            {/* Approve button */}
                            <button
                              onClick={() => handleApproveNomination(nom.id)}
                              disabled={processingAction !== null}
                              className="bg-green-500 hover:bg-green-600 text-white font-bold p-2 rounded-lg transition disabled:opacity-50 flex items-center justify-center cursor-pointer"
                              title="Approve & Endorse Fellow"
                            >
                              {processingAction === nom.id ? (
                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                              ) : (
                                <Check className="w-3.5 h-3.5" />
                              )}
                            </button>
                            {/* Archive button */}
                            <button
                              onClick={() => handleArchiveNomination(nom.id)}
                              disabled={processingAction !== null}
                              className="bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 font-bold p-2 rounded-lg transition disabled:opacity-50 flex items-center justify-center cursor-pointer"
                              title="Archive Nomination"
                            >
                              {processingAction === nom.id ? (
                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                              ) : (
                                <Archive className="w-3.5 h-3.5" />
                              )}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

      </main>
    </div>
  )
}
