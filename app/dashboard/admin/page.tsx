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
  AlertTriangle
} from "lucide-react"
import Link from "next/link"
import { doc, getDoc, setDoc } from "firebase/firestore"
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

export default function AdminDashboardPage() {
  const { user, profile, loading: authLoading } = useAuth()
  const router = useRouter()

  const [metrics, setMetrics] = useState<DashboardMetrics>({
    laptopsDistributed: 0,
    mentorshipHours: 0,
    activePartners: 0,
    budgetHardware: 60,
    budgetTraining: 25,
    budgetOperations: 15
  })
  
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Redirect non-admin or unauthorized users
  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        router.push("/login?redirect=/dashboard/admin")
      } else if (profile?.profileType !== "organization") {
        // Redirection to dashboard if not organization profile type
        router.push("/dashboard")
      }
    }
  }, [user, profile, authLoading, router])

  // Fetch current database statistics
  useEffect(() => {
    const fetchCurrentStats = async () => {
      if (!user) return
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
        setLoading(false)
      }
    }

    if (user && profile?.profileType === "organization") {
      fetchCurrentStats()
    }
  }, [user, profile])

  const handleInputChange = (field: keyof DashboardMetrics, value: number) => {
    setMetrics(prev => ({
      ...prev,
      [field]: value
    }))
    setSuccess(false)
    setError(null)
  }

  const handleSave = async (e: React.FormEvent) => {
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

  if (authLoading || loading) {
    return (
      <div className="bg-black text-white min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-green-400" />
          <p className="text-gray-400 text-sm">Verifying administration session...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-black text-white min-h-screen relative overflow-hidden">
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full max-w-7xl h-[400px] bg-gradient-to-b from-yellow-950/10 via-black to-transparent pointer-events-none" />

      <main className="max-w-4xl mx-auto px-6 py-12 relative z-10 space-y-8">
        {/* Back Link */}
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm transition">
          <ArrowLeft className="w-4 h-4" />
          Back to Public Dashboard
        </Link>

        {/* Header */}
        <div className="border-b border-gray-800 pb-6 flex items-start gap-4">
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-3">
            <ShieldCheck className="w-8 h-8 text-yellow-400" />
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tight">Admin Settings Panel</h1>
            <p className="text-gray-400 text-sm mt-1">
              Update global impact and budget allocation figures stored in Cloud Firestore.
            </p>
          </div>
        </div>

        {/* Notifications */}
        {error && (
          <div className="bg-red-950/30 border border-red-500/30 rounded-2xl p-4 flex items-center gap-3 text-red-400 text-sm">
            <AlertTriangle className="w-5 h-5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="bg-green-950/30 border border-green-500/30 rounded-2xl p-4 flex items-center gap-3 text-green-400 text-sm animate-fade-in">
            <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
            <span>Stats successfully updated in Cloud Firestore! Changes are now live on the public dashboard.</span>
          </div>
        )}

        {/* Editor Form */}
        <form onSubmit={handleSave} className="space-y-8">
          {/* Key Metrics Section */}
          <div className="bg-gradient-to-br from-blue-950/20 to-black border border-blue-500/20 rounded-3xl p-8 space-y-6">
            <h2 className="text-xl font-bold border-b border-gray-900 pb-3 flex items-center gap-2">
              <Laptop className="w-5 h-5 text-blue-400" />
              Verified Core Metrics
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Field 1 */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Laptops Distributed</label>
                <div className="relative">
                  <input
                    type="number"
                    value={metrics.laptopsDistributed}
                    onChange={(e) => handleInputChange("laptopsDistributed", Number(e.target.value))}
                    className="w-full bg-black border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                    required
                    min="0"
                  />
                </div>
              </div>

              {/* Field 2 */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Mentorship Hours</label>
                <div className="relative">
                  <input
                    type="number"
                    value={metrics.mentorshipHours}
                    onChange={(e) => handleInputChange("mentorshipHours", Number(e.target.value))}
                    className="w-full bg-black border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                    required
                    min="0"
                  />
                </div>
              </div>

              {/* Field 3 */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Active Partners</label>
                <div className="relative">
                  <input
                    type="number"
                    value={metrics.activePartners}
                    onChange={(e) => handleInputChange("activePartners", Number(e.target.value))}
                    className="w-full bg-black border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                    required
                    min="0"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Budget Percentages Section */}
          <div className="bg-gradient-to-br from-blue-950/20 to-black border border-blue-500/20 rounded-3xl p-8 space-y-6">
            <h2 className="text-xl font-bold border-b border-gray-900 pb-3 flex items-center gap-2">
              <Percent className="w-5 h-5 text-yellow-400" />
              Budget Allocation Ratios (Must sum to 100%)
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Hardware */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Laptops & Hardware (%)</label>
                <input
                  type="number"
                  value={metrics.budgetHardware}
                  onChange={(e) => handleInputChange("budgetHardware", Number(e.target.value))}
                  className="w-full bg-black border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                  required
                  min="0"
                  max="100"
                />
              </div>

              {/* Training */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Technical Training (%)</label>
                <input
                  type="number"
                  value={metrics.budgetTraining}
                  onChange={(e) => handleInputChange("budgetTraining", Number(e.target.value))}
                  className="w-full bg-black border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                  required
                  min="0"
                  max="100"
                />
              </div>

              {/* Operations */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Administration & Ops (%)</label>
                <input
                  type="number"
                  value={metrics.budgetOperations}
                  onChange={(e) => handleInputChange("budgetOperations", Number(e.target.value))}
                  className="w-full bg-black border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                  required
                  min="0"
                  max="100"
                />
              </div>
            </div>

            {/* Sum check display */}
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

          {/* Action buttons */}
          <div className="flex justify-end gap-4">
            <Link href="/dashboard">
              <span className="border border-gray-700 hover:bg-white/10 text-white font-bold py-3.5 px-6 rounded-xl transition cursor-pointer text-sm">
                Cancel
              </span>
            </Link>
            <button
              type="submit"
              disabled={saving}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-3.5 px-6 rounded-xl flex items-center gap-2 transition disabled:opacity-50 text-sm cursor-pointer"
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saving updates...
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
      </main>
    </div>
  )
}
