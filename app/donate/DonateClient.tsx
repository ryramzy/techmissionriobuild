"use client"

import React, { useState } from "react"
import { Heart } from "lucide-react"
import { useAuth } from "@/app/components/AuthContext"
import { useTranslations } from "next-intl"

export default function DonateClient() {
  const { user } = useAuth()
  const t = useTranslations("Donate")
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
            <span className="text-xs font-semibold text-green-400 tracking-widest uppercase">{t("makeImpact")}</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
            {t("heroTitle1")}<br />
            <span className="text-green-400">{t("heroTitle2")}</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto mb-8">
            {t("heroSubtitle")}
          </p>
        </div>
      </section>

      {/* Donation Options */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          {errorMessage && (
            <div className="bg-red-950/40 border border-red-500/30 rounded-2xl p-6 text-center max-w-2xl mx-auto mb-12 animate-pulse">
              <div className="text-red-400 font-semibold mb-2">{t("offlineNoticeTitle")}</div>
              <p className="text-gray-300 text-sm mb-4">
                {t("offlineNotice")}
              </p>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => {
                    window.location.href = `/success?session_id=demo_session_${Date.now()}&amount=${selectedAmount}&monthly=${isMonthly}&isPix=${isPix}`
                  }}
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-5 rounded-lg transition-all text-xs"
                >
                  {t("simulateText", { amount: `${isPix ? 'R$' : '$'}${selectedAmount}`, interval: isMonthly ? t("monthly") : t("oneTime") })}
                </button>
                <button
                  onClick={() => setErrorMessage(null)}
                  className="border border-gray-600 hover:bg-white/10 text-white py-2 px-5 rounded-lg transition-all text-xs"
                >
                  {t("dismiss")}
                </button>
              </div>
            </div>
          )}

          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t("chooseImpact")}</h2>
            <p className="text-gray-400 text-lg">{t("chooseImpactSubtitle")}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-gradient-to-br from-green-900/20 to-blue-900/20 border border-green-500/20 rounded-2xl p-8 text-center">
              <div className="text-4xl font-bold text-green-400 mb-2">{isPix ? 'R$25' : '$25'}</div>
              <div className="text-white font-semibold mb-2">{t("tier1Title")}</div>
              <p className="text-gray-400 text-sm mb-4">{t("tier1Desc")}</p>
              <button 
                onClick={() => handleDonate(25)}
                disabled={isLoading}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-all disabled:opacity-50 text-xs cursor-pointer"
              >
                {isLoading ? t("processing") : t("donateBtn", { currency: isPix ? 'R$' : '$', amount: '25' })}
              </button>
            </div>
            
            <div className="bg-gradient-to-br from-green-900/20 to-blue-900/20 border border-green-500/20 rounded-2xl p-8 text-center relative">
              <div className="absolute -top-3 -right-3 bg-yellow-500 text-black text-xs px-2 py-1 rounded-full font-bold">
                {t("mostPopular", { defaultValue: "MOST POPULAR" })}
              </div>
              <div className="text-4xl font-bold text-green-400 mb-2">{isPix ? 'R$100' : '$100'}</div>
              <div className="text-white font-semibold mb-2">{t("tier2Title")}</div>
              <p className="text-gray-400 text-sm mb-4">{t("tier2Desc")}</p>
              <button 
                onClick={() => handleDonate(100)}
                disabled={isLoading}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-all disabled:opacity-50 text-xs cursor-pointer"
              >
                {isLoading ? t("processing") : t("donateBtn", { currency: isPix ? 'R$' : '$', amount: '100' })}
              </button>
            </div>
            
            <div className="bg-gradient-to-br from-green-900/20 to-blue-900/20 border border-green-500/20 rounded-2xl p-8 text-center relative">
              <div className="absolute -top-3 -right-3 bg-purple-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                {t("highImpact", { defaultValue: "HIGH IMPACT" })}
              </div>
              <div className="text-4xl font-bold text-green-400 mb-2">{isPix ? 'R$500' : '$500'}</div>
              <div className="text-white font-semibold mb-2">{t("tier3Title")}</div>
              <p className="text-gray-400 text-sm mb-4">{t("tier3Desc")}</p>
              <button 
                onClick={() => handleDonate(500)}
                disabled={isLoading}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-all disabled:opacity-50 text-xs cursor-pointer"
              >
                {isLoading ? t("processing") : t("donateBtn", { currency: isPix ? 'R$' : '$', amount: '500' })}
              </button>
            </div>
          </div>

          {/* Preferences Toggles */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Monthly Toggle */}
            <div className="bg-gradient-to-br from-blue-900/30 to-black border border-blue-500/20 rounded-2xl p-8 text-center">
              <h3 className="text-xl font-bold text-white mb-2">{t("supportInterval")}</h3>
              <p className="text-gray-400 text-xs mb-4">{t("supportIntervalDesc")}</p>
              <div className="flex items-center justify-center gap-4">
                <span className={`text-sm ${!isMonthly ? 'text-green-400 font-bold' : 'text-gray-300 font-semibold'}`}>{t("oneTime")}</span>
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
                <span className={`text-sm ${isMonthly ? 'text-green-400 font-bold' : 'text-gray-300 font-semibold'}`}>{t("monthly")}</span>
              </div>
            </div>

            {/* PIX/BRL Toggle */}
            <div className={`bg-gradient-to-br from-blue-900/30 to-black border border-blue-500/20 rounded-2xl p-8 text-center transition-all ${isMonthly ? 'opacity-40 pointer-events-none' : ''}`}>
              <h3 className="text-xl font-bold text-white mb-2">{t("brazilPix")}</h3>
              <p className="text-gray-400 text-xs mb-4">{t("brazilPixDesc")}</p>
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

          {/* 501(c)(3) pending status disclaimer */}
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-6 text-center mb-8 max-w-3xl mx-auto">
            <p className="text-yellow-400 text-sm font-semibold flex items-center justify-center gap-2">
              <span>⚠️</span>
              {t("pendingDisclaimer")}
            </p>
          </div>

          {/* Custom Amount */}
          <div className="bg-gradient-to-br from-blue-900/30 to-black border border-blue-500/20 rounded-2xl p-8 text-center mb-12">
            <h3 className="text-2xl font-bold text-white mb-4">{t("customAmount")}</h3>
            <p className="text-gray-400 mb-6">{t("customAmountDesc")}</p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="number" 
                placeholder={t("enterAmount")} 
                value={selectedAmount}
                onChange={(e) => setSelectedAmount(Number(e.target.value))}
                className="flex-1 bg-black/50 border border-gray-600 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-green-500 placeholder-gray-400"
                aria-label="Custom Donation Amount"
              />
              <button 
                onClick={() => handleDonate(selectedAmount)}
                disabled={isLoading || selectedAmount <= 0}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-all disabled:opacity-50 text-xs cursor-pointer"
              >
                {isLoading ? t("processing") : t("donateBtn", { currency: isPix ? 'R$' : '$', amount: selectedAmount })}
              </button>
            </div>
          </div>

          {/* Trust & Security */}
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-white mb-6">{t("trustedSecure")}</h2>
            <p className="text-gray-400 mb-8">
              {t("trustedSecureDesc")}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <div className="text-green-400 text-3xl mb-2">🔒</div>
                <h3 className="text-white font-semibold mb-2">{t("securePayments")}</h3>
                <p className="text-gray-400 text-sm">{t("securePaymentsDesc")}</p>
              </div>
              <div>
                <div className="text-green-400 text-3xl mb-2">📊</div>
                <h3 className="text-white font-semibold mb-2">{t("fullTransparency")}</h3>
                <p className="text-gray-400 text-sm">{t("fullTransparencyDesc")}</p>
              </div>
              <div>
                <div className="text-green-400 text-3xl mb-2">🌟</div>
                <h3 className="text-white font-semibold mb-2">{t("taxDeductible")}</h3>
                <p className="text-gray-400 text-sm">{t("taxDeductibleDesc")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
