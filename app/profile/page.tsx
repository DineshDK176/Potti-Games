import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ProfileContent } from "@/components/profile-content"

export default async function ProfilePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
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
