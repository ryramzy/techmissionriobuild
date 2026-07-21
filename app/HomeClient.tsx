"use client"

import Link from "next/link"
import { ArrowRight, Heart, Users, Target, TrendingUp, Award, Mail, DollarSign } from "lucide-react"
import { useAnalytics } from "@/hooks/useAnalytics"
import { useEffect } from "react"
import { useTranslations } from "next-intl"

export default function HomeClient() {
  const analytics = useAnalytics()
  const t = useTranslations("Home")

  useEffect(() => {
    analytics.trackPageView('home')
  }, [analytics])

  const handleDonateClick = (source: string) => {
    analytics.trackDonateClick(source)
  }

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Urgency Banner */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-center py-3 px-4">
        <div className="max-w-4xl mx-auto flex items-center justify-center gap-2">
          <TrendingUp className="w-4 h-4" />
          <span className="text-sm font-semibold">{t("urgencyText")}</span>
          <span className="bg-white/20 px-2 py-1 rounded-full text-xs">{t("urgencyFunded")}</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-black to-green-900">
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-green-500/20 border border-green-500/30 rounded-full py-2 px-4 mb-8">
            <Heart className="w-3 h-3 text-green-400" />
            <span className="text-xs font-semibold text-green-400 tracking-widest uppercase">{t("supportRioYouth")}</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
            {t("heroTitle1")}<br />
            <span className="text-green-400">{t("heroTitle2")}</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto mb-12">
            {t("heroSubtitle")}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href="/donate">
              <button 
                onClick={() => handleDonateClick('hero')}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-lg transition-all transform hover:scale-105 shadow-lg cursor-pointer"
              >
                <DollarSign className="w-5 h-5 inline mr-2" />
                {t("donateNow")}
              </button>
            </Link>
            <Link href="/fellows">
              <button className="border border-green-500 text-green-400 hover:bg-green-500 hover:text-white font-bold py-4 px-8 rounded-lg transition-all cursor-pointer">
                <Users className="w-5 h-5 inline mr-2" />
                {t("meetFellows")}
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-20 px-6 bg-black/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t("impactTitle")}</h2>
            <p className="text-gray-300 text-lg">{t("impactSubtitle")}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-green-900/20 to-blue-900/20 border border-green-500/20 rounded-2xl p-8 text-center">
              <Users className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <div className="text-4xl font-bold text-white mb-2">200+</div>
              <div className="text-gray-300">{t("studentsSupported")}</div>
            </div>
            <div className="bg-gradient-to-br from-green-900/20 to-blue-900/20 border border-green-500/20 rounded-2xl p-8 text-center">
              <Target className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <div className="text-4xl font-bold text-white mb-2">12</div>
              <div className="text-gray-300">{t("techPrograms")}</div>
            </div>
            <div className="bg-gradient-to-br from-green-900/20 to-blue-900/20 border border-green-500/20 rounded-2xl p-8 text-center">
              <Heart className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <div className="text-4xl font-bold text-white mb-2">5</div>
              <div className="text-gray-300">{t("rioCommunities")}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 px-6 bg-black/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">{t("problemTitle")}</h2>
          <p className="text-xl text-gray-300 mb-8">
            {t("problemSubtitle")}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-red-400 mb-2">{t("problemStat1")}</div>
              <p className="text-gray-300">{t("problemStat1Text")}</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-400 mb-2">{t("problemStat2")}</div>
              <p className="text-gray-300">{t("problemStat2Text")}</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-400 mb-2">{t("problemStat3")}</div>
              <p className="text-gray-300">{t("problemStat3Text")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">{t("solutionTitle")}</h2>
          <p className="text-xl text-gray-300 mb-8">
            {t("solutionSubtitle")}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Award className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">{t("solutionCol1Title")}</h3>
              <p className="text-gray-300">{t("solutionCol1Text")}</p>
            </div>
            <div className="text-center">
              <Users className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">{t("solutionCol2Title")}</h3>
              <p className="text-gray-300">{t("solutionCol2Text")}</p>
            </div>
            <div className="text-center">
              <Target className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">{t("solutionCol3Title")}</h3>
              <p className="text-gray-300">{t("solutionCol3Text")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Proof of Impact */}
      <section className="py-20 px-6 bg-gradient-to-br from-green-900/20 to-blue-900/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t("actionTitle")}</h2>
            <p className="text-gray-300 text-lg">{t("actionSubtitle")}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-black/50 border border-green-500/30 rounded-2xl p-8 text-center">
              <div className="text-4xl font-bold text-green-400 mb-2">$25</div>
              <div className="text-white font-semibold mb-2">{t("tier1Title")}</div>
              <p className="text-gray-300 mb-4">{t("tier1Desc")}</p>
              <div className="text-sm text-gray-300">
                ✓ {t("tier1Item1")}<br/>
                ✓ {t("tier1Item2")}<br/>
                ✓ {t("tier1Item3")}
              </div>
            </div>
            
            <div className="bg-black/50 border border-green-500/30 rounded-2xl p-8 text-center relative">
              <div className="absolute -top-3 -right-3 bg-yellow-500 text-black text-xs px-2 py-1 rounded-full font-bold">
                {t("mostPopular")}
              </div>
              <div className="text-4xl font-bold text-green-400 mb-2">$100</div>
              <div className="text-white font-semibold mb-2">{t("tier2Title")}</div>
              <p className="text-gray-300 mb-4">{t("tier2Desc")}</p>
              <div className="text-sm text-gray-300">
                ✓ {t("tier2Item1")}<br/>
                ✓ {t("tier2Item2")}<br/>
                ✓ {t("tier2Item3")}
              </div>
            </div>
            
            <div className="bg-black/50 border border-green-500/30 rounded-2xl p-8 text-center relative">
              <div className="absolute -top-3 -right-3 bg-purple-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                {t("highImpact")}
              </div>
              <div className="text-4xl font-bold text-green-400 mb-2">$500</div>
              <div className="text-white font-semibold mb-2">{t("tier3Title")}</div>
              <p className="text-gray-300 mb-4">{t("tier3Desc")}</p>
              <div className="text-sm text-gray-300">
                ✓ {t("tier3Item1")}<br/>
                ✓ {t("tier3Item2")}<br/>
                ✓ {t("tier3Item3")}
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="bg-black/50 border border-gray-700 rounded-2xl p-6 mb-8">
            <div className="flex justify-between items-center mb-4">
              <span className="text-white font-semibold">{t("progressGoal")}</span>
              <span className="text-green-400 font-bold">{t("progressFunded")}</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-4">
              <div className="bg-gradient-to-r from-green-500 to-blue-500 h-4 rounded-full" style={{width: '24%'}}></div>
            </div>
            <p className="text-gray-300 text-sm mt-2">{t("progressMoreNeeded")}</p>
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="py-20 px-6 bg-black/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t("fundingTitle")}</h2>
            <p className="text-gray-300 text-lg">{t("fundingSubtitle")}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gradient-to-br from-green-900/20 to-blue-900/20 border border-green-500/20 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-white mb-4">{t("expensesTitle")}</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-300">{t("expense1")}</span>
                  <span className="text-green-400">35%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">{t("expense2")}</span>
                  <span className="text-green-400">25%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">{t("expense3")}</span>
                  <span className="text-green-400">15%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">{t("expense4")}</span>
                  <span className="text-green-400">10%</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-900/20 to-black border border-blue-500/20 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-white mb-4">{t("opsTitle")}</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-300">{t("ops1")}</span>
                  <span className="text-blue-400">8%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">{t("ops2")}</span>
                  <span className="text-blue-400">4%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">{t("ops3")}</span>
                  <span className="text-blue-400">3%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Story */}
      <section className="py-20 px-6 bg-black/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">{t("storyTitle")}</h2>
          
          <div className="bg-gradient-to-br from-green-900/20 to-blue-900/20 border border-green-500/20 rounded-2xl p-8 mb-8">
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              {t("storyP1")}
            </p>
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              {t("storyP2")}
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              {t("storyP3")}
            </p>
          </div>
          
          <div className="text-center">
            <p className="text-green-400 font-semibold text-lg mb-2">{t("storyMission")}</p>
            <p className="text-xl text-white font-bold">
              {t("storyMissionText")}
            </p>
          </div>
        </div>
      </section>

      {/* Email Capture */}
      <section className="py-20 px-6 bg-gradient-to-br from-green-900/20 to-blue-900/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">{t("joinTitle")}</h2>
          <p className="text-xl text-gray-300 mb-8">
            {t("joinSubtitle")}
          </p>
          
          <div className="bg-black/50 border border-gray-700 rounded-2xl p-8">
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder={t("emailPlaceholder")}
                className="flex-1 bg-black/50 border border-gray-600 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-green-500 placeholder-gray-400"
                aria-label="Email Address for Updates"
              />
              <button 
                onClick={() => analytics.trackEmailSignup('homepage')}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-all cursor-pointer"
              >
                {t("subscribe")}
              </button>
            </div>
            <p className="text-gray-300 text-sm mt-4">
              {t("joinSupportersText")}
            </p>
          </div>
        </div>
      </section>

      {/* Real Success Stories */}
      <section className="py-20 px-6 bg-black/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t("successTitle")}</h2>
            <p className="text-gray-300 text-lg">{t("successSubtitle")}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-green-900/20 to-blue-900/20 border border-green-500/20 rounded-2xl p-6">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">JD</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{t("joaoTitle")}</h3>
              <p className="text-green-400 text-sm mb-2">{t("joaoRole")}</p>
              <p className="text-gray-400 text-sm">
                {t("joaoQuote")}
              </p>
              <div className="mt-4 flex items-center gap-2">
                <span className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded">{t("verifiedPlacement")}</span>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-green-900/20 to-blue-900/20 border border-green-500/20 rounded-2xl p-6">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">MS</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{t("mariaTitle")}</h3>
              <p className="text-green-400 text-sm mb-2">{t("mariaRole")}</p>
              <p className="text-gray-400 text-sm">
                {t("mariaQuote")}
              </p>
              <div className="mt-4 flex items-center gap-2">
                <span className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded">{t("verifiedPlacement")}</span>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-green-900/20 to-blue-900/20 border border-green-500/20 rounded-2xl p-6">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">RC</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{t("robertoTitle")}</h3>
              <p className="text-green-400 text-sm mb-2">{t("robertoRole")}</p>
              <p className="text-gray-400 text-sm">
                {t("robertoQuote")}
              </p>
              <div className="mt-4 flex items-center gap-2">
                <span className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded">{t("startupSuccess")}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media Integration Feed */}
      <section className="py-20 px-6 bg-black border-t border-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
            <div>
              <div className="inline-flex items-center gap-2 bg-pink-500/20 border border-pink-500/30 rounded-full py-1 px-3 mb-4">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-pink-500"></span>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-pink-400">Live Social Updates</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white">Instagram & Facebook Feed</h2>
              <p className="text-gray-400 text-sm mt-2">
                Follow our daily journey empowering high school trainees in Rio de Janeiro.
              </p>
            </div>
            <a 
              href="https://www.instagram.com/techmissionrio" 
              target="_blank" 
              rel="noopener noreferrer"
              className="mt-4 md:mt-0 text-xs font-bold text-pink-400 hover:text-pink-300 flex items-center gap-1.5 transition"
            >
              @techmissionrio on Instagram
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Social grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-gradient-to-b from-gray-950 to-black border border-gray-900 rounded-3xl overflow-hidden group hover:border-pink-500/30 transition duration-300">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src="/images/rio_students_tech.jpg" 
                  alt="Students using laptops at FAETEC Santa Cruz" 
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute top-4 left-4 bg-black/60 border border-gray-800 text-[10px] text-pink-400 font-bold uppercase tracking-wider px-2.5 py-1 rounded-full flex items-center gap-1">
                  <span>Instagram</span>
                </div>
              </div>
              <div className="p-6 space-y-3">
                <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">June 24, 2026</p>
                <h3 className="text-white font-bold text-base">Unboxing Laptop Donations in Santa Cruz!</h3>
                <p className="text-gray-400 text-xs leading-relaxed">
                  Today we unboxed the first batch of sponsored developer laptops for our FAETEC Santa Cruz cohort! A huge thank you to our US donor chapel hubs! 💻🇧🇷🇺🇸 #TechMissionRio
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-gradient-to-b from-gray-950 to-black border border-gray-900 rounded-3xl overflow-hidden group hover:border-pink-500/30 transition duration-300">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src="/images/rio_cristo_mesh.jpg" 
                  alt="Empowering Rio youth" 
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute top-4 left-4 bg-black/60 border border-gray-800 text-[10px] text-blue-400 font-bold uppercase tracking-wider px-2.5 py-1 rounded-full flex items-center gap-1">
                  <span>Facebook</span>
                </div>
              </div>
              <div className="p-6 space-y-3">
                <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">July 12, 2026</p>
                <h3 className="text-white font-bold text-base">Annual Cohort Nominations Open</h3>
                <p className="text-gray-400 text-xs leading-relaxed">
                  Educators across Rio can now nominate high-potential students for the next mentorship round. Join us in bridging coding opportunities and career paths. #NextGenTech
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-gradient-to-b from-gray-950 to-black border border-gray-900 rounded-3xl overflow-hidden group hover:border-pink-500/30 transition duration-300">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src="/images/rio_sugarloaf_digital.jpg" 
                  alt="Student coding digital sugarloaf" 
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute top-4 left-4 bg-black/60 border border-gray-800 text-[10px] text-pink-400 font-bold uppercase tracking-wider px-2.5 py-1 rounded-full flex items-center gap-1">
                  <span>Instagram</span>
                </div>
              </div>
              <div className="p-6 space-y-3">
                <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">July 18, 2026</p>
                <h3 className="text-white font-bold text-base">Mentorship Match Highlights</h3>
                <p className="text-gray-400 text-xs leading-relaxed">
                  Congratulations to our latest matches! Trainees are pairing up with US senior developers from Seattle, Boston, and San Francisco. Let the hacking begin! 🚀🇧🇷 #CodingCommunity
                </p>
              </div>
            </div>
          </div>

          {/* Sharing Overlay Trigger / Showcase Widget */}
          <div className="mt-12 bg-gradient-to-r from-pink-900/10 via-black to-blue-900/10 border border-gray-900 rounded-3xl p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-white">Help Spread the Word</h3>
              <p className="text-xs text-gray-400 max-w-xl">
                Generate instant social media share cards to share student profiles or classroom accomplishments on TikTok and Instagram.
              </p>
            </div>
            <button 
              onClick={() => alert("📤 Mock Social Overlay: Generating custom Instagram / TikTok share package with pre-built student quote overlay and graphics. Download package ready in donor assets portal.")}
              className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-6 rounded-xl flex items-center gap-2 transition cursor-pointer text-xs self-start md:self-auto"
            >
              Generate Share Overlay Package
            </button>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6 bg-gradient-to-br from-green-900/20 to-blue-900/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">{t("readyTitle")}</h2>
          <p className="text-xl text-gray-300 mb-8">
            {t("readySubtitle")}
          </p>
          
          <Link href="/donate">
            <button 
              onClick={() => handleDonateClick('final_cta')}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-lg transition-all transform hover:scale-105 shadow-lg text-lg cursor-pointer"
            >
              <DollarSign className="w-6 h-6 inline mr-2" />
              {t("donateNow")}
            </button>
          </Link>
        </div>
      </section>
    </div>
  )
}
