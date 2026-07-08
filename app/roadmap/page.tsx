import { Metadata } from "next"
import { Calendar, CheckCircle2, ArrowUpRight, Flame, Users, Globe, Play, Sparkles } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Roadmap | TechMission Rio",
  description: "Explore TechMission Rio's 6-month master plan for product improvements and marketing partnerships.",
}

interface TimelineItem {
  id: string
  period: string
  title: string
  subtitle: string
  description: string
  category: "product" | "marketing"
  items: string[]
  icon: React.ReactNode
  color: string
}

export default function RoadmapPage() {
  const roadmapData: TimelineItem[] = [
    {
      id: "rm-1-marketing",
      period: "Months 1 - 2",
      title: "Educational Pipeline & Sourcing",
      subtitle: "Rio Technical Colleges Integration",
      description: "Partnering with technical high schools and colleges in Rio to identify outstanding student candidates.",
      category: "marketing",
      color: "from-green-400 to-blue-500",
      icon: <Users className="w-5 h-5 text-white" />,
      items: [
        "Official agreements with FAETEC (Santa Cruz & Quintino) and IFRJ (Duque de Caxias).",
        "Launch of teacher-led student nomination portals.",
        "Recruitment of 30 bilingual US university mentors via BRASA chapters."
      ]
    },
    {
      id: "rm-1-product",
      period: "Months 1 - 2",
      title: "Core Infrastructure & PIX",
      subtitle: "Live Donation Rollout",
      description: "Transitioning payment structures from simulated integrations to live, localized processing channels.",
      category: "product",
      color: "from-blue-500 to-indigo-600",
      icon: <Sparkles className="w-5 h-5 text-white" />,
      items: [
        "Transition Stripe configurations from checkout simulation to live processing.",
        "Integrate PIX payments to support local donations from within Brazil.",
        "Deploy the initial Firebase repeated user profile systems."
      ]
    },
    {
      id: "rm-2-marketing",
      period: "Months 3 - 4",
      title: "B2B Church Outreach Campaigns",
      subtitle: "US Christian Congregations Sponsoring",
      description: "Positioning TMR's B2B features to US-based Christian churches and faith-based businesses for cohort-level sponsorships.",
      category: "marketing",
      color: "from-purple-500 to-pink-500",
      icon: <Flame className="w-5 h-5 text-white" />,
      items: [
        "Rollout of the 'Adopt-a-Classroom' cohort sponsorship model (12 students, laptops, and mentorship).",
        "Promotion of Church Portal widgets (Prayer wall and live youth group Zoom schedules).",
        "Launch of TMR mini-documentary series showcasing student testimonies."
      ]
    },
    {
      id: "rm-2-product",
      period: "Months 3 - 4",
      title: "Student Videos & Public Dashboards",
      subtitle: "Enhanced Verification Interfaces",
      description: "Enabling rich, transparent platforms to verify donor impact and showcase student progress visually.",
      category: "product",
      color: "from-blue-400 to-green-400",
      icon: <Play className="w-5 h-5 text-white" />,
      items: [
        "Launch public Student Impact Dashboard (/dashboard) with interactive mapping.",
        "Integrate 60-second video elevator pitches for fellows on /fellows.",
        "Build secure /partner portals for FAETEC/IFRJ educators to manage submissions."
      ]
    },
    {
      id: "rm-3-marketing",
      period: "Months 5 - 6",
      title: "Rio Summer Tech Missions",
      subtitle: "In-Person Service Trips",
      description: "Coordinating US church missions teams with local Rio community centers for hands-on service and training camps.",
      category: "marketing",
      color: "from-yellow-400 to-orange-500",
      icon: <Globe className="w-5 h-5 text-white" />,
      items: [
        "Organize pilot church missions trips to Rio to establish physical computer labs.",
        "Host joint 1-week summer coding camps between US volunteers and Rio students.",
        "Publish the first annual verified Student Graduation & Employment Report."
      ]
    },
    {
      id: "rm-3-product",
      period: "Months 5 - 6",
      title: "PWA Alerts & Multi-Language",
      subtitle: "Global Retentive Communications",
      description: "Polishing app engagement features and localizing systems to expand operations globally.",
      category: "product",
      color: "from-teal-400 to-blue-500",
      icon: <Calendar className="w-5 h-5 text-white" />,
      items: [
        "Implement automated push notifications for milestone updates (e.g., 'Lucas completed HTML/CSS').",
        "Full application localization (EN / PT toggles) based on regional locales.",
        "Set up automated tax-deductible donor receipt archives for B2B financial filings."
      ]
    }
  ]

  return (
    <div className="bg-black text-white min-h-screen relative overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full max-w-7xl h-[400px] bg-gradient-to-b from-blue-900/10 via-green-900/5 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 py-16 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-green-500/20 border border-green-500/30 rounded-full py-2 px-4 mb-6">
            <Calendar className="w-4 h-4 text-green-400" />
            <span className="text-xs font-semibold text-green-400 tracking-widest uppercase">The Next Six Months</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Master roadmap for<br />
            <span className="bg-gradient-to-r from-green-400 via-teal-400 to-blue-400 bg-clip-text text-transparent">TechMission Rio</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mt-6">
            Explore our integrated marketing outreach goals and technical milestones designed to connect US organizations with Rio's youth tech talent.
          </p>
        </div>

        {/* Legend / Category Filters */}
        <div className="flex justify-center gap-6 mb-12">
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600"></span>
            <span className="text-sm font-semibold text-gray-300">Technical Product Improvements</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-full bg-gradient-to-r from-green-400 to-blue-500"></span>
            <span className="text-sm font-semibold text-gray-300">Marketing & Partnerships</span>
          </div>
        </div>

        {/* Timeline Grid */}
        <div className="relative border-l-2 border-gray-800 ml-4 md:ml-32 pl-6 md:pl-12 space-y-12">
          {roadmapData.map((item) => (
            <div key={item.id} className="relative group">
              {/* Period marker on desktop */}
              <div className="hidden md:block absolute -left-[160px] top-1.5 w-[110px] text-right font-black text-lg text-green-400 tracking-wide">
                {item.period}
              </div>

              {/* Icon Node */}
              <span className={`absolute -left-[38px] md:-left-[64px] top-1 flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br ${item.color} shadow-lg ring-8 ring-black group-hover:scale-110 transition duration-300`}>
                {item.icon}
              </span>

              {/* Content Panel */}
              <div className="bg-gradient-to-br from-blue-950/20 to-black border border-blue-500/25 rounded-3xl p-8 hover:border-blue-500/50 transition-all duration-300 shadow-xl">
                {/* Mobile Period marker */}
                <div className="md:hidden text-green-400 font-bold text-sm mb-2">{item.period}</div>
                
                <h2 className="text-2xl font-bold text-white tracking-tight">{item.title}</h2>
                <div className="text-sm font-semibold text-gray-400 mt-1 mb-4 flex items-center gap-2">
                  <span>{item.subtitle}</span>
                  <span className="text-gray-600">•</span>
                  <span className="capitalize">{item.category} Track</span>
                </div>
                <p className="text-gray-300 leading-relaxed mb-6">{item.description}</p>

                {/* Subtasks checklist */}
                <div className="space-y-3 border-t border-gray-900 pt-6">
                  {item.items.map((subitem, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-400 leading-snug">{subitem}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Call to Action */}
        <div className="text-center mt-20 bg-gradient-to-r from-blue-950/25 via-black to-green-950/25 border border-blue-500/20 rounded-3xl p-10 max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Want to partner with us?</h2>
          <p className="text-gray-400 mb-6 max-w-xl mx-auto text-sm md:text-base">
            Whether you represent a technical college in Rio de Janeiro looking to join our student pipeline or a US organization looking to sponsor a student cohort, we want to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/join">
              <span id="btn-partner-join" className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition cursor-pointer">
                Get Involved
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </Link>
            <Link href="/donate">
              <span id="btn-partner-donate" className="border border-gray-600 hover:bg-white/10 text-white font-bold py-3 px-6 rounded-xl transition cursor-pointer">
                Support Our Mission
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
