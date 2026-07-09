import { Metadata } from "next"
import { MissionCarousel } from "@/components/MissionCarousel"
import { Code2, Users, MapPin, Sparkles, Heart } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Our Mission & Vision | TechMission Rio",
  description: "Learn about TechMission Rio's mission and vision for empowering Brazilian youth through technology, education, and mentorship.",
}

export const dynamic = "force-static"

export default function MissionPage() {
  const pillars = [
    {
      id: "pillar-coding",
      icon: <Code2 className="w-6 h-6 text-green-400" />,
      title: "Coding Workshops",
      description: "Free technical software development classes for youth in favelas and local technical colleges.",
      gradient: "from-green-500 to-blue-500"
    },
    {
      id: "pillar-meetups",
      icon: <Users className="w-6 h-6 text-blue-400" />,
      title: "Meetups & Events",
      description: "Regular networking forums where ideas, mentors, local IT experts, and sponsors collide.",
      gradient: "from-blue-500 to-indigo-500"
    },
    {
      id: "pillar-outreach",
      icon: <MapPin className="w-6 h-6 text-indigo-400" />,
      title: "Local Outreach",
      description: "Direct community assistance, equipment distribution, and physical classroom lab installations in Rio.",
      gradient: "from-indigo-500 to-purple-500"
    },
    {
      id: "pillar-faith",
      icon: <Sparkles className="w-6 h-6 text-yellow-400" />,
      title: "Faith & Purpose",
      description: "Valuing stewardship and human dignity. Open to everyone without judgment - sem julgamentos.",
      gradient: "from-yellow-400 to-orange-500"
    }
  ]

  return (
    <div className="bg-black text-white min-h-screen relative overflow-hidden">
      {/* Background Radial Overlays */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full max-w-7xl h-[400px] bg-gradient-to-b from-blue-900/10 via-green-900/5 to-transparent pointer-events-none" />

      <main className="max-w-6xl mx-auto px-6 py-12 relative z-10 space-y-16">
        
        {/* Title Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 bg-green-500/20 border border-green-500/30 rounded-full py-1.5 px-3 mb-2">
            <Heart className="w-4 h-4 text-green-400" />
            <span className="text-xs font-semibold text-green-400 tracking-wider uppercase">Our Purpose</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
            Connecting Communities,<br />
            <span className="bg-gradient-to-r from-green-400 via-teal-400 to-blue-400 bg-clip-text text-transparent">Empowering Leaders</span>
          </h1>
          <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-xl mx-auto">
            TechMission Rio bridges the gap between underprivileged technical talent in Rio and B2B resources and mentorship in the US.
          </p>
        </div>

        {/* Animated Rio Carousel Slideshow */}
        <section className="w-full">
          <MissionCarousel />
        </section>

        {/* Manifesto / Who We Are */}
        <section className="bg-gradient-to-br from-blue-950/20 to-black border border-blue-500/20 rounded-3xl p-8 md:p-10">
          <h2 className="text-xs font-bold uppercase tracking-widest text-green-400 mb-4">Who we are</h2>
          <p className="text-lg md:text-2xl leading-relaxed text-gray-300 font-medium">
            We believe the best technology is built <strong className="text-green-400 font-bold">for people</strong>, not just profit. TechMission Rio is a grassroots crew — developers, designers, local volunteers, and neighbors — coming together to use tech as a tool for real community change in Rio.
          </p>
        </section>

        {/* Pillars / What We Do (With premium gradient-border wrapper pattern) */}
        <section className="space-y-8">
          <h2 className="text-xs font-bold uppercase tracking-widest text-green-400 text-center">Our Core Pillars</h2>
          
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
                  <p className="text-xs text-gray-400 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA section */}
        <section className="text-center bg-gradient-to-br from-green-950/10 via-black to-blue-950/10 border border-green-500/20 rounded-3xl p-8 md:p-12">
          <h2 className="text-2xl md:text-3xl font-black mb-4">Support Our Vision</h2>
          <p className="text-gray-400 text-sm md:text-base max-w-xl mx-auto mb-8 leading-relaxed">
            Join us in establishing computer labs, offering technical code courses, and providing direct sponsorships. Let's make an impact together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/donate">
              <span id="btn-mission-donate" className="bg-green-500 hover:bg-green-600 text-white font-bold py-3.5 px-8 rounded-xl transition cursor-pointer text-sm flex items-center justify-center">
                Sponsor a Classroom
              </span>
            </Link>
            <Link href="/join">
              <span id="btn-mission-join" className="border border-gray-700 hover:bg-white/10 text-white font-bold py-3.5 px-8 rounded-xl transition cursor-pointer text-sm flex items-center justify-center">
                Get Involved
              </span>
            </Link>
          </div>
        </section>

      </main>
    </div>
  )
}