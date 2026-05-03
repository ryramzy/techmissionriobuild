import React from "react"
import { env } from "@/env.mjs"
import { DollarSign, Heart, Target } from "lucide-react"

/** Force static; PayPal form posts externally */
export const dynamic = "force-static"

export const metadata = {
  title: 'Donate - TechMission Rio',
  description: 'Support TechMission Rio\'s mission to empower Brazilian youth through technology education.',
}

export default function DonatePage() {
  const paypalButtonId = env.PAYPAL_BUTTON_ID;

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-blue-900 via-black to-green-900">
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-green-500/20 border border-green-500/30 rounded-full py-2 px-4 mb-8">
            <Heart className="w-3 h-3 text-green-400" />
            <span className="text-xs font-semibold text-green-400 tracking-widest uppercase">Make an Impact</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
            Support Rio's<br />
            <span className="text-green-400">Tech Leaders</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto mb-8">
            Your donation provides laptops, training, and mentorship to young people in Rio's underserved communities, creating pathways to tech careers.
          </p>
        </div>
      </section>

      {/* Donation Options */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Choose Your Impact</h2>
            <p className="text-gray-400 text-lg">Every dollar makes a difference in a young person's life</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-gradient-to-br from-green-900/20 to-blue-900/20 border border-green-500/20 rounded-2xl p-8 text-center">
              <div className="text-4xl font-bold text-green-400 mb-2">$25</div>
              <div className="text-white font-semibold mb-2">Tech Starter</div>
              <p className="text-gray-400 text-sm mb-4">Provides coding workshop materials for one student</p>
              <button className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-all">
                Donate $25
              </button>
            </div>
            
            <div className="bg-gradient-to-br from-green-900/20 to-blue-900/20 border border-green-500/20 rounded-2xl p-8 text-center">
              <div className="text-4xl font-bold text-green-400 mb-2">$100</div>
              <div className="text-white font-semibold mb-2">Tech Champion</div>
              <p className="text-gray-400 text-sm mb-4">Sponsors one month of mentorship for a fellow</p>
              <button className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-all">
                Donate $100
              </button>
            </div>
            
            <div className="bg-gradient-to-br from-green-900/20 to-blue-900/20 border border-green-500/20 rounded-2xl p-8 text-center">
              <div className="text-4xl font-bold text-green-400 mb-2">$500</div>
              <div className="text-white font-semibold mb-2">Tech Visionary</div>
              <p className="text-gray-400 text-sm mb-4">Funds a laptop and full program for one student</p>
              <button className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-all">
                Donate $500
              </button>
            </div>
          </div>

          {/* Custom Amount */}
          <div className="bg-gradient-to-br from-blue-900/30 to-black border border-blue-500/20 rounded-2xl p-8 text-center mb-12">
            <h3 className="text-2xl font-bold text-white mb-4">Custom Amount</h3>
            <p className="text-gray-400 mb-6">Every contribution helps us reach more young people</p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="number" 
                placeholder="Enter amount" 
                className="flex-1 bg-black/50 border border-gray-600 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-green-500"
              />
              <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-all">
                Donate Custom
              </button>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="text-center">
            <h3 className="text-xl font-bold text-white mb-6">Secure Payment Methods</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg transition-all flex items-center justify-center gap-2">
                <DollarSign className="w-5 h-5" />
                PayPal
              </button>
              <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-lg transition-all flex items-center justify-center gap-2">
                <Target className="w-5 h-5" />
                Credit Card
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Information */}
      <section className="py-20 px-6 bg-black/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Your Impact</h2>
            <p className="text-gray-400 text-lg">See how your donation creates real change</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-green-900/20 to-blue-900/20 border border-green-500/20 rounded-2xl p-6">
              <Target className="w-8 h-8 text-green-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Education & Training</h3>
              <p className="text-gray-400">Provides access to coding workshops, mentorship, and career development programs.</p>
            </div>
            
            <div className="bg-gradient-to-br from-green-900/20 to-blue-900/20 border border-green-500/20 rounded-2xl p-6">
              <Heart className="w-8 h-8 text-green-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Community Impact</h3>
              <p className="text-gray-400">Creates opportunities for youth to give back to their communities through tech projects.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Security */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-6">Trusted & Secure</h2>
          <p className="text-gray-400 mb-8">
            Your donations are processed securely and transparently. 100% of your contribution goes directly to supporting our programs.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-green-400 text-3xl mb-2">🔒</div>
              <h3 className="text-white font-semibold mb-2">Secure Payments</h3>
              <p className="text-gray-400 text-sm">Industry-standard encryption and security</p>
            </div>
            <div>
              <div className="text-green-400 text-3xl mb-2">📊</div>
              <h3 className="text-white font-semibold mb-2">Full Transparency</h3>
              <p className="text-gray-400 text-sm">Track your impact and see real results</p>
            </div>
            <div>
              <div className="text-green-400 text-3xl mb-2">🌟</div>
              <h3 className="text-white font-semibold mb-2">Tax Deductible</h3>
              <p className="text-gray-400 text-sm">501(c)(3) tax-exempt organization</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}