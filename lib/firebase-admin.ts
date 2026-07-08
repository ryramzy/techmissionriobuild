import * as admin from 'firebase-admin'

const getFirebaseAdmin = () => {
  if (admin.apps.length > 0) {
    return admin.app()
  }

  const privateKey = process.env.FIREBASE_PRIVATE_KEY
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'techmission-rio'

  if (privateKey && clientEmail) {
    try {
      return admin.initializeApp({
        credential: admin.credential.cert({
          projectId,
          clientEmail,
          // Replace escaped newlines if present
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
export const adminDb = adminApp ? adminApp.firestore() : null
