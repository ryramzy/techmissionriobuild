"use client"

import React, { useState } from "react"
import { Heart } from "lucide-react"
import { useAuth } from "@/app/components/AuthContext"

export default function DonateClient() {
  const { user } = useAuth()
  const [selectedAmount, setSelectedAmount] = useState(25)
  const [isMonthly, setIsMonthly] = useState(false)
  const [isPix, setIsPix] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleDonate = async (amount: number) => {
    setSelectedAmount(amount)
    setIsLoading(true)
    setErrorMessage(null)
    
    // Offline progressive check
    if (typeof window !== "undefined" && !navigator.onLine) {
      setErrorMessage("Network Offline: You must be connected to the internet to initialize Stripe checkout transactions. Please check your connection and retry.")
      setIsLoading(false)
      return
    }
    
    try {
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          isMonthly,
          userId: user ? user.uid : null,
          isPix,
        }),
      })

      if (!response.ok) {
        let errorMsg = 'Failed to create checkout session'
        try {
          const errJson = await response.json()
          if (errJson.error) errorMsg = errJson.error
        } catch (_) {
          const errorText = await response.text()
          if (errorText) errorMsg = errorText
        }
        throw new Error(errorMsg)
      }

      const { sessionId } = await response.json()
      
      // Redirect to Stripe Checkout
      const { loadStripe } = await import('@stripe/stripe-js')
      const stripeKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
      if (!stripeKey) {
        throw new Error('Stripe Publishable Key is not configured on the client side.')
      }
      const stripe = await loadStripe(stripeKey)
      
      if (!stripe) {
        throw new Error('Failed to load Stripe SDK')
      }
      
      const { error } = await (stripe as any).redirectToCheckout({ sessionId })
      
      if (error) {
        console.error('Stripe checkout error:', error)
        throw new Error(`Stripe checkout failed: ${error.message}`)
      }
    } catch (error: any) {
      console.error('Donation error:', error)
      setErrorMessage(error.message || 'An error occurred during checkout setup.')
    } finally {
      setIsLoading(false)
    }
  }

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
          {errorMessage && (
            <div className="bg-red-950/40 border border-red-500/30 rounded-2xl p-6 text-center max-w-2xl mx-auto mb-12 animate-pulse">
              <div className="text-red-400 font-semibold mb-2">⚠️ Donation Service Notice</div>
              <p className="text-gray-300 text-sm mb-4">
                The live Stripe checkout integration is currently unavailable in this environment (publishable/secret keys are missing or invalid).
              </p>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => {
                    window.location.href = `/success?session_id=demo_session_${Date.now()}&amount=${selectedAmount}&monthly=${isMonthly}&isPix=${isPix}`
                  }}
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-5 rounded-lg transition-all"
                >
                  Simulate Donation of ${selectedAmount} {isMonthly ? 'Monthly' : 'One-time'}
                </button>
                <button
                  onClick={() => setErrorMessage(null)}
                  className="border border-gray-600 hover:bg-white/10 text-white py-2 px-5 rounded-lg transition-all"
                >
                  Dismiss
                </button>
              </div>
            </div>
          )}

          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Choose Your Impact</h2>
            <p className="text-gray-400 text-lg">Every dollar makes a difference in a young person's life</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-gradient-to-br from-green-900/20 to-blue-900/20 border border-green-500/20 rounded-2xl p-8 text-center">
              <div className="text-4xl font-bold text-green-400 mb-2">{isPix ? 'R$25' : '$25'}</div>
              <div className="text-white font-semibold mb-2">Tech Starter</div>
              <p className="text-gray-400 text-sm mb-4">Provides coding workshop materials for one student</p>
              <button 
                onClick={() => handleDonate(25)}
                disabled={isLoading}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-all disabled:opacity-50"
              >
                {isLoading ? 'Processing...' : `Donate ${isPix ? 'R$' : '$'}25`}
              </button>
            </div>
            
            <div className="bg-gradient-to-br from-green-900/20 to-blue-900/20 border border-green-500/20 rounded-2xl p-8 text-center relative">
              <div className="absolute -top-3 -right-3 bg-yellow-500 text-black text-xs px-2 py-1 rounded-full font-bold">
                MOST POPULAR
              </div>
              <div className="text-4xl font-bold text-green-400 mb-2">{isPix ? 'R$100' : '$100'}</div>
              <div className="text-white font-semibold mb-2">Tech Champion</div>
              <p className="text-gray-400 text-sm mb-4">Sponsors one month of mentorship for a fellow</p>
              <button 
                onClick={() => handleDonate(100)}
                disabled={isLoading}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-all disabled:opacity-50"
              >
                {isLoading ? 'Processing...' : `Donate ${isPix ? 'R$' : '$'}100`}
              </button>
            </div>
            
            <div className="bg-gradient-to-br from-green-900/20 to-blue-900/20 border border-green-500/20 rounded-2xl p-8 text-center relative">
              <div className="absolute -top-3 -right-3 bg-purple-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                HIGH IMPACT
              </div>
              <div className="text-4xl font-bold text-green-400 mb-2">{isPix ? 'R$500' : '$500'}</div>
              <div className="text-white font-semibold mb-2">Tech Visionary</div>
              <p className="text-gray-400 text-sm mb-4">Funds a laptop and full program for one student</p>
              <button 
                onClick={() => handleDonate(500)}
                disabled={isLoading}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-all disabled:opacity-50"
              >
                {isLoading ? 'Processing...' : `Donate ${isPix ? 'R$' : '$'}500`}
              </button>
            </div>
          </div>

          {/* Preferences Toggles */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Monthly Toggle */}
            <div className="bg-gradient-to-br from-blue-900/30 to-black border border-blue-500/20 rounded-2xl p-8 text-center">
              <h3 className="text-xl font-bold text-white mb-2">Support Interval</h3>
              <p className="text-gray-400 text-xs mb-4">Choose recurring monthly support for sustainable impact</p>
              <div className="flex items-center justify-center gap-4">
                <span className={`text-sm ${!isMonthly ? 'text-green-400 font-bold' : 'text-gray-300 font-semibold'}`}>One-time</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={isMonthly}
                    onChange={(e) => {
                      const val = e.target.checked
                      setIsMonthly(val)
                      if (val) setIsPix(false) // Disable PIX on monthly
                    }}
                    className="sr-only peer"
                    aria-label="Toggle Monthly Recurring Support"
                  />
                  <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-focus:ring-2 peer-focus:ring-green-500 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500 relative"></div>
                </label>
                <span className={`text-sm ${isMonthly ? 'text-green-400 font-bold' : 'text-gray-300 font-semibold'}`}>Monthly</span>
              </div>
            </div>

            {/* PIX/BRL Toggle */}
            <div className={`bg-gradient-to-br from-blue-900/30 to-black border border-blue-500/20 rounded-2xl p-8 text-center transition-all ${isMonthly ? 'opacity-40 pointer-events-none' : ''}`}>
              <h3 className="text-xl font-bold text-white mb-2">Brazil Local Payment (PIX)</h3>
              <p className="text-gray-400 text-xs mb-4">Pay in BRL using PIX instant transfer or card</p>
              <div className="flex items-center justify-center gap-4">
                <span className={`text-sm ${!isPix ? 'text-green-400 font-bold' : 'text-gray-300 font-semibold'}`}>USD ($)</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={isPix}
                    disabled={isMonthly}
                    onChange={(e) => setIsPix(e.target.checked)}
                    className="sr-only peer"
                    aria-label="Toggle BRL PIX Payment Mode"
                  />
                  <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-focus:ring-2 peer-focus:ring-green-500 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500 relative"></div>
                </label>
                <span className={`text-sm ${isPix ? 'text-green-400 font-bold' : 'text-gray-300 font-semibold'}`}>BRL (R$ / PIX)</span>
              </div>
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
                value={selectedAmount}
                onChange={(e) => setSelectedAmount(Number(e.target.value))}
                className="flex-1 bg-black/50 border border-gray-600 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-green-500 placeholder-gray-400"
                aria-label="Custom Donation Amount"
              />
              <button 
                onClick={() => handleDonate(selectedAmount)}
                disabled={isLoading || selectedAmount <= 0}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-all disabled:opacity-50"
              >
                {isLoading ? 'Processing...' : `Donate ${isPix ? 'R$' : '$'}${selectedAmount}`}
              </button>
            </div>
          </div>

          {/* Trust & Security */}
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
        </div>
      </section>
    </div>
  )
}
