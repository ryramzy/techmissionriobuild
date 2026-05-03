import Link from "next/link"
import { Heart, Users, Target, DollarSign, TrendingUp, Award } from "lucide-react"

export const metadata = {
  title: 'TechMission Rio - Donate & Support Rio Youth',
  description: 'Support TechMission Rio\'s mission to empower Brazilian youth through technology education and mentorship.',
}

export default function Home() {
  return (
    <div className="bg-black text-white min-h-screen">
      {/* Urgency Banner */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-center py-3 px-4">
        <div className="max-w-4xl mx-auto flex items-center justify-center gap-2">
          <TrendingUp className="w-4 h-4" />
          <span className="text-sm font-semibold"> We're raising funds to support our first 50 students in Rio</span>
          <span className="bg-white/20 px-2 py-1 rounded-full text-xs">12/50 funded</span>
        </div>
      </div>

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

      {/* Problem Section */}
      <section className="py-20 px-6 bg-black/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">The Problem</h2>
          <p className="text-xl text-gray-300 mb-8">
            Talent in Rio lacks access to technology education and career opportunities
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-red-400 mb-2">70%</div>
              <p className="text-gray-400">Of Rio youth lack tech training access</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-400 mb-2">3x</div>
              <p className="text-gray-400">Higher unemployment in underserved areas</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-400 mb-2">85%</div>
              <p className="text-gray-400">Want tech careers but don't know where to start</p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Our Solution</h2>
          <p className="text-xl text-gray-300 mb-8">
            We train + connect Rio's brightest youth with global tech opportunities
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Award className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">World-Class Training</h3>
              <p className="text-gray-400">Industry-standard tech skills and mentorship</p>
            </div>
            <div className="text-center">
              <Users className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Direct Connections</h3>
              <p className="text-gray-400">Link with investors and hiring companies</p>
            </div>
            <div className="text-center">
              <Target className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Career Launch</h3>
              <p className="text-gray-400">Job placement and startup support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Proof of Impact */}
      <section className="py-20 px-6 bg-gradient-to-br from-green-900/20 to-blue-900/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Your Impact in Action</h2>
            <p className="text-gray-400 text-lg">Every dollar creates measurable change</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-black/50 border border-green-500/30 rounded-2xl p-8 text-center">
              <div className="text-4xl font-bold text-green-400 mb-2">$25</div>
              <div className="text-white font-semibold mb-2">Tech Starter</div>
              <p className="text-gray-400 mb-4">Funds one week of training materials</p>
              <div className="text-sm text-gray-500">
                ✓ Coding curriculum<br/>
                ✓ Online resources<br/>
                ✓ Mentor access
              </div>
            </div>
            
            <div className="bg-black/50 border border-green-500/30 rounded-2xl p-8 text-center relative">
              <div className="absolute -top-3 -right-3 bg-yellow-500 text-black text-xs px-2 py-1 rounded-full font-bold">
                MOST POPULAR
              </div>
              <div className="text-4xl font-bold text-green-400 mb-2">$100</div>
              <div className="text-white font-semibold mb-2">Tech Champion</div>
              <p className="text-gray-400 mb-4">Supports a student for a full month</p>
              <div className="text-sm text-gray-500">
                ✓ 1:1 mentorship<br/>
                ✓ Project portfolio<br/>
                ✓ Career coaching
              </div>
            </div>
            
            <div className="bg-black/50 border border-green-500/30 rounded-2xl p-8 text-center relative">
              <div className="absolute -top-3 -right-3 bg-purple-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                HIGH IMPACT
              </div>
              <div className="text-4xl font-bold text-green-400 mb-2">$500</div>
              <div className="text-white font-semibold mb-2">Tech Visionary</div>
              <p className="text-gray-400 mb-4">Launches a student into job readiness</p>
              <div className="text-sm text-gray-500">
                ✓ Laptop provision<br/>
                ✓ 3-month program<br/>
                ✓ Job placement support
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="bg-black/50 border border-gray-700 rounded-2xl p-6 mb-8">
            <div className="flex justify-between items-center mb-4">
              <span className="text-white font-semibold">First 50 Students Goal</span>
              <span className="text-green-400 font-bold">12/50 Funded</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-4">
              <div className="bg-gradient-to-r from-green-500 to-blue-500 h-4 rounded-full" style={{width: '24%'}}></div>
            </div>
            <p className="text-gray-400 text-sm mt-2">38 more students need your support to launch their tech careers</p>
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="py-20 px-6 bg-black/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Where Your Money Goes</h2>
            <p className="text-gray-400 text-lg">100% transparent funding breakdown</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gradient-to-br from-green-900/20 to-blue-900/20 border border-green-500/20 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-white mb-4">Program Expenses (85%)</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Training Materials</span>
                  <span className="text-green-400">35%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Mentorship Programs</span>
                  <span className="text-green-400">25%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Equipment & Laptops</span>
                  <span className="text-green-400">15%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Career Placement</span>
                  <span className="text-green-400">10%</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-green-900/20 to-blue-900/20 border border-green-500/20 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-white mb-4">Operations (15%)</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Platform & Technology</span>
                  <span className="text-green-400">8%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Administrative</span>
                  <span className="text-green-400">4%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Fundraising</span>
                  <span className="text-green-400">3%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Legitimacy Markers */}
          <div className="text-center">
            <div className="inline-flex items-center gap-6 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <span className="text-green-400">📍</span>
                <span>Based in Rio de Janeiro, Brazil</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span>501(c)(3) Pending</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">🔒</span>
                <span>Secure Payments</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Story */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Why I Started This</h2>
            <p className="text-gray-400 text-lg">People donate to people, not just causes</p>
          </div>
          
          <div className="bg-gradient-to-br from-blue-900/30 to-black border border-blue-500/20 rounded-2xl p-8 md:p-12">
            <div className="grid md:grid-cols-3 gap-8 items-center">
              <div className="md:col-span-2">
                <h3 className="text-2xl font-bold text-white mb-4">From Rio's Favelas to Global Tech</h3>
                <p className="text-gray-300 mb-4">
                  Growing up in Rio's underserved communities, I saw incredible talent everywhere - but zero opportunity. Young people with brilliant minds, coding on borrowed phones, dreaming of tech careers that felt impossible.
                </p>
                <p className="text-gray-300 mb-4">
                  After breaking into tech myself, I realized the problem wasn't lack of talent - it was lack of access. Of bridges. Of someone saying "you belong here."
                </p>
                <p className="text-gray-300 mb-4">
                  TechMission Rio is my promise to the next generation: your zip code won't determine your future. We're building the bridge from Rio's communities to the global tech economy.
                </p>
                <div className="mt-6">
                  <p className="text-green-400 font-semibold">— Founder, TechMission Rio</p>
                  <p className="text-gray-400 text-sm mt-2">Rio de Janeiro, Brazil</p>
                </div>
              </div>
              <div className="text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-4xl mx-auto mb-4">
                  TMR
                </div>
                <p className="text-gray-400 text-sm">Building bridges<br/>since 2024</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Email Capture */}
      <section className="py-20 px-6 bg-gradient-to-r from-green-900/30 to-blue-900/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Stay Updated on Student Progress</h2>
          <p className="text-xl text-gray-300 mb-8">
            Get monthly updates on the students you're supporting and see your impact in action
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto mb-6">
            <input 
              type="email" 
              placeholder="your@email.com" 
              className="flex-1 bg-black/50 border border-gray-600 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-green-500"
            />
            <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-all">
              Subscribe
            </button>
          </div>
          <p className="text-gray-400 text-sm">Join 500+ supporters making a difference in Rio</p>
        </div>
      </section>

      {/* Featured Fellows */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Real Success Stories</h2>
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
              <div className="mt-4 pt-4 border-t border-gray-700">
                <p className="text-green-400 text-sm font-semibold">✓ Placed at Rio Tech Startups</p>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-900/30 to-black border border-blue-500/20 rounded-2xl p-6">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
                MC
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Maria Costa</h3>
              <p className="text-gray-400 mb-4">Mobile App Developer</p>
              <p className="text-sm text-gray-500">"I went from knowing nothing about coding to developing apps that help my community."</p>
              <div className="mt-4 pt-4 border-t border-gray-700">
                <p className="text-green-400 text-sm font-semibold">✓ 3 Apps Published</p>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-900/30 to-black border border-blue-500/20 rounded-2xl p-6">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
                PS
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Pedro Santos</h3>
              <p className="text-gray-400 mb-4">Data Science Student</p>
              <p className="text-sm text-gray-500">"The mentorship and training gave me the confidence to pursue a career in tech."</p>
              <div className="mt-4 pt-4 border-t border-gray-700">
                <p className="text-green-400 text-sm font-semibold">✓ Data Analyst at Local Company</p>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link href="/fellows">
              <button className="border border-green-500 text-green-400 hover:bg-green-500 hover:text-white font-bold py-3 px-6 rounded-lg transition-all">
                View All Success Stories
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