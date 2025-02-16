"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"
import { collection, getDocs, query, where } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Icons } from "@/components/ui/icons"
import { FirebaseStatus } from "@/components/firebase-status"
import { AdminStats } from "@/components/admin/admin-stats"
import { RecentCarRequests } from "@/components/admin/recent-car-requests"
import { RecentUsers } from "@/components/admin/recent-users"
import { AdminActions } from "@/components/admin/admin-actions"

export default function AdminDashboardPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCarRequests: 0,
    pendingRequests: 0,
    completedRequests: 0,
  })

  useEffect(() => {
    if (!loading && !user) {
      router.push("/admin/login")
    } else if (user) {
      fetchDashboardData()
    }
  }, [user, loading, router])

  async function fetchDashboardData() {
    setIsLoading(true)
    try {
      const usersSnapshot = await getDocs(collection(db, "users"))
      const carRequestsSnapshot = await getDocs(collection(db, "carRequests"))
      const pendingRequestsSnapshot = await getDocs(
        query(collection(db, "carRequests"), where("status", "==", "pending")),
      )
      const completedRequestsSnapshot = await getDocs(
        query(collection(db, "carRequests"), where("status", "==", "completed")),
      )

      setStats({
        totalUsers: usersSnapshot.size,
        totalCarRequests: carRequestsSnapshot.size,
        pendingRequests: pendingRequestsSnapshot.size,
        completedRequests: completedRequestsSnapshot.size,
      })
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (loading || isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Icons.spinner className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <FirebaseStatus />
      </div>
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <AdminStats stats={stats} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <RecentCarRequests />
        <RecentUsers />
      </div>

      <AdminActions />
    </div>
  )
}

