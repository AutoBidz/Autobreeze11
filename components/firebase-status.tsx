"use client"

import { useEffect, useState } from "react"
import { auth, db } from "@/lib/firebase"
import { collection, getDocs, limit, query } from "firebase/firestore"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle2, XCircle } from "lucide-react"

export function FirebaseStatus() {
  const [status, setStatus] = useState<{
    auth: boolean
    firestore: boolean
    error?: string
  }>({
    auth: false,
    firestore: false,
  })

  useEffect(() => {
    const checkFirebaseConnection = async () => {
      try {
        // Check Auth initialization
        const authInitialized = auth !== undefined

        // Check Firestore connection by attempting to query a collection
        let firestoreConnected = false
        try {
          const testQuery = query(collection(db, "test"), limit(1))
          await getDocs(testQuery)
          firestoreConnected = true
        } catch (error) {
          console.error("Firestore connection test failed:", error)
        }

        setStatus({
          auth: authInitialized,
          firestore: firestoreConnected,
        })
      } catch (error) {
        setStatus({
          auth: false,
          firestore: false,
          error: error instanceof Error ? error.message : "Unknown error occurred",
        })
      }
    }

    checkFirebaseConnection()
  }, [])

  if (status.error) {
    return (
      <Alert variant="destructive">
        <XCircle className="h-4 w-4" />
        <AlertTitle>Firebase Connection Error</AlertTitle>
        <AlertDescription>{status.error}</AlertDescription>
      </Alert>
    )
  }

  return (
    <Alert variant={status.auth && status.firestore ? "default" : "warning"}>
      <CheckCircle2 className="h-4 w-4" />
      <AlertTitle>Firebase Status</AlertTitle>
      <AlertDescription>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className={status.auth ? "text-green-600" : "text-red-600"}>●</span>
            Authentication: {status.auth ? "Connected" : "Not Connected"}
          </div>
          <div className="flex items-center gap-2">
            <span className={status.firestore ? "text-green-600" : "text-red-600"}>●</span>
            Firestore: {status.firestore ? "Connected" : "Not Connected"}
          </div>
        </div>
      </AlertDescription>
    </Alert>
  )
}

