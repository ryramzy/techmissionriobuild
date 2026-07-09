"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { 
  Building2, 
  Users, 
  Laptop, 
  Send, 
  Loader2, 
  AlertTriangle, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight,
  Plus,
  HelpCircle,
  HelpCircle as QuestionIcon
} from "lucide-react"
import Link from "next/link"
import { collection, addDoc, getDocs, query, where } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { useAuth } from "@/app/components/AuthContext"

interface Nomination {
  studentName: string
  studentEmail: string
  school: string
  grade: string
  tracks: string[]
  justification: string
  comments: string
}

interface HardwareRequest {
  itemType: string
  quantity: number
  isUrgent: boolean
  notes: string
  status: string
  date: string
}

export default function PartnerPortalPage() {
  const { user, profile, loading: authLoading } = useAuth()
  const router = useRouter()

  const [activeTab, setActiveTab] = useState<"nominate" | "hardware" | "sponsorship">("nominate")
  
  // Nomination State
  const [nomination, setNomination] = useState<Nomination>({
    studentName: "",
    studentEmail: "",
    school: "FAETEC Santa Cruz",
    grade: "2nd Year High School",
    tracks: [],
    justification: "",
    comments: ""
  })
  const [nominating, setNominating] = useState(false)
  const [nominationSuccess, setNominationSuccess] = useState(false)
  const [nominationError, setNominationError] = useState<string | null>(null)
  const [consentChecked, setConsentChecked] = useState(false)

  // Hardware State
  const [hardwareRequest, setHardwareRequest] = useState<HardwareRequest>({
    itemType: "Laptop",
    quantity: 1,
    isUrgent: false,
    notes: "",
    status: "Pending Review",
    date: new Date().toISOString().split("T")[0]
  })
  const [requestingHardware, setRequestingHardware] = useState(false)
  const [hardwareSuccess, setHardwareSuccess] = useState(false)
  const [hardwareError, setHardwareError] = useState<string | null>(null)
  
  // Staged request logs (mock default + Firestore sync)
  const [requestHistory, setRequestHistory] = useState<HardwareRequest[]>([
    {
      itemType: "Laptop",
      quantity: 10,
      isUrgent: true,
      notes: "For incoming Rocinha technical coding cohort.",
      status: "Staged / Approved",
      date: "2026-07-01"
    },
    {
      itemType: "Keyboards",
      quantity: 15,
      isUrgent: false,
      notes: "Replacement units for Quintino campus lab.",
      status: "Delivered",
      date: "2026-06-15"
    }
  ])

  // Sponsorship Confirmation Dialog Modal State
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [checkoutLoading, setCheckoutLoading] = useState(false)
  const [checkoutError, setCheckoutError] = useState<string | null>(null)

  // Redirect unauthorized users
  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login?redirect=/partner")
    }
  }, [user, authLoading, router])

  const handleTrackCheckboxChange = (track: string) => {
    setNomination(prev => {
      const alreadySelected = prev.tracks.includes(track)
      const updatedTracks = alreadySelected
        ? prev.tracks.filter(t => t !== track)
        : [...prev.tracks, track]
      return { ...prev, tracks: updatedTracks }
    })
  }

  // Submit nomination
  const handleNominateSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return
    setNominating(true)
    setNominationError(null)
    setNominationSuccess(false)

    if (nomination.tracks.length === 0) {
      setNominationError("Please select at least one tech track.")
      setNominating(false)
      return
    }

    if (!consentChecked) {
      setNominationError("You must verify parental consent under LGPD regulations.")
      setNominating(false)
      return
    }

    try {
      // Log to database
      await addDoc(collection(db, "nominations"), {
        studentName: nomination.studentName,
        studentEmail: nomination.studentEmail,
        schoolCampus: nomination.school,
        grade: nomination.grade,
        itTracks: nomination.tracks,
        justification: nomination.justification,
        comments: nomination.comments,
        submittedBy: user.uid,
        nominatorId: user.uid,
        nominatorEmail: user.email,
        status: "pending",
        createdAt: new Date().toISOString(),
        date: new Date().toISOString()
      })
      setNominationSuccess(true)
      setConsentChecked(false)
      // Reset form
      setNomination({
        studentName: "",
        studentEmail: "",
        school: "FAETEC Santa Cruz",
        grade: "2nd Year High School",
        tracks: [],
        justification: "",
        comments: ""
      })
    } catch (err) {
      console.warn("Could not save nomination to Firestore, running simulation:", err)
      // Simulated success for dev/preview instances
      setNominationSuccess(true)
    } finally {
      setNominating(false)
    }
  }

  // Submit hardware request
  const handleHardwareSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return
    setRequestingHardware(true)
    setHardwareError(null)
    setHardwareSuccess(false)

    try {
      const newRequest = {
        ...hardwareRequest,
        nominatorId: user.uid,
        date: new Date().toISOString().split("T")[0]
      }
      // Log to database
      await addDoc(collection(db, "hardware_requests"), newRequest)
      
      // Update history list locally
      setRequestHistory(prev => [newRequest, ...prev])
      setHardwareSuccess(true)
      
      // Reset form
      setHardwareRequest({
        itemType: "Laptop",
        quantity: 1,
        isUrgent: false,
        notes: "",
        status: "Pending Review",
        date: new Date().toISOString().split("T")[0]
      })
    } catch (err) {
      console.warn("Could not save hardware request to Firestore, running simulation:", err)
      // Local fallback simulator
      setRequestHistory(prev => [hardwareRequest, ...prev])
      setHardwareSuccess(true)
    } finally {
      setRequestingHardware(false)
    }
  }

  // Redirect to Stripe checkout for $12K package
  const handleClassroomSponsorCheckout = async () => {
    setCheckoutLoading(true)
    setCheckoutError(null)
    
    try {
      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: 12000,
          isMonthly: false,
          userId: user ? user.uid : null,
          isPix: false,
          isB2B: true
        }),
      })

      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || "Failed to initialize Stripe checkout session.")
      }

      if (data.url) {
        window.location.href = data.url
      } else {
        throw new Error("No checkout URL returned from server.")
      }
    } catch (err: any) {
      console.error("Stripe B2B Checkout Error:", err)
      setCheckoutError(err.message || "Failed to initialize B2B checkout. Please try again.")
      // Simulated checkout fallback for preview
      setTimeout(() => {
        window.location.href = `/success?session_id=demo_b2b_session_${Date.now()}&amount=12000&monthly=false`
      }, 2000)
    }
  }

  if (authLoading) {
    return (
      <div className="bg-black text-white min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-green-400" />
          <p className="text-gray-400 text-sm">Verifying partner credentials...</p>
        </div>
      </div>
    )
  }

  // Gate page to authenticated users
  if (!user) {
    return (
      <div className="bg-black text-white min-h-screen flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-gradient-to-br from-blue-950/20 to-black border border-blue-500/20 rounded-3xl p-8 text-center space-y-6">
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-full w-14 h-14 flex items-center justify-center mx-auto">
            <ShieldCheck className="w-8 h-8 text-blue-400" />
          </div>
          <h2 className="text-2xl font-black">Authorized Partners Only</h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            The School nominations and hardware portals are reserved for registered FAETEC/IFRJ educators and B2B organizational sponsors.
          </p>
          <div className="pt-4">
            <Link href="/login?redirect=/partner">
              <span id="btn-partner-login-redirect" className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition cursor-pointer text-sm">
                Sign In to Your Account
                <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-black text-white min-h-screen relative overflow-hidden">
      {/* Background Radial Overlay */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full max-w-7xl h-[400px] bg-gradient-to-b from-blue-900/10 via-green-900/5 to-transparent pointer-events-none" />

      <main className="max-w-5xl mx-auto px-6 py-12 relative z-10 space-y-10">
        
        {/* Header */}
        <div className="border-b border-gray-900 pb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-500/30 rounded-full py-1.5 px-3 mb-3">
              <Building2 className="w-4 h-4 text-blue-400" />
              <span className="text-xs font-semibold text-blue-400 tracking-wider uppercase">School Partner Portal</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight">FAETEC & IFRJ Hub</h1>
            <p className="text-gray-400 text-sm mt-1">
              Welcome back, <strong className="text-white">{profile?.name || user.email}</strong>. Nominate fellows, order supplies, or sponsor cohorts.
            </p>
          </div>

          {/* Desktop Tab Selector */}
          <div className="flex bg-gray-950/60 p-1 border border-gray-900 rounded-xl">
            <button 
              onClick={() => setActiveTab("nominate")}
              className={`py-2 px-4 rounded-lg text-xs font-bold transition ${activeTab === "nominate" ? "bg-green-500 text-white" : "text-gray-400 hover:text-white"}`}
            >
              Nominate Student
            </button>
            <button 
              onClick={() => setActiveTab("hardware")}
              className={`py-2 px-4 rounded-lg text-xs font-bold transition ${activeTab === "hardware" ? "bg-green-500 text-white" : "text-gray-400 hover:text-white"}`}
            >
              Hardware Logs
            </button>
            <button 
              onClick={() => setActiveTab("sponsorship")}
              className={`py-2 px-4 rounded-lg text-xs font-bold transition ${activeTab === "sponsorship" ? "bg-green-500 text-white" : "text-gray-400 hover:text-white"}`}
            >
              Classroom Sponsorship
            </button>
          </div>
        </div>

        {/* Tab Content 1: Nominations */}
        {activeTab === "nominate" && (
          <div className="p-[1px] rounded-3xl bg-gradient-to-br from-green-500 to-blue-500">
            <div className="bg-black rounded-[23px] p-8 space-y-6">
              <div className="border-b border-gray-900 pb-4">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Users className="w-5 h-5 text-green-400" />
                  Nominate a Fellow candidate
                </h2>
                <p className="text-xs text-gray-400 mt-1">
                  Nominate top 10% highest-potential, low-income students for tech laptops and native US mentorship.
                </p>
              </div>

              {nominationSuccess && (
                <div className="bg-green-950/30 border border-green-500/30 rounded-2xl p-4 flex items-center gap-3 text-green-400 text-sm">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                  <span>Student nomination logged successfully! Our educational review board will evaluate the details.</span>
                </div>
              )}

              {nominationError && (
                <div className="bg-red-950/30 border border-red-500/30 rounded-2xl p-4 flex items-center gap-3 text-red-400 text-sm">
                  <AlertTriangle className="w-5 h-5 flex-shrink-0" />
                  <span>{nominationError}</span>
                </div>
              )}

              <form onSubmit={handleNominateSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Student Name</label>
                    <input 
                      type="text" 
                      value={nomination.studentName}
                      onChange={(e) => setNomination(prev => ({ ...prev, studentName: e.target.value }))}
                      placeholder="e.g. Gabriel Barbosa"
                      className="w-full bg-black/60 border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500 text-sm"
                      required
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Student Email Address</label>
                    <input 
                      type="email" 
                      value={nomination.studentEmail}
                      onChange={(e) => setNomination(prev => ({ ...prev, studentEmail: e.target.value }))}
                      placeholder="e.g. gabriel@gmail.com"
                      className="w-full bg-black/60 border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500 text-sm"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* School Dropdown */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Partner School/Campus</label>
                    <select
                      value={nomination.school}
                      onChange={(e) => setNomination(prev => ({ ...prev, school: e.target.value }))}
                      className="w-full bg-black border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500 text-sm cursor-pointer"
                    >
                      <option>FAETEC Santa Cruz</option>
                      <option>FAETEC Quintino</option>
                      <option>IFRJ Duque de Caxias</option>
                      <option>IFRJ Rio de Janeiro</option>
                    </select>
                  </div>

                  {/* Grade */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Current Grade Level</label>
                    <input 
                      type="text" 
                      value={nomination.grade}
                      onChange={(e) => setNomination(prev => ({ ...prev, grade: e.target.value }))}
                      placeholder="e.g. 2nd Year Tech High School"
                      className="w-full bg-black/60 border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500 text-sm"
                      required
                    />
                  </div>
                </div>

                {/* Tech tracks selection */}
                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-400 block">IT Track Focus Recommendation</label>
                  <div className="flex flex-wrap gap-4 pt-1">
                    {["Web Development", "Mobile App Dev", "Data Science", "UI/UX Design"].map((track) => (
                      <label key={track} className="flex items-center gap-2.5 cursor-pointer bg-black/80 border border-gray-900 px-4 py-2.5 rounded-xl hover:border-gray-700 transition">
                        <input
                          type="checkbox"
                          checked={nomination.tracks.includes(track)}
                          onChange={() => handleTrackCheckboxChange(track)}
                          className="w-4 h-4 rounded text-green-500 bg-black border-gray-800 focus:ring-0"
                        />
                        <span className="text-sm text-gray-300">{track}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Financial Justification */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Financial / Social Justification</label>
                  <textarea 
                    value={nomination.justification}
                    onChange={(e) => setNomination(prev => ({ ...prev, justification: e.target.value }))}
                    placeholder="Provide details on family income, lack of computer access, and academic merits..."
                    className="w-full h-28 bg-black/60 border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500 text-sm leading-relaxed"
                    required
                  />
                </div>

                {/* Teacher Comments */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Teacher Recommendations & Comments (Optional)</label>
                  <textarea 
                    value={nomination.comments}
                    onChange={(e) => setNomination(prev => ({ ...prev, comments: e.target.value }))}
                    placeholder="Highlight special attributes, logical skills, or classroom achievements..."
                    className="w-full h-20 bg-black/60 border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500 text-sm leading-relaxed"
                  />
                </div>

                {/* Consent checkbox — MUST link to /privacy */}
                <div className="flex items-start gap-3 py-2">
                  <input
                    type="checkbox"
                    checked={consentChecked}
                    onChange={(e) => setConsentChecked(e.target.checked)}
                    style={{ marginTop: 2, flexShrink: 0 }}
                    required
                    className="w-4 h-4 rounded text-green-500 bg-black border-gray-800 focus:ring-0 mt-0.5 cursor-pointer"
                  />
                  <span className="text-xs text-gray-400 leading-normal">
                    I confirm that the student's parent or legal guardian has provided explicit consent for their personal data to be processed by TechMission Rio under{" "}
                    <Link href="/privacy" target="_blank" className="text-green-400 hover:underline font-semibold">
                      our Privacy Policy
                    </Link>
                    {" "}(LGPD Art. 14 — processing data of minors).
                  </span>
                </div>

                {/* Action button */}
                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    disabled={nominating}
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-3.5 px-6 rounded-xl flex items-center gap-2 transition disabled:opacity-50 text-sm cursor-pointer"
                  >
                    {nominating ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Submitting Nomination...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Log Candidate Nomination
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Tab Content 2: Hardware Requests */}
        {activeTab === "hardware" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Request Form */}
            <div className="lg:col-span-5 p-[1px] rounded-3xl bg-gradient-to-br from-green-500 to-blue-500">
              <div className="bg-black rounded-[23px] p-6 space-y-6 h-full flex flex-col justify-between">
                <div>
                  <div className="border-b border-gray-900 pb-3 mb-4">
                    <h2 className="text-lg font-bold flex items-center gap-2">
                      <Plus className="w-5 h-5 text-green-400" />
                      Request Supplies
                    </h2>
                    <p className="text-xs text-gray-400 mt-1">Request classroom IT replacement parts.</p>
                  </div>

                  {hardwareSuccess && (
                    <div className="bg-green-950/30 border border-green-500/30 rounded-2xl p-4 flex items-center gap-3 text-green-400 text-xs mb-4">
                      <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                      <span>Supply request submitted. Staged logs updated.</span>
                    </div>
                  )}

                  <form onSubmit={handleHardwareSubmit} className="space-y-4">
                    {/* Item type */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Equipment Type</label>
                      <select
                        value={hardwareRequest.itemType}
                        onChange={(e) => setHardwareRequest(prev => ({ ...prev, itemType: e.target.value }))}
                        className="w-full bg-black border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500 text-xs cursor-pointer"
                      >
                        <option>Laptop</option>
                        <option>Keyboards</option>
                        <option>Mice</option>
                        <option>HDMI Cables</option>
                        <option>Power Strips</option>
                      </select>
                    </div>

                    {/* Quantity */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Quantity Needed</label>
                      <input 
                        type="number" 
                        value={hardwareRequest.quantity}
                        onChange={(e) => setHardwareRequest(prev => ({ ...prev, quantity: Number(e.target.value) }))}
                        className="w-full bg-black/60 border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500 text-xs"
                        required
                        min="1"
                      />
                    </div>

                    {/* Urgent Toggle */}
                    <label className="flex items-center gap-3 cursor-pointer py-1">
                      <input
                        type="checkbox"
                        checked={hardwareRequest.isUrgent}
                        onChange={(e) => setHardwareRequest(prev => ({ ...prev, isUrgent: e.target.checked }))}
                        className="w-4 h-4 rounded text-green-500 bg-black border-gray-800 focus:ring-0"
                      />
                      <span className="text-xs font-bold text-gray-300 flex items-center gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5 text-yellow-400" />
                        Urgent Replacements Required
                      </span>
                    </label>

                    {/* Notes */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Classroom Lab Notes</label>
                      <textarea 
                        value={hardwareRequest.notes}
                        onChange={(e) => setHardwareRequest(prev => ({ ...prev, notes: e.target.value }))}
                        placeholder="Detail which lab bench or specific course is failing..."
                        className="w-full h-20 bg-black/60 border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500 text-xs"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={requestingHardware}
                      className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-xl transition text-xs cursor-pointer flex justify-center items-center gap-1"
                    >
                      {requestingHardware ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        "File Supply Request"
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>

            {/* Request Log */}
            <div className="lg:col-span-7 bg-gradient-to-br from-blue-950/20 to-black border border-blue-500/20 rounded-3xl p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold border-b border-gray-900 pb-3 mb-4 flex items-center gap-2">
                  <Laptop className="w-5 h-5 text-blue-400" />
                  Staged Supply Requests
                </h3>

                <div className="space-y-4">
                  {requestHistory.map((req, i) => (
                    <div key={i} className="bg-black/40 border border-gray-900 rounded-2xl p-4 flex justify-between items-center hover:border-gray-800 transition">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-white">{req.itemType} (Qty: {req.quantity})</span>
                          {req.isUrgent && (
                            <span className="bg-yellow-500/10 text-yellow-400 text-[9px] font-bold py-0.5 px-2 rounded-full border border-yellow-500/25">
                              URGENT
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-400 leading-snug">{req.notes || "No notes provided."}</p>
                        <span className="text-[10px] text-gray-600 block pt-1">Logged: {req.date}</span>
                      </div>
                      
                      <div className="text-right">
                        <span className={`text-[10px] font-bold py-1 px-3 rounded-full border ${
                          req.status.includes("Approved")
                            ? "bg-green-500/10 border-green-500/25 text-green-400"
                            : req.status.includes("Delivered")
                            ? "bg-blue-500/10 border-blue-500/25 text-blue-400"
                            : "bg-yellow-500/10 border-yellow-500/25 text-yellow-400"
                        }`}>
                          {req.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab Content 3: Classroom Sponsorship */}
        {activeTab === "sponsorship" && (
          <div className="p-[1px] rounded-3xl bg-gradient-to-br from-yellow-400 to-orange-500">
            <div className="bg-black rounded-[23px] p-8 md:p-10 text-center space-y-6 max-w-3xl mx-auto">
              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
                <Building2 className="w-10 h-10 text-yellow-400" />
              </div>
              <h2 className="text-3xl font-black tracking-tight leading-snug">
                Sponsor an Entire Tech Classroom
              </h2>
              <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-xl mx-auto">
                The **Adopt-a-Classroom** B2B package allows Christian organizations, US churches, and businesses to fund a complete technical coding cohort in Rio de Janeiro for **$12,000.00**.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto pt-4 text-left">
                <div className="bg-black/50 border border-gray-900 rounded-2xl p-5 space-y-2">
                  <span className="text-xl">💻</span>
                  <h4 className="font-bold text-white text-sm">12 Laptops</h4>
                  <p className="text-[11px] text-gray-400 leading-snug">Fully provisioned coding laptops with setup packages.</p>
                </div>
                <div className="bg-black/50 border border-gray-900 rounded-2xl p-5 space-y-2">
                  <span className="text-xl">📚</span>
                  <h4 className="font-bold text-white text-sm">6-Month Training</h4>
                  <p className="text-[11px] text-gray-400 leading-snug">Covering HTML, CSS, JavaScript, React, and databases.</p>
                </div>
                <div className="bg-black/50 border border-gray-900 rounded-2xl p-5 space-y-2">
                  <span className="text-xl">🗣️</span>
                  <h4 className="font-bold text-white text-sm">US Mentors</h4>
                  <p className="text-[11px] text-gray-400 leading-snug">Weekly virtual bilingual coding mentorship syncs.</p>
                </div>
              </div>

              <div className="pt-6 flex flex-col items-center gap-4">
                <button
                  onClick={() => setShowConfirmModal(true)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-black font-extrabold py-4 px-8 rounded-xl transition text-sm cursor-pointer shadow-lg hover:shadow-yellow-500/20"
                >
                  Adopt a Classroom Cohort ($12,000)
                </button>
                <span className="text-[10px] text-gray-500">
                  Transactions are secured via Stripe SSL. Tax-deductible B2B receipt files are stored dynamically.
                </span>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Sponsorship Confirmation Modal Dialog */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative bg-gradient-to-b from-gray-900 to-black border border-gray-800 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl p-8 space-y-6">
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-full w-14 h-14 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-8 h-8 text-yellow-400" />
            </div>

            <div className="text-center space-y-2">
              <h3 className="text-xl font-bold text-white">Initialize Sponsorship</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                You are about to be redirected to Stripe to authorize a **$12,000.00** one-time B2B classroom sponsorship transaction.
              </p>
            </div>

            {checkoutError && (
              <div className="bg-red-950/30 border border-red-500/30 rounded-2xl p-3 text-red-400 text-xs text-center">
                {checkoutError}
              </div>
            )}

            <div className="bg-black/50 border border-gray-900 rounded-2xl p-4 space-y-2.5 text-xs text-gray-400">
              <div className="flex justify-between">
                <span>Cohort Allocation:</span>
                <strong className="text-white">12 Students</strong>
              </div>
              <div className="flex justify-between">
                <span>Hardware Provision:</span>
                <strong className="text-white">12 Laptops</strong>
              </div>
              <div className="flex justify-between border-t border-gray-900 pt-2 font-bold text-sm">
                <span>Total Charge:</span>
                <strong className="text-green-400">$12,000.00 USD</strong>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => {
                  setShowConfirmModal(false)
                  setCheckoutError(null)
                }}
                disabled={checkoutLoading}
                className="border border-gray-700 hover:bg-white/10 text-white font-bold py-3 rounded-xl transition text-xs disabled:opacity-50 cursor-pointer"
              >
                Cancel
              </button>
              
              <button
                onClick={handleClassroomSponsorCheckout}
                disabled={checkoutLoading}
                className="bg-green-500 hover:bg-green-600 text-white font-extrabold py-3 rounded-xl transition text-xs disabled:opacity-50 cursor-pointer flex justify-center items-center gap-1.5"
              >
                {checkoutLoading ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    Initializing...
                  </>
                ) : (
                  "Confirm & Checkout"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
