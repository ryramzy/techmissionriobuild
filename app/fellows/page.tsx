"use client"

import React, { useState, useEffect } from "react"
import { 
  Users, 
  MapPin, 
  Calendar, 
  Heart, 
  Github, 
  Linkedin, 
  Globe, 
  Play, 
  X, 
  Loader2, 
  ArrowUpRight 
} from "lucide-react"
import Link from "next/link"
import { collection, getDocs } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { useAnalytics } from "@/hooks/useAnalytics"

interface Fellow {
  id: string
  name: string
  initials: string
  track: string
  location: string
  joinedDate: string
  story: string
  skills: string[]
  goal: string
  github: string
  linkedin: string
  portfolio: string
  videoUrl: string
}

export default function FellowsPage() {
  const defaultFellows: Fellow[] = [
    {
      id: "1",
      name: "João Silva",
      initials: "JS",
      track: "Web Development",
      location: "Rocinha, Rio",
      joinedDate: "January 2024",
      story: "TechMission Rio opened doors I never knew existed. Now I'm building websites for local businesses and helping my community.",
      skills: ["HTML", "CSS", "JavaScript", "React"],
      goal: "Become a full-stack developer and start a tech company in Rio",
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      portfolio: "https://github.com",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-software-developer-working-on-his-computer-34282-large.mp4"
    },
    {
      id: "2",
      name: "Maria Costa",
      initials: "MC",
      track: "Mobile App Development",
      location: "Complexo do Alemão, Rio",
      joinedDate: "February 2024",
      story: "I went from knowing nothing about coding to developing apps that help my community access essential services.",
      skills: ["React Native", "Firebase", "UI/UX Design"],
      goal: "Create apps that solve problems in underserved communities",
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      portfolio: "https://github.com",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-woman-coding-on-computer-in-glasses-40742-large.mp4"
    },
    {
      id: "3",
      name: "Pedro Santos",
      initials: "PS",
      track: "Data Science",
      location: "Vila Kennedy, Rio",
      joinedDate: "March 2024",
      story: "The mentorship and training gave me the confidence to pursue a career in tech. Now I'm working with data to help local businesses.",
      skills: ["Python", "Machine Learning", "Data Analysis"],
      goal: "Use data science to improve urban planning in Rio",
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      portfolio: "https://github.com",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-programmer-typing-on-a-keyboard-34280-large.mp4"
    },
    {
      id: "4",
      name: "Ana Oliveira",
      initials: "AO",
      track: "UI/UX Design",
      location: "Maré, Rio",
      joinedDate: "January 2024",
      story: "Design has always been my passion, but I never thought I could make a career of it. TechMission Rio showed me how.",
      skills: ["Figma", "Adobe XD", "Prototyping"],
      goal: "Design accessible technology for people with disabilities",
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      portfolio: "https://github.com",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-designer-working-on-his-ipad-at-home-40292-large.mp4"
    },
    {
      id: "5",
      name: "Carlos Mendes",
      initials: "CM",
      track: "Backend Development",
      location: "Jacarezinho, Rio",
      joinedDate: "February 2024",
      story: "I love solving problems with code. The fellowship program gave me the skills and network to turn this passion into a career.",
      skills: ["Node.js", "PostgreSQL", "AWS"],
      goal: "Build scalable systems for social impact organizations",
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      portfolio: "https://github.com",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-man-working-on-laptop-computer-in-dark-room-40740-large.mp4"
    },
    {
      id: "6",
      name: "Luciana Ferreira",
      initials: "LF",
      track: "Frontend Development",
      location: "Tijuca, Rio",
      joinedDate: "March 2024",
      story: "Being a woman in tech can be challenging, but TechMission Rio created a supportive environment where I can thrive.",
      skills: ["Vue.js", "TypeScript", "CSS"],
      goal: "Mentor other young women interested in technology",
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      portfolio: "https://github.com",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-young-woman-working-on-a-laptop-at-night-40743-large.mp4"
    }
  ]

  const analytics = useAnalytics()
  const [fellowsList, setFellowsList] = useState<Fellow[]>(defaultFellows)
  const [loading, setLoading] = useState(true)
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null)
  const [activeFellowName, setActiveFellowName] = useState<string>("")

  // Fetch fellows from Firestore
  useEffect(() => {
    analytics.trackPageView('/fellows')
    const fetchFellows = async () => {
      try {
        const colRef = collection(db, "fellows")
        const querySnap = await getDocs(colRef)
        if (!querySnap.empty) {
          const list: Fellow[] = []
          querySnap.forEach((doc) => {
            list.push({ id: doc.id, ...doc.data() } as Fellow)
          })
          setFellowsList(list)
        }
      } catch (err) {
        console.warn("Could not retrieve fellows from Firestore, loading defaults:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchFellows()
  }, [analytics])

  const handlePlayVideo = (url: string, name: string) => {
    analytics.trackEngagement('watch_fellow_pitch', { fellowName: name })
    setActiveVideoUrl(url)
    setActiveFellowName(name)
  }

  const handleCloseVideo = () => {
    setActiveVideoUrl(null)
    setActiveFellowName("")
  }

  return (
    <div className="bg-black text-white min-h-screen relative overflow-hidden">
      {/* Background Radial Lights */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full max-w-7xl h-[400px] bg-gradient-to-b from-blue-900/10 via-green-900/5 to-transparent pointer-events-none" />

      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center bg-gradient-to-br from-blue-950 via-black to-green-950">
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-green-500/20 border border-green-500/30 rounded-full py-1.5 px-3 mb-8">
            <Users className="w-4 h-4 text-green-400" />
            <span className="text-xs font-semibold text-green-400 tracking-widest uppercase">Our Fellows</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-6">
            Meet Rio's Next<br />
            <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">Tech Leaders</span>
          </h1>
          
          <p className="text-lg text-gray-400 leading-relaxed max-w-2xl mx-auto mb-8">
            Get to know the talented young people transforming their communities through technology education, innovation, and direct sponsorship.
          </p>
        </div>
      </section>

      {/* Fellows Grid */}
      <section className="py-16 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Current Fellows</h2>
            <p className="text-gray-400 text-lg">Active fellows building Rio's tech future</p>
          </div>
          
          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-green-400" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {fellowsList.map((fellow) => (
                <div key={fellow.id} className="bg-gradient-to-br from-blue-950/20 to-black border border-blue-500/25 rounded-3xl p-6 hover:border-blue-500/50 transition-all flex flex-col justify-between shadow-xl">
                  <div>
                    {/* Profile Header */}
                    <div className="flex items-center gap-4 mb-4">
                      {/* Initials Avatar / Video Trigger */}
                      <div className="relative group/avatar">
                        <div className="w-16 h-16 bg-gradient-to-tr from-green-500 to-blue-500 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg">
                          {fellow.initials}
                        </div>
                        {fellow.videoUrl && (
                          <button
                            onClick={() => handlePlayVideo(fellow.videoUrl, fellow.name)}
                            className="absolute inset-0 bg-black/60 rounded-2xl flex items-center justify-center opacity-0 group-hover/avatar:opacity-100 transition duration-300"
                            aria-label={`Play ${fellow.name}'s video pitch`}
                          >
                            <Play className="w-6 h-6 text-green-400 fill-green-400" />
                          </button>
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h3 className="text-xl font-bold text-white">{fellow.name}</h3>
                          {/* Social links row */}
                          <div className="flex gap-2.5">
                            {fellow.github && (
                              <a 
                                href={fellow.github} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                onClick={() => analytics.trackEngagement('click_fellow_social', { fellowName: fellow.name, platform: 'github' })}
                                className="text-gray-500 hover:text-white transition"
                              >
                                <Github className="w-4 h-4" />
                              </a>
                            )}
                            {fellow.linkedin && (
                              <a 
                                href={fellow.linkedin} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                onClick={() => analytics.trackEngagement('click_fellow_social', { fellowName: fellow.name, platform: 'linkedin' })}
                                className="text-gray-500 hover:text-white transition"
                              >
                                <Linkedin className="w-4 h-4" />
                              </a>
                            )}
                            {fellow.portfolio && (
                              <a 
                                href={fellow.portfolio} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                onClick={() => analytics.trackEngagement('click_fellow_social', { fellowName: fellow.name, platform: 'portfolio' })}
                                className="text-gray-500 hover:text-white transition"
                              >
                                <Globe className="w-4 h-4" />
                              </a>
                            )}
                          </div>
                        </div>
                        <p className="text-green-400 text-sm font-semibold mt-0.5">{fellow.track}</p>
                      </div>
                    </div>

                    {/* Location & Date */}
                    <div className="flex items-center gap-4 text-gray-400 text-xs mb-4">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-gray-500" />
                        {fellow.location}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-gray-500" />
                        {fellow.joinedDate}
                      </div>
                    </div>

                    {/* Story */}
                    <p className="text-gray-300 text-sm mb-4 italic leading-relaxed">"{fellow.story}"</p>

                    {/* Skills */}
                    <div className="mb-4">
                      <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-2">Skills</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {fellow.skills.map((skill, index) => (
                          <span key={index} className="bg-green-500/10 text-green-400 text-xs px-2.5 py-1 rounded-full font-semibold border border-green-500/10">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Goal */}
                    <div className="border-t border-gray-900 pt-4 mb-4">
                      <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-1">Career Goal</h4>
                      <p className="text-gray-400 text-sm">{fellow.goal}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {fellow.videoUrl && (
                      <button 
                        onClick={() => handlePlayVideo(fellow.videoUrl, fellow.name)}
                        className="w-full bg-black hover:bg-white/5 border border-gray-800 text-white font-bold py-2.5 px-4 rounded-xl transition flex items-center justify-center gap-2 text-xs"
                      >
                        <Play className="w-3.5 h-3.5 text-green-400 fill-green-400" />
                        Watch 60s Elevator Pitch
                      </button>
                    )}
                    
                    {/* Support Button */}
                    <Link href={`/donate?amount=100`}>
                      <span 
                        onClick={() => analytics.trackDonateClick('sponsor_fellow', { fellowName: fellow.name })}
                        className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-xl transition flex items-center justify-center gap-2 text-xs cursor-pointer"
                      >
                        <Heart className="w-4 h-4" />
                        Sponsor {fellow.name.split(' ')[0]}
                      </span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Video Modal Overlay */}
      {activeVideoUrl && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative bg-gradient-to-b from-gray-900 to-black border border-gray-800 rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-800">
              <h3 className="font-bold text-white text-base md:text-lg flex items-center gap-2">
                <Play className="w-4 h-4 text-green-400" />
                60s Pitch: {activeFellowName}
              </h3>
              <button 
                onClick={handleCloseVideo}
                className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-white/10 transition"
                aria-label="Close video player"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Player */}
            <div className="relative aspect-video bg-black flex items-center justify-center">
              <video 
                src={activeVideoUrl} 
                controls 
                autoPlay 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Modal Footer / CTA */}
            <div className="p-4 border-t border-gray-800 flex justify-between items-center bg-black/40">
              <span className="text-xs text-gray-500">TechMission Rio verified pitch</span>
              <Link href={`/donate?amount=100`}>
                <span onClick={handleCloseVideo} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-5 rounded-lg text-xs flex items-center gap-1.5 transition cursor-pointer">
                  Sponsor {activeFellowName.split(' ')[0]}
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Impact Stats */}
      <section className="py-20 px-6 bg-black/50 relative z-10 border-t border-gray-900">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Fellowship Impact</h2>
            <p className="text-gray-400 text-lg">Real results from our program</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-green-400 mb-2">6</div>
              <div className="text-white font-semibold">Active Fellows</div>
              <p className="text-gray-400 text-sm mt-2">Currently in the program</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-400 mb-2">5</div>
              <div className="text-white font-semibold">Rio Communities</div>
              <p className="text-gray-400 text-sm mt-2">Represented across the city</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-400 mb-2">100%</div>
              <div className="text-white font-semibold">Job Placement</div>
              <p className="text-gray-400 text-sm mt-2">Graduates employed in tech</p>
            </div>
          </div>
        </div>
      </section>

      {/* Support CTA */}
      <section className="py-20 px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Support Our Fellows</h2>
          <p className="text-xl text-gray-300 mb-8">
            Your donation helps provide laptops, training, and mentorship to these talented young people.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/donate" className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-xl transition-all transform hover:scale-105 shadow-lg inline-flex items-center justify-center gap-2 text-sm cursor-pointer">
              <Heart className="w-5 h-5" />
              Support All Fellows
            </Link>
            <Link href="/login" className="border border-green-500 text-green-400 hover:bg-green-500 hover:text-white font-bold py-4 px-8 rounded-xl transition-all inline-flex items-center justify-center gap-2 text-sm cursor-pointer">
              <Users className="w-5 h-5" />
              Become a Mentor
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
