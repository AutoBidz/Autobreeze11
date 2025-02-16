"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { db } from "@/lib/firebase"
import { collection, query, where, getDocs, orderBy, limit } from "firebase/firestore"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"
import { DashboardNav } from "@/components/dashboard/dashboard-nav"

export default function DashboardPage() {
  console.log("Dashboard component rendering")
  const { user, loading } = useAuth()
  const [carRequests, setCarRequests] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    console.log("Dashboard: User state:", user ? "Authenticated" : "Not authenticated")
    console.log("Dashboard: Loading state:", loading)
    if (!loading && !user) {
      console.log("Dashboard: Redirecting to login")
      router.push("/login")
    } else if (user) {
      console.log("Dashboard: Fetching car requests")
      fetchCarRequests()
    }
  }, [user, loading, router])

  async function fetchCarRequests() {
    if (!user) return
    try {
      const q = query(
        collection(db, "carRequests"),
        where("userId", "==", user.uid),
        orderBy("createdAt", "desc"),
        limit(10),
      )
      const querySnapshot = await getDocs(q)
      const requests = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      setCarRequests(requests)
    } catch (error) {
      console.error("Error fetching car requests:", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (loading || isLoading) {
    console.log("Dashboard: Still loading")
    return (
      <div className="flex justify-center items-center h-screen">
        <Icons.spinner className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!user) {
    console.log("Dashboard: No user, should redirect")
    return null
  }

  console.log("Dashboard: Rendering content")

  const activeRequests = carRequests.filter((req) => req.status !== "completed")
  const completedRequests = carRequests.filter((req) => req.status === "completed")

  const statusData = [
    { name: "Active", value: activeRequests.length },
    { name: "Completed", value: completedRequests.length },
  ]

  const COLORS = ["#0088FE", "#00C49F"]

  const recentActivity = carRequests.slice(0, 5).map((request) => ({
    id: request.id,
    carModel: request.carModel || "Unknown Model",
    status: request.status,
    date: new Date(request.createdAt?.seconds * 1000).toLocaleDateString(),
  }))

  return (
    <div className="flex h-screen bg-gray-100">
      <DashboardNav />
      <div className="flex-1 container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary">Welcome, {user?.displayName?.split(" ")[0] || "User"}!</h1>
          <p className="text-lg text-gray-600">Here's an overview of your car buying journey.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Active Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">{activeRequests.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Completed Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">{completedRequests.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <Link href="/dashboard/new-request">
                <Button className="w-full mb-2">New Car Request</Button>
              </Link>
              <Link href="/dashboard/support">
                <Button variant="outline" className="w-full">
                  Contact Support
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Request Status Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {recentActivity.map((activity) => (
                  <li key={activity.id} className="flex justify-between items-center">
                    <span>{activity.carModel}</span>
                    <span className="text-sm text-gray-500">{activity.date}</span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        activity.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {activity.status}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

