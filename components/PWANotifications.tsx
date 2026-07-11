"use client"

import { useEffect } from "react"
import { useAuth } from "@/app/components/AuthContext"
import { db, getFCM } from "@/lib/firebase"
import { collection, doc, setDoc, serverTimestamp } from "firebase/firestore"

export default function PWANotifications() {
  const { user } = useAuth()

  useEffect(() => {
    if (!user) return

    const registerNotificationToken = async () => {
      if (typeof window === "undefined" || !("Notification" in window) || !("serviceWorker" in navigator)) {
        console.warn("FCM Notifications are not supported in this browser.")
        return
      }

      try {
        let permission = Notification.permission
        if (permission === "default") {
          permission = await Notification.requestPermission()
        }

        if (permission !== "granted") {
          console.warn("Notification permissions denied by user.")
          return
        }

        const messaging = await getFCM()
        if (!messaging) {
          console.warn("Firebase Cloud Messaging instance is unavailable.")
          return
        }

        // Retrieve config variables dynamically to pass to background service worker
        const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "mock-api-key-for-static-prerender"
        const authDomain = process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "techmission-rio.firebaseapp.com"
        const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "techmission-rio"
        const storageBucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "techmission-rio.appspot.com"
        const messagingSenderId = process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "1234567890"
        const appId = process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:1234567890:web:mockappid"

        // Register custom background sw with configuration URL query parameters
        const swUrl = `/firebase-messaging-sw.js?apiKey=${encodeURIComponent(apiKey)}&authDomain=${encodeURIComponent(authDomain)}&projectId=${encodeURIComponent(projectId)}&storageBucket=${encodeURIComponent(storageBucket)}&messagingSenderId=${encodeURIComponent(messagingSenderId)}&appId=${encodeURIComponent(appId)}`
        
        const reg = await navigator.serviceWorker.register(swUrl, {
          scope: "/firebase-cloud-messaging-push-scope"
        })

        const { getToken } = await import("firebase/messaging")
        
        // VAPID key is required to identify client registration
        const vapidKey = process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY || "BOrY5P1-g3H1oZ7d1vL8z5m9r2y6t3k8p5j4v9c-dummy-vapid"
        
        const token = await getToken(messaging, {
          serviceWorkerRegistration: reg,
          vapidKey,
        })

        if (token) {
          // Generate unique, idempotent document ID from token suffix to prevent duplication
          const tokenId = token.replace(/[^a-zA-Z0-9]/g, "_").slice(-50)
          const tokenRef = doc(db, "device_tokens", user.uid, "tokens", tokenId)

          await setDoc(tokenRef, {
            token,
            platform: "web",
            createdAt: serverTimestamp(),
          })
          console.log("FCM Device Registration Token synced to Firestore successfully.")
        } else {
          console.warn("No FCM registration token received.")
        }
      } catch (error) {
        console.error("Failed to register PWA notification token:", error)
      }
    }

    registerNotificationToken()
  }, [user])

  return null
}
