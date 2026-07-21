"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { 
  Loader2, 
  Award, 
  BookOpen, 
  Calendar, 
  Video, 
  LogOut, 
  Save, 
  Github, 
  Linkedin, 
  Globe, 
  Play, 
  CheckCircle2, 
  AlertTriangle 
} from "lucide-react"
import { useAuth } from "@/app/components/AuthContext"
import { signOut } from "firebase/auth"
import { auth, db } from "@/lib/firebase"
import { doc, getDoc, setDoc, updateDoc, collection, query, where, getDocs, onSnapshot } from "firebase/firestore"
import { useTranslations } from "next-intl"

// YouTube sanitization utility
export function toYouTubeEmbedUrl(url: string): string | null {
  if (!url) return ""
  const cleanUrl = url.trim()

  // 1. Standard: https://www.youtube.com/watch?v=dQw4w9WgXcQ
  const standardMatch = cleanUrl.match(/(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/i)
  if (standardMatch) {
    return `https://www.youtube.com/embed/${standardMatch[1]}`
  }

  // 2. Short: https://youtu.be/dQw4w9WgXcQ
  const shortMatch = cleanUrl.match(/(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/i)
  if (shortMatch) {
    return `https://www.youtube.com/embed/${shortMatch[1]}`
  }

  // 3. Embedded: https://www.youtube.com/embed/dQw4w9WgXcQ
  const embedMatch = cleanUrl.match(/(?:youtube(?:-nocookie)?\.com\/embed\/)([a-zA-Z0-9_-]{11})/i)
  if (embedMatch) {
    return `https://www.youtube.com/embed/${embedMatch[1]}`
  }

  return null
}

export default function FellowDashboardPage() {
  const { user, profile, loading: authLoading } = useAuth()
  const router = useRouter()
  const t = useTranslations("Dashboard")

  // States
  const [loadingProfile, setLoadingProfile] = useState(true)
  const [fellowId, setFellowId] = useState<string | null>(null)
  
  // Profile Form States
  const [name, setName] = useState("")
  const [track, setTrack] = useState("Web Development")
  const [location, setLocation] = useState("Rio de Janeiro")
  const [joinedDate, setJoinedDate] = useState("January 2026")
  const [bioEn, setBioEn] = useState("")
  const [bioPt, setBioPt] = useState("")
  const [skills, setSkills] = useState("")
  const [goal, setGoal] = useState("")
  const [github, setGithub] = useState("")
  const [linkedin, setLinkedin] = useState("")
  const [portfolio, setPortfolio] = useState("")
  const [videoUrlInput, setVideoUrlInput] = useState("")
  const [isEndorsed, setIsEndorsed] = useState(false)

  // Feedback states
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)

  // Mentorship sessions states
  const [sessions, setSessions] = useState<any[]>([])
  const [sessionsLoading, setSessionsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Auth gate check
  useEffect(() => {
    if (!authLoading) {
      if (!user || profile?.profileType !== "fellow") {
        router.replace("/login")
      }
    }
  }, [user, profile, authLoading, router])

  // Fetch student fellow profile from Firestore
  useEffect(() => {
    if (!user || profile?.profileType !== "fellow") return

    const fetchFellowProfile = async () => {
      try {
        let activeFellowId = profile?.fellowId

        // Fallback: If fellowId is not linked on users table yet, search by email
        if (!activeFellowId && user.email) {
          const q = query(collection(db, "fellows"), where("email", "==", user.email.toLowerCase()))
          const qSnap = await getDocs(q)
          if (!qSnap.empty) {
            activeFellowId = qSnap.docs[0].id
          }
        }

        if (activeFellowId) {
          setFellowId(activeFellowId)
          const docRef = doc(db, "fellows", activeFellowId)
          const docSnap = await getDoc(docRef)
          
          if (docSnap.exists()) {
            const data = docSnap.data()
            setName(data.name || "")
            setTrack(data.track || "Web Development")
            setLocation(data.location || "Rio de Janeiro")
            setJoinedDate(data.joinedDate || "January 2026")
            const bioData = data.bio || {}
            setBioEn(bioData.en || data.story || "")
            setBioPt(bioData.pt || "")
            setSkills(Array.isArray(data.skills) ? data.skills.join(", ") : data.skills || "")
            setGoal(data.goal || "")
            setGithub(data.github || "")
            setLinkedin(data.linkedin || "")
            setPortfolio(data.portfolio || "")
            setVideoUrlInput(data.videoUrl || "")
            setIsEndorsed(data.isEndorsed || false)
          }
        }
      } catch (err) {
        console.error("Error fetching fellow document:", err)
      } finally {
        setLoadingProfile(false)
      }
    }

    fetchFellowProfile()
  }, [user, profile])

  // Fetch scheduled sessions for student fellow
  useEffect(() => {
    if (!fellowId) return
    const q = query(collection(db, "sessions"), where("studentUid", "==", fellowId))
    const unsubscribe = onSnapshot(q, (snap) => {
      const list: any[] = []
      snap.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() })
      })
      setSessions(list)
      setSessionsLoading(false)
    }, (err) => {
      console.warn("Could not bind real-time sessions for fellow:", err)
      setSessionsLoading(false)
    })
    return () => unsubscribe()
  }, [fellowId])

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!fellowId) return

    setSaving(true)
    setError(null)
    setSuccess(false)

    // YouTube validation
    let finalVideoUrl = ""
    if (videoUrlInput.trim()) {
      const sanitized = toYouTubeEmbedUrl(videoUrlInput)
      if (sanitized === null) {
        setError("Invalid Video Link: Please input a valid YouTube URL (e.g. watch, youtu.be, or embed link).")
        setSaving(false)
        return
      }
      finalVideoUrl = sanitized
    }

    try {
      const docRef = doc(db, "fellows", fellowId)
      const initials = name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2) || "ST"
      const skillsArray = skills.split(",").map(s => s.trim()).filter(Boolean)

      const updatedFields = {
        name,
        initials,
        track,
        location,
        joinedDate,
        bio: {
          en: bioEn,
          pt: bioPt
        },
        skills: skillsArray,
        goal,
        github,
        linkedin,
        portfolio,
        videoUrl: finalVideoUrl,
        isEndorsed
      }

      await updateDoc(docRef, updatedFields)

      // Sync name back to users table if modified
      if (profile?.name !== name) {
        await updateDoc(doc(db, "users", user.uid), { name })
      }

      setSuccess(true)
      setTimeout(() => setSuccess(false), 5000)
    } catch (err: any) {
      console.error("Error saving fellow details:", err)
      setError(err.message || "Failed to update profile changes.")
    } finally {
      setSaving(false)
    }
  }

  const handleLogout = async () => {
    try {
      await signOut(auth)
      router.replace("/login")
    } catch (err) {
      console.error("Logout failed:", err)
    }
  }

  if (authLoading || loadingProfile || !user) {
    return (
      <div className="bg-black text-white min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-green-400" />
      </div>
    )
  }

  return (
    <div className="bg-black text-white min-h-screen relative overflow-hidden pt-24 pb-16">
      {/* Background radial light */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full max-w-7xl h-[400px] bg-gradient-to-b from-blue-900/10 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10 space-y-8">
        {/* Header */}
        <div className="border-b border-gray-900 pb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-green-500/20 border border-green-500/30 rounded-full py-1.5 px-3 mb-2">
              <Award className="w-4 h-4 text-green-400" />
              <span className="text-xs font-semibold text-green-400 tracking-wider uppercase">{t("fellowControlCenter", { defaultValue: "Fellow Portal" })}</span>
            </div>
            <h1 className="text-3xl font-black tracking-tight">{t("myProfile")}</h1>
            <p className="text-gray-400 text-sm mt-1">{t("fellowControlCenterDesc")}</p>
          </div>
          <button 
            onClick={handleLogout}
            className="border border-gray-800 hover:bg-white/5 text-gray-400 hover:text-white font-bold py-2.5 px-4 rounded-xl transition text-xs flex items-center gap-1.5 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            {t("signOut")}
          </button>
        </div>

        {/* Form and Preview Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Form Editor */}
          <form onSubmit={handleSaveProfile} className="lg:col-span-7 bg-gradient-to-br from-blue-950/10 to-black border border-gray-900 rounded-3xl p-8 space-y-6">
            <h2 className="text-xl font-bold flex items-center gap-2 border-b border-gray-900 pb-3">
              <BookOpen className="w-5 h-5 text-green-400" />
              {t("myProfile")}
            </h2>

            {success && (
              <div className="bg-green-950/40 border border-green-500/30 rounded-xl p-4 flex items-center gap-3 text-green-400 text-sm">
                <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                <span>{t("profileSuccess")}</span>
              </div>
            )}

            {error && (
              <div className="bg-red-950/40 border border-red-500/30 rounded-xl p-4 flex items-center gap-3 text-red-400 text-sm">
                <AlertTriangle className="w-5 h-5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="space-y-4">
              {/* Name */}
              <div className="space-y-2">
                <label htmlFor="fellow-name" className="block text-xs font-semibold text-gray-400 uppercase tracking-widest">Full Name</label>
                <input
                  id="fellow-name"
                  type="text"
                  required
                  placeholder="e.g. Gabriel Barbosa"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-black border border-gray-800 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-green-500 transition"
                />
              </div>

              {/* Specialization track */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="fellow-track" className="block text-xs font-semibold text-gray-400 uppercase tracking-widest">Specialization Track</label>
                  <select
                    id="fellow-track"
                    value={track}
                    onChange={(e) => setTrack(e.target.value)}
                    className="w-full bg-black border border-gray-800 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-green-500 transition"
                  >
                    <option value="Web Development">Web Development</option>
                    <option value="Mobile App Development">Mobile App Development</option>
                    <option value="Data Science">Data Science</option>
                    <option value="UI/UX Design">UI/UX Design</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="fellow-location" className="block text-xs font-semibold text-gray-400 uppercase tracking-widest">Location / Neighborhood</label>
                  <input
                    id="fellow-location"
                    type="text"
                    required
                    placeholder="e.g. Rocinha, Rio"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-black border border-gray-800 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-green-500 transition"
                  />
                </div>
              </div>

              {/* Story / Biography */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="fellow-bio-en" className="block text-xs font-semibold text-gray-400 uppercase tracking-widest">Bio (English)</label>
                  <textarea
                    id="fellow-bio-en"
                    required
                    rows={4}
                    placeholder="Tell B2B donors and churches about your background (in English)..."
                    value={bioEn}
                    onChange={(e) => setBioEn(e.target.value)}
                    className="w-full bg-black border border-gray-800 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-green-500 transition resize-none h-32"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="fellow-bio-pt" className="block text-xs font-semibold text-gray-400 uppercase tracking-widest">Bio (Português)</label>
                  <textarea
                    id="fellow-bio-pt"
                    required
                    rows={4}
                    placeholder="Conte sobre sua história e aprendizado (em Português)..."
                    value={bioPt}
                    onChange={(e) => setBioPt(e.target.value)}
                    className="w-full bg-black border border-gray-800 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-green-500 transition resize-none h-32"
                  />
                </div>
              </div>

              {/* Skills CSV */}
              <div className="space-y-2">
                <label htmlFor="fellow-skills" className="block text-xs font-semibold text-gray-400 uppercase tracking-widest">Technical Skills (Comma separated)</label>
                <input
                  id="fellow-skills"
                  type="text"
                  placeholder="e.g. React, Next.js, Figma, Node.js, Python"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  className="w-full bg-black border border-gray-800 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-green-500 transition"
                />
              </div>

              {/* Goal */}
              <div className="space-y-2">
                <label htmlFor="fellow-goal" className="block text-xs font-semibold text-gray-400 uppercase tracking-widest">Career Goal</label>
                <input
                  id="fellow-goal"
                  type="text"
                  placeholder="e.g. Build backend systems for global tech firms"
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  className="w-full bg-black border border-gray-800 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-green-500 transition"
                />
              </div>

              {/* Pitch Video */}
              <div className="space-y-2">
                <label htmlFor="fellow-video" className="block text-xs font-semibold text-gray-400 uppercase tracking-widest">YouTube Video Pitch URL</label>
                <input
                  id="fellow-video"
                  type="text"
                  placeholder="e.g. https://www.youtube.com/watch?v=..."
                  value={videoUrlInput}
                  onChange={(e) => setVideoUrlInput(e.target.value)}
                  className="w-full bg-black border border-gray-800 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-green-500 transition"
                />
                <p className="text-[10px] text-gray-400">
                  Accepts watch, youtu.be, and embed link formats. Sanitized automatically.
                </p>
              </div>

              {/* Social URLs */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label htmlFor="fellow-github" className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">GitHub Profile URL</label>
                  <input
                    id="fellow-github"
                    type="text"
                    placeholder="https://github.com/..."
                    value={github}
                    onChange={(e) => setGithub(e.target.value)}
                    className="w-full bg-black border border-gray-800 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-green-500 transition"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="fellow-linkedin" className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">LinkedIn Profile URL</label>
                  <input
                    id="fellow-linkedin"
                    type="text"
                    placeholder="https://linkedin.com/in/..."
                    value={linkedin}
                    onChange={(e) => setLinkedin(e.target.value)}
                    className="w-full bg-black border border-gray-800 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-green-500 transition"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="fellow-portfolio" className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">Portfolio Website URL</label>
                  <input
                    id="fellow-portfolio"
                    type="text"
                    placeholder="https://mywork.dev"
                    value={portfolio}
                    onChange={(e) => setPortfolio(e.target.value)}
                    className="w-full bg-black border border-gray-800 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-green-500 transition"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="bg-green-500 hover:bg-green-600 disabled:bg-green-500/50 text-black font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition cursor-pointer text-sm font-bold"
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saving Changes...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Save Portal Profile
                </>
              )}
            </button>
          </form>

          {/* Card Preview Panel */}
          <div className="lg:col-span-5 space-y-6">
            <div className="border-b border-gray-900 pb-3">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Video className="w-5 h-5 text-blue-400" />
                Public Catalog Preview
              </h3>
              <p className="text-xs text-gray-500">This is exactly how your profile looks to visiting donors on `/fellows`.</p>
            </div>

            {/* Simulated public fellow card card */}
            <div className="bg-gradient-to-br from-blue-950/20 to-black border border-blue-500/25 rounded-3xl p-6 flex flex-col justify-between shadow-xl space-y-6">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-tr from-green-500 to-blue-500 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg">
                    {name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0,2) || "ST"}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-bold text-white">{name || "Gabriel Barbosa"}</h3>
                      <div className="flex gap-2.5 text-gray-500">
                        <Github className="w-4 h-4" />
                        <Linkedin className="w-4 h-4" />
                        <Globe className="w-4 h-4" />
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-2 mt-0.5">
                      <p className="text-green-400 text-sm font-semibold">{track}</p>
                      {isEndorsed && (
                        <span className="inline-flex items-center gap-0.5 bg-green-500/15 border border-green-500/25 text-[#5ae0a0] text-[9px] py-0.5 px-2 rounded-full font-bold uppercase tracking-wider">
                          ✓ Teacher Endorsed
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-gray-400 text-xs mb-4">
                  <div className="flex items-center gap-1.5">
                    <span>📍 {location}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span>📅 {joinedDate}</span>
                  </div>
                </div>

                <p className="text-gray-300 text-sm mb-4 italic leading-relaxed">
                  "{bioEn || bioPt || "Write your story in the input box on the left. Introduce yourself to prospective international church and corporate donors."}"
                </p>

                <div className="mb-4 space-y-2">
                  <h4 className="text-white text-xs font-bold uppercase tracking-wider">Skills</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {(skills ? skills.split(",") : ["HTML", "CSS", "JavaScript"]).map((skill, index) => (
                      <span key={index} className="bg-green-500/10 text-green-400 text-[10px] px-2 rounded-full font-semibold border border-green-500/10">
                        {skill.trim()}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="border-t border-gray-900 pt-4">
                  <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-1">Career Goal</h4>
                  <p className="text-gray-400 text-sm">{goal || "State your professional goals here."}</p>
                </div>
              </div>

              {videoUrlInput.trim() && (
                <div className="bg-black/40 border border-gray-800 rounded-2xl p-4 flex items-center justify-between">
                  <span className="text-xs text-gray-400 flex items-center gap-1.5">
                    <Play className="w-3.5 h-3.5 text-green-400 fill-green-400" />
                    Video Pitch Configured
                  </span>
                  <span className="text-[10px] bg-green-500/20 text-green-400 font-bold px-2 py-0.5 rounded-full">
                    Ready
                  </span>
                </div>
              )}
            </div>

            {/* Scheduled Mentorship Calls */}
            <div className="bg-gradient-to-br from-blue-950/20 to-black border border-blue-500/20 rounded-3xl p-6 space-y-4 shadow-xl">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Calendar className="w-5 h-5 text-green-400" />
                Scheduled Mentorship Calls
              </h3>
              {sessionsLoading ? (
                <div className="flex justify-center py-6">
                  <Loader2 className="w-6 h-6 animate-spin text-green-400" />
                </div>
              ) : sessions.length === 0 ? (
                <div className="text-xs text-gray-500 py-2">
                  No virtual mentorship sessions scheduled yet. Your pairings recommendations will appear here once confirmed by administrators.
                </div>
              ) : (
                <div className="space-y-4">
                  {sessions.map((sess) => (
                    <div key={sess.id} className="border border-gray-900 bg-black/60 rounded-2xl p-4 space-y-3 transition hover:border-green-500/35">
                      <div className="space-y-1">
                        <span className="bg-green-500/10 text-green-400 text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                          {sess.status || "Scheduled"}
                        </span>
                        <h4 className="text-xs font-bold text-white">Pairing Call with {sess.mentorName || "Your Mentor"}</h4>
                        <p className="text-gray-400 text-[10px]">
                          📅 Time: <strong>{new Date(sess.scheduledAt).toLocaleString()}</strong>
                        </p>
                      </div>
                      <a 
                        href={sess.zoomLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-xl text-[10px] flex items-center justify-center gap-1.5 transition cursor-pointer"
                      >
                        <Video className="w-3.5 h-3.5" />
                        Join Virtual Room
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
