"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { db, storage } from "@/lib/firebase"
import { doc, getDoc, setDoc } from "firebase/firestore"
import { ref, uploadBytes } from "firebase/storage"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Icons } from "@/components/ui/icons"
import { useToast } from "@/components/ui/use-toast"
import { BasicInfo } from "./form-steps/basic-info"
import { VehiclePreferences } from "./form-steps/vehicle-preferences"
import { BudgetFinancing } from "./form-steps/budget-financing"
import { TradeIn } from "./form-steps/trade-in"
import { DrivingLifestyle } from "./form-steps/driving-lifestyle"
import { CreditPreApproval } from "./form-steps/credit-pre-approval"
import { FinalPreferences } from "./form-steps/final-preferences"
import { Consent } from "./form-steps/consent"
import { ThankYou } from "./form-steps/thank-you"
import { useRouter } from "next/navigation"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

const STEPS = [
  "Basic Information",
  "Vehicle Preferences",
  "Budget & Financing",
  "Trade-In Information",
  "Driving & Lifestyle",
  "Credit & Pre-Approval",
  "Final Preferences",
  "Consent",
] as const

export function CarRequestForm() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(true) // Added loading state
  const router = useRouter()

  // Load saved form data for returning users
  useEffect(() => {
    if (user) {
      loadSavedFormData().catch((error) => {
        console.error("Error in useEffect:", error)
        setError("An unexpected error occurred. Please try again later.")
        setIsLoading(false)
      })
    } else {
      setIsLoading(false)
    }
  }, [user])

  async function loadSavedFormData() {
    setError("") // Clear any previous errors
    try {
      const docRef = doc(db, "carRequests", user.uid)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        setFormData(docSnap.data())
      }
    } catch (error) {
      console.error("Error loading saved form data:", error)
      setError("Failed to load saved form data. Please try again later.")
      toast({
        title: "Error",
        description: "Failed to load saved form data. You can continue with a new request.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const updateFormData = (newData: Record<string, any>) => {
    setFormData((prev) => ({ ...prev, ...newData }))
  }

  const saveProgress = async () => {
    if (!user) return
    setIsSaving(true)
    try {
      await setDoc(doc(db, "carRequests", user.uid), {
        ...formData,
        lastUpdated: new Date(),
        status: "draft",
      })
      toast({
        title: "Progress Saved",
        description: "Your form progress has been saved. You can continue later.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save progress. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleFileUpload = async (file: File) => {
    if (!user) return
    try {
      const storageRef = ref(storage, `documents/${user.uid}/${file.name}`)
      await uploadBytes(storageRef, file)
      toast({
        title: "File Uploaded",
        description: "Your document has been uploaded successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload file. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleSubmit = async () => {
    if (!user) return
    setIsSubmitting(true)
    try {
      await setDoc(doc(db, "carRequests", user.uid), {
        ...formData,
        status: "submitted",
        submittedAt: new Date(),
        userId: user.uid,
      })

      // Send email notification
      await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subject: "New Car Request Submission",
          body: `A new car request has been submitted by ${user.email}.

Request Details:
${JSON.stringify(formData, null, 2)}`,
          from: user.email,
        }),
      })

      setIsSubmitted(true)
      toast({
        title: "Success",
        description: "Your car request has been submitted successfully.",
      })
    } catch (error) {
      console.error("Error submitting form:", error)
      toast({
        title: "Error",
        description: "Failed to submit form. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <BasicInfo formData={formData} updateFormData={updateFormData} />
      case 1:
        return <VehiclePreferences formData={formData} updateFormData={updateFormData} />
      case 2:
        return <BudgetFinancing formData={formData} updateFormData={updateFormData} />
      case 3:
        return <TradeIn formData={formData} updateFormData={updateFormData} />
      case 4:
        return <DrivingLifestyle formData={formData} updateFormData={updateFormData} />
      case 5:
        return <CreditPreApproval formData={formData} updateFormData={updateFormData} />
      case 6:
        return <FinalPreferences formData={formData} updateFormData={updateFormData} />
      case 7:
        return <Consent formData={formData} updateFormData={updateFormData} />
      default:
        return null
    }
  }

  if (isSubmitted) {
    return <ThankYou />
  }

  return (
    <Card className="max-w-4xl mx-auto p-6">
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <div className="mb-8">
        <Progress value={(currentStep / (STEPS.length - 1)) * 100} className="mb-2" />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>
            Step {currentStep + 1} of {STEPS.length}
          </span>
          <span>{Math.round((currentStep / (STEPS.length - 1)) * 100)}% Complete</span>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-6">{STEPS[currentStep]}</h2>

      <form onSubmit={(e) => e.preventDefault()} className="space-y-8">
        {renderStep()}

        <div className="flex justify-between pt-6 border-t">
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setCurrentStep((prev) => prev - 1)}
              disabled={currentStep === 0}
            >
              Previous
            </Button>
            <Button type="button" variant="outline" onClick={saveProgress} disabled={isSaving}>
              {isSaving ? (
                <>
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Progress"
              )}
            </Button>
          </div>
          {currentStep < STEPS.length - 1 ? (
            <Button type="button" onClick={() => setCurrentStep((prev) => prev + 1)}>
              Next
            </Button>
          ) : (
            <Button type="button" onClick={() => handleSubmit()} disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Request"
              )}
            </Button>
          )}
        </div>
      </form>
    </Card>
  )
}

