"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { db } from "@/lib/firebase"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Icons } from "@/components/ui/icons"
import { DashboardNav } from "@/components/dashboard/dashboard-nav"

export default function SupportPage() {
  const { user } = useAuth()
  const [formData, setFormData] = useState({
    subject: "",
    message: "",
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!user) return

    setIsLoading(true)

    try {
      await addDoc(collection(db, "supportTickets"), {
        userId: user.uid,
        ...formData,
        status: "open",
        createdAt: serverTimestamp(),
      })

      alert("Support ticket submitted successfully!")
      setFormData({ subject: "", message: "" })
    } catch (error) {
      console.error("Error submitting support ticket:", error)
      alert("An error occurred while submitting your support ticket.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex">
      <DashboardNav />
      <div className="flex-1 container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Support & Help Center</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" name="subject" value={formData.subject} onChange={handleChange} required />
              </div>
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" name="message" value={formData.message} onChange={handleChange} required />
              </div>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" /> Submitting...
                  </>
                ) : (
                  "Submit Ticket"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2">
              <li>How do I submit a new car request?</li>
              <li>What documents do I need to provide for a car purchase?</li>
              <li>How long does the car buying process usually take?</li>
              <li>What payment methods do you accept?</li>
              <li>How can I track the status of my car request?</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

