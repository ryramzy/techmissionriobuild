"use client"

import React, { useState } from "react"
import { Mail, CheckCircle2, Loader2, Sparkles } from "lucide-react"

export default function NewsletterSignup() {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !email.includes("@")) {
      setError("Please provide a valid email address.")
      return
    }

    setLoading(true)
    setError(null)

    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), name: name.trim() || undefined }),
      })

      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error || "Failed to subscribe. Please try again.")
      }

      setSubmitted(true)
      setEmail("")
      setName("")
    } catch (err: any) {
      console.error(err)
      setError(err.message || "Failed to subscribe.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-950/40 via-black to-emerald-950/30 border border-emerald-500/20 p-8 sm:p-12 shadow-2xl">
      <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="relative z-10 max-w-2xl mx-auto text-center space-y-4">
        <div className="inline-flex items-center gap-2 bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          Bi-Weekly Field Dispatches
        </div>

        <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Follow the Journey from Rio's Computer Labs
        </h3>

        <p className="text-sm text-gray-300 leading-relaxed max-w-xl mx-auto">
          Every two weeks, our founder writes a personal update covering our students' coding milestones, laptop distributions in West Rio favelas, and prayer requests. Written directly from the ground.
        </p>

        {submitted ? (
          <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-2xl p-6 flex flex-col items-center gap-2 text-emerald-300 animate-fade-in">
            <CheckCircle2 className="w-8 h-8 text-emerald-400" />
            <h4 className="text-base font-bold text-white">You're Subscribed!</h4>
            <p className="text-xs text-gray-300">
              We just sent a welcome confirmation to your inbox. Thank you for walking alongside our students!
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3 pt-2">
            <div className="flex flex-col sm:flex-row gap-2.5 max-w-lg mx-auto">
              <input
                type="text"
                placeholder="First Name (optional)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-black/60 border border-gray-800 rounded-xl px-4 py-3 text-xs text-white placeholder:text-gray-500 focus:outline-none focus:border-emerald-500 transition sm:w-1/3"
                disabled={loading}
              />
              <input
                type="email"
                required
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-black/60 border border-gray-800 rounded-xl px-4 py-3 text-xs text-white placeholder:text-gray-500 focus:outline-none focus:border-emerald-500 transition flex-1"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-white font-bold px-6 py-3 rounded-xl text-xs flex items-center justify-center gap-1.5 transition shadow-lg shadow-emerald-500/20 cursor-pointer"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <Mail className="w-3.5 h-3.5" />
                    Subscribe
                  </>
                )}
              </button>
            </div>

            {error && (
              <p className="text-xs text-red-400 font-semibold">{error}</p>
            )}

            <p className="text-[11px] text-gray-500">
              No spam. Delivered bi-weekly. Unsubscribe anytime with 1 click.
            </p>
          </form>
        )}
      </div>
    </div>
  )
}
