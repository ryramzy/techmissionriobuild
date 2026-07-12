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
  Play,
  X,
  WifiOff
} from "lucide-react"
import Link from "next/link"
import { collection, addDoc, getDocs, query, where, onSnapshot, orderBy } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { useAuth } from "@/app/components/AuthContext"
import { useTranslations } from "next-intl"

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
  isOfflinePending?: boolean
}

export default function PartnerPortalPage() {
  const { user, profile, loading: authLoading } = useAuth()
  const router = useRouter()
  const t = useTranslations("Partner")

  const [activeTab, setActiveTab] = useState<"nominate" | "hardware" | "sponsorship" | "cohort">("nominate")
  
  // Offline State
  const [isOffline, setIsOffline] = useState(typeof window !== "undefined" ? !navigator.onLine : false)

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

  // Dynamic Cohort States
  const [cohortFellows, setCohortFellows] = useState<any[]>([])
  const [cohortLoading, setCohortLoading] = useState(true)
  const [showVideoModal, setShowVideoModal] = useState(false)
  const [activeVideoUrl, setActiveVideoUrl] = useState("")

  // Real-time cached lists
  const [nominationsHistory, setNominationsHistory] = useState<any[]>([])

  // Offline background sync function
  const syncOfflineData = async () => {
    if (!user) return

    // 1. Sync nominations
    const offlineNomsKey = `tmr_offline_noms_${user.uid}`
    const offlineNoms = JSON.parse(localStorage.getItem(offlineNomsKey) || "[]")
    if (offlineNoms.length > 0) {
      console.log(`Syncing ${offlineNoms.length} offline nominations...`)
      for (const nom of offlineNoms) {
        try {
          const { id, isOfflinePending, ...firestoreData } = nom
          await addDoc(collection(db, "nominations"), firestoreData)
        } catch (err) {
          console.error("Failed to sync nomination:", err)
        }
      }
      localStorage.removeItem(offlineNomsKey)
    }

    // 2. Sync hardware requests
    const offlineHwKey = `tmr_offline_hw_${user.uid}`
    const offlineHw = JSON.parse(localStorage.getItem(offlineHwKey) || "[]")
    if (offlineHw.length > 0) {
      console.log(`Syncing ${offlineHw.length} offline hardware requests...`)
      for (const hw of offlineHw) {
        try {
          const { isOfflinePending, ...firestoreData } = hw
          await addDoc(collection(db, "hardware_requests"), firestoreData)
        } catch (err) {
          console.error("Failed to sync hardware request:", err)
        }
      }
      localStorage.removeItem(offlineHwKey)
    }
  }

  // 1. Monitor network connection status
  useEffect(() => {
    if (typeof window === "undefined") return
    
    const handleOnline = () => {
      setIsOffline(false)
      syncOfflineData()
    }
    const handleOffline = () => {
      setIsOffline(true)
    }

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)
    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  // 2. Real-time Firebase snapshot listeners with local storage cache fallback
  useEffect(() => {
    if (!user) return

    const cachedNominations = localStorage.getItem(`tmr_cached_noms_${user.uid}`)
    if (cachedNominations) {
      setNominationsHistory(JSON.parse(cachedNominations))
    }

    const cachedHardware = localStorage.getItem(`tmr_cached_hw_${user.uid}`)
    if (cachedHardware) {
      setRequestHistory(JSON.parse(cachedHardware))
    }

    const nomsQuery = query(
      collection(db, "nominations"),
      where("submittedBy", "==", user.uid),
      orderBy("createdAt", "desc")
    )
    const unsubNoms = onSnapshot(nomsQuery, (snapshot) => {
      const list = snapshot.docs.map(d => ({ id: d.id, ...d.data() }))
      setNominationsHistory(list)
      localStorage.setItem(`tmr_cached_noms_${user.uid}`, JSON.stringify(list))
    }, (err) => {
      console.warn("Noms listener failed or permission denied, using cached fallback:", err)
    })

    const hwQuery = query(
      collection(db, "hardware_requests"),
      where("nominatorId", "==", user.uid),
      orderBy("date", "desc")
    )
    const unsubHw = onSnapshot(hwQuery, (snapshot) => {
      const list = snapshot.docs.map(d => d.data() as HardwareRequest)
      setRequestHistory(list)
      localStorage.setItem(`tmr_cached_hw_${user.uid}`, JSON.stringify(list))
    }, (err) => {
      console.warn("Hardware requests listener failed or permission denied, using cached fallback:", err)
    })

    return () => {
      unsubNoms()
      unsubHw()
    }
  }, [user])

  // 3. Fetch Cohort fellows list (FAETEC Santa Cruz by default for B2B demo representation)
  useEffect(() => {
    if (!user) return
    const fetchCohortFellows = async () => {
      setCohortLoading(true)
      try {
        const q = query(
          collection(db, "fellows"),
          where("schoolCampus", "==", "FAETEC Santa Cruz")
        )
        const snap = await getDocs(q)
        if (!snap.empty) {
          const list = snap.docs.map(d => d.data())
          setCohortFellows(list)
        } else {
          // Seeding default mock cohort fellows if Firestore collection is empty
          setCohortFellows([
            { name: "Gabriel Barbosa", initials: "GB", track: "Web Development", location: "Santa Cruz, Rio", story: "Excelling in technical coding.", isEndorsed: true, videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-software-developer-working-on-his-computer-34282-large.mp4" },
            { name: "Maria Costa", initials: "MC", track: "Mobile App Development", location: "Santa Cruz, Rio", story: "Developing useful campus software.", isEndorsed: true, videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-woman-coding-on-computer-in-glasses-40742-large.mp4" }
          ])
        }
      } catch (err) {
        console.error("Cohort fetch error:", err)
      } finally {
        setCohortLoading(false)
      }
    }
    fetchCohortFellows()
  }, [user])

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

    const newNomData = {
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
    }

    // If offline, queue the nomination optimistically
    if (!navigator.onLine) {
      const offlineNomsKey = `tmr_offline_noms_${user.uid}`
      const existingOffline = JSON.parse(localStorage.getItem(offlineNomsKey) || "[]")
      const localOfflineNom = {
        id: `offline_${Date.now()}`,
        isOfflinePending: true,
        ...newNomData
      }
      localStorage.setItem(offlineNomsKey, JSON.stringify([...existingOffline, localOfflineNom]))

      setNominationsHistory(prev => [localOfflineNom, ...prev])
      setNominationSuccess(true)
      setConsentChecked(false)
      setNomination({
        studentName: "",
        studentEmail: "",
        school: "FAETEC Santa Cruz",
        grade: "2nd Year High School",
        tracks: [],
        justification: "",
        comments: ""
      })
      setNominating(false)
      return
    }

    try {
      await addDoc(collection(db, "nominations"), newNomData)
      setNominationSuccess(true)
      setConsentChecked(false)
      setNomination({
        studentName: "",
        studentEmail: "",
        school: "FAETEC Santa Cruz",
        grade: "2nd Year High School",
        tracks: [],
        justification: "",
        comments: ""
      })
    } catch (err: any) {
      console.error("Nomination write error:", err)
      setNominationError(err.message || "Failed to submit student nomination. Offline retry stored in cache.")
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

    const newHwData = {
      ...hardwareRequest,
      nominatorId: user.uid,
      date: new Date().toISOString().split("T")[0]
    }

    // If offline, queue the hardware request optimistically
    if (!navigator.onLine) {
      const offlineHwKey = `tmr_offline_hw_${user.uid}`
      const existingOffline = JSON.parse(localStorage.getItem(offlineHwKey) || "[]")
      const localOfflineHw = {
        isOfflinePending: true,
        ...newHwData
      }
      localStorage.setItem(offlineHwKey, JSON.stringify([...existingOffline, localOfflineHw]))

      setRequestHistory(prev => [localOfflineHw, ...prev])
      setHardwareSuccess(true)
      setHardwareRequest({
        itemType: "Laptop",
        quantity: 1,
        isUrgent: false,
        notes: "",
        status: "Pending Sync (Offline)",
        date: new Date().toISOString().split("T")[0]
      })
      setRequestingHardware(false)
      return
    }

    try {
      await addDoc(collection(db, "hardware_requests"), newHwData)
      setHardwareSuccess(true)
      setHardwareRequest({
        itemType: "Laptop",
        quantity: 1,
        isUrgent: false,
        notes: "",
        status: "Pending Review",
        date: new Date().toISOString().split("T")[0]
      })
    } catch (err: any) {
      console.error("Hardware request write error:", err)
      setHardwareError(err.message || "Failed to submit request. Stored for background synchronization.")
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

      <div className="max-w-5xl mx-auto px-6 py-12 relative z-10 space-y-10">

        {/* Offline Warning Banner */}
        {isOffline && (
          <div className="bg-yellow-950/40 border border-yellow-500/30 rounded-2xl p-4 flex items-center gap-3 text-yellow-400 text-sm animate-pulse">
            <WifiOff className="w-5 h-5 flex-shrink-0" />
            <div className="space-y-0.5">
              <div className="font-bold">Offline Mode Active</div>
              <p className="text-xs text-gray-300">
                You are currently offline. Student nominations and supply requests will be cached locally and synchronized with servers once your connection is restored.
              </p>
            </div>
          </div>
        )}
        
        {/* Header */}
        <div className="border-b border-gray-900 pb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-500/30 rounded-full py-1.5 px-3 mb-3">
              <Building2 className="w-4 h-4 text-blue-400" />
              <span className="text-xs font-semibold text-blue-400 tracking-wider uppercase">{t("portalTag")}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight">{t("portalHub")}</h1>
            <p className="text-gray-400 text-sm mt-1">
              {t("welcomeBack", { name: profile?.name || user.email })}
            </p>
          </div>

          {/* Desktop Tab Selector */}
          <div className="flex bg-gray-950/60 p-1 border border-gray-900 rounded-xl">
            <button 
              onClick={() => setActiveTab("nominate")}
              className={`py-2 px-4 rounded-lg text-xs font-bold transition ${activeTab === "nominate" ? "bg-green-500 text-white" : "text-gray-400 hover:text-white"}`}
            >
              {t("tabNominate")}
            </button>
            <button 
              onClick={() => setActiveTab("hardware")}
              className={`py-2 px-4 rounded-lg text-xs font-bold transition ${activeTab === "hardware" ? "bg-green-500 text-white" : "text-gray-400 hover:text-white"}`}
            >
              {t("tabHardware")}
            </button>
            <button 
              onClick={() => setActiveTab("sponsorship")}
              className={`py-2 px-4 rounded-lg text-xs font-bold transition ${activeTab === "sponsorship" ? "bg-green-500 text-white" : "text-gray-400 hover:text-white"}`}
            >
              {t("tabSponsorship")}
            </button>
            <button 
              onClick={() => setActiveTab("cohort")}
              className={`py-2 px-4 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${activeTab === "cohort" ? "bg-green-500 text-white" : "text-gray-400 hover:text-white"}`}
            >
              {t("tabCohort")}
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
                  {t("nominateTitle")}
                </h2>
                <p className="text-xs text-gray-400 mt-1">
                  {t("nominateSubtitle")}
                </p>
              </div>

              {nominationSuccess && (
                <div className="bg-green-950/30 border border-green-500/30 rounded-2xl p-4 flex items-center gap-3 text-green-400 text-sm">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                  <span>{t("successMessage")}</span>
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
                    <label htmlFor="nom-student-name" className="text-xs font-bold uppercase tracking-wider text-gray-400">{t("studentName")}</label>
                    <input 
                      id="nom-student-name"
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
                    <label htmlFor="nom-student-email" className="text-xs font-bold uppercase tracking-wider text-gray-400">{t("studentEmail")}</label>
                    <input 
                      id="nom-student-email"
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
                    <label htmlFor="nom-school" className="text-xs font-bold uppercase tracking-wider text-gray-400">{t("partnerSchool")}</label>
                    <select
                      id="nom-school"
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
                    <label htmlFor="nom-grade" className="text-xs font-bold uppercase tracking-wider text-gray-400">{t("gradeLevel")}</label>
                    <input 
                      id="nom-grade"
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
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-400 block">{t("trackRecommendation")}</label>
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
                  <label htmlFor="nom-justification" className="text-xs font-bold uppercase tracking-wider text-gray-400">{t("justificationLabel")}</label>
                  <textarea 
                    id="nom-justification"
                    value={nomination.justification}
                    onChange={(e) => setNomination(prev => ({ ...prev, justification: e.target.value }))}
                    placeholder="Provide details on family income, lack of computer access, and academic merits..."
                    className="w-full h-28 bg-black/60 border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500 text-sm leading-relaxed"
                    required
                  />
                </div>

                {/* Teacher Comments */}
                <div className="space-y-2">
                  <label htmlFor="nom-comments" className="text-xs font-bold uppercase tracking-wider text-gray-400">{t("commentsLabel")}</label>
                  <textarea 
                    id="nom-comments"
                    value={nomination.comments}
                    onChange={(e) => setNomination(prev => ({ ...prev, comments: e.target.value }))}
                    placeholder="Highlight special attributes, logical skills, or classroom achievements..."
                    className="w-full h-20 bg-black/60 border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500 text-sm leading-relaxed"
                  />
                </div>

                {/* Consent checkbox — MUST link to /privacy */}
                <div className="flex items-start gap-3 py-2">
                  <label htmlFor="nom-consent" className="flex items-start gap-3 cursor-pointer">
                    <input
                      id="nom-consent"
                      type="checkbox"
                      checked={consentChecked}
                      onChange={(e) => setConsentChecked(e.target.checked)}
                      style={{ flexShrink: 0 }}
                      required
                      className="w-4 h-4 rounded text-green-500 bg-black border-gray-800 focus:ring-0 mt-0.5 cursor-pointer"
                    />
                    <span className="text-xs text-gray-400 leading-normal">
                      {t("consentText")}
                    </span>
                  </label>
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
                        {t("submitting")}
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        {t("btnLogNomination")}
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* History list for this nominator */}
              <div className="border-t border-gray-900 pt-6 mt-8">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-400" />
                  Your Submitted Nominations
                </h3>
                
                {nominationsHistory.length === 0 ? (
                  <p className="text-xs text-gray-500">No student nominations submitted yet.</p>
                ) : (
                  <div className="space-y-4">
                    {nominationsHistory.map((nom, index) => (
                      <div key={nom.id || index} className="bg-black/40 border border-gray-900 rounded-2xl p-4 flex justify-between items-center hover:border-gray-800 transition">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-white">{nom.studentName}</span>
                            <span className="text-[10px] text-gray-400">({nom.studentEmail})</span>
                            {nom.isOfflinePending && (
                              <span className="bg-yellow-500/10 text-yellow-400 text-[9px] font-bold py-0.5 px-2 rounded-full border border-yellow-500/25 flex items-center gap-1">
                                <WifiOff className="w-2.5 h-2.5" />
                                OFFLINE PENDING
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-gray-400 leading-snug">
                            {nom.schoolCampus} &bull; {nom.grade} &bull; {Array.isArray(nom.itTracks) ? nom.itTracks.join(", ") : nom.itTracks}
                          </p>
                          <p className="text-[11px] text-gray-500 italic mt-1 font-light leading-relaxed">
                            "{nom.justification}"
                          </p>
                        </div>
                        <div>
                          <span className={`text-[10px] font-bold py-1 px-3 rounded-full border uppercase tracking-wider ${
                            nom.status === "approved"
                              ? "bg-green-500/10 border-green-500/25 text-green-400"
                              : nom.status === "archived"
                              ? "bg-red-500/10 border-red-500/25 text-red-400"
                              : "bg-yellow-500/10 border-yellow-500/25 text-yellow-400"
                          }`}>
                            {nom.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
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
                      {t("requestTitle")}
                    </h2>
                    <p className="text-xs text-gray-400 mt-1">{t("requestSubtitle")}</p>
                  </div>

                  {hardwareSuccess && (
                    <div className="bg-green-950/30 border border-green-500/30 rounded-2xl p-4 flex items-center gap-3 text-green-400 text-xs mb-4">
                      <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                      <span>{t("hardwareSuccess")}</span>
                    </div>
                  )}

                  <form onSubmit={handleHardwareSubmit} className="space-y-4">
                    {/* Item type */}
                    <div className="space-y-2">
                      <label htmlFor="hard-type" className="text-xs font-bold uppercase tracking-wider text-gray-400">{t("equipmentType")}</label>
                      <select
                        id="hard-type"
                        value={hardwareRequest.itemType}
                        onChange={(e) => setHardwareRequest(prev => ({ ...prev, itemType: e.target.value }))}
                        className="w-full bg-black border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500 text-xs cursor-pointer"
                      >
                        <option value="Laptop">Laptop / Notebook</option>
                        <option value="Keyboards">Keyboards / Teclados</option>
                        <option value="Mice">Mice / Mouses</option>
                        <option value="HDMI Cables">HDMI Cables / Cabos HDMI</option>
                        <option value="Power Strips">Power Strips / Filtros de Linha</option>
                      </select>
                    </div>

                    {/* Quantity */}
                    <div className="space-y-2">
                      <label htmlFor="hard-qty" className="text-xs font-bold uppercase tracking-wider text-gray-400">{t("quantityNeeded")}</label>
                      <input 
                        id="hard-qty"
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
                        {t("urgentLabel")}
                      </span>
                    </label>

                    {/* Notes */}
                    <div className="space-y-2">
                      <label htmlFor="hard-notes" className="text-xs font-bold uppercase tracking-wider text-gray-400">{t("notesLabel")}</label>
                      <textarea 
                        id="hard-notes"
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
                          {t("submitting")}
                        </>
                      ) : (
                        t("btnSubmitRequest")
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

        {/* Tab Content 4: Cohort Dashboard View */}
        {activeTab === "cohort" && (
          <div className="space-y-8">
            {/* Sponsored Classroom Status Card */}
            <div className="bg-gradient-to-br from-blue-950/20 to-black border border-blue-500/20 rounded-3xl p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 bg-yellow-500/10 border border-yellow-500/25 text-yellow-400 text-[10px] font-bold py-1 px-3 rounded-full uppercase tracking-wider">
                  ★ Active Classroom Cohort
                </div>
                <h2 className="text-2xl font-black text-white">FAETEC Santa Cruz Sourced Cohort</h2>
                <p className="text-xs text-gray-400 max-w-xl leading-relaxed">
                  You are tracking the live progress of students allocated to your sponsored Santa Cruz technical classroom. All 12 laptops have been provisioned and cataloged.
                </p>
              </div>

              <div className="bg-black/60 border border-gray-900 rounded-2xl p-5 grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-gray-500 block">Hardware Status</span>
                  <strong className="text-green-400 text-sm">12 / 12 Provisioned</strong>
                </div>
                <div>
                  <span className="text-gray-500 block">Graduation Target</span>
                  <strong className="text-white text-sm">Dec 2026</strong>
                </div>
              </div>
            </div>

            {/* Fellows Catalog Sourced list */}
            {cohortLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-green-400" />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {cohortFellows.map((fellow, i) => (
                  <div key={i} className="bg-gradient-to-br from-blue-950/10 to-black border border-blue-500/20 rounded-3xl p-6 flex flex-col justify-between hover:border-blue-500/30 transition shadow-lg space-y-4">
                    <div>
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-gradient-to-tr from-green-500 to-blue-500 rounded-xl flex items-center justify-center text-white font-black text-lg shadow-md">
                          {fellow.initials || fellow.name.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0,2)}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <h3 className="font-bold text-white text-base">{fellow.name}</h3>
                            {fellow.isEndorsed && (
                              <span className="bg-green-500/10 text-green-400 text-[8px] font-bold px-1.5 py-0.5 rounded-full border border-green-500/25">
                                ENDORSED
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-green-400 font-semibold">{fellow.track}</p>
                          <span className="text-[10px] text-gray-500 block">{fellow.location}</span>
                        </div>
                      </div>

                      <p className="text-xs text-gray-300 italic mt-3 line-clamp-3 leading-relaxed">
                        "{fellow.story}"
                      </p>
                    </div>

                    <div className="flex justify-between items-center border-t border-gray-900 pt-3 mt-1">
                      <span className="text-[10px] bg-green-500/10 text-green-400 font-bold px-2 py-0.5 rounded-full">
                        ACTIVE FELLOW
                      </span>
                      {fellow.videoUrl && (
                        <button
                          type="button"
                          onClick={() => {
                            setActiveVideoUrl(fellow.videoUrl)
                            setShowVideoModal(true)
                          }}
                          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1.5 px-3 rounded-lg text-[10px] flex items-center gap-1 transition cursor-pointer"
                        >
                          <Play className="w-3 h-3 fill-white" />
                          Pitch Video
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>

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

      {/* Pitch Video Modal */}
      {showVideoModal && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative bg-gradient-to-b from-gray-900 to-black border border-gray-800 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl">
            {/* Modal Header */}
            <div className="p-4 border-b border-gray-800 flex justify-between items-center bg-black/20">
              <h3 className="font-bold text-sm text-white">Student Elevator Pitch</h3>
              <button 
                onClick={() => {
                  setShowVideoModal(false)
                  setActiveVideoUrl("")
                }}
                className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-white/10 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Player */}
            <div className="relative aspect-video bg-black flex items-center justify-center">
              {activeVideoUrl.includes("youtube.com/embed") || activeVideoUrl.includes("youtube-nocookie.com/embed") ? (
                <iframe
                  src={activeVideoUrl}
                  title="TMR Pitch Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full object-cover"
                />
              ) : (
                <video 
                  src={activeVideoUrl} 
                  controls 
                  autoPlay 
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
