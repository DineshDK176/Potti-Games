"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useUser } from "@/hooks/use-store"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ProfileContent } from "@/components/profile-content"
import { Loader2 } from "lucide-react"

export default function ProfilePage() {
  const { user, isSignedIn } = useUser()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Wait for client-side hydration
    const timer = setTimeout(() => {
      setIsLoading(false)
      if (!isSignedIn) {
        router.push("/auth/login")
      }
    }, 100)
    return () => clearTimeout(timer)
  }, [isSignedIn, router])

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col bg-[#121212]">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-[#0074e4]" />
        </main>
        <Footer />
      </div>
    )
  }

  if (!isSignedIn || !user) {
    return null
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#121212]">
      <Header />
      <main className="flex-1">
        <ProfileContent user={user} />
      </main>
      <Footer />
    </div>
  )
}
