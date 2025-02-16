"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { db } from "@/lib/firebase"
import { collection, query, where, getDocs, orderBy, addDoc, serverTimestamp } from "firebase/firestore"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"
import { DashboardNav } from "@/components/dashboard/dashboard-nav"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { loadStripe } from "@stripe/stripe-js"
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

const packages = [
  { name: "Basic", price: 350 },
  { name: "Premium", price: 750 },
]

function PaymentForm({ amount, onSuccess }) {
  const stripe = useStripe()
  const elements = useElements()
  const [isProcessing, setIsProcessing] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setIsProcessing(true)

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/dashboard/payments/confirmation`,
      },
      redirect: "if_required",
    })

    if (error) {
      toast({
        title: "Payment failed",
        description: error.message,
        variant: "destructive",
      })
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      onSuccess(paymentIntent)
    }

    setIsProcessing(false)
  }

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <Button type="submit" disabled={isProcessing || !stripe} className="mt-4">
        {isProcessing ? "Processing..." : `Pay $${amount}`}
      </Button>
    </form>
  )
}

export default function PaymentsPage() {
  const { user } = useAuth()
  const [payments, setPayments] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedPackage, setSelectedPackage] = useState(null)
  const [customAmount, setCustomAmount] = useState("")
  const [clientSecret, setClientSecret] = useState("")
  const { toast } = useToast()

  useEffect(() => {
    if (user) {
      fetchPayments()
    }
  }, [user])

  async function fetchPayments() {
    try {
      const q = query(collection(db, "payments"), where("userId", "==", user.uid), orderBy("createdAt", "desc"))
      const querySnapshot = await getDocs(q)
      const paymentsData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      setPayments(paymentsData)
    } catch (error) {
      console.error("Error fetching payments:", error)
      toast({
        title: "Error",
        description: "Failed to fetch payments. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handlePackageSelect = (packageName) => {
    const selected = packages.find((p) => p.name === packageName)
    setSelectedPackage(selected)
    setCustomAmount("")
    createPaymentIntent(selected.price)
  }

  const handleCustomAmountChange = (e) => {
    setCustomAmount(e.target.value)
    setSelectedPackage(null)
    if (e.target.value) {
      createPaymentIntent(Number.parseFloat(e.target.value))
    }
  }

  const createPaymentIntent = async (amount) => {
    try {
      const response = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: amount * 100 }), // Convert to cents
      })
      const data = await response.json()
      setClientSecret(data.clientSecret)
    } catch (error) {
      console.error("Error creating PaymentIntent:", error)
      toast({
        title: "Error",
        description: "Failed to initialize payment. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handlePaymentSuccess = async (paymentIntent) => {
    try {
      await addDoc(collection(db, "payments"), {
        userId: user.uid,
        amount: paymentIntent.amount / 100, // Convert back to dollars
        packageName: selectedPackage ? selectedPackage.name : "Custom",
        paymentIntentId: paymentIntent.id,
        status: "completed",
        createdAt: serverTimestamp(),
      })

      toast({
        title: "Success",
        description: "Payment processed successfully.",
      })

      fetchPayments()
      setSelectedPackage(null)
      setCustomAmount("")
      setClientSecret("")
    } catch (error) {
      console.error("Error recording payment:", error)
      toast({
        title: "Error",
        description: "Payment was processed but failed to record. Please contact support.",
        variant: "destructive",
      })
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Icons.spinner className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="flex">
      <DashboardNav />
      <div className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Payments</h1>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Make a Payment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <Label>Select Package or Enter Custom Amount</Label>
                <RadioGroup className="mt-2">
                  {packages.map((pkg) => (
                    <div key={pkg.name} className="flex items-center space-x-2">
                      <RadioGroupItem
                        value={pkg.name}
                        id={pkg.name}
                        checked={selectedPackage?.name === pkg.name}
                        onClick={() => handlePackageSelect(pkg.name)}
                      />
                      <Label htmlFor={pkg.name}>
                        {pkg.name} - ${pkg.price}
                      </Label>
                    </div>
                  ))}
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="custom"
                      id="custom"
                      checked={!!customAmount}
                      onClick={() => setSelectedPackage(null)}
                    />
                    <Label htmlFor="custom">Custom Amount</Label>
                    <Input
                      type="number"
                      placeholder="Enter amount"
                      value={customAmount}
                      onChange={handleCustomAmountChange}
                      className="w-32"
                    />
                  </div>
                </RadioGroup>
              </div>

              {clientSecret && (
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                  <PaymentForm
                    amount={selectedPackage ? selectedPackage.price : customAmount}
                    onSuccess={handlePaymentSuccess}
                  />
                </Elements>
              )}
            </div>
          </CardContent>
        </Card>

        <h2 className="text-2xl font-bold mb-4">Payment History</h2>
        {payments.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <p>You haven't made any payments yet.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {payments.map((payment) => (
              <Card key={payment.id}>
                <CardHeader>
                  <CardTitle>{payment.packageName} Package</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    <strong>Amount:</strong> ${payment.amount}
                  </p>
                  <p>
                    <strong>Status:</strong> {payment.status}
                  </p>
                  <p>
                    <strong>Date:</strong> {new Date(payment.createdAt?.seconds * 1000).toLocaleDateString()}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

