import { Users, MapPin, Calendar, Heart } from "lucide-react"

export const metadata = {
  title: 'Fellows - TechMission Rio',
  description: 'Meet the talented young people in TechMission Rio\'s fellowship program.',
}

const fellows = [
  {
    id: 1,
    name: "João Silva",
    initials: "JS",
    track: "Web Development",
    location: "Rocinha, Rio",
    joinedDate: "January 2024",
    story: "TechMission Rio opened doors I never knew existed. Now I'm building websites for local businesses and helping my community.",
    skills: ["HTML", "CSS", "JavaScript", "React"],
    goal: "Become a full-stack developer and start a tech company in Rio"
  },
  {
    id: 2,
    name: "Maria Costa",
    initials: "MC",
    track: "Mobile App Development",
    location: "Complexo do Alemão, Rio",
    joinedDate: "February 2024",
    story: "I went from knowing nothing about coding to developing apps that help my community access essential services.",
    skills: ["React Native", "Firebase", "UI/UX Design"],
    goal: "Create apps that solve problems in underserved communities"
  },
  {
    id: 3,
    name: "Pedro Santos",
    initials: "PS",
    track: "Data Science",
    location: "Vila Kennedy, Rio",
    joinedDate: "March 2024",
    story: "The mentorship and training gave me the confidence to pursue a career in tech. Now I'm working with data to help local businesses.",
    skills: ["Python", "Machine Learning", "Data Analysis"],
    goal: "Use data science to improve urban planning in Rio"
  },
  {
    id: 4,
    name: "Ana Oliveira",
    initials: "AO",
    track: "UI/UX Design",
    location: "Maré, Rio",
    joinedDate: "January 2024",
    story: "Design has always been my passion, but I never thought I could make a career of it. TechMission Rio showed me how.",
    skills: ["Figma", "Adobe XD", "Prototyping"],
    goal: "Design accessible technology for people with disabilities"
  },
  {
    id: 5,
    name: "Carlos Mendes",
    initials: "CM",
    track: "Backend Development",
    location: "Jacarezinho, Rio",
    joinedDate: "February 2024",
    story: "I love solving problems with code. The fellowship program gave me the skills and network to turn this passion into a career.",
    skills: ["Node.js", "PostgreSQL", "AWS"],
    goal: "Build scalable systems for social impact organizations"
  },
  {
    id: 6,
    name: "Luciana Ferreira",
    initials: "LF",
    track: "Frontend Development",
    location: "Tijuca, Rio",
    joinedDate: "March 2024",
    story: "Being a woman in tech can be challenging, but TechMission Rio created a supportive environment where I can thrive.",
    skills: ["Vue.js", "TypeScript", "CSS"],
    goal: "Mentor other young women interested in technology"
  }
]

export default function FellowsPage() {
  return (
    <div className="bg-black text-white min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-blue-900 via-black to-green-900">
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-green-500/20 border border-green-500/30 rounded-full py-2 px-4 mb-8">
            <Users className="w-3 h-3 text-green-400" />
            <span className="text-xs font-semibold text-green-400 tracking-widest uppercase">Our Fellows</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
            Meet Rio's<br />
            <span className="text-green-400">Tech Leaders</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto mb-8">
            Get to know the talented young people transforming their communities through technology education and innovation.
          </p>
        </div>
      </section>

      {/* Fellows Grid */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Current Fellows</h2>
            <p className="text-gray-400 text-lg">6 young leaders building Rio's tech future</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {fellows.map((fellow) => (
              <div key={fellow.id} className="bg-gradient-to-br from-blue-900/30 to-black border border-blue-500/20 rounded-2xl p-6 hover:border-green-500/30 transition-all">
                {/* Profile Header */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {fellow.initials}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{fellow.name}</h3>
                    <p className="text-green-400 text-sm">{fellow.track}</p>
                  </div>
                </div>

                {/* Location & Date */}
                <div className="flex items-center gap-4 text-gray-400 text-sm mb-4">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {fellow.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {fellow.joinedDate}
                  </div>
                </div>

                {/* Story */}
                <p className="text-gray-300 text-sm mb-4 italic">"{fellow.story}"</p>

                {/* Skills */}
                <div className="mb-4">
                  <h4 className="text-white font-semibold mb-2">Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {fellow.skills.map((skill, index) => (
                      <span key={index} className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Goal */}
                <div className="border-t border-gray-700 pt-4">
                  <h4 className="text-white font-semibold mb-2">Career Goal</h4>
                  <p className="text-gray-400 text-sm">{fellow.goal}</p>
                </div>

                {/* Support Button */}
                <button className="w-full mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition-all flex items-center justify-center gap-2">
                  <Heart className="w-4 h-4" />
                  Support {fellow.name.split(' ')[0]}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-20 px-6 bg-black/50">
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
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Support Our Fellows</h2>
          <p className="text-xl text-gray-300 mb-8">
            Your donation helps provide laptops, training, and mentorship to these talented young people.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/donate" className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-lg transition-all transform hover:scale-105 shadow-lg inline-flex items-center justify-center gap-2">
              <Heart className="w-5 h-5" />
              Support All Fellows
            </a>
            <a href="/login" className="border border-green-500 text-green-400 hover:bg-green-500 hover:text-white font-bold py-4 px-8 rounded-lg transition-all inline-flex items-center justify-center gap-2">
              <Users className="w-5 h-5" />
              Become a Mentor
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
