"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { 
  Heart, 
  Lock, 
  Mail, 
  User, 
  Building2, 
  ShieldAlert,
  Loader2
} from "lucide-react"
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth"
import { doc, setDoc, getDoc, collection } from "firebase/firestore"
import { auth, db } from "@/lib/firebase"
import { useAuth } from "@/app/components/AuthContext"

export default function LoginPage() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  
  const [isLogin, setIsLogin] = useState(true)
  const [profileType, setProfileType] = useState<"individual" | "organization">("individual")
  
  // Form State
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [orgName, setOrgName] = useState("")
  const [churchDenomination, setChurchDenomination] = useState("")
  
  // UI & Error State
  const [formError, setFormError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Redirect to role gateway dashboard if already logged in
  useEffect(() => {
    if (!authLoading && user) {
      router.push("/dashboard")
    }
  }, [user, authLoading, router])

  const handleGoogleSignIn = async () => {
    setFormError(null)
    setIsLoading(true)
    try {
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)
      const user = result.user

      if (user) {
        const userRef = doc(db, "users", user.uid)
        const userSnap = await getDoc(userRef)
        
        if (!userSnap.exists()) {
          // If first sign-up, create user profile as individual donor by default
          await setDoc(userRef, {
            uid: user.uid,
            name: user.displayName || "Google User",
            email: user.email?.toLowerCase() || "",
            profileType: "individual",
            orgId: null,
            isAdmin: false,
            createdAt: new Date().toISOString()
          })
        }
      }
    } catch (err: any) {
      console.error("Google Auth error:", err)
      if (err.code !== "auth/popup-closed-by-user") {
        setFormError(err.message || "Failed to sign in with Google.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  // Handle Login / Registration
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormError(null)
    setIsLoading(true)

    // Basic Input Validations
    if (!email.includes("@")) {
      setFormError("Please enter a valid email address.")
      setIsLoading(false)
      return
    }

    if (password.length < 6) {
      setFormError("Password must be at least 6 characters long.")
      setIsLoading(false)
      return
    }

    if (!isLogin && profileType === "individual" && !name) {
      setFormError("Please enter your name.")
      setIsLoading(false)
      return
    }

    if (!isLogin && profileType === "organization" && !orgName) {
      setFormError("Please enter your Organization/Church name.")
      setIsLoading(false)
      return
    }

    try {
      if (isLogin) {
        // Firebase Sign-In
        await signInWithEmailAndPassword(auth, email, password)
      } else {
        // Firebase Sign-Up
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        const uid = userCredential.user.uid

        if (profileType === "organization") {
          // Create normalized Organization document
          const orgColRef = collection(db, "organizations")
          const orgDocRef = doc(orgColRef)
          
          await setDoc(orgDocRef, {
            orgId: orgDocRef.id,
            name: orgName,
            denomination: churchDenomination || "Nondenominational",
            cohortsSponsored: ["cohort_rio_alpha"],
            createdAt: new Date().toISOString()
          })

          // Create User document referencing the organization
          await setDoc(doc(db, "users", uid), {
            uid,
            name: orgName,
            email,
            profileType: "organization",
            orgId: orgDocRef.id,
            isAdmin: false,
            createdAt: new Date().toISOString()
          })
        } else {
          // Create Individual User document
          await setDoc(doc(db, "users", uid), {
            uid,
            name,
            email,
            profileType: "individual",
            orgId: null,
            isAdmin: false,
            createdAt: new Date().toISOString()
          })
        }

        // Trigger welcome email via Firebase Trigger Email extension
        await setDoc(doc(collection(db, "mail")), {
          to: email,
          template: {
            name: "welcome",
            data: {
              userName: profileType === "organization" ? orgName : name,
              profileType,
              date: new Date().toLocaleDateString("en-US")
            }
          }
        })
      }
    } catch (error: any) {
      console.error("Auth error:", error)
      let readableError = "Authentication failed. Please verify your credentials."
      if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password" || error.code === "auth/invalid-credential") {
        readableError = "Invalid email or password. Please try again."
      } else if (error.code === "auth/email-already-in-use") {
        readableError = "This email is already in use by another account."
      } else if (error.code === "auth/weak-password") {
        readableError = "The password is too weak. Please use at least 6 characters."
      }
      setFormError(readableError)
    } finally {
      setIsLoading(false)
    }
  }

  if (authLoading || user) {
    return (
      <div className="bg-black text-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Heart className="w-10 h-10 text-green-400 animate-pulse mx-auto mb-4" />
          <p className="text-gray-400">Loading your profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-black text-white min-h-screen relative overflow-hidden pt-24 pb-16">
      {/* Background gradients */}
      <div className="absolute top-0 left-0 w-full h-[300px] bg-gradient-to-b from-blue-900/10 via-green-900/5 to-transparent pointer-events-none" />

      <div className="max-w-xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-green-500/20 border border-green-500/30 rounded-full py-2 px-4 mb-6">
            <Heart className="w-3.5 h-3.5 text-green-400 animate-pulse" />
            <span className="text-xs font-semibold text-green-400 tracking-widest uppercase">
              {isLogin ? "Welcome Back" : "Register with TMR"}
            </span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2">
            {isLogin ? "TechMission Rio Portal" : "Join the Mission"}
          </h1>
          <p className="text-gray-400 text-sm">
            {isLogin ? "Sign in to access your administrative dashboard, donor records, or student fellow portal." : "Create an individual donor or organization profile"}
          </p>
        </div>

        {/* Main Form Box */}
        <div className="bg-gradient-to-br from-blue-900/30 to-black border border-blue-500/20 rounded-3xl p-8 shadow-xl">
          {/* Form Selection Tabs */}
          <div className="flex border-b border-gray-800 mb-6">
            <button
              type="button"
              onClick={() => { setIsLogin(true); setFormError(null); }}
              className={`flex-1 pb-4 text-center font-bold transition-all border-b-2 text-sm cursor-pointer ${
                isLogin ? "border-green-500 text-green-400" : "border-transparent text-gray-400 hover:text-white"
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => { setIsLogin(false); setFormError(null); }}
              className={`flex-1 pb-4 text-center font-bold transition-all border-b-2 text-sm cursor-pointer ${
                !isLogin ? "border-green-500 text-green-400" : "border-transparent text-gray-400 hover:text-white"
              }`}
            >
              Create Profile
            </button>
          </div>

          {/* Error Alert Display */}
          {formError && (
            <div className="bg-red-950/40 border border-red-500/30 rounded-xl p-4 mb-6 flex items-start gap-3 animate-pulse">
              <ShieldAlert className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-red-400 text-sm font-bold">Verification Error</div>
                <p className="text-gray-300 text-xs mt-1">{formError}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Form Type Selection: Org vs Individual (For Registration only) */}
            {!isLogin && (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                  Profile Type
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setProfileType("individual")}
                    className={`py-3 px-4 rounded-xl border font-bold transition-all flex items-center justify-center gap-2 text-xs cursor-pointer ${
                      profileType === "individual"
                        ? "bg-green-500/10 border-green-500 text-green-400"
                        : "bg-transparent border-gray-700 text-gray-400 hover:border-gray-500"
                    }`}
                  >
                    <User className="w-4 h-4" />
                    Individual Donor
                  </button>
                  <button
                    type="button"
                    onClick={() => setProfileType("organization")}
                    className={`py-3 px-4 rounded-xl border font-bold transition-all flex items-center justify-center gap-2 text-xs cursor-pointer ${
                      profileType === "organization"
                        ? "bg-green-500/10 border-green-500 text-green-400"
                        : "bg-transparent border-gray-700 text-gray-400 hover:border-gray-500"
                    }`}
                  >
                    <Building2 className="w-4 h-4" />
                    Church / Organization
                  </button>
                </div>
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                  <Mail className="w-5 h-5" />
                </span>
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="name@church.org"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-black/60 border border-gray-700 rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-green-500 transition"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                  <Lock className="w-5 h-5" />
                </span>
                <input
                  id="password"
                  type="password"
                  required
                  placeholder="Min 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-black/60 border border-gray-700 rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-green-500 transition"
                />
              </div>
            </div>

            {/* Name fields for registration */}
            {!isLogin && profileType === "individual" && (
              <div className="space-y-2">
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-300">
                  Full Name
                </label>
                <input
                  id="fullName"
                  type="text"
                  required
                  placeholder="Jane Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-black/60 border border-gray-700 rounded-xl py-3 px-4 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-green-500 transition"
                />
              </div>
            )}

            {!isLogin && profileType === "organization" && (
              <>
                {/* Organization/Church Name */}
                <div className="space-y-2">
                  <label htmlFor="orgName" className="block text-sm font-medium text-gray-300">
                    Church / Organization Name
                  </label>
                  <input
                    id="orgName"
                    type="text"
                    required
                    placeholder="Grace Community Church"
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                    className="w-full bg-black/60 border border-gray-700 rounded-xl py-3 px-4 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-green-500 transition"
                  />
                </div>

                {/* Church Denomination */}
                <div className="space-y-2">
                  <label htmlFor="denom" className="block text-sm font-medium text-gray-300">
                    Denomination
                  </label>
                  <input
                    id="denom"
                    type="text"
                    placeholder="Presbyterian, Baptist, Methodist, Nondenominational, etc."
                    value={churchDenomination}
                    onChange={(e) => setChurchDenomination(e.target.value)}
                    className="w-full bg-black/60 border border-gray-700 rounded-xl py-3 px-4 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-green-500 transition"
                  />
                </div>
              </>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-green-500 hover:bg-green-600 disabled:bg-green-500/50 text-black font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition cursor-pointer text-sm"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processing...
                </>
              ) : isLogin ? (
                "Sign In to Portal"
              ) : (
                "Register Account"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6 flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-800"></div>
            </div>
            <span className="relative bg-[#0c0e16] px-4 text-xs font-semibold text-gray-400 uppercase tracking-widest">
              or
            </span>
          </div>

          {/* Google Sign-In Button */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="w-full bg-black/40 hover:bg-white/5 border border-gray-800 disabled:opacity-50 text-white font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition cursor-pointer text-sm"
          >
            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            Continue with Google
          </button>
        </div>

      </div>
    </div>
  )
}
