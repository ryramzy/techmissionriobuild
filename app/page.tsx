import Link from "next/link"
import { Heart, Users, Target, DollarSign } from "lucide-react"

export const metadata = {
  title: 'TechMission Rio - Donate & Support Rio Youth',
  description: 'Support TechMission Rio\'s mission to empower Brazilian youth through technology education and mentorship.',
}

export default function Home() {
  return (
    <div className="bg-black text-white min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-black to-green-900">
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-green-500/20 border border-green-500/30 rounded-full py-2 px-4 mb-8">
            <Heart className="w-3 h-3 text-green-400" />
            <span className="text-xs font-semibold text-green-400 tracking-widest uppercase">Support Rio Youth</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
            Empower Rio's Youth<br />
            <span className="text-green-400">Through Technology</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto mb-12">
            Your donation helps provide technology education, mentorship, and opportunities to young people in Rio de Janeiro's underserved communities.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href="/donate">
              <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-lg transition-all transform hover:scale-105 shadow-lg">
                <DollarSign className="w-5 h-5 inline mr-2" />
                Donate Now
              </button>
            </Link>
            <Link href="/fellows">
              <button className="border border-green-500 text-green-400 hover:bg-green-500 hover:text-white font-bold py-4 px-8 rounded-lg transition-all">
                <Users className="w-5 h-5 inline mr-2" />
                Meet Our Fellows
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-20 px-6 bg-black/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Your Impact</h2>
            <p className="text-gray-400 text-lg">Every donation creates real change in Rio's communities</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-green-900/20 to-blue-900/20 border border-green-500/20 rounded-2xl p-8 text-center">
              <Users className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <div className="text-4xl font-bold text-white mb-2">200+</div>
              <div className="text-gray-400">Students Supported</div>
            </div>
            <div className="bg-gradient-to-br from-green-900/20 to-blue-900/20 border border-green-500/20 rounded-2xl p-8 text-center">
              <Target className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <div className="text-4xl font-bold text-white mb-2">12</div>
              <div className="text-gray-400">Tech Programs</div>
            </div>
            <div className="bg-gradient-to-br from-green-900/20 to-blue-900/20 border border-green-500/20 rounded-2xl p-8 text-center">
              <Heart className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <div className="text-4xl font-bold text-white mb-2">5</div>
              <div className="text-gray-400">Rio Communities</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Fellows */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Featured Fellows</h2>
            <p className="text-gray-400 text-lg">Meet the young people your support is helping</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-900/30 to-black border border-blue-500/20 rounded-2xl p-6">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
                JS
              </div>
              <h3 className="text-xl font-bold text-white mb-2">João Silva</h3>
              <p className="text-gray-400 mb-4">Web Development Fellow</p>
              <p className="text-sm text-gray-500">"TechMission Rio opened doors I never knew existed. Now I'm building websites for local businesses."</p>
            </div>
            
            <div className="bg-gradient-to-br from-blue-900/30 to-black border border-blue-500/20 rounded-2xl p-6">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
                MC
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Maria Costa</h3>
              <p className="text-gray-400 mb-4">Mobile App Developer</p>
              <p className="text-sm text-gray-500">"I went from knowing nothing about coding to developing apps that help my community."</p>
            </div>
            
            <div className="bg-gradient-to-br from-blue-900/30 to-black border border-blue-500/20 rounded-2xl p-6">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
                PS
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Pedro Santos</h3>
              <p className="text-gray-400 mb-4">Data Science Student</p>
              <p className="text-sm text-gray-500">"The mentorship and training gave me the confidence to pursue a career in tech."</p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link href="/fellows">
              <button className="border border-green-500 text-green-400 hover:bg-green-500 hover:text-white font-bold py-3 px-6 rounded-lg transition-all">
                View All Fellows
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Donation CTA */}
      <section className="py-20 px-6 bg-gradient-to-r from-green-900/30 to-blue-900/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Make a Difference Today</h2>
          <p className="text-xl text-gray-300 mb-8">
            Your donation provides laptops, training, and mentorship to young people in Rio's underserved communities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/donate">
              <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-lg transition-all transform hover:scale-105 shadow-lg">
                <DollarSign className="w-5 h-5 inline mr-2" />
                Donate Now
              </button>
            </Link>
            <Link href="/login">
              <button className="border border-green-500 text-green-400 hover:bg-green-500 hover:text-white font-bold py-4 px-8 rounded-lg transition-all">
                Sign In to Track Impact
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-gray-800 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-white font-bold mb-4">TechMission Rio</h3>
              <p className="text-gray-400 text-sm">Empowering Brazilian youth through technology education and mentorship.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3">Get Involved</h4>
              <ul className="space-y-2">
                <li><Link href="/donate" className="text-gray-400 hover:text-green-400 text-sm">Donate</Link></li>
                <li><Link href="/volunteer" className="text-gray-400 hover:text-green-400 text-sm">Volunteer</Link></li>
                <li><Link href="/partners" className="text-gray-400 hover:text-green-400 text-sm">Partner</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3">Programs</h4>
              <ul className="space-y-2">
                <li><Link href="/fellows" className="text-gray-400 hover:text-green-400 text-sm">Fellows Program</Link></li>
                <li><Link href="/workshops" className="text-gray-400 hover:text-green-400 text-sm">Workshops</Link></li>
                <li><Link href="/mentorship" className="text-gray-400 hover:text-green-400 text-sm">Mentorship</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3">Connect</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-green-400 text-sm">Contact</a></li>
                <li><a href="#" className="text-gray-400 hover:text-green-400 text-sm">Newsletter</a></li>
                <li><a href="#" className="text-gray-400 hover:text-green-400 text-sm">Social Media</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-400 text-sm"> 2024 TechMission Rio. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}