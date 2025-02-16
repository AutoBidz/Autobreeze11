"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { onAuthStateChanged, type User } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie"
import type React from "react"

interface AuthContextType {
  user: User | null
  loading: boolean
}

const AuthContext = createContext<AuthContextType>({ user: null, loading: true })

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    console.log("AuthProvider: Setting up auth state listener")
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("AuthProvider: Auth state changed:", user ? "User authenticated" : "User not authenticated")
      setUser(user)
      setLoading(false)
      if (user) {
        console.log("AuthProvider: Setting authentication cookie")
        Cookies.set("token", user.uid, { expires: 7 })
      } else {
        console.log("AuthProvider: Removing authentication cookie")
        Cookies.remove("token")
      }
    })

    return () => {
      console.log("AuthProvider: Cleaning up auth state listener")
      unsubscribe()
    }
  }, [])

  return <AuthContext.Provider value={{ user, loading }}>{children}</AuthContext.Provider>
}

