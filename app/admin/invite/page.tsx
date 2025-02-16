"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Icons } from "@/components/ui/icons"
import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"
import { addDoc, collection } from "firebase/firestore"
import { db } from "@/lib/firebase"

export default function AdminInvitePage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push("/admin/login")
    }
  }, [user, router])

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)

    try {
      // Generate a unique invitation code
      const invitationCode = Math.random().toString(36).substring(2, 15)

      // Save the invitation to Firestore
      await addDoc(collection(db, "adminInvitations"), {
        email,
        invitationCode,
        createdBy: user?.email,
        createdAt: new Date(),
        used: false,
      })

      // TODO: Send email with invitation link (implement email sending functionality)
      console.log(`Invitation sent to ${email} with code: ${invitationCode}`)

      alert("Invitation sent successfully!")
      setEmail("")
    } catch (error) {
      console.error("Error creating invitation:", error)
      alert("Failed to create invitation. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-2xl">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-primary">Invite New Admin</h2>
          <p className="mt-2 text-sm text-muted-foreground">Send an invitation to create a new admin account</p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={onSubmit}>
          <div>
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Button type="submit" className="w-full flex justify-center py-2 px-4" disabled={isLoading}>
              {isLoading ? <Icons.spinner className="mr-2 h-4 w-4 animate-spin" /> : "Send Invitation"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

