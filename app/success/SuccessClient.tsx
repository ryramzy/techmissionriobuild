"use client"

import { CheckCircle, Heart, Share2, Twitter, Facebook, Mail, Copy } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { useAnalytics } from "@/hooks/useAnalytics"

export default function SuccessClient() {
  const [copied, setCopied] = useState(false)
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const analytics = useAnalytics()

  // Donation data - fallback to search params or default $100
  const donationAmount = Number(searchParams.get('amount') || 100)
  const isMonthly = searchParams.get('monthly') === 'true'
  const isPix = searchParams.get('isPix') === 'true'

  useEffect(() => {
    // Track successful donation completion
    if (sessionId) {
      analytics.trackDonationComplete(donationAmount, isMonthly, sessionId)
      analytics.trackFunnelStep('donation', 4)
      analytics.trackRevenue(donationAmount, isPix ? 'BRL' : 'USD', {
        isMonthly,
        sessionId,
        source: 'stripe_checkout'
      })
    }
    
    // Track page view
    analytics.trackPageView('success', {
      sessionId,
      donationAmount,
      isMonthly
    })
  }, [sessionId, donationAmount, isMonthly, analytics])

  const getImpactMessage = (amount: number, monthly: boolean) => {
    if (monthly) {
      if (amount >= 100) return "You just funded a full month of mentorship for a Rio youth"
      if (amount >= 50) return "You just funded 2 weeks of coding workshops for Rio students"
      return "You just funded a week of tech training for Rio's youth"
    } else {
      if (amount >= 500) return "You just funded a complete tech education program for one student"
      if (amount >= 100) return "You just funded a month of mentorship for a Rio fellow"
      if (amount >= 50) return "You just funded 2 weeks of coding workshops"
      return "You just funded coding materials for a Rio student"
    }
  }

  const shareText = `I just supported TechMission Rio! ${getImpactMessage(donationAmount, isMonthly).toLowerCase()}. Join me in empowering Rio's youth through tech education.`
  const shareUrl = typeof window !== 'undefined' ? window.location.origin : 'https://techmissionrio.org'

  const handleShare = (platform: string) => {
    // Track share click
    analytics.trackShareClick(platform, shareText)
    
    const urls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`,
      email: `mailto:?subject=I just supported TechMission Rio&body=${encodeURIComponent(shareText + ' ' + shareUrl)}`
    }
    
    if (platform === 'link') {
      navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
      analytics.trackShareComplete('link', shareText)
    } else {
      window.open(urls[platform as keyof typeof urls], '_blank')
      analytics.trackShareComplete(platform, shareText)
    }
  }

  return (
    <div className="bg-black text-white min-h-screen flex items-center justify-center">
      <div className="max-w-4xl mx-auto text-center px-6">
        {/* Success Icon */}
        <div className="mb-8">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto animate-pulse">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
        </div>

        {/* Personalized Impact Message */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            You Just Changed a Life
          </h1>
          <div className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
            <p className="text-2xl md:text-3xl font-bold mb-6">
              {getImpactMessage(donationAmount, isMonthly)}
            </p>
          </div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Your donation of {isPix ? 'R$' : '$'}{donationAmount} {isMonthly ? 'monthly' : ''} is already creating opportunities for young people in Rio's underserved communities.
          </p>
        </div>

        {/* Real-Time Impact Counter */}
        <div className="bg-gradient-to-br from-green-900/20 to-blue-900/20 border border-green-500/20 rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Your Impact in Numbers</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-green-400 mb-2">
                {donationAmount >= 100 ? '1' : donationAmount >= 50 ? '2' : '5'}
              </div>
              <h3 className="text-white font-semibold mb-1">
                {donationAmount >= 100 ? 'Student' : 'Students'} Helped
              </h3>
              <p className="text-gray-400 text-sm">Direct impact this month</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-400 mb-2">
                {donationAmount >= 100 ? '40' : donationAmount >= 50 ? '20' : '10'}
              </div>
              <h3 className="text-white font-semibold mb-1">Hours of Training</h3>
              <p className="text-gray-400 text-sm">Coding & mentorship</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-400 mb-2">
                {donationAmount >= 500 ? '85%' : donationAmount >= 100 ? '60%' : '25%'}
              </div>
              <h3 className="text-white font-semibold mb-1">Career Readiness</h3>
              <p className="text-gray-400 text-sm">Skills gained</p>
            </div>
          </div>
        </div>

        {/* Share Section - CRITICAL FOR REFERRALS */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Multiply Your Impact</h2>
          <p className="text-gray-400 mb-6">
            When you share, 3x more people donate. Your story inspires others to join the mission.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <button 
              onClick={() => handleShare('twitter')}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-all flex items-center justify-center gap-2"
            >
              <Twitter className="w-5 h-5" />
              Share on Twitter
            </button>
            <button 
              onClick={() => handleShare('facebook')}
              className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-lg transition-all flex items-center justify-center gap-2"
            >
              <Facebook className="w-5 h-5" />
              Share on Facebook
            </button>
            <button 
              onClick={() => handleShare('email')}
              className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg transition-all flex items-center justify-center gap-2"
            >
              <Mail className="w-5 h-5" />
              Share via Email
            </button>
            <button 
              onClick={() => handleShare('link')}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-all flex items-center justify-center gap-2"
            >
              <Copy className="w-5 h-5" />
              {copied ? 'Copied!' : 'Copy Link'}
            </button>
          </div>

          {/* Share Message Preview */}
          <div className="bg-black/50 border border-gray-700 rounded-xl p-4 text-left max-w-2xl mx-auto">
            <p className="text-gray-300 text-sm italic">"{shareText}"</p>
          </div>
        </div>

        {/* Retention Loop */}
        <div className="bg-black/50 border border-gray-700 rounded-2xl p-6 mb-8">
          <h3 className="text-lg font-bold text-white mb-2">Stay Connected to Your Impact</h3>
          <p className="text-gray-300 mb-4">Get monthly updates on the students you're supporting</p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="your@email.com" 
              className="flex-1 bg-black/50 border border-gray-600 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-green-500 placeholder-gray-400"
              aria-label="Email Address for monthly updates"
            />
            <button 
              onClick={() => {
                analytics.trackEmailSignup('success_page')
                analytics.track('email_capture_success', {
                  source: 'success_page',
                  donationAmount,
                  isMonthly
                })
              }}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition-all"
            >
              Get Updates
            </button>
          </div>
        </div>

        {/* Next Steps */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-white mb-4">What's Next?</h2>
          <div className="space-y-3 text-left max-w-md mx-auto">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
              <span className="text-gray-300">Receipt sent to your email</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
              <span className="text-gray-300">Monthly impact reports</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
              <span className="text-gray-300">Invitation to donor community</span>
            </div>
          </div>
        </div>

        {/* Continue Journey */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Link href="/fellows">
            <button className="border border-green-500 text-green-400 hover:bg-green-500 hover:text-white font-bold py-3 px-6 rounded-lg transition-all">
              Meet Our Fellows
            </button>
          </Link>
          <Link href="/">
            <button className="text-gray-400 hover:text-white font-bold py-3 px-6 rounded-lg transition-all">
              Return Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
