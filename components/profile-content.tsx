"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useWishlist, useCart } from "@/hooks/use-store"
import { createClient } from "@/lib/supabase/client"
import {
  User,
  Heart,
  ShoppingCart,
  LogOut,
  Settings,
  ChevronRight,
  Mail,
  Calendar,
  Shield,
} from "lucide-react"
import type { User as SupabaseUser } from "@supabase/supabase-js"

interface ProfileContentProps {
  user: SupabaseUser
}

export function ProfileContent({ user }: ProfileContentProps) {
  const router = useRouter()
  const { wishlist } = useWishlist()
  const { cart } = useCart()
  const supabase = createClient()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/")
    router.refresh()
  }

  const memberSince = user.created_at 
    ? new Date(user.created_at).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    : "Unknown"

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Profile Header */}
      <div className="rounded-lg bg-[#1a1a1a] p-6 sm:p-8">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
          {/* Avatar */}
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#0074e4] text-3xl font-bold text-white sm:h-24 sm:w-24">
            {user.email?.charAt(0).toUpperCase()}
          </div>

          {/* User Info */}
          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-2xl font-bold text-white">
              {user.user_metadata?.full_name || user.email?.split("@")[0] || "Player"}
            </h1>
            <p className="mt-1 text-[#a0a0a0]">{user.email}</p>
            <div className="mt-4 flex flex-wrap justify-center gap-3 sm:justify-start">
              <div className="flex items-center gap-1 rounded bg-[#2a2a2a] px-3 py-1 text-sm text-[#a0a0a0]">
                <Calendar className="h-4 w-4" />
                Member since {memberSince}
              </div>
              {user.email_confirmed_at && (
                <div className="flex items-center gap-1 rounded bg-[#10b981]/10 px-3 py-1 text-sm text-[#10b981]">
                  <Shield className="h-4 w-4" />
                  Verified
                </div>
              )}
            </div>
          </div>

          {/* Sign Out Button */}
          <Button
            variant="outline"
            onClick={handleSignOut}
            className="rounded border-[#333] bg-transparent text-[#a0a0a0] hover:bg-[#2a2a2a] hover:text-white"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <Link href="/wishlist" className="group">
          <div className="rounded-lg bg-[#1a1a1a] p-6 transition-colors hover:bg-[#2a2a2a]">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#0074e4]/10">
                <Heart className="h-6 w-6 text-[#0074e4]" />
              </div>
              <div>
                <p className="text-sm text-[#666]">Wishlist</p>
                <p className="text-2xl font-bold text-white">{wishlist.length}</p>
              </div>
            </div>
          </div>
        </Link>

        <Link href="/cart" className="group">
          <div className="rounded-lg bg-[#1a1a1a] p-6 transition-colors hover:bg-[#2a2a2a]">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#10b981]/10">
                <ShoppingCart className="h-6 w-6 text-[#10b981]" />
              </div>
              <div>
                <p className="text-sm text-[#666]">In Cart</p>
                <p className="text-2xl font-bold text-white">{cart.length}</p>
              </div>
            </div>
          </div>
        </Link>

        <div className="rounded-lg bg-[#1a1a1a] p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#f59e0b]/10">
              <User className="h-6 w-6 text-[#f59e0b]" />
            </div>
            <div>
              <p className="text-sm text-[#666]">Account Type</p>
              <p className="text-2xl font-bold text-white">Free</p>
            </div>
          </div>
        </div>
      </div>

      {/* Account Settings */}
      <div className="mt-8">
        <h2 className="text-lg font-bold text-white mb-4">Account Settings</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between rounded-lg bg-[#1a1a1a] p-4 transition-colors hover:bg-[#2a2a2a] cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#2a2a2a]">
                <Mail className="h-5 w-5 text-[#a0a0a0]" />
              </div>
              <div>
                <p className="font-medium text-white">Email Address</p>
                <p className="text-sm text-[#666]">{user.email}</p>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-[#666]" />
          </div>

          <div className="flex items-center justify-between rounded-lg bg-[#1a1a1a] p-4 transition-colors hover:bg-[#2a2a2a] cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#2a2a2a]">
                <Settings className="h-5 w-5 text-[#a0a0a0]" />
              </div>
              <div>
                <p className="font-medium text-white">Preferences</p>
                <p className="text-sm text-[#666]">Notifications, language, and display</p>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-[#666]" />
          </div>

          <div className="flex items-center justify-between rounded-lg bg-[#1a1a1a] p-4 transition-colors hover:bg-[#2a2a2a] cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#2a2a2a]">
                <Shield className="h-5 w-5 text-[#a0a0a0]" />
              </div>
              <div>
                <p className="font-medium text-white">Security</p>
                <p className="text-sm text-[#666]">Password and authentication</p>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-[#666]" />
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="mt-8">
        <h2 className="text-lg font-bold text-white mb-4">Quick Links</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <Link href="/wishlist">
            <div className="flex items-center gap-3 rounded-lg border border-[#333] bg-transparent p-4 transition-colors hover:bg-[#1a1a1a]">
              <Heart className="h-5 w-5 text-[#0074e4]" />
              <span className="font-medium text-white">View Wishlist</span>
            </div>
          </Link>
          <Link href="/cart">
            <div className="flex items-center gap-3 rounded-lg border border-[#333] bg-transparent p-4 transition-colors hover:bg-[#1a1a1a]">
              <ShoppingCart className="h-5 w-5 text-[#10b981]" />
              <span className="font-medium text-white">View Cart</span>
            </div>
          </Link>
          <Link href="/games">
            <div className="flex items-center gap-3 rounded-lg border border-[#333] bg-transparent p-4 transition-colors hover:bg-[#1a1a1a]">
              <User className="h-5 w-5 text-[#f59e0b]" />
              <span className="font-medium text-white">Browse Games</span>
            </div>
          </Link>
          <Link href="/">
            <div className="flex items-center gap-3 rounded-lg border border-[#333] bg-transparent p-4 transition-colors hover:bg-[#1a1a1a]">
              <ChevronRight className="h-5 w-5 text-[#a0a0a0]" />
              <span className="font-medium text-white">Back to Store</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
