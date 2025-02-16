"use client"

import { useState, useEffect } from "react"
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { auth, db } from "@/lib/firebase"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Icons } from "@/components/ui/icons"
import Link from "next/link"
import Image from "next/image"
import { doc, setDoc } from "firebase/firestore"
import { createHostingerEmail } from "@/lib/hostinger"
import { useAuth } from "@/contexts/AuthContext"
import { toast } from "@/components/ui/use-toast"

export default function SignUpPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  })
  const router = useRouter()
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      router.push("/dashboard")
    }
  }, [user, router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password)
      const user = userCredential.user

      // Update user profile
      await updateProfile(user, { displayName: formData.fullName })

      // Store additional user data in Firestore
      await setDoc(doc(db, "users", user.uid), {
        fullName: formData.fullName,
        email: formData.email,
        createdAt: new Date(),
      })

      // Create Hostinger email
      try {
        await createHostingerEmail(formData.email, formData.password)
      } catch (error) {
        console.error("Error creating Hostinger email:", error)
        // You may want to handle this error, e.g., by showing a warning to the user
      }

      toast({
        title: "Success",
        description: "Your account has been created successfully.",
      })
      router.push("/dashboard")
    } catch (error) {
      console.error("Error signing up:", error)
      toast({
        title: "Error",
        description: "Failed to create an account. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  async function handleGoogleSignUp() {
    setIsLoading(true)

    try {
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)
      const user = result.user

      // Store additional user data in Firestore
      await setDoc(doc(db, "users", user.uid), {
        fullName: user.displayName,
        email: user.email,
        createdAt: new Date(),
      })

      toast({
        title: "Success",
        description: "You have successfully signed up with Google.",
      })
      router.push("/dashboard")
    } catch (error) {
      console.error("Error signing up with Google:", error)
      toast({
        title: "Error",
        description: "Failed to sign up with Google. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (user) {
    return null
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-2xl">
        <div className="flex flex-col items-center space-y-2">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/autobreezelogo-H28yo4YtAVaUxQXlhsnzZrQInrGfhC.png"
            alt="AutoBreeze Logo"
            width={150}
            height={40}
            className="h-10 w-auto"
          />
          <h2 className="mt-6 text-3xl font-extrabold text-primary">Create an account</h2>
          <p className="mt-2 text-sm text-muted-foreground">Join AutoBreeze and start your car buying journey</p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={onSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <Label className="sr-only" htmlFor="full-name">
                Full Name
              </Label>
              <Input
                id="full-name"
                name="fullName"
                type="text"
                autoComplete="name"
                required
                className="rounded-t-md"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label className="sr-only" htmlFor="email-address">
                Email address
              </Label>
              <Input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="rounded-none"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label className="sr-only" htmlFor="password">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="rounded-b-md"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="space-y-4">
            <Button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              disabled={isLoading}
            >
              {isLoading ? <Icons.spinner className="mr-2 h-4 w-4 animate-spin" /> : "Sign up"}
            </Button>

            <Button
              type="button"
              onClick={handleGoogleSignUp}
              className="w-full flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              <Icons.google className="w-5 h-5 mr-2" />
              Sign up with Google
            </Button>
          </div>
        </form>

        <p className="mt-8 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-primary hover:text-primary-dark">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}

