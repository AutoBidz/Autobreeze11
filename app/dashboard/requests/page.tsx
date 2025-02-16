"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { db } from "@/lib/firebase"
import { collection, query, where, getDocs, orderBy } from "firebase/firestore"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"
import { DashboardNav } from "@/components/dashboard/dashboard-nav"
import Link from "next/link"

export default function MyRequestsPage() {
  const { user } = useAuth()
  const [requests, setRequests] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (user) {
      fetchRequests()
    }
  }, [user])

  async function fetchRequests() {
    try {
      const q = query(collection(db, "carRequests"), where("userId", "==", user.uid), orderBy("createdAt", "desc"))
      const querySnapshot = await getDocs(q)
      const requestsData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      setRequests(requestsData)
    } catch (error) {
      console.error("Error fetching requests:", error)
    } finally {
      setIsLoading(false)
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
        <h1 className="text-3xl font-bold mb-8">My Requests</h1>
        {requests.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <p className="mb-4">You haven't made any car requests yet.</p>
              <Link href="/dashboard/new-request">
                <Button>Create New Request</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {requests.map((request) => (
              <Card key={request.id}>
                <CardHeader>
                  <CardTitle>
                    {request.make} {request.model} ({request.year})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    <strong>Status:</strong> {request.status}
                  </p>
                  <p>
                    <strong>Budget:</strong> ${request.budget}
                  </p>
                  <p>
                    <strong>Submitted:</strong> {new Date(request.createdAt?.seconds * 1000).toLocaleDateString()}
                  </p>
                  <Link href={`/dashboard/requests/${request.id}`}>
                    <Button className="mt-4">View Details</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

