import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  const isPublicPath = path === "/" || path === "/login" || path === "/signup" || path === "/forgot-password"
  const isAdminPath = path.startsWith("/admin")
  const isDashboardPath = path.startsWith("/dashboard")

  const token = request.cookies.get("token")?.value

  console.log("Middleware: Path:", path, "Token:", token ? "Exists" : "Not found")

  if (isPublicPath && token) {
    console.log("Middleware: Redirecting authenticated user to dashboard")
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  if (isDashboardPath && !token) {
    console.log("Middleware: Redirecting unauthenticated user to login")
    return NextResponse.redirect(new URL("/login", request.url))
  }

  if (isAdminPath && !token) {
    console.log("Middleware: Redirecting unauthenticated user to admin login")
    return NextResponse.redirect(new URL("/admin/login", request.url))
  }

  console.log("Middleware: Allowing access")
  return NextResponse.next()
}

export const config = {
  matcher: ["/", "/login", "/signup", "/dashboard", "/dashboard/:path*", "/admin/:path*"],
}

