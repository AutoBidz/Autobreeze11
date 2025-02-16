"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import dynamic from "next/dynamic"
import { AuthProvider } from "@/contexts/AuthContext"
import { StripeProvider } from "@/components/stripe-provider"

const pages = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Request Car", path: "/request-car" },
  { name: "Login", path: "/login" },
  { name: "Signup", path: "/signup" },
  { name: "Dashboard", path: "/dashboard" },
  { name: "Admin Dashboard", path: "/admin/dashboard" },
  { name: "Checkout", path: "/checkout" },
  { name: "Terms", path: "/terms" },
  { name: "Privacy", path: "/privacy" },
  { name: "Cookies", path: "/cookies" },
  { name: "FAQ", path: "/faq" },
  { name: "Help Center", path: "/help-center" },
  { name: "Contact", path: "/help/contact" },
  { name: "Careers", path: "/careers" },
]

const AdminWrapper = ({ children }) => (
  <AuthProvider>
    <StripeProvider>{children}</StripeProvider>
  </AuthProvider>
)

export function PagePreviewNavigator() {
  const [selectedPage, setSelectedPage] = useState("/admin/dashboard")

  const PageComponent = dynamic(
    () => import(`@/app${selectedPage === "/" ? "/page" : selectedPage.replace(/^\/admin/, "/admin")}/page`),
    {
      loading: () => <p>Loading...</p>,
      ssr: false,
    },
  )

  return (
    <div className="container mx-auto p-4">
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Page Preview Navigator</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={selectedPage} onValueChange={setSelectedPage}>
            <SelectTrigger>
              <SelectValue placeholder="Select a page to preview" />
            </SelectTrigger>
            <SelectContent>
              {pages.map((page) => (
                <SelectItem key={page.path} value={page.path}>
                  {page.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <div className="border-2 border-dashed border-gray-200 rounded-lg p-4">
            {selectedPage.startsWith("/admin") ? (
              <AdminWrapper>
                <PageComponent />
              </AdminWrapper>
            ) : (
              <PageComponent />
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

