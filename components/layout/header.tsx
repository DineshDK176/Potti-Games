"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { useCart, useWishlist } from "@/hooks/use-store"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  ShoppingCart,
  Heart,
  User,
  Search,
  Menu,
  X,
  Gamepad2,
  LogOut,
  Library,
  ChevronDown,
} from "lucide-react"
import { cn } from "@/lib/utils"
import type { User as SupabaseUser } from "@supabase/supabase-js"

const navLinks = [
  { href: "/", label: "Discover" },
  { href: "/games", label: "Browse" },
  { href: "/games?ordering=-released", label: "New Releases" },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const { cartCount } = useCart()
  const { wishlist } = useWishlist()
  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }
    getUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [supabase.auth])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#333] bg-[#121212]">
      <div className="mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0074e4]">
            <Gamepad2 className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-bold text-white">Potti Game</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded px-4 py-2 text-sm font-medium text-[#a0a0a0] transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Search Bar */}
        <div className="hidden flex-1 max-w-md mx-8 lg:block">
          <Link href="/games" className="block">
            <div className="flex items-center gap-2 rounded-full bg-[#2a2a2a] px-4 py-2 text-sm text-[#666] transition-colors hover:bg-[#333]">
              <Search className="h-4 w-4" />
              <span>Search store</span>
            </div>
          </Link>
        </div>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 lg:flex">
          <Link href="/wishlist">
            <Button variant="ghost" size="icon" className="relative h-9 w-9 rounded-lg text-[#a0a0a0] hover:text-white hover:bg-[#2a2a2a]">
              <Heart className="h-5 w-5" />
              {wishlist.length > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#0074e4] text-[10px] font-bold text-white">
                  {wishlist.length}
                </span>
              )}
              <span className="sr-only">Wishlist</span>
            </Button>
          </Link>
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative h-9 w-9 rounded-lg text-[#a0a0a0] hover:text-white hover:bg-[#2a2a2a]">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#0074e4] text-[10px] font-bold text-white">
                  {cartCount}
                </span>
              )}
              <span className="sr-only">Cart</span>
            </Button>
          </Link>
          
          <div className="h-6 w-px bg-[#333]" />

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 rounded-lg px-3 py-2 text-[#a0a0a0] hover:text-white hover:bg-[#2a2a2a]">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0074e4] text-xs font-bold text-white">
                    {user.email?.charAt(0).toUpperCase()}
                  </div>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-[#1a1a1a] border-[#333]">
                <div className="px-3 py-2">
                  <p className="text-sm font-medium text-white">{user.email}</p>
                </div>
                <DropdownMenuSeparator className="bg-[#333]" />
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="flex items-center gap-2 text-[#a0a0a0] hover:text-white cursor-pointer">
                    <User className="h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/library" className="flex items-center gap-2 text-[#a0a0a0] hover:text-white cursor-pointer">
                    <Library className="h-4 w-4" />
                    Library
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-[#333]" />
                <DropdownMenuItem onClick={handleSignOut} className="flex items-center gap-2 text-[#a0a0a0] hover:text-white cursor-pointer">
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/auth/login">
              <Button className="rounded-lg bg-[#0074e4] px-4 py-2 text-sm font-medium text-white hover:bg-[#0066cc]">
                Sign In
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 lg:hidden">
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative h-9 w-9 rounded-lg text-[#a0a0a0] hover:text-white hover:bg-[#2a2a2a]">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#0074e4] text-[10px] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-lg text-[#a0a0a0] hover:text-white hover:bg-[#2a2a2a]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only">Menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "overflow-hidden border-t border-[#333] transition-all duration-300 lg:hidden bg-[#121212]",
          mobileMenuOpen ? "max-h-[500px]" : "max-h-0"
        )}
      >
        <nav className="flex flex-col gap-1 p-4">
          {/* Mobile Search */}
          <Link
            href="/games"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 rounded-lg bg-[#2a2a2a] px-4 py-3 text-sm text-[#666] mb-2"
          >
            <Search className="h-4 w-4" />
            <span>Search store</span>
          </Link>

          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg px-4 py-3 text-sm font-medium text-[#a0a0a0] transition-colors hover:bg-[#2a2a2a] hover:text-white"
            >
              {link.label}
            </Link>
          ))}
          <div className="my-2 h-px bg-[#333]" />
          <Link
            href="/wishlist"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-[#a0a0a0] transition-colors hover:bg-[#2a2a2a] hover:text-white"
          >
            <Heart className="h-4 w-4" />
            Wishlist
            {wishlist.length > 0 && (
              <span className="ml-auto rounded-full bg-[#0074e4] px-2 py-0.5 text-xs font-bold text-white">
                {wishlist.length}
              </span>
            )}
          </Link>
          
          {user ? (
            <>
              <Link
                href="/profile"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-[#a0a0a0] transition-colors hover:bg-[#2a2a2a] hover:text-white"
              >
                <User className="h-4 w-4" />
                Profile
              </Link>
              <button
                onClick={() => {
                  handleSignOut()
                  setMobileMenuOpen(false)
                }}
                className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-[#a0a0a0] transition-colors hover:bg-[#2a2a2a] hover:text-white text-left"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </button>
            </>
          ) : (
            <Link
              href="/auth/login"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 flex items-center justify-center rounded-lg bg-[#0074e4] px-4 py-3 text-sm font-medium text-white hover:bg-[#0066cc]"
            >
              Sign In
            </Link>
          )}
        </nav>
      </div>
    </header>
  )
}
