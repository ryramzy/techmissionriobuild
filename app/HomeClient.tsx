"use client"

import Link from "next/link"
import { ArrowRight, Heart, Users, Target, TrendingUp, Award, Mail, DollarSign } from "lucide-react"
import { useAnalytics } from "@/hooks/useAnalytics"
import { useEffect } from "react"

export default function HomeClient() {
  const analytics = useAnalytics()

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
              <button 
                onClick={() => handleDonateClick('hero')}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-lg transition-all transform hover:scale-105 shadow-lg"
              >
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
            <p className="text-gray-300 text-lg">Every donation creates real change in Rio's communities</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-green-900/20 to-blue-900/20 border border-green-500/20 rounded-2xl p-8 text-center">
              <Users className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <div className="text-4xl font-bold text-white mb-2">200+</div>
              <div className="text-gray-300">Students Supported</div>
            </div>
            <div className="bg-gradient-to-br from-green-900/20 to-blue-900/20 border border-green-500/20 rounded-2xl p-8 text-center">
              <Target className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <div className="text-4xl font-bold text-white mb-2">12</div>
              <div className="text-gray-300">Tech Programs</div>
            </div>
            <div className="bg-gradient-to-br from-green-900/20 to-blue-900/20 border border-green-500/20 rounded-2xl p-8 text-center">
              <Heart className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <div className="text-4xl font-bold text-white mb-2">5</div>
              <div className="text-gray-300">Rio Communities</div>
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
              <p className="text-gray-300">Of Rio youth lack tech training access</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-400 mb-2">3x</div>
              <p className="text-gray-300">Higher unemployment in underserved areas</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-400 mb-2">85%</div>
              <p className="text-gray-300">Want tech careers but don't know where to start</p>
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
              <p className="text-gray-300">Industry-standard tech skills and mentorship</p>
            </div>
            <div className="text-center">
              <Users className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Direct Connections</h3>
              <p className="text-gray-300">Link with investors and hiring companies</p>
            </div>
            <div className="text-center">
              <Target className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Career Launch</h3>
              <p className="text-gray-300">Job placement and startup support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Proof of Impact */}
      <section className="py-20 px-6 bg-gradient-to-br from-green-900/20 to-blue-900/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Your Impact in Action</h2>
            <p className="text-gray-300 text-lg">Every dollar creates measurable change</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-black/50 border border-green-500/30 rounded-2xl p-8 text-center">
              <div className="text-4xl font-bold text-green-400 mb-2">$25</div>
              <div className="text-white font-semibold mb-2">Tech Starter</div>
              <p className="text-gray-300 mb-4">Funds one week of training materials</p>
              <div className="text-sm text-gray-400">
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
              <p className="text-gray-300 mb-4">Supports a student for a full month</p>
              <div className="text-sm text-gray-400">
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
              <p className="text-gray-300 mb-4">Launches a student into job readiness</p>
              <div className="text-sm text-gray-400">
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
            <p className="text-gray-300 text-sm mt-2">38 more students need your support to launch their tech careers</p>
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="py-20 px-6 bg-black/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Where Your Money Goes</h2>
            <p className="text-gray-300 text-lg">100% transparent funding breakdown</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gradient-to-br from-green-900/20 to-blue-900/20 border border-green-500/20 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-white mb-4">Program Expenses (85%)</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-300">Training Materials</span>
                  <span className="text-green-400">35%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Mentorship Programs</span>
                  <span className="text-green-400">25%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Equipment & Laptops</span>
                  <span className="text-green-400">15%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Student Support</span>
                  <span className="text-green-400">10%</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-900/20 to-black border border-blue-500/20 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-white mb-4">Operations (15%)</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-300">Platform & Technology</span>
                  <span className="text-blue-400">8%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Administrative</span>
                  <span className="text-blue-400">4%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Fundraising Costs</span>
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
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">From Rio Favelas to Tech Innovation</h2>
          
          <div className="bg-gradient-to-br from-green-900/20 to-blue-900/20 border border-green-500/20 rounded-2xl p-8 mb-8">
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              Born and raised in Rio's communities, I saw firsthand how talent was everywhere but opportunity was not. 
              The brightest minds in our favelas were building incredible things with nothing but determination and borrowed laptops.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              TechMission Rio started with a simple belief: if we could connect Rio's untapped talent with global tech opportunities, 
              we could transform not just individual lives, but entire communities.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              Every student we support represents a promise fulfilled to the next generation of Rio innovators.
            </p>
          </div>
          
          <div className="text-center">
            <p className="text-green-400 font-semibold text-lg mb-2">Our Mission</p>
            <p className="text-xl text-white font-bold">
              "Empowering Rio's youth to become the next generation of tech leaders, 
              transforming their communities through innovation and opportunity."
            </p>
          </div>
        </div>
      </section>

      {/* Email Capture */}
      <section className="py-20 px-6 bg-gradient-to-br from-green-900/20 to-blue-900/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Join Our Mission</h2>
          <p className="text-xl text-gray-300 mb-8">
            Get updates on student progress and see your impact in action
          </p>
          
          <div className="bg-black/50 border border-gray-700 rounded-2xl p-8">
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="your@email.com" 
                className="flex-1 bg-black/50 border border-gray-600 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-green-500 placeholder-gray-400"
                aria-label="Email Address for Updates"
              />
              <button 
                onClick={() => analytics.trackEmailSignup('homepage')}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-all"
              >
                Subscribe
              </button>
            </div>
            <p className="text-gray-300 text-sm mt-4">
              Join 500+ supporters making a difference in Rio's tech community
            </p>
          </div>
        </div>
      </section>

      {/* Real Success Stories */}
      <section className="py-20 px-6 bg-black/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Real Success Stories</h2>
            <p className="text-gray-300 text-lg">Meet the students whose lives you've transformed</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-green-900/20 to-blue-900/20 border border-green-500/20 rounded-2xl p-6">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">JD</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">João da Silva</h3>
              <p className="text-green-400 text-sm mb-2">Full Stack Developer at Mercado Livre</p>
              <p className="text-gray-400 text-sm">
                "TechMission Rio gave me the skills and confidence to land my dream job. 
                Now I'm mentoring other students from my community."
              </p>
              <div className="mt-4 flex items-center gap-2">
                <span className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded">Verified Placement</span>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-green-900/20 to-blue-900/20 border border-green-500/20 rounded-2xl p-6">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">MS</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Maria Santos</h3>
              <p className="text-green-400 text-sm mb-2">UX Designer at Nubank</p>
              <p className="text-gray-400 text-sm">
                "The mentorship program connected me with industry leaders who helped me 
                build a portfolio that got me hired at one of Brazil's top fintech companies."
              </p>
              <div className="mt-4 flex items-center gap-2">
                <span className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded">Verified Placement</span>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-green-900/20 to-blue-900/20 border border-green-500/20 rounded-2xl p-6">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">RC</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Roberto Costa</h3>
              <p className="text-green-400 text-sm mb-2">Startup Founder - EduTech Rio</p>
              <p className="text-gray-400 text-sm">
                "The training and connections I received helped me launch my own edtech startup, 
                now helping other students learn tech skills."
              </p>
              <div className="mt-4 flex items-center gap-2">
                <span className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded">Startup Success</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6 bg-gradient-to-br from-green-900/20 to-blue-900/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Make an Impact?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Your donation creates real opportunities for Rio's brightest minds
          </p>
          
          <Link href="/donate">
            <button 
              onClick={() => handleDonateClick('final_cta')}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-lg transition-all transform hover:scale-105 shadow-lg text-lg"
            >
              <DollarSign className="w-6 h-6 inline mr-2" />
              Donate Now
            </button>
          </Link>
        </div>
      </section>
    </div>
  )
}
