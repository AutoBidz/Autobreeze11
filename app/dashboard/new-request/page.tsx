"use client"

import { DashboardNav } from "@/components/dashboard/dashboard-nav"
import { CarRequestForm } from "@/components/car-request-form"

export default function NewCarRequestPage() {
  return (
    <div className="flex">
      <DashboardNav />
      <div className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Create New Car Request</h1>
        <CarRequestForm />
      </div>
    </div>
  )
}

