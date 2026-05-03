import { Users, DollarSign, Briefcase, Heart, Mail, Phone, MapPin } from "lucide-react"

export const metadata = {
  title: 'Connect - TechMission Rio',
  description: 'Connect promising youth with stakeholders and angel investors in technology.',
}

const stakeholders = [
  {
    id: 1,
    name: "Maria Silva",
    role: "Angel Investor",
    company: "RioTech Ventures",
    interests: ["AI/ML", "EdTech", "Social Impact"],
    lookingFor: "Early-stage tech startups with social mission",
    avatar: "MS"
  },
  {
    id: 2,
    name: "Carlos Oliveira",
    role: "Tech Lead",
    company: "Brazil Tech Hub",
    interests: ["Web Development", "Mobile Apps", "Cloud"],
    lookingFor: "Talent for junior developer positions",
    avatar: "CO"
  },
  {
    id: 3,
    name: "Ana Rodrigues",
    role: "VC Partner",
    company: "Impact Capital Brazil",
    interests: ["SaaS", "FinTech", "HealthTech"],
    lookingFor: "High-growth potential startups",
    avatar: "AR"
  }
]

const opportunities = [
  {
    id: 1,
    title: "Frontend Developer Internship",
    company: "RioTech Solutions",
    type: "Internship",
    location: "Rio de Janeiro (Remote/Hybrid)",
    stipend: "R$ 1,500/month",
    requirements: "HTML, CSS, JavaScript, React basics",
    deadline: "December 15, 2024"
  },
  {
    id: 2,
    title: "Startup Pitch Competition",
    company: "Brazil Innovation Fund",
    type: "Competition",
    location: "São Paulo (Travel covered)",
    prize: "R$ 50,000 investment",
    requirements: "Tech startup with MVP",
    deadline: "January 31, 2025"
  },
  {
    id: 3,
    title: "Mentorship Program",
    company: "Tech Leaders Brazil",
    type: "Mentorship",
    location: "Virtual",
    benefits: "1-on-1 mentorship, networking, resources",
    requirements: "Tech project or startup idea",
    deadline: "Rolling admission"
  }
]

export default function ConnectPage() {
  return (
    <div className="bg-black text-white min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-blue-900 via-black to-green-900">
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-green-500/20 border border-green-500/30 rounded-full py-2 px-4 mb-8">
            <Users className="w-3 h-3 text-green-400" />
            <span className="text-xs font-semibold text-green-400 tracking-widest uppercase">Make Connections</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
            Connect Youth with<br />
            <span className="text-green-400">Opportunity</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto mb-8">
            Bridge the gap between talented young technologists and the investors, mentors, and companies that can help them succeed.
          </p>
        </div>
      </section>

      {/* Stakeholders */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Featured Stakeholders</h2>
            <p className="text-gray-400 text-lg">Investors and companies looking to connect with talent</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {stakeholders.map((stakeholder) => (
              <div key={stakeholder.id} className="bg-gradient-to-br from-blue-900/30 to-black border border-blue-500/20 rounded-2xl p-6 hover:border-green-500/30 transition-all">
                {/* Profile Header */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {stakeholder.avatar}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{stakeholder.name}</h3>
                    <p className="text-green-400 text-sm">{stakeholder.role}</p>
                    <p className="text-gray-400 text-xs">{stakeholder.company}</p>
                  </div>
                </div>

                {/* Interests */}
                <div className="mb-4">
                  <h4 className="text-white font-semibold mb-2">Interests</h4>
                  <div className="flex flex-wrap gap-2">
                    {stakeholder.interests.map((interest, index) => (
                      <span key={index} className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded-full">
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Looking For */}
                <div className="border-t border-gray-700 pt-4">
                  <h4 className="text-white font-semibold mb-2">Looking For</h4>
                  <p className="text-gray-400 text-sm">{stakeholder.lookingFor}</p>
                </div>

                {/* Connect Button */}
                <button className="w-full mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition-all flex items-center justify-center gap-2">
                  <Mail className="w-4 h-4" />
                  Connect
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Opportunities */}
      <section className="py-20 px-6 bg-black/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Current Opportunities</h2>
            <p className="text-gray-400 text-lg">Jobs, competitions, and programs for young technologists</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {opportunities.map((opportunity) => (
              <div key={opportunity.id} className="bg-gradient-to-br from-green-900/20 to-blue-900/20 border border-green-500/20 rounded-2xl p-6 hover:border-blue-500/30 transition-all">
                {/* Opportunity Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="bg-blue-500/20 text-blue-400 text-xs px-2 py-1 rounded-full">
                      {opportunity.type}
                    </span>
                  </div>
                  {opportunity.stipend && (
                    <div className="text-green-400 font-bold text-sm">
                      <DollarSign className="w-4 h-4 inline" />
                      {opportunity.stipend}
                    </div>
                  )}
                  {opportunity.prize && (
                    <div className="text-green-400 font-bold text-sm">
                      <Briefcase className="w-4 h-4 inline" />
                      {opportunity.prize}
                    </div>
                  )}
                </div>

                <h3 className="text-xl font-bold text-white mb-2">{opportunity.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{opportunity.company}</p>

                {/* Location */}
                <div className="flex items-center gap-2 text-gray-400 text-sm mb-4">
                  <MapPin className="w-4 h-4" />
                  {opportunity.location}
                </div>

                {/* Requirements */}
                <div className="mb-4">
                  <h4 className="text-white font-semibold mb-2">Requirements</h4>
                  <p className="text-gray-400 text-sm">{opportunity.requirements}</p>
                </div>

                {/* Deadline */}
                <div className="border-t border-gray-700 pt-4 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">Deadline:</span>
                    <span className="text-green-400 font-semibold text-sm">{opportunity.deadline}</span>
                  </div>
                </div>

                {/* Apply Button */}
                <button className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition-all">
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">How It Works</h2>
            <p className="text-gray-400 text-lg">Simple steps to connect with opportunities</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Create Profile</h3>
              <p className="text-gray-400">Build your profile showcasing your skills, projects, and goals</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Get Matched</h3>
              <p className="text-gray-400">Our algorithm connects you with relevant opportunities</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Connect & Grow</h3>
              <p className="text-gray-400">Connect with stakeholders and launch your tech career</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-gradient-to-r from-green-900/30 to-blue-900/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Connect?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Join our platform and start connecting with opportunities that can transform your career.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/login" className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-lg transition-all transform hover:scale-105 shadow-lg inline-flex items-center justify-center gap-2">
              <Users className="w-5 h-5" />
              Create Profile
            </a>
            <a href="/donate" className="border border-green-500 text-green-400 hover:bg-green-500 hover:text-white font-bold py-4 px-8 rounded-lg transition-all inline-flex items-center justify-center gap-2">
              <Heart className="w-5 h-5" />
              Support Youth
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
