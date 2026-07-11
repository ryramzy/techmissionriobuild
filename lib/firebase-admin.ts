import { initializeApp, getApps, cert } from "firebase-admin/app"
import { getFirestore } from "firebase-admin/firestore"
import { getMessaging } from "firebase-admin/messaging"

const getFirebaseAdmin = () => {
  const apps = getApps()
  if (apps.length > 0) {
    return apps[0]
  }

  const privateKey = process.env.FIREBASE_PRIVATE_KEY
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'techmission-rio'

  if (privateKey && clientEmail) {
    try {
      return initializeApp({
        credential: cert({
          projectId,
          clientEmail,
          privateKey: privateKey.replace(/\\n/g, '\n'),
        }),
      })
    } catch (error) {
      console.error("Failed to initialize Firebase Admin SDK:", error)
      return null
    }
  }

  // Fallback for development/preview without server keys
  console.warn("⚠️ Firebase Admin credentials missing. Server-side writes will be mocked/skipped.")
  return null
}

const adminApp = getFirebaseAdmin()
export const adminDb = adminApp ? getFirestore(adminApp) : null
export const adminMessaging = adminApp ? getMessaging(adminApp) : null
