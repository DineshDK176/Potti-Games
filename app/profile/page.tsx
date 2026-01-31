"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useUser } from "@/hooks/use-store"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ProfileContent } from "@/components/profile-content"

export default function ProfilePage() {
  const { user, isSignedIn } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (!isSignedIn) {
      router.push("/auth/login")
    }
  }, [isSignedIn, router])

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
