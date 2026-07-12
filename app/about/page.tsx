import { Metadata } from "next"
import Link from "next/link"
import RioCarousel from "@/components/RioCarousel"
import { Code2, Users, MapPin, Sparkles, BookOpen, Heart, ShieldCheck } from "lucide-react"
import { useTranslations } from "next-intl"

export const dynamic = "force-static"

export const metadata: Metadata = {
  title: "About Our Story & Mission | TechMission Rio",
  description: "Learn about our founding story, our core educational pillars, and our biblical motivation to transform lives in Rio de Janeiro.",
}

export default function AboutPage() {
  const t = useTranslations("About")

  const pillars = [
    {
      id: "pillar-coding",
      icon: <Code2 className="w-6 h-6 text-green-400" />,
      title: t("pillarCodingTitle"),
      description: t("pillarCodingDesc"),
      gradient: "from-green-500 to-blue-500"
    },
    {
      id: "pillar-meetups",
      icon: <Users className="w-6 h-6 text-blue-400" />,
      title: t("pillarMeetupsTitle"),
      description: t("pillarMeetupsDesc"),
      gradient: "from-blue-500 to-indigo-500"
    },
    {
      id: "pillar-outreach",
      icon: <MapPin className="w-6 h-6 text-indigo-400" />,
      title: t("pillarOutreachTitle"),
      description: t("pillarOutreachDesc"),
      gradient: "from-indigo-500 to-purple-500"
    },
    {
      id: "pillar-faith",
      icon: <Sparkles className="w-6 h-6 text-yellow-400" />,
      title: t("pillarFaithTitle"),
      description: t("pillarFaithDesc"),
      gradient: "from-yellow-400 to-orange-500"
    }
  ]

  return (
    <div className="bg-black text-white min-h-screen relative overflow-hidden">
      {/* Background Radial Lights */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full max-w-7xl h-[400px] bg-gradient-to-b from-blue-900/10 via-green-900/5 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 py-16 relative z-10 space-y-16">
        
        {/* Title Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-500/30 rounded-full py-1.5 px-3 mb-2">
            <ShieldCheck className="w-4 h-4 text-blue-400" />
            <span className="text-xs font-semibold text-blue-400 tracking-wider uppercase">{t("storyMissionTag")}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
            {t("title1")}<br />
            <span className="bg-gradient-to-r from-green-400 via-teal-400 to-blue-400 bg-clip-text text-transparent">{t("title2")}</span>
          </h1>
          <p className="text-gray-300 text-sm md:text-base leading-relaxed max-w-xl mx-auto">
            {t("aboutSubtitle")}
          </p>
        </div>

        {/* Animated Rio Carousel Slideshow */}
        <section className="w-full">
          <RioCarousel />
        </section>

        {/* Story and Scripture Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Our Story */}
          <div className="lg:col-span-7 p-[1px] rounded-3xl bg-gradient-to-br from-green-500 to-blue-500 shadow-xl">
            <div className="h-full bg-black rounded-[23px] p-8 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold flex items-center gap-2 text-white">
                  <BookOpen className="w-6 h-6 text-green-400" />
                  {t("ourStoryTitle")}
                </h2>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {t("ourStoryP1")}
                </p>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {t("ourStoryP2")}
                </p>
              </div>
              <div className="border-t border-gray-900 pt-4 flex items-center gap-2 text-xs text-gray-300">
                <span>{t("est2023")}</span>
                <span>•</span>
                <span>{t("exemptEntity")}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Scripture / Motivation */}
          <div className="lg:col-span-5 p-[1px] rounded-3xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-xl">
            <div className="h-full bg-black rounded-[23px] p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold flex items-center gap-2 text-white">
                  <Sparkles className="w-6 h-6 text-blue-400" />
                  {t("motivationTitle")}
                </h2>
                
                <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-300 text-sm leading-relaxed md:text-base">
                  {t("scriptureQuote")}
                  <span className="mt-3 block text-xs font-bold text-green-400 not-italic uppercase tracking-widest">{t("scriptureRef")}</span>
                </blockquote>
              </div>

              <p className="text-xs text-gray-300 leading-relaxed border-t border-gray-900 pt-4">
                {t("motivationText")}
              </p>
            </div>
          </div>

        </div>

        {/* Pillars / What We Do (With premium gradient-border wrapper pattern) */}
        <section className="space-y-8">
          <h2 className="text-2xl font-bold flex items-center gap-2 text-white justify-center">
            <Heart className="w-6 h-6 text-green-400" />
            {t("pillarsTitle")}
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pillar) => (
              /* Gradient border div wrapper (1px padding) */
              <div 
                key={pillar.id}
                className={`p-[1px] rounded-3xl bg-gradient-to-br ${pillar.gradient} shadow-lg hover:scale-[1.03] transition-transform duration-300`}
              >
                {/* Solid black inner container */}
                <div className="h-full bg-black rounded-[23px] p-6 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-gray-900 flex items-center justify-center border border-gray-800">
                      {pillar.icon}
                    </div>
                    <h3 className="font-bold text-white text-base leading-tight">
                      {pillar.title}
                    </h3>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Team Roles Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold flex items-center gap-2 text-white justify-center">
            <Users className="w-6 h-6 text-indigo-400" />
            {t("networkTitle")}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Leadership Card */}
            <div className="p-[1px] rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 hover:scale-[1.02] transition-transform duration-300">
              <div className="h-full bg-black rounded-[23px] p-6 space-y-3">
                <h3 className="font-bold text-white text-base">{t("leadershipTitle")}</h3>
                <p className="text-xs text-gray-300 leading-relaxed">
                  {t("leadershipDesc")}
                </p>
              </div>
            </div>

            {/* Volunteers Card */}
            <div className="p-[1px] rounded-3xl bg-gradient-to-br from-purple-500 to-pink-500 hover:scale-[1.02] transition-transform duration-300">
              <div className="h-full bg-black rounded-[23px] p-6 space-y-3">
                <h3 className="font-bold text-white text-base">{t("volunteersTitle")}</h3>
                <p className="text-xs text-gray-300 leading-relaxed">
                  {t("volunteersDesc")}
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center bg-gradient-to-br from-blue-950/25 via-black to-green-950/25 border border-blue-500/20 rounded-3xl p-10 max-w-3xl mx-auto space-y-6">
          <h2 className="text-2xl font-bold">{t("joinTitle")}</h2>
          <p className="text-gray-300 text-sm leading-relaxed max-w-md mx-auto">
            {t("joinDesc")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/join">
              <span id="btn-about-join" className="bg-green-500 hover:bg-green-600 text-white font-bold py-3.5 px-6 rounded-xl transition cursor-pointer text-sm flex items-center justify-center gap-1">
                {t("getInvolved")}
              </span>
            </Link>
            <Link href="/donate">
              <span id="btn-about-donate" className="border border-gray-700 hover:bg-white/10 text-white font-bold py-3.5 px-6 rounded-xl transition cursor-pointer text-sm flex items-center justify-center gap-1">
                {t("supportMission")}
              </span>
            </Link>
          </div>
        </section>

      </div>
    </div>
  )
}