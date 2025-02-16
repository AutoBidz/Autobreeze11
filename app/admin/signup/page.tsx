"use client"

import { useState } from "react"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth, db } from "@/lib/firebase"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Icons } from "@/components/ui/icons"
import Link from "next/link"
import Image from "next/image"
import { collection, query, where, getDocs, updateDoc, setDoc, doc } from "firebase/firestore"

export default function AdminSignUpPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [invitationCode, setInvitationCode] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // Check if the invitation code is valid
      const invitationRef = collection(db, "adminInvitations")
      const q = query(invitationRef, where("invitationCode", "==", invitationCode), where("used", "==", false))
      const querySnapshot = await getDocs(q)

      if (querySnapshot.empty) {
        throw new Error("Invalid or used invitation code")
      }

      // Create the user account
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)

      // Mark the invitation as used
      const invitationDoc = querySnapshot.docs[0]
      await updateDoc(invitationDoc.ref, { used: true })

      // Set the user's role as admin in a separate collection
      await setDoc(doc(db, "userRoles", userCredential.user.uid), {
        role: "admin",
      })

      router.push("/admin/dashboard")
    } catch (error) {
      console.error("Error signing up:", error)
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-2xl">
        <div className="flex flex-col items-center space-y-2">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/autobreezelogo-H28yo4YtAVaUxQXlhsnzZrQInrGfhC.png"
            alt="AutoBreeze Logo"
            width={150}
            height={40}
            className="h-10 w-auto"
          />
          <h2 className="mt-6 text-3xl font-extrabold text-primary">Admin Sign Up</h2>
          <p className="mt-2 text-sm text-muted-foreground">Create an admin account</p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={onSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <Label className="sr-only" htmlFor="email-address">
                Email address
              </Label>
              <Input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="rounded-t-md"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <Label className="sr-only" htmlFor="password">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="rounded-b-md"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <Label className="sr-only" htmlFor="invitation-code">
                Invitation Code
              </Label>
              <Input
                id="invitation-code"
                name="invitationCode"
                type="text"
                required
                className="rounded-b-md"
                placeholder="Invitation Code"
                value={invitationCode}
                onChange={(e) => setInvitationCode(e.target.value)}
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div>
            <Button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              disabled={isLoading}
            >
              {isLoading ? <Icons.spinner className="mr-2 h-4 w-4 animate-spin" /> : "Sign up"}
            </Button>
          </div>
        </form>

        <p className="mt-8 text-center text-sm text-gray-600">
          Already have an admin account?{" "}
          <Link href="/admin/login" className="font-medium text-primary hover:text-primary-dark">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}

