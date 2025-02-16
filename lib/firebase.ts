import { initializeApp, getApps } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore, type Firestore } from "firebase/firestore"
import { getAnalytics, type Analytics } from "firebase/analytics"
import { getStorage } from "firebase/storage"
import firebaseConfig from "./firebase-config"

// Initialize Firebase only if it hasn't been initialized already
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0]

// Check if Firebase config is properly loaded
if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
  throw new Error("Firebase configuration is incomplete. Please check your environment variables.")
}

// Initialize Firebase services with error handling
let auth
let db: Firestore
let analytics: Analytics | undefined
let storage

try {
  auth = getAuth(app)
  db = getFirestore(app)
  storage = getStorage(app)
  // Only initialize analytics on the client side
  if (typeof window !== "undefined") {
    analytics = getAnalytics(app)
  }
} catch (error) {
  console.error("Error initializing Firebase services:", error)
  throw new Error("Failed to initialize Firebase services. Please check your configuration.")
}

export { app, auth, db, analytics, storage }

