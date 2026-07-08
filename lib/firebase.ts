import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Check if credentials are present, otherwise use a dummy config to bypass build-time checks
const isConfigured = !!firebaseConfig.apiKey;
const activeConfig = isConfigured 
  ? firebaseConfig 
  : {
      apiKey: "mock-api-key-for-static-prerender",
      authDomain: "techmission-rio.firebaseapp.com",
      projectId: "techmission-rio",
      storageBucket: "techmission-rio.appspot.com",
      messagingSenderId: "1234567890",
      appId: "1:1234567890:web:mockappid",
    };

// Initialize Firebase for SSR compatibility
const app = getApps().length === 0 ? initializeApp(activeConfig) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);
