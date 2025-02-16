"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { db } from "@/lib/firebase"
import { doc, setDoc } from "firebase/firestore"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"

export function CreditApplicationForm({ onSubmit }) {
  const { user } = useAuth()
  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
    ssn: "",
    annualIncome: "",
    employmentStatus: "",
    employerName: "",
    jobTitle: "",
    yearsEmployed: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await setDoc(doc(db, "creditApplications", user.uid), {
        ...formData,
        userId: user.uid,
        status: "Pending",
        createdAt: new Date(),
      })

      toast({
        title: "Success",
        description: "Credit application submitted successfully.",
      })
      onSubmit()
    } catch (error) {
      console.error("Error submitting credit application:", error)
      toast({
        title: "Error",
        description: "Failed to submit credit application. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Credit Application Form</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="fullName">Full Name</Label>
            <Input id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} required />
          </div>

          <div>
            <Label htmlFor="dateOfBirth">Date of Birth</Label>
            <Input
              id="dateOfBirth"
              name="dateOfBirth"
              type="date"
              value={formData.dateOfBirth}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="ssn">Social Security Number</Label>
            <Input id="ssn" name="ssn" value={formData.ssn} onChange={handleChange} required />
          </div>

          <div>
            <Label htmlFor="annualIncome">Annual Income</Label>
            <Input
              id="annualIncome"
              name="annualIncome"
              type="number"
              value={formData.annualIncome}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="employmentStatus">Employment Status</Label>
            <Select
              name="employmentStatus"
              value={formData.employmentStatus}
              onValueChange={(value) => handleChange({ target: { name: "employmentStatus", value } })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select employment status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fullTime">Full-time</SelectItem>
                <SelectItem value="partTime">Part-time</SelectItem>
                <SelectItem value="selfEmployed">Self-employed</SelectItem>
                <SelectItem value="unemployed">Unemployed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="employerName">Employer Name</Label>
            <Input id="employerName" name="employerName" value={formData.employerName} onChange={handleChange} />
          </div>

          <div>
            <Label htmlFor="jobTitle">Job Title</Label>
            <Input id="jobTitle" name="jobTitle" value={formData.jobTitle} onChange={handleChange} />
          </div>

          <div>
            <Label htmlFor="yearsEmployed">Years Employed</Label>
            <Input
              id="yearsEmployed"
              name="yearsEmployed"
              type="number"
              value={formData.yearsEmployed}
              onChange={handleChange}
            />
          </div>

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...
              </>
            ) : (
              "Submit Application"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

