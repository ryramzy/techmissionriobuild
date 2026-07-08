"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import { onAuthStateChanged, User } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"
import { auth, db } from "@/lib/firebase"

export interface UserProfile {
  uid: string
  name: string
  email: string
  profileType: "individual" | "organization"
  orgId: string | null
  createdAt: any
}

export interface OrgProfile {
  orgId: string
  name: string
  denomination: string
  cohortsSponsored: string[]
  createdAt: any
}

interface AuthContextType {
  user: User | null
  profile: UserProfile | null
  orgProfile: OrgProfile | null
  loading: boolean
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  orgProfile: null,
  loading: true
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [orgProfile, setOrgProfile] = useState<OrgProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser)
      setProfile(null)
      setOrgProfile(null)

      if (currentUser) {
        try {
          // Fetch user metadata document
          const userDocRef = doc(db, "users", currentUser.uid)
          const userDocSnap = await getDoc(userDocRef)

          if (userDocSnap.exists()) {
            const userData = userDocSnap.data() as UserProfile
            setProfile(userData)

            // If B2B organization, fetch the normalized organization document
            if (userData.profileType === "organization" && userData.orgId) {
              const orgDocRef = doc(db, "organizations", userData.orgId)
              const orgDocSnap = await getDoc(orgDocRef)
              if (orgDocSnap.exists()) {
                setOrgProfile(orgDocSnap.data() as OrgProfile)
              }
            }
          }
        } catch (error) {
          console.error("Error fetching user profile from Firestore:", error)
        }
      }

      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={{ user, profile, orgProfile, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
