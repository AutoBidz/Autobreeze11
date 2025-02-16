"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { db } from "@/lib/firebase"
import { collection, query, where, getDocs, orderBy, updateDoc, doc } from "firebase/firestore"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"
import { DashboardNav } from "@/components/dashboard/dashboard-nav"

export default function OffersAndDealsPage() {
  const { user } = useAuth()
  const [offers, setOffers] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (user) {
      fetchOffers()
    }
  }, [user])

  async function fetchOffers() {
    try {
      const q = query(collection(db, "offers"), where("userId", "==", user.uid), orderBy("createdAt", "desc"))
      const querySnapshot = await getDocs(q)
      const offersData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      setOffers(offersData)
    } catch (error) {
      console.error("Error fetching offers:", error)
    } finally {
      setIsLoading(false)
    }
  }

  async function handleAcceptOffer(offerId) {
    try {
      await updateDoc(doc(db, "offers", offerId), {
        status: "accepted",
      })
      fetchOffers() // Refresh the offers list
    } catch (error) {
      console.error("Error accepting offer:", error)
    }
  }

  async function handleDeclineOffer(offerId) {
    try {
      await updateDoc(doc(db, "offers", offerId), {
        status: "declined",
      })
      fetchOffers() // Refresh the offers list
    } catch (error) {
      console.error("Error declining offer:", error)
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
        <h1 className="text-3xl font-bold mb-8">Offers & Deals</h1>
        {offers.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <p>You don't have any offers at the moment.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {offers.map((offer) => (
              <Card key={offer.id}>
                <CardHeader>
                  <CardTitle>
                    {offer.make} {offer.model} ({offer.year})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    <strong>Price:</strong> ${offer.price}
                  </p>
                  <p>
                    <strong>Status:</strong> {offer.status}
                  </p>
                  <p>
                    <strong>Offer Date:</strong> {new Date(offer.createdAt?.seconds * 1000).toLocaleDateString()}
                  </p>
                  {offer.status === "pending" && (
                    <div className="mt-4 space-x-2">
                      <Button onClick={() => handleAcceptOffer(offer.id)}>Accept</Button>
                      <Button variant="outline" onClick={() => handleDeclineOffer(offer.id)}>
                        Decline
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

