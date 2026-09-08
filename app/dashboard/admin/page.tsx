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
  Calendar,
  Mail,
  Send,
  Sparkles,
  Eye,
  FileText,
  RefreshCw
} from "lucide-react"
import Link from "next/link"
import { doc, getDoc, setDoc, collection, query, where, orderBy, onSnapshot, collectionGroup } from "firebase/firestore"
import { db, auth } from "@/lib/firebase"
import { useAuth } from "@/app/components/AuthContext"
import { sendSignInLinkToEmail } from "firebase/auth"
import { useTranslations } from "next-intl"

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
  const t = useTranslations("Dashboard")

  const [activeSubTab, setActiveSubTab] = useState<"metrics" | "nominations" | "invite" | "donors" | "fellows" | "logs" | "matcher" | "emailMarketing">("metrics")

  // Email & Newsletter Campaign States (Resend Integration)
  const [emailCampaignView, setEmailCampaignView] = useState<"donorMarketing" | "newsletter">("donorMarketing")
  
  // Donor Marketing Form State
  const [donorOutreachEmail, setDonorOutreachEmail] = useState("")
  const [donorOutreachName, setDonorOutreachName] = useState("")
  const [donorOutreachOrg, setDonorOutreachOrg] = useState("")
  const [donorOutreachNote, setDonorOutreachNote] = useState("")
  const [donorOutreachSending, setDonorOutreachSending] = useState(false)
  const [donorOutreachSuccess, setDonorOutreachSuccess] = useState<string | null>(null)
  const [donorOutreachError, setDonorOutreachError] = useState<string | null>(null)
  const [donorOutreachPreview, setDonorOutreachPreview] = useState(false)

  // Bi-Weekly Newsletter Composer State
  const [nlIssueNum, setNlIssueNum] = useState("1")
  const [nlIssueDate, setNlIssueDate] = useState("September 2026")
  const [nlTitle, setNlTitle] = useState("From Santa Cruz to Silicon Valley: Meet Our New Coding Cohort")
  const [nlFoundersNote, setNlFoundersNote] = useState(
    "Dear friends,\n\nTwo weeks ago, we stepped into the computer lab at FAETEC Santa Cruz to meet our newest fellows. The energy in that room was electric. These students aren't just learning JavaScript; they are breaking cycles of poverty and showing their families what is possible when opportunity meets hard work.\n\nThank you for standing with us as mentors, prayer partners, and sponsors. Here is what happened over the last 14 days."
  )
  const [nlHighlights, setNlHighlights] = useState(
    "Cohorts 3 and 4 completed their React fundamentals module.\n8 new laptops delivered to FAETEC Santa Cruz fellows.\nConducted 24 live 1-on-1 virtual pairing calls between US software mentors and Rio fellows."
  )
  const [nlSpotlightName, setNlSpotlightName] = useState("Gabriel Barbosa")
  const [nlSpotlightTrack, setNlSpotlightTrack] = useState("Full-Stack Web Development")
  const [nlSpotlightQuote, setNlSpotlightQuote] = useState(
    "Before TechMission Rio, coding felt like something that only happened in other countries. Now I'm building live apps with a mentor from Chicago every Thursday."
  )
  const [nlPrayerRequests, setNlPrayerRequests] = useState(
    "Pray for reliable electricity and safety in the Western Zone neighborhoods during heavy winter rains.\nWisdom for our 12 students preparing for their first technical interview evaluations this month.\nOngoing partnership conversations with churches in Chicago and Atlanta considering classroom sponsorships."
  )
  const [nlTestEmail, setNlTestEmail] = useState("")
  const [nlSendingTest, setNlSendingTest] = useState(false)
  const [nlBroadcasting, setNlBroadcasting] = useState(false)
  const [nlStatusMsg, setNlStatusMsg] = useState<string | null>(null)
  const [nlError, setNlError] = useState<string | null>(null)
  const [nlPreview, setNlPreview] = useState(false)

  // Invite Fellow State
  const [inviteName, setInviteName] = useState("")
  const [inviteEmail, setInviteEmail] = useState("")
  const [inviteCampus, setInviteCampus] = useState("FAETEC Santa Cruz")
  const [inviteGrade, setInviteGrade] = useState("2nd Year High School")
  const [inviteTrack, setInviteTrack] = useState("Web Development")
  const [inviteLoading, setInviteLoading] = useState(false)
  const [inviteSuccess, setInviteSuccess] = useState(false)
  const [inviteError, setInviteError] = useState<string | null>(null)

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

  // Donors State
  const [donors, setDonors] = useState<any[]>([])
  const [donorsLoading, setDonorsLoading] = useState(false)
  const [donorSearch, setDonorSearch] = useState("")

  // Fellows Management State
  const [fellows, setFellows] = useState<any[]>([])
  const [fellowsLoading, setFellowsLoading] = useState(false)
  const [togglingFellow, setTogglingFellow] = useState<string | null>(null)

  // Volunteers/Orgs Logs State
  const [orgs, setOrgs] = useState<any[]>([])
  const [orgsLoading, setOrgsLoading] = useState(false)

  // AI Matcher State
  const [matcherFellowId, setMatcherFellowId] = useState("")
  const [matcherMentorIndex, setMatcherMentorIndex] = useState(0)
  const [matcherLoading, setMatcherLoading] = useState(false)
  const [matcherResult, setMatcherResult] = useState<any>(null)

  // Sprint 13 operational metrics & YTD indicators
  const [matchesCount, setMatchesCount] = useState(14)
  const [allNominationsCount, setAllNominationsCount] = useState(48)
  const [avgDonationSize, setAvgDonationSize] = useState(75)
  const [recurringPercentage, setRecurringPercentage] = useState(30)

  // Sprint 14 Annual Impact Report states
  const [reportTriggering, setReportTriggering] = useState(false)
  const [reportResult, setReportResult] = useState<any>(null)

  // Sprint 15 pairing confirm states
  const [confirmingMatch, setConfirmingMatch] = useState(false)
  const [confirmResult, setConfirmResult] = useState<any>(null)
  
  const defaultMentors = [
    { name: "Sarah Jenkins", specialization: "Senior React Engineer at Microsoft", background: "10+ years building scalable frontends, TypeScript expert, accessibility enthusiast." },
    { name: "Marcus Chen", specialization: "Staff Mobile Architect at Airbnb", background: "React Native developer, focused on iOS/Android native bridges and performance optimization." },
    { name: "Diana Prince", specialization: "Principal Data Scientist at Amazon", background: "Python core contributor, ML ops workflow specialist, dashboard visualization expert." },
    { name: "John Carter", specialization: "Lead Product Designer at Figma", background: "Design systems manager, wireframing, high-fidelity prototypes, user research facilitator." }
  ]

  // Soft Guard redirecting non-admin users
  useEffect(() => {
    if (!authLoading) {
      const hasAdminRole = 
        profile?.isAdmin === true || 
        user?.email === "admin@techmissionrio.org" || 
        user?.email === "techmissionrio@gmail.com"
      
      if (!user || !hasAdminRole) {
        router.replace("/")
      }
    }
  }, [user, profile, authLoading, router])

  // Fetch current database statistics (Metrics)
  useEffect(() => {
    const hasAdminRole = 
      profile?.isAdmin === true || 
      user?.email === "admin@techmissionrio.org" || 
      user?.email === "techmissionrio@gmail.com"
    if (!user || !hasAdminRole) return

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

  useEffect(() => {
    const hasAdminRole = 
      profile?.isAdmin === true || 
      user?.email === "admin@techmissionrio.org" || 
      user?.email === "techmissionrio@gmail.com"
    if (!user || !hasAdminRole) return

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

  // Fetch Donors, Fellows, and Orgs for Admin Management
  useEffect(() => {
    const hasAdminRole = 
      profile?.isAdmin === true || 
      user?.email === "admin@techmissionrio.org" || 
      user?.email === "techmissionrio@gmail.com"
    if (!user || !hasAdminRole) return

    // 1. Fetch Donors
    setDonorsLoading(true)
    const donorsQuery = query(
      collection(db, "users"),
      where("profileType", "in", ["individual", "organization"]),
      orderBy("createdAt", "desc")
    )
    const unsubDonors = onSnapshot(donorsQuery, (snap) => {
      const list: any[] = []
      snap.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() })
      })
      setDonors(list)
      setDonorsLoading(false)
    }, (err) => {
      console.warn("Donors snapshot error (using mock fallback):", err)
      setDonors([
        { id: "donor-mock-1", name: "David Miller", email: "david.miller@example.com", profileType: "individual", createdAt: { toDate: () => new Date("2026-05-15") } },
        { id: "donor-mock-2", name: "Grace Fellowship Atlanta", email: "missions@gracefellowship.org", profileType: "organization", createdAt: { toDate: () => new Date("2026-06-01") } }
      ])
      setDonorsLoading(false)
    })

    // 2. Fetch Fellows
    setFellowsLoading(true)
    const fellowsQuery = query(
      collection(db, "fellows"),
      orderBy("approvedAt", "desc")
    )
    const unsubFellows = onSnapshot(fellowsQuery, (snap) => {
      const list: any[] = []
      snap.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() })
      })
      setFellows(list)
      setFellowsLoading(false)
    }, (err) => {
      console.warn("Fellows snapshot error (using mock fallback):", err)
      setFellows([
        { id: "fellow-mock-1", name: "Thiago Silva Santos", schoolCampus: "FAETEC Santa Cruz", isEndorsed: true, isVisible: true, approvedAt: { toDate: () => new Date() } },
        { id: "fellow-mock-2", name: "Beatriz Oliveira", schoolCampus: "IFRJ Realengo", isEndorsed: true, isVisible: false, approvedAt: { toDate: () => new Date() } }
      ])
      setFellowsLoading(false)
    })

    // 3. Fetch Orgs
    setOrgsLoading(true)
    const orgsQuery = query(
      collection(db, "organizations"),
      orderBy("createdAt", "desc")
    )
    const unsubOrgs = onSnapshot(orgsQuery, (snap) => {
      const list: any[] = []
      snap.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() })
      })
      setOrgs(list)
      setOrgsLoading(false)
    }, (err) => {
      console.warn("Orgs snapshot error (using mock fallback):", err)
      setOrgs([
        { id: "org-mock-1", orgName: "Calvary Chapel Rio", denomination: "Calvary Chapel", adminUid: "calvary-chapel-admin", joined: "2026-04-10" },
        { id: "org-mock-2", orgName: "Redeemer Presbyterian NYC", denomination: "Presbyterian", adminUid: "presbyterian-admin", joined: "2026-05-22" }
      ])
      setOrgsLoading(false)
    })

    return () => {
      unsubDonors()
      unsubFellows()
      unsubOrgs()
    }
  }, [user, profile])

  // Listeners for YTD operational statistics & donations aggregation
  useEffect(() => {
    const hasAdminRole = 
      profile?.isAdmin === true || 
      user?.email === "admin@techmissionrio.org" || 
      user?.email === "techmissionrio@gmail.com"
    if (!user || !hasAdminRole) return

    // 1. Listen to Matches
    const unsubMatches = onSnapshot(collection(db, "matches"), (snap) => {
      setMatchesCount(snap.size)
    }, (err) => console.warn("Matches count snapshot error:", err))

    // 2. Listen to Nominations (total)
    const unsubAllNominations = onSnapshot(collection(db, "nominations"), (snap) => {
      setAllNominationsCount(snap.size)
    }, (err) => console.warn("All nominations count snapshot error:", err))

    // 3. Listen to all Donations (CollectionGroup)
    const unsubDonations = onSnapshot(collectionGroup(db, "donations"), (snap) => {
      if (!snap.empty) {
        let total = 0
        let count = 0
        let recurringCount = 0
        snap.forEach((doc) => {
          const data = doc.data()
          const amt = Number(data.amount || 0)
          total += amt
          count++
          if (data.frequency === "monthly" || data.donationType === "monthly") {
            recurringCount++
          }
        })
        if (count > 0) {
          setAvgDonationSize(total / count)
          setRecurringPercentage(Math.round((recurringCount / count) * 100))
        }
      }
    }, (err) => {
      console.warn("Donations collectionGroup error (using default calculation fallbacks):", err)
    })

    return () => {
      unsubMatches()
      unsubAllNominations()
      unsubDonations()
    }
  }, [user, profile])

  const handleTriggerAnnualReport = async () => {
    setReportTriggering(true)
    setReportResult(null)
    setApiError("")
    try {
      const res = await fetch("/api/admin/reports/annual-impact", {
        method: "POST",
      })
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error || "Failed to trigger report compilation")
      }
      setReportResult(data)
    } catch (err: any) {
      console.error(err)
      setApiError(err.message || "Failed to trigger report compilation")
    } finally {
      setReportTriggering(false)
    }
  }

  const handleConfirmMatch = async () => {
    if (!matcherFellowId || !matcherResult) return
    setConfirmingMatch(true)
    setConfirmResult(null)
    setApiError("")
    try {
      const selectedMentor = defaultMentors[matcherMentorIndex]
      const res = await fetch("/api/admin/matches/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentId: matcherFellowId,
          mentorUid: selectedMentor.name,
          mentorName: selectedMentor.name,
          matchScore: matcherResult.score
        })
      })
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error || "Failed to confirm match")
      }
      setConfirmResult(data)
    } catch (err: any) {
      console.error(err)
      setApiError(err.message || "Failed to confirm match")
    } finally {
      setConfirmingMatch(false)
    }
  }

  const handleSendDonorMarketing = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!donorOutreachEmail || !donorOutreachEmail.includes("@")) {
      setDonorOutreachError("Please specify a valid recipient email.")
      return
    }

    setDonorOutreachSending(true)
    setDonorOutreachError(null)
    setDonorOutreachSuccess(null)

    try {
      const res = await fetch("/api/marketing/send-donor-outreach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recipientEmail: donorOutreachEmail.trim(),
          donorName: donorOutreachName.trim() || undefined,
          organizationName: donorOutreachOrg.trim() || undefined,
          customNote: donorOutreachNote.trim() || undefined,
        }),
      })

      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error || "Failed to dispatch marketing email.")
      }

      setDonorOutreachSuccess(
        `Donor outreach email successfully dispatched${data.simulated ? " (Simulation mode: RESEND_API_KEY pending)" : " via Resend"} to ${donorOutreachEmail.trim()}!`
      )
      setDonorOutreachEmail("")
      setDonorOutreachNote("")
    } catch (err: any) {
      console.error(err)
      setDonorOutreachError(err.message || "Failed to send email.")
    } finally {
      setDonorOutreachSending(false)
    }
  }

  const handleSendNewsletterTest = async () => {
    const targetEmail = nlTestEmail.trim() || user?.email || ""
    if (!targetEmail || !targetEmail.includes("@")) {
      setNlError("Please enter a valid test email address.")
      return
    }

    setNlSendingTest(true)
    setNlError(null)
    setNlStatusMsg(null)

    try {
      const res = await fetch("/api/marketing/send-newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: "test",
          testEmail: targetEmail,
          issueNumber: nlIssueNum,
          issueDate: nlIssueDate,
          issueTitle: nlTitle,
          foundersNote: nlFoundersNote,
          classroomHighlights: nlHighlights.split("\n").filter(Boolean),
          studentSpotlight: nlSpotlightName ? {
            name: nlSpotlightName,
            track: nlSpotlightTrack,
            highlight: nlSpotlightQuote,
          } : undefined,
          prayerAndSupportRequests: nlPrayerRequests.split("\n").filter(Boolean),
        }),
      })

      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error || "Failed to send test newsletter.")
      }

      setNlStatusMsg(
        `Test newsletter successfully delivered${data.simulated ? " (Simulated)" : ""} to ${targetEmail}!`
      )
    } catch (err: any) {
      console.error(err)
      setNlError(err.message || "Failed to send test newsletter.")
    } finally {
      setNlSendingTest(false)
    }
  }

  const handleBroadcastNewsletter = async () => {
    if (!window.confirm(`Are you sure you want to broadcast Issue #${nlIssueNum} to all subscribers and donors?`)) {
      return
    }

    setNlBroadcasting(true)
    setNlError(null)
    setNlStatusMsg(null)

    try {
      const res = await fetch("/api/marketing/send-newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: "broadcast",
          issueNumber: nlIssueNum,
          issueDate: nlIssueDate,
          issueTitle: nlTitle,
          foundersNote: nlFoundersNote,
          classroomHighlights: nlHighlights.split("\n").filter(Boolean),
          studentSpotlight: nlSpotlightName ? {
            name: nlSpotlightName,
            track: nlSpotlightTrack,
            highlight: nlSpotlightQuote,
          } : undefined,
          prayerAndSupportRequests: nlPrayerRequests.split("\n").filter(Boolean),
        }),
      })

      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error || "Failed to broadcast newsletter.")
      }

      setNlStatusMsg(
        `Bi-weekly newsletter broadcast completed! Successfully delivered to ${data.successfulCount} recipient(s).`
      )
    } catch (err: any) {
      console.error(err)
      setNlError(err.message || "Failed to broadcast newsletter.")
    } finally {
      setNlBroadcasting(false)
    }
  }

  const handleToggleFellowVisibility = async (fellowId: string, currentVisibility: boolean) => {
    if (!user) return
    setTogglingFellow(fellowId)
    try {
      const idToken = await user.getIdToken()
      const res = await fetch("/api/admin/nomination-action", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "toggle-visibility",
          fellowId,
          idToken
        })
      })

      if (!res.ok) {
        throw new Error("Failed to toggle fellow visibility status")
      }

      const data = await res.json()
      
      // Optimistic client-side update
      setFellows(prev => prev.map(f => f.id === fellowId ? { ...f, isVisible: data.isVisible } : f))
      
      // Gate PostHog event under cookie consent
      const consent = localStorage.getItem("tmr_cookie_consent")
      if (consent === "accepted" && typeof window !== "undefined") {
        import("posthog-js").then(({ default: posthog }) => {
          posthog.capture("fellow_visibility_toggled", { fellowId, isVisible: data.isVisible })
        })
      }
    } catch (err) {
      console.error("Error toggling visibility:", err)
      alert("Failed to toggle fellow visibility. Please try again.")
    } finally {
      setTogglingFellow(null)
    }
  }

  const triggerDonorSearchAnalytics = (count: number) => {
    const consent = localStorage.getItem("tmr_cookie_consent")
    if (consent === "accepted" && typeof window !== "undefined") {
      import("posthog-js").then(({ default: posthog }) => {
        posthog.capture("admin_donor_searched", { resultCount: count })
      })
    }
  }

  const handleTriggerAIMatch = async () => {
    if (!matcherFellowId) {
      alert("Please select a student fellow first.")
      return
    }

    setMatcherLoading(true)
    setMatcherResult(null)
    try {
      const selectedMentor = defaultMentors[matcherMentorIndex]
      const res = await fetch("/api/ai/match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fellowId: matcherFellowId,
          mentorProfile: selectedMentor
        })
      })

      if (!res.ok) {
        throw new Error("Failed to execute AI matching analysis")
      }

      const data = await res.json()
      setMatcherResult(data.match)
    } catch (err: any) {
      console.error("AI matching failed:", err)
      alert(err.message || "Failed to analyze compatibility. Please try again.")
    } finally {
      setMatcherLoading(false)
    }
  }

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

  const handleInviteFellow = async (e: React.FormEvent) => {
    e.preventDefault()
    setInviteLoading(true)
    setInviteError(null)
    setInviteSuccess(false)

    try {
      const fellowsColRef = collection(db, "fellows")
      const fellowDocRef = doc(fellowsColRef)
      const newFellowId = fellowDocRef.id

      // Seed the fellows profile in Firestore
      await setDoc(fellowDocRef, {
        id: newFellowId,
        name: inviteName,
        email: inviteEmail.toLowerCase(),
        schoolCampus: inviteCampus,
        grade: inviteGrade,
        track: inviteTrack,
        initials: inviteName.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2) || "ST",
        location: inviteCampus.split(" ")[0] || "Rio de Janeiro",
        joinedDate: new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }),
        bio: {
          en: "Ready to embark on coding journey.",
          pt: "Pronto para iniciar a jornada de programação."
        },
        skills: [inviteTrack],
        goal: "Transition to technical developer role.",
        github: "",
        linkedin: "",
        portfolio: "",
        videoUrl: "",
        isEndorsed: true, // Admin invites are pre-endorsed
        createdAt: new Date().toISOString()
      })

      // Configure sign-in action redirect URL containing the pre-created fellow ID
      const actionCodeSettings = {
        url: `${window.location.origin}/auth/action?fellowId=${newFellowId}&email=${encodeURIComponent(inviteEmail.toLowerCase())}`,
        handleCodeInApp: true,
      }

      await sendSignInLinkToEmail(auth, inviteEmail.toLowerCase(), actionCodeSettings)
      
      // Store email locally
      window.localStorage.setItem("emailForSignIn", inviteEmail.toLowerCase())

      setInviteSuccess(true)
      setInviteName("")
      setInviteEmail("")
    } catch (err: any) {
      console.error("Invite fellow error:", err)
      setInviteError(err.message || "Failed to submit invitation link.")
    } finally {
      setInviteLoading(false)
    }
  }

  const hasAdminRole = 
    profile?.isAdmin === true || 
    user?.email === "admin@techmissionrio.org" || 
    user?.email === "techmissionrio@gmail.com"

  if (authLoading || !user || !hasAdminRole) {
    return null
  }

  return (
    <div className="bg-black text-white min-h-screen relative overflow-hidden">
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full max-w-7xl h-[400px] bg-gradient-to-b from-yellow-950/10 via-black to-transparent pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 py-12 relative z-10 space-y-8">
        
        {/* Navigation back */}
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm transition">
          <ArrowLeft className="w-4 h-4" />
          {t("backToDashboard", { defaultValue: "Back to Dashboard" })}
        </Link>

        {/* Header */}
        <div className="border-b border-gray-900 pb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-start gap-4">
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-3">
              <ShieldCheck className="w-8 h-8 text-yellow-400" />
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-tight">{t("adminControlCenter")}</h1>
              <p className="text-gray-400 text-sm mt-1">{t("adminControlCenterDesc")}</p>
            </div>
          </div>

          {/* Sub-tab selectors */}
          <div className="flex bg-gray-950/60 p-1 border border-gray-900 rounded-xl flex-wrap gap-1 md:flex-nowrap">
            <button
              onClick={() => setActiveSubTab("metrics")}
              className={`py-2 px-3 rounded-lg text-[11px] font-bold transition ${activeSubTab === "metrics" ? "bg-yellow-500 text-black" : "text-gray-400 hover:text-white"}`}
            >
              {t("globalMetrics")}
            </button>
            <button
              onClick={() => setActiveSubTab("nominations")}
              className={`py-2 px-3 rounded-lg text-[11px] font-bold transition flex items-center gap-1.5 ${activeSubTab === "nominations" ? "bg-yellow-500 text-black" : "text-gray-400 hover:text-white"}`}
            >
              <Users className="w-3.5 h-3.5" />
              {t("nominationReviews")}
              {nominations.length > 0 && (
                <span className="bg-red-500 text-white text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-bold">
                  {nominations.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveSubTab("invite")}
              className={`py-2 px-3 rounded-lg text-[11px] font-bold transition ${activeSubTab === "invite" ? "bg-yellow-500 text-black" : "text-gray-400 hover:text-white"}`}
            >
              {t("inviteFellow")}
            </button>
            <button
              onClick={() => setActiveSubTab("donors")}
              className={`py-2 px-3 rounded-lg text-[11px] font-bold transition ${activeSubTab === "donors" ? "bg-yellow-500 text-black" : "text-gray-400 hover:text-white"}`}
            >
              Donors
            </button>
            <button
              onClick={() => setActiveSubTab("fellows")}
              className={`py-2 px-3 rounded-lg text-[11px] font-bold transition ${activeSubTab === "fellows" ? "bg-yellow-500 text-black" : "text-gray-400 hover:text-white"}`}
            >
              Fellows List
            </button>
            <button
              onClick={() => setActiveSubTab("logs")}
              className={`py-2 px-3 rounded-lg text-[11px] font-bold transition ${activeSubTab === "logs" ? "bg-yellow-500 text-black" : "text-gray-400 hover:text-white"}`}
            >
              Org Logs
            </button>
            <button
              onClick={() => setActiveSubTab("matcher")}
              className={`py-2 px-3 rounded-lg text-[11px] font-bold transition ${activeSubTab === "matcher" ? "bg-yellow-500 text-black" : "text-gray-400 hover:text-white"}`}
            >
              AI Matcher
            </button>
            <button
              onClick={() => setActiveSubTab("emailMarketing")}
              className={`py-2 px-3 rounded-lg text-[11px] font-bold transition flex items-center gap-1.5 ${activeSubTab === "emailMarketing" ? "bg-yellow-500 text-black" : "text-gray-400 hover:text-white"}`}
            >
              <Mail className="w-3.5 h-3.5" />
              Email & Newsletters
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

            {/* Live YTD Operational Metrics (Sprint 13 KPIs) */}
            <div className="bg-gradient-to-br from-gray-950 to-black border border-gray-900 rounded-3xl p-8 space-y-6">
              <h2 className="text-xl font-bold border-b border-gray-900 pb-3 flex items-center gap-2">
                <Activity className="w-5 h-5 text-green-400" />
                Live YTD Operational Statistics
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-black/50 border border-gray-900 rounded-2xl p-5 text-center">
                  <div className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">Average Donation Size</div>
                  <div className="text-3xl font-black text-white mt-2">${avgDonationSize.toFixed(2)}</div>
                  <p className="text-[9px] text-gray-500 mt-1">Computed from all Stripe transactions</p>
                </div>
                <div className="bg-black/50 border border-gray-900 rounded-2xl p-5 text-center">
                  <div className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">Monthly Recurring %</div>
                  <div className="text-3xl font-black text-blue-400 mt-2">{recurringPercentage}%</div>
                  <p className="text-[9px] text-gray-500 mt-1">Ratio of subscription plans</p>
                </div>
                <div className="bg-black/50 border border-gray-900 rounded-2xl p-5 text-center">
                  <div className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">YTD Nominations Sourced</div>
                  <div className="text-3xl font-black text-yellow-400 mt-2">{allNominationsCount}</div>
                  <p className="text-[9px] text-gray-500 mt-1">Total student nomination logs</p>
                </div>
                <div className="bg-black/50 border border-gray-900 rounded-2xl p-5 text-center">
                  <div className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">Confirmed Matches</div>
                  <div className="text-3xl font-black text-green-400 mt-2">{matchesCount}</div>
                  <p className="text-[9px] text-gray-500 mt-1">Confirmed student-mentor pairs</p>
                </div>
              </div>
            </div>

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
                      <label htmlFor="metrics-laptops" className="text-xs font-bold uppercase tracking-wider text-gray-400">Laptops Distributed</label>
                      <input
                        id="metrics-laptops"
                        type="number"
                        value={metrics.laptopsDistributed}
                        onChange={(e) => handleInputChange("laptopsDistributed", Number(e.target.value))}
                        className="w-full bg-black border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 text-sm"
                        required
                        min="0"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="metrics-hours" className="text-xs font-bold uppercase tracking-wider text-gray-400">Mentorship Hours</label>
                      <input
                        id="metrics-hours"
                        type="number"
                        value={metrics.mentorshipHours}
                        onChange={(e) => handleInputChange("mentorshipHours", Number(e.target.value))}
                        className="w-full bg-black border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 text-sm"
                        required
                        min="0"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="metrics-partners" className="text-xs font-bold uppercase tracking-wider text-gray-400">Active Partners</label>
                      <input
                        id="metrics-partners"
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
                      <label htmlFor="budget-hardware" className="text-xs font-bold uppercase tracking-wider text-gray-400">Laptops & Hardware (%)</label>
                      <input
                        id="budget-hardware"
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
                      <label htmlFor="budget-training" className="text-xs font-bold uppercase tracking-wider text-gray-400">Technical Training (%)</label>
                      <input
                        id="budget-training"
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
                      <label htmlFor="budget-ops" className="text-xs font-bold uppercase tracking-wider text-gray-400">Administration & Ops (%)</label>
                      <input
                        id="budget-ops"
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
                    <span className="text-gray-400 font-semibold uppercase tracking-wider">Total Ratio Verification Check:</span>
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

            {/* Annual Impact Report Card */}
            <div className="bg-gradient-to-br from-pink-950/10 via-black to-blue-900/10 border border-gray-900 rounded-3xl p-8 space-y-6 mt-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <Archive className="w-5 h-5 text-pink-400" />
                    Annual Impact Report Generator
                  </h2>
                  <p className="text-xs text-gray-400 mt-1">
                    Compile YTD performance records, auto-generate report PDFs, and trigger email campaigns to active donors via Firebase Trigger Email.
                  </p>
                </div>
                <button
                  type="button"
                  disabled={reportTriggering}
                  onClick={handleTriggerAnnualReport}
                  className="bg-pink-500 hover:bg-pink-600 disabled:opacity-50 text-white font-extrabold py-3 px-6 rounded-xl flex items-center gap-2 transition text-xs cursor-pointer"
                >
                  {reportTriggering ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Mailing Report...
                    </>
                  ) : (
                    <>
                      <Mail className="w-4 h-4" />
                      Compile & Email Report
                    </>
                  )}
                </button>
              </div>
              {reportResult && (
                <div className="bg-green-950/20 border border-green-500/30 rounded-2xl p-4 text-xs space-y-2 text-green-400">
                  <p className="font-bold flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-green-400" />
                    Report successfully generated and dispatched!
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-gray-300">
                    <li>Total Donations Summed: <strong>${reportResult.stats.totalDonations} USD</strong></li>
                    <li>Laptops Distributed: <strong>{reportResult.stats.laptopsDistributed} units</strong></li>
                    <li>Fellows Approved: <strong>{reportResult.stats.fellowsApproved} trainees</strong></li>
                    <li>Total Nominations Sourced: <strong>{reportResult.stats.nominationsSourced} logs</strong></li>
                    <li>Emails Dispatched to Queue: <strong>{reportResult.emailsQueued} active supporters</strong></li>
                  </ul>
                </div>
              )}
            </div>
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

        {/* TAB 3: Invite Fellow Form */}
        {activeSubTab === "invite" && (
          <div className="bg-gradient-to-br from-blue-900/10 via-black to-blue-900/10 border border-blue-500/20 rounded-3xl p-8 space-y-6">
            <div>
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Users className="w-6 h-6 text-yellow-400" />
                Invite Pre-Accredited Fellow
              </h2>
              <p className="text-sm text-gray-400">
                Register a new candidate. The system will send a secure passwordless sign-in invitation directly to their email inbox.
              </p>
            </div>

            {inviteSuccess && (
              <div className="bg-green-950/40 border border-green-500/30 rounded-xl p-4 flex items-center gap-3 text-green-400 text-sm">
                <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                <span>Invitation email successfully transmitted to candidate! Profile pre-seeded in database.</span>
              </div>
            )}

            {inviteError && (
              <div className="bg-red-950/40 border border-red-500/30 rounded-xl p-4 flex items-center gap-3 text-red-400 text-sm">
                <AlertTriangle className="w-5 h-5 flex-shrink-0" />
                <span>{inviteError}</span>
              </div>
            )}

            <form onSubmit={handleInviteFellow} className="space-y-6 max-w-xl">
              <div className="space-y-2">
                <label htmlFor="invite-name" className="block text-sm font-medium text-gray-300">Student Name</label>
                <input
                  id="invite-name"
                  type="text"
                  required
                  placeholder="e.g. Gabriel Barbosa"
                  value={inviteName}
                  onChange={(e) => setInviteName(e.target.value)}
                  className="w-full bg-black border border-gray-800 rounded-xl py-3 px-4 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 transition"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="invite-email" className="block text-sm font-medium text-gray-300">Email Address</label>
                <input
                  id="invite-email"
                  type="email"
                  required
                  placeholder="e.g. gabriel@faetec.br"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  className="w-full bg-black border border-gray-800 rounded-xl py-3 px-4 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 transition"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="invite-campus" className="block text-sm font-medium text-gray-300">School Campus</label>
                  <select
                    id="invite-campus"
                    value={inviteCampus}
                    onChange={(e) => setInviteCampus(e.target.value)}
                    className="w-full bg-black border border-gray-800 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-yellow-500 transition"
                  >
                    <option value="FAETEC Santa Cruz">FAETEC Santa Cruz</option>
                    <option value="FAETEC Quintino">FAETEC Quintino</option>
                    <option value="IFRJ Duque de Caxias">IFRJ Duque de Caxias</option>
                    <option value="IFRJ Rio de Janeiro">IFRJ Rio de Janeiro</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="invite-grade" className="block text-sm font-medium text-gray-300">Grade Level</label>
                  <select
                    id="invite-grade"
                    value={inviteGrade}
                    onChange={(e) => setInviteGrade(e.target.value)}
                    className="w-full bg-black border border-gray-800 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-yellow-500 transition"
                  >
                    <option value="1st Year High School">1st Year High School</option>
                    <option value="2nd Year High School">2nd Year High School</option>
                    <option value="3rd Year High School">3rd Year High School</option>
                    <option value="Technical Prep">Technical Prep</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="invite-track" className="block text-sm font-medium text-gray-300">IT Specialization Track</label>
                <select
                  id="invite-track"
                  value={inviteTrack}
                  onChange={(e) => setInviteTrack(e.target.value)}
                  className="w-full bg-black border border-gray-800 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-yellow-500 transition"
                >
                  <option value="Web Development">Web Development</option>
                  <option value="Mobile App Development">Mobile App Development</option>
                  <option value="Data Science">Data Science</option>
                  <option value="UI/UX Design">UI/UX Design</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={inviteLoading}
                className="bg-yellow-500 hover:bg-yellow-600 disabled:bg-yellow-500/50 text-black font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 transition cursor-pointer text-sm font-bold"
              >
                {inviteLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Sending Invitation...
                  </>
                ) : (
                  "Transmit Invite Link"
                )}
              </button>
            </form>
          </div>
        )}

        {/* TAB 4: Donors Search */}
        {activeSubTab === "donors" && (
          <div className="bg-gradient-to-br from-blue-900/10 via-black to-blue-900/10 border border-blue-500/20 rounded-3xl p-8 space-y-6">
            <div>
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Users className="w-6 h-6 text-yellow-400" />
                Donor Search Directory
              </h2>
              <p className="text-sm text-gray-400">
                Lookup registered individual donors and sponsoring organizations.
              </p>
            </div>

            <div className="max-w-md">
              <input
                type="text"
                placeholder="Search donors by name or email..."
                value={donorSearch}
                onChange={(e) => {
                  const val = e.target.value
                  setDonorSearch(val)
                  const filteredCount = donors.filter(d => 
                    d.name?.toLowerCase().includes(val.toLowerCase()) || 
                    d.email?.toLowerCase().includes(val.toLowerCase())
                  ).length
                  triggerDonorSearchAnalytics(filteredCount)
                }}
                className="w-full bg-black border border-gray-800 rounded-xl py-3 px-4 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 transition"
              />
            </div>

            {donorsLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-yellow-500" />
              </div>
            ) : (
              <div className="overflow-x-auto border border-gray-900 rounded-2xl bg-black/40">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-gray-900 text-gray-400 text-xs font-semibold">
                      <th className="py-3.5 px-4">Name</th>
                      <th className="py-3.5 px-4">Email</th>
                      <th className="py-3.5 px-4">Profile Type</th>
                      <th className="py-3.5 px-4">Joined Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-900 text-xs">
                    {donors
                      .filter(d => 
                        !donorSearch || 
                        d.name?.toLowerCase().includes(donorSearch.toLowerCase()) || 
                        d.email?.toLowerCase().includes(donorSearch.toLowerCase())
                      )
                      .map((donor) => {
                        const joinedDate = donor.createdAt && typeof donor.createdAt.toDate === "function"
                          ? donor.createdAt.toDate().toLocaleDateString("en-US")
                          : donor.joinedDate || "N/A"
                        return (
                          <tr key={donor.id} className="hover:bg-gray-900/30 transition">
                            <td className="py-3.5 px-4 font-semibold text-white">{donor.name || "Anonymous"}</td>
                            <td className="py-3.5 px-4 text-gray-300">{donor.email}</td>
                            <td className="py-3.5 px-4">
                              <span className={`px-2.5 py-0.5 rounded-full font-bold uppercase text-[9px] ${
                                donor.profileType === "organization" 
                                  ? "bg-purple-500/20 border border-purple-500/30 text-purple-400" 
                                  : "bg-blue-500/20 border border-blue-500/30 text-blue-400"
                              }`}>
                                {donor.profileType}
                              </span>
                            </td>
                            <td className="py-3.5 px-4 text-gray-400">{joinedDate}</td>
                          </tr>
                        )
                      })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TAB 5: Fellows Management */}
        {activeSubTab === "fellows" && (
          <div className="bg-gradient-to-br from-blue-900/10 via-black to-blue-900/10 border border-blue-500/20 rounded-3xl p-8 space-y-6">
            <div>
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Users className="w-6 h-6 text-yellow-400" />
                Fellows Visibility Controls
              </h2>
              <p className="text-sm text-gray-400">
                Manage who appears on the public fellows directory and monitor endorsements.
              </p>
            </div>

            {fellowsLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-yellow-500" />
              </div>
            ) : (
              <div className="overflow-x-auto border border-gray-900 rounded-2xl bg-black/40">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-gray-900 text-gray-400 text-xs font-semibold">
                      <th className="py-3.5 px-4">Name</th>
                      <th className="py-3.5 px-4">Campus</th>
                      <th className="py-3.5 px-4">Endorsement</th>
                      <th className="py-3.5 px-4 text-center">Visibility</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-900 text-xs">
                    {fellows.map((fellow) => (
                      <tr key={fellow.id} className="hover:bg-gray-900/30 transition">
                        <td className="py-3.5 px-4 font-semibold text-white">{fellow.name}</td>
                        <td className="py-3.5 px-4 text-gray-300">{fellow.schoolCampus}</td>
                        <td className="py-3.5 px-4">
                          {fellow.isEndorsed ? (
                            <span className="bg-green-500/20 border border-green-500/30 text-green-400 font-bold px-2 py-0.5 rounded-full text-[9px] uppercase">
                              Endorsed
                            </span>
                          ) : (
                            <span className="bg-gray-800 text-gray-500 px-2 py-0.5 rounded-full text-[9px] uppercase">
                              None
                            </span>
                          )}
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <button
                            onClick={() => handleToggleFellowVisibility(fellow.id, fellow.isVisible ?? true)}
                            disabled={togglingFellow === fellow.id}
                            className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${
                              fellow.isVisible ?? true
                                ? "bg-green-600 hover:bg-green-500 text-black"
                                : "bg-red-950 hover:bg-red-900 border border-red-500/30 text-red-400"
                            }`}
                          >
                            {togglingFellow === fellow.id ? (
                              <Loader2 className="w-3.5 h-3.5 animate-spin mx-auto text-white" />
                            ) : fellow.isVisible ?? true ? (
                              "Visible"
                            ) : (
                              "Hidden"
                            )}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TAB 6: Volunteer / Org Log */}
        {activeSubTab === "logs" && (
          <div className="bg-gradient-to-br from-blue-900/10 via-black to-blue-900/10 border border-blue-500/20 rounded-3xl p-8 space-y-6">
            <div>
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Building2 className="w-6 h-6 text-yellow-400" />
                Church Organizations Directory
              </h2>
              <p className="text-sm text-gray-400">
                Read-only logs of participating local church partners.
              </p>
            </div>

            {orgsLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-yellow-500" />
              </div>
            ) : (
              <div className="overflow-x-auto border border-gray-900 rounded-2xl bg-black/40">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-gray-900 text-gray-400 text-xs font-semibold">
                      <th className="py-3.5 px-4">Organization Name</th>
                      <th className="py-3.5 px-4">Denomination</th>
                      <th className="py-3.5 px-4">Admin UID</th>
                      <th className="py-3.5 px-4">Joined Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-900 text-xs">
                    {orgs.map((org) => (
                      <tr key={org.id} className="hover:bg-gray-900/30 transition">
                        <td className="py-3.5 px-4 font-semibold text-white">{org.orgName}</td>
                        <td className="py-3.5 px-4 text-gray-300">{org.denomination}</td>
                        <td className="py-3.5 px-4 text-gray-500 font-mono text-[10px]">{org.adminUid}</td>
                        <td className="py-3.5 px-4 text-gray-400">{org.joined || "N/A"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TAB 7: AI Matcher */}
        {activeSubTab === "matcher" && (
          <div className="bg-gradient-to-br from-blue-900/10 via-black to-blue-900/10 border border-blue-500/20 rounded-3xl p-8 space-y-6">
            <div>
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Laptop className="w-6 h-6 text-yellow-400" />
                AI Student-Mentor Matcher
              </h2>
              <p className="text-sm text-gray-400">
                Leverage OpenAI integrations to evaluate compatibility and alignment recommendations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                {/* Fellow selector */}
                <div className="space-y-2">
                  <label htmlFor="matcher-fellow" className="block text-sm font-medium text-gray-300">Select Student Fellow</label>
                  <select
                    id="matcher-fellow"
                    value={matcherFellowId}
                    onChange={(e) => setMatcherFellowId(e.target.value)}
                    className="w-full bg-black border border-gray-800 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-yellow-500 transition"
                  >
                    <option value="">-- Choose a Fellow --</option>
                    {fellows.map((f) => (
                      <option key={f.id} value={f.id}>{f.name} ({f.schoolCampus})</option>
                    ))}
                  </select>
                </div>

                {/* Mentor profile selector */}
                <div className="space-y-2">
                  <label htmlFor="matcher-mentor" className="block text-sm font-medium text-gray-300">Select Mentor Profile</label>
                  <select
                    id="matcher-mentor"
                    value={matcherMentorIndex}
                    onChange={(e) => setMatcherMentorIndex(Number(e.target.value))}
                    className="w-full bg-black border border-gray-800 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-yellow-500 transition"
                  >
                    {defaultMentors.map((m, index) => (
                      <option key={index} value={index}>{m.name} - {m.specialization}</option>
                    ))}
                  </select>
                </div>

                {/* Show details of selected mentor */}
                <div className="p-4 rounded-xl border border-gray-800 bg-gray-950/40 text-xs space-y-2">
                  <p className="text-gray-400 font-semibold">Mentor Background:</p>
                  <p className="text-white">{defaultMentors[matcherMentorIndex].background}</p>
                </div>

                <button
                  onClick={handleTriggerAIMatch}
                  disabled={matcherLoading || !matcherFellowId}
                  className="w-full bg-yellow-500 hover:bg-yellow-600 disabled:bg-yellow-500/50 text-black font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 transition cursor-pointer text-sm"
                >
                  {matcherLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Analyzing Compatibility...
                    </>
                  ) : (
                    "Execute AI Matching Analysis"
                  )}
                </button>
              </div>

              {/* Match Result Display */}
              <div className="border border-gray-900 rounded-3xl p-6 bg-black/40 flex flex-col justify-center min-h-[300px]">
                {matcherResult ? (
                  <div className="space-y-6">
                    {/* Compatibility score gauge */}
                    <div className="flex items-center justify-between border-b border-gray-900 pb-4">
                      <div>
                        <h3 className="text-lg font-bold text-white">Analysis Results</h3>
                        <p className="text-xs text-gray-500">Structured evaluation response</p>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="text-3xl font-black text-yellow-400">{matcherResult.score}%</div>
                        <div className="text-[10px] text-gray-400 font-bold uppercase">Compatibility</div>
                      </div>
                    </div>

                    {/* Reasoning */}
                    <div className="space-y-2">
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Evaluation Reasoning</p>
                      <p className="text-sm text-gray-200 leading-relaxed">{matcherResult.reasoning}</p>
                    </div>

                    {/* Alignment Factors */}
                    {matcherResult.alignmentFactors && matcherResult.alignmentFactors.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Key Alignment Factors</p>
                        <ul className="list-disc list-inside text-xs text-gray-300 space-y-1">
                          {matcherResult.alignmentFactors.map((factor: string, idx: number) => (
                            <li key={idx}>{factor}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Recommendations */}
                    {matcherResult.recommendations && matcherResult.recommendations.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Next Step Recommendations</p>
                        <ol className="list-decimal list-inside text-xs text-yellow-400/90 space-y-1">
                          {matcherResult.recommendations.map((rec: string, idx: number) => (
                            <li key={idx} className="leading-relaxed">{rec}</li>
                          ))}
                        </ol>
                      </div>
                    )}

                    {/* Confirm Match / Schedule Pairing */}
                    <div className="border-t border-gray-900 pt-4 space-y-4">
                      {confirmResult ? (
                        <div className="bg-green-950/20 border border-green-500/30 rounded-xl p-4 text-xs space-y-2 text-green-400">
                          <p className="font-bold flex items-center gap-1">
                            <Check className="w-4 h-4 text-green-400" />
                            Pairing Confirmed & Auto-Scheduled!
                          </p>
                          <p className="text-gray-300">
                            The calendar invitation and video link were generated automatically:
                          </p>
                          <ul className="list-disc pl-5 space-y-0.5 text-gray-300">
                            <li>Video Room ({confirmResult.provider}): <a href={confirmResult.zoomLink} target="_blank" rel="noopener noreferrer" className="underline text-blue-400 font-mono">{confirmResult.zoomLink}</a></li>
                            <li>Scheduled Time: <strong>{new Date(confirmResult.scheduledAt).toLocaleString()}</strong></li>
                          </ul>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={handleConfirmMatch}
                          disabled={confirmingMatch}
                          className="w-full bg-green-500 hover:bg-green-600 disabled:opacity-50 text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition text-xs cursor-pointer"
                        >
                          {confirmingMatch ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />
                              Scheduling Video Room & Calendar...
                            </>
                          ) : (
                            <>
                              <Calendar className="w-4 h-4" />
                              Confirm Match & Auto-Schedule Video Call
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="text-center space-y-3">
                    <Laptop className="w-12 h-12 text-gray-600 mx-auto" />
                    <p className="text-gray-400 text-sm">Select a fellow and click matching to run the evaluation.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 8: Email Campaigns & Newsletter (Resend Powered) */}
        {activeSubTab === "emailMarketing" && (
          <div className="space-y-6">
            {/* Top Domain & Provider Status Banner */}
            <div className="bg-gradient-to-r from-emerald-950/40 via-black to-blue-950/30 border border-emerald-500/30 rounded-3xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  Resend Email Infrastructure
                </div>
                <h2 className="text-xl font-black text-white">Email Delivery & Field Newsletter Center</h2>
                <p className="text-xs text-gray-400">
                  Sending Domain: <strong className="text-emerald-300 font-mono">techmissionrio.org</strong> &bull; From: <span className="text-gray-300 font-mono">updates@techmissionrio.org</span>
                </p>
              </div>

              {/* View toggle */}
              <div className="flex bg-gray-950 p-1 border border-gray-800 rounded-xl">
                <button
                  type="button"
                  onClick={() => setEmailCampaignView("donorMarketing")}
                  className={`py-2 px-3 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                    emailCampaignView === "donorMarketing" ? "bg-emerald-500 text-white" : "text-gray-400 hover:text-white"
                  }`}
                >
                  <Users className="w-3.5 h-3.5" />
                  Donor Marketing Pitch
                </button>
                <button
                  type="button"
                  onClick={() => setEmailCampaignView("newsletter")}
                  className={`py-2 px-3 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                    emailCampaignView === "newsletter" ? "bg-emerald-500 text-white" : "text-gray-400 hover:text-white"
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  Bi-Weekly Newsletter
                </button>
              </div>
            </div>

            {/* SUBVIEW 1: Potential Donor Marketing Email */}
            {emailCampaignView === "donorMarketing" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Form Column */}
                <div className="lg:col-span-7 bg-black border border-gray-900 rounded-3xl p-6 md:p-8 space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <Mail className="w-5 h-5 text-emerald-400" />
                      Potential Donor & Sponsor Outreach
                    </h3>
                    <p className="text-xs text-gray-400 mt-1">
                      Dispatch an Adopt-a-Classroom cohort pitch to US churches, foundations, or private donors.
                    </p>
                  </div>

                  {donorOutreachSuccess && (
                    <div className="bg-emerald-950/40 border border-emerald-500/40 rounded-2xl p-4 flex items-center gap-3 text-emerald-300 text-xs">
                      <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-emerald-400" />
                      <span>{donorOutreachSuccess}</span>
                    </div>
                  )}

                  {donorOutreachError && (
                    <div className="bg-red-950/40 border border-red-500/40 rounded-2xl p-4 flex items-center gap-3 text-red-300 text-xs">
                      <AlertTriangle className="w-5 h-5 flex-shrink-0 text-red-400" />
                      <span>{donorOutreachError}</span>
                    </div>
                  )}

                  <form onSubmit={handleSendDonorMarketing} className="space-y-4">
                    <div>
                      <label className="text-xs text-gray-300 font-bold block mb-1.5">
                        Recipient Email <span className="text-emerald-400">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="pastor.john@gracechurch.org or trustee@foundation.org"
                        value={donorOutreachEmail}
                        onChange={(e) => setDonorOutreachEmail(e.target.value)}
                        className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-gray-600 focus:outline-none focus:border-emerald-500 transition"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs text-gray-300 font-bold block mb-1.5">
                          Prospect Name
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Pastor John or Sarah Jenkins"
                          value={donorOutreachName}
                          onChange={(e) => setDonorOutreachName(e.target.value)}
                          className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-gray-600 focus:outline-none focus:border-emerald-500 transition"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-gray-300 font-bold block mb-1.5">
                          Organization / Church
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Grace Fellowship Chicago"
                          value={donorOutreachOrg}
                          onChange={(e) => setDonorOutreachOrg(e.target.value)}
                          className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-gray-600 focus:outline-none focus:border-emerald-500 transition"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs text-gray-300 font-bold block mb-1.5">
                        Personal Note / Context (Appears highlighted in the pitch)
                      </label>
                      <textarea
                        rows={3}
                        placeholder="e.g. It was wonderful meeting you at the mission conference. As discussed, here is the overview of our Rio computer lab sponsorship program."
                        value={donorOutreachNote}
                        onChange={(e) => setDonorOutreachNote(e.target.value)}
                        className="w-full bg-gray-950 border border-gray-800 rounded-xl p-3 text-xs text-white placeholder:text-gray-600 focus:outline-none focus:border-emerald-500 transition"
                      />
                    </div>

                    <div className="flex flex-wrap gap-3 pt-2">
                      <button
                        type="submit"
                        disabled={donorOutreachSending}
                        className="bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition text-xs cursor-pointer shadow-lg shadow-emerald-500/20"
                      >
                        {donorOutreachSending ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Dispatching via Resend...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            Send Outreach Pitch
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => setDonorOutreachPreview(!donorOutreachPreview)}
                        className="bg-gray-900 hover:bg-gray-800 text-gray-300 font-bold py-3 px-5 rounded-xl flex items-center gap-2 transition text-xs cursor-pointer border border-gray-800"
                      >
                        <Eye className="w-4 h-4" />
                        {donorOutreachPreview ? "Hide Preview" : "View Rendered Preview"}
                      </button>
                    </div>
                  </form>
                </div>

                {/* Preview / Key Highlights Column */}
                <div className="lg:col-span-5 bg-black border border-gray-900 rounded-3xl p-6 md:p-8 flex flex-col justify-between space-y-4">
                  <div>
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                      Included in this Template
                    </h4>
                    <ul className="space-y-2.5 text-xs text-gray-300">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                        <span><strong>Verified Domain Header:</strong> TechMission Rio branding & mission statement.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                        <span><strong>Live Metrics:</strong> 40+ laptops deployed, 100% tuition-free, 350+ mentoring hours.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                        <span><strong>Student Case Study:</strong> Gabriel (Santa Cruz) learning full-stack development.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                        <span><strong>Adopt-a-Classroom Tier:</strong> $12,000 full cohort package with direct Stripe link.</span>
                      </li>
                    </ul>
                  </div>

                  {donorOutreachPreview && (
                    <div className="bg-gray-950 border border-gray-800 rounded-2xl p-4 text-[11px] text-gray-300 space-y-2">
                      <div className="font-bold text-white border-b border-gray-800 pb-2">
                        Subject: Partnering with TechMission Rio — Transforming Lives Through Technology
                      </div>
                      <p>
                        Dear {donorOutreachName || "Friend"}{donorOutreachOrg ? ` and the team at ${donorOutreachOrg}` : ""},
                      </p>
                      {donorOutreachNote && (
                        <p className="italic text-emerald-400 bg-emerald-950/20 p-2 rounded border border-emerald-500/20">
                          "{donorOutreachNote}"
                        </p>
                      )}
                      <p className="text-gray-400">
                        ... [Full responsive HTML template will be sent with student story, metrics, and tax-deductible donation buttons] ...
                      </p>
                    </div>
                  )}

                  <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/20 text-xs text-emerald-300">
                    💡 <strong>Pro-Tip:</strong> Enter the pastor or foundation head's name to generate personalized greeting variables automatically.
                  </div>
                </div>
              </div>
            )}

            {/* SUBVIEW 2: Bi-Weekly Newsletter Composer */}
            {emailCampaignView === "newsletter" && (
              <div className="bg-black border border-gray-900 rounded-3xl p-6 md:p-8 space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <FileText className="w-5 h-5 text-emerald-400" />
                    Bi-Weekly Field Dispatches Composer
                  </h3>
                  <p className="text-xs text-gray-400 mt-1">
                    Write your personal fortnightly field dispatch directly. Send a test email to yourself first, then broadcast to all subscribers.
                  </p>
                </div>

                {nlStatusMsg && (
                  <div className="bg-emerald-950/40 border border-emerald-500/40 rounded-2xl p-4 flex items-center gap-3 text-emerald-300 text-xs">
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-emerald-400" />
                    <span>{nlStatusMsg}</span>
                  </div>
                )}

                {nlError && (
                  <div className="bg-red-950/40 border border-red-500/40 rounded-2xl p-4 flex items-center gap-3 text-red-300 text-xs">
                    <AlertTriangle className="w-5 h-5 flex-shrink-0 text-red-400" />
                    <span>{nlError}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs text-gray-300 font-bold block mb-1.5">Issue Number</label>
                    <input
                      type="text"
                      placeholder="e.g. 1"
                      value={nlIssueNum}
                      onChange={(e) => setNlIssueNum(e.target.value)}
                      className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-gray-600 focus:outline-none focus:border-emerald-500 transition"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-300 font-bold block mb-1.5">Issue Date</label>
                    <input
                      type="text"
                      placeholder="e.g. September 2026"
                      value={nlIssueDate}
                      onChange={(e) => setNlIssueDate(e.target.value)}
                      className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-gray-600 focus:outline-none focus:border-emerald-500 transition"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-300 font-bold block mb-1.5">Dispatch Title</label>
                    <input
                      type="text"
                      placeholder="e.g. From Santa Cruz to Silicon Valley"
                      value={nlTitle}
                      onChange={(e) => setNlTitle(e.target.value)}
                      className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-gray-600 focus:outline-none focus:border-emerald-500 transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-gray-300 font-bold block mb-1.5">
                    Founder's Field Note (Personal reflection from Rio)
                  </label>
                  <textarea
                    rows={6}
                    placeholder="Write your note to supporters here..."
                    value={nlFoundersNote}
                    onChange={(e) => setNlFoundersNote(e.target.value)}
                    className="w-full bg-gray-950 border border-gray-800 rounded-xl p-3 text-xs text-white placeholder:text-gray-600 focus:outline-none focus:border-emerald-500 transition font-sans leading-relaxed"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-xs text-gray-300 font-bold block mb-1.5">
                      Classroom Highlights (1 bullet per line)
                    </label>
                    <textarea
                      rows={4}
                      value={nlHighlights}
                      onChange={(e) => setNlHighlights(e.target.value)}
                      className="w-full bg-gray-950 border border-gray-800 rounded-xl p-3 text-xs text-white placeholder:text-gray-600 focus:outline-none focus:border-emerald-500 transition"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-gray-300 font-bold block mb-1.5">
                      Prayer & Partnership Requests (1 bullet per line)
                    </label>
                    <textarea
                      rows={4}
                      value={nlPrayerRequests}
                      onChange={(e) => setNlPrayerRequests(e.target.value)}
                      className="w-full bg-gray-950 border border-gray-800 rounded-xl p-3 text-xs text-white placeholder:text-gray-600 focus:outline-none focus:border-emerald-500 transition"
                    />
                  </div>
                </div>

                <div className="bg-gray-950 border border-gray-800 rounded-2xl p-5 space-y-3">
                  <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wider">
                    Student of the Fortnight Spotlight
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Student Name"
                      value={nlSpotlightName}
                      onChange={(e) => setNlSpotlightName(e.target.value)}
                      className="bg-black border border-gray-800 rounded-xl px-3 py-2 text-xs text-white placeholder:text-gray-600 focus:outline-none focus:border-emerald-500 transition"
                    />
                    <input
                      type="text"
                      placeholder="Learning Track (e.g. Web Development)"
                      value={nlSpotlightTrack}
                      onChange={(e) => setNlSpotlightTrack(e.target.value)}
                      className="bg-black border border-gray-800 rounded-xl px-3 py-2 text-xs text-white placeholder:text-gray-600 focus:outline-none focus:border-emerald-500 transition"
                    />
                  </div>
                  <textarea
                    rows={2}
                    placeholder="Short student quote or project highlight..."
                    value={nlSpotlightQuote}
                    onChange={(e) => setNlSpotlightQuote(e.target.value)}
                    className="w-full bg-black border border-gray-800 rounded-xl p-3 text-xs text-white placeholder:text-gray-600 focus:outline-none focus:border-emerald-500 transition"
                  />
                </div>

                {/* Action Controls */}
                <div className="border-t border-gray-900 pt-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="flex items-center gap-2 w-full md:w-auto">
                    <input
                      type="email"
                      placeholder="Test email: your@email.com"
                      value={nlTestEmail}
                      onChange={(e) => setNlTestEmail(e.target.value)}
                      className="bg-gray-950 border border-gray-800 rounded-xl px-3 py-2 text-xs text-white placeholder:text-gray-600 focus:outline-none focus:border-emerald-500 transition w-full md:w-64"
                    />
                    <button
                      type="button"
                      onClick={handleSendNewsletterTest}
                      disabled={nlSendingTest}
                      className="bg-gray-800 hover:bg-gray-700 disabled:opacity-50 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition cursor-pointer whitespace-nowrap"
                    >
                      {nlSendingTest ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Send className="w-3.5 h-3.5" />
                      )}
                      Send Test
                    </button>
                  </div>

                  <div className="flex items-center gap-3 w-full md:w-auto">
                    <button
                      type="button"
                      onClick={() => setNlPreview(!nlPreview)}
                      className="bg-gray-900 hover:bg-gray-800 text-gray-300 font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-1.5 transition cursor-pointer border border-gray-800"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      {nlPreview ? "Hide Preview" : "Preview Newsletter"}
                    </button>

                    <button
                      type="button"
                      onClick={handleBroadcastNewsletter}
                      disabled={nlBroadcasting}
                      className="bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-white font-bold px-6 py-2.5 rounded-xl text-xs flex items-center gap-2 transition cursor-pointer shadow-lg shadow-emerald-500/20"
                    >
                      {nlBroadcasting ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          Broadcasting via Resend...
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          Broadcast to All Subscribers
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {nlPreview && (
                  <div className="bg-gray-950 border border-gray-800 rounded-3xl p-6 space-y-4">
                    <div className="border-b border-gray-800 pb-3">
                      <div className="text-xs text-emerald-400 font-bold">Issue #{nlIssueNum} &bull; {nlIssueDate}</div>
                      <h4 className="text-lg font-bold text-white mt-1">{nlTitle}</h4>
                    </div>
                    <div className="text-xs text-gray-300 whitespace-pre-line leading-relaxed">
                      {nlFoundersNote}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  )
}
