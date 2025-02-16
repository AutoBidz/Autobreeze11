"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { db } from "@/lib/firebase"
import { doc, getDoc, setDoc } from "firebase/firestore"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { DashboardNav } from "@/components/dashboard/dashboard-nav"
import { Loader2 } from "lucide-react"
import { CreditApplicationForm } from "@/components/credit-application-form"

export default function CreditApplicationPage() {
  const { user } = useAuth()
  const [creditApplication, setCreditApplication] = useState({
    status: "",
    creditScore: "",
    bankName: "",
    approvedAmount: "",
    terms: "",
    approvedInterestRate: "",
  })
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showApplicationForm, setShowApplicationForm] = useState(false)
  const [error, setError] = useState("")
  const { toast } = useToast()

  useEffect(() => {
    if (user) {
      fetchCreditApplication()
    }
  }, [user])

  async function fetchCreditApplication() {
    setIsLoading(true)
    setError("")
    try {
      const docRef = doc(db, "creditApplications", user.uid)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        setCreditApplication(docSnap.data())
      } else {
        setCreditApplication((prev) => ({ ...prev, status: "Not Applied Yet" }))
      }
    } catch (error) {
      console.error("Error fetching credit application:", error)
      setError("Failed to fetch credit application. Please try again later.")
      toast({
        title: "Error",
        description: "Failed to fetch credit application. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setCreditApplication((prev) => ({ ...prev, [name]: value }))
  }

  const handleStatusChange = (value) => {
    setCreditApplication((prev) => ({ ...prev, status: value }))
    if (value === "Not Applied Yet") {
      setShowApplicationForm(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      await setDoc(doc(db, "creditApplications", user.uid), {
        ...creditApplication,
        userId: user.uid,
        updatedAt: new Date(),
      })

      toast({
        title: "Success",
        description: "Credit application details updated successfully.",
      })
    } catch (error) {
      console.error("Error updating credit application:", error)
      setError("Failed to update credit application. Please try again.")
      toast({
        title: "Error",
        description: "Failed to update credit application details. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleApplyNow = () => {
    setShowApplicationForm(true)
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="flex">
      <DashboardNav />
      <div className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Credit Application</h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {showApplicationForm ? (
          <CreditApplicationForm onSubmit={() => fetchCreditApplication()} />
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Credit Application Details</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="status">Application Status</Label>
                  <Select name="status" value={creditApplication.status} onValueChange={handleStatusChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Not Applied Yet">Not Applied Yet</SelectItem>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Approved">Approved</SelectItem>
                      <SelectItem value="Rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {creditApplication.status === "Not Applied Yet" ? (
                  <div className="text-center">
                    <p className="mb-4">You haven't applied for credit yet. Would you like to apply now?</p>
                    <Button onClick={handleApplyNow}>Apply Now</Button>
                  </div>
                ) : (
                  <>
                    <div>
                      <Label htmlFor="creditScore">Credit Score</Label>
                      <Input
                        id="creditScore"
                        name="creditScore"
                        value={creditApplication.creditScore}
                        onChange={handleChange}
                        placeholder="Enter your credit score"
                      />
                    </div>

                    <div>
                      <Label htmlFor="bankName">Bank Name</Label>
                      <Input
                        id="bankName"
                        name="bankName"
                        value={creditApplication.bankName}
                        onChange={handleChange}
                        placeholder="Enter the bank name"
                      />
                    </div>

                    {creditApplication.status === "Approved" && (
                      <>
                        <div>
                          <Label htmlFor="approvedAmount">Approved Amount</Label>
                          <Input
                            id="approvedAmount"
                            name="approvedAmount"
                            value={creditApplication.approvedAmount}
                            onChange={handleChange}
                            placeholder="Enter approved amount"
                          />
                        </div>

                        <div>
                          <Label htmlFor="terms">Terms (months)</Label>
                          <Input
                            id="terms"
                            name="terms"
                            value={creditApplication.terms}
                            onChange={handleChange}
                            placeholder="Enter loan term in months"
                          />
                        </div>

                        <div>
                          <Label htmlFor="approvedInterestRate">Approved Interest Rate</Label>
                          <Input
                            id="approvedInterestRate"
                            name="approvedInterestRate"
                            value={creditApplication.approvedInterestRate}
                            onChange={handleChange}
                            placeholder="Enter approved interest rate"
                          />
                        </div>
                      </>
                    )}

                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Updating...
                        </>
                      ) : (
                        "Update Details"
                      )}
                    </Button>
                  </>
                )}
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

