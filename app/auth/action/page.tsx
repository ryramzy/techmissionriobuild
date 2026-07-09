"use client"

import React, { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Loader2, ShieldCheck, Mail, AlertTriangle } from "lucide-react"
import { isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth"
import { doc, setDoc, updateDoc } from "firebase/firestore"
import { auth, db } from "@/lib/firebase"

function AuthActionContent() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const fellowId = searchParams.get("fellowId")
  const urlEmail = searchParams.get("email")

  // States
  const [email, setEmail] = useState("")
  const [needEmailInput, setNeedEmailInput] = useState(false)
  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState("Verifying authentication link...")
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Standard Firebase link handler logic
    const handleAuthLink = async () => {
      try {
        if (!isSignInWithEmailLink(auth, window.location.href)) {
          setError("This link appears to be invalid or has expired.")
          setLoading(false)
          return
        }

        // Try getting email from local storage or URL parameter first
        let localEmail = window.localStorage.getItem("emailForSignIn") || urlEmail

        if (!localEmail) {
          // Cross-device sign-in detected (e.g. clicked email on mobile phone)
          setNeedEmailInput(true)
          setLoading(false)
          setStatus("Please verify your email address to complete registration.")
          return
        }

        await completeSignIn(localEmail)
      } catch (err: any) {
        console.error("Sign-in verification error:", err)
        setError(err.message || "Failed to parse registration link.")
        setLoading(false)
      }
    }

    handleAuthLink()
  }, [urlEmail])

  const completeSignIn = async (userEmail: string) => {
    setLoading(true)
    setError(null)
    setStatus("Completing secure sign-in...")

    try {
      // 1. Authenticate passwordlessly using Firebase Link
      const result = await signInWithEmailLink(auth, userEmail, window.location.href)
      window.localStorage.removeItem("emailForSignIn")

      const user = result.user
      if (!user) {
        throw new Error("No authenticated user returned from link.")
      }

      setStatus("Configuring student fellow profile...")

      // 2. Write matching document in users/{uid} collection
      const userRef = doc(db, "users", user.uid)
      await setDoc(userRef, {
        uid: user.uid,
        name: user.displayName || userEmail.split("@")[0].toUpperCase(),
        email: userEmail.toLowerCase(),
        profileType: "fellow",
        fellowId: fellowId || null,
        isAdmin: false,
        createdAt: new Date().toISOString()
      })

      // 3. Link pre-seeded fellows document to this new Auth account
      if (fellowId) {
        const fellowRef = doc(db, "fellows", fellowId)
        await updateDoc(fellowRef, {
          userId: user.uid,
          isRegistered: true,
          registeredAt: new Date().toISOString()
        }).catch((err) => {
          console.warn("Pre-seeded fellow profile association warning (could be missing doc):", err)
        })
      }

      setStatus("Onboarding successful! Redirecting to student portal...")
      
      // 4. Send user to their portal gate
      setTimeout(() => {
        router.push("/dashboard")
      }, 1500)
    } catch (err: any) {
      console.error("Link authentication execution error:", err)
      setError(err.message || "Authentication execution failed.")
      setLoading(false)
    }
  }

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !email.includes("@")) {
      setError("Please input a valid email address.")
      return
    }
    setNeedEmailInput(false)
    completeSignIn(email.trim().toLowerCase())
  }

  return (
    <div className="bg-black text-white min-h-screen relative overflow-hidden flex items-center justify-center pt-24 pb-16">
      {/* Background overlay */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full max-w-7xl h-[400px] bg-gradient-to-b from-green-950/10 via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-md w-full mx-6 bg-gradient-to-br from-blue-950/20 to-black border border-blue-500/20 rounded-3xl p-8 space-y-6 shadow-2xl">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center bg-green-500/10 border border-green-500/20 rounded-2xl p-3 text-green-400">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-black tracking-tight">TechMission Rio</h1>
          <p className="text-gray-400 text-sm">{status}</p>
        </div>

        {loading && (
          <div className="flex flex-col items-center justify-center py-6 gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-green-400" />
            <span className="text-xs text-gray-500">Decrypting security signatures...</span>
          </div>
        )}

        {error && (
          <div className="bg-red-950/40 border border-red-500/30 rounded-xl p-4 flex items-start gap-3 text-red-400 text-xs">
            <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <div className="font-bold">Authentication Failure</div>
              <p className="text-gray-300">{error}</p>
              <button 
                onClick={() => router.push("/login")}
                className="text-blue-400 hover:text-blue-300 font-bold block mt-2 cursor-pointer"
              >
                Go to Login Page &rarr;
              </button>
            </div>
          </div>
        )}

        {needEmailInput && !loading && (
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest">
                Confirm Registration Email
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                  <Mail className="w-5 h-5" />
                </span>
                <input
                  type="email"
                  required
                  placeholder="e.g. student@faetec.br"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-black border border-gray-800 rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-green-500 transition"
                />
              </div>
              <p className="text-[10px] text-gray-500 leading-normal pt-1">
                Security Check: Input the email address matching your invitation letter to verify session signatures.
              </p>
            </div>

            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-black font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition cursor-pointer text-sm font-bold"
            >
              Verify & Complete Sign-In
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

export default function AuthActionPage() {
  return (
    <Suspense fallback={
      <div className="bg-black text-white min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-green-400" />
      </div>
    }>
      <AuthActionContent />
    </Suspense>
  )
}
