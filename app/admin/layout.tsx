import { Header } from "@/components/header"
import { Sidebar } from "@/components/admin/sidebar"
import { AuthProvider } from "@/contexts/AuthContext"
import { StripeProvider } from "@/components/stripe-provider"
import type React from "react"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <StripeProvider>
        <div className="flex h-screen bg-gray-100">
          <Sidebar />
          <div className="flex-1 flex flex-col overflow-hidden">
            <Header />
            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">{children}</main>
          </div>
        </div>
      </StripeProvider>
    </AuthProvider>
  )
}

