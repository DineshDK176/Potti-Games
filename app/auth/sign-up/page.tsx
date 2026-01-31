"use client"

import React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Gamepad2, Eye, EyeOff, Loader2, Check } from "lucide-react"

export default function SignUpPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }

    setLoading(true)

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${window.location.origin}/`,
      },
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    setSuccess(true)
    setLoading(false)
  }

  if (success) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#121212] px-4">
        <div className="w-full max-w-md text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
            <Check className="h-8 w-8 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Check your email</h2>
          <p className="text-[#a0a0a0] mb-6">
            {"We've sent a confirmation link to "}
            <span className="text-white font-medium">{email}</span>
            {". Click the link to activate your account."}
          </p>
          <Link href="/auth/login">
            <Button className="bg-[#0074e4] text-white hover:bg-[#0066cc]">
              Back to Sign In
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen">
      {/* Left Side - Form */}
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24 bg-[#121212]">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 mb-10">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0074e4]">
              <Gamepad2 className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white">Potti Game</span>
          </Link>

          <div>
            <h2 className="text-2xl font-bold text-white">Create your account</h2>
            <p className="mt-2 text-sm text-[#a0a0a0]">
              Already have an account?{" "}
              <Link href="/auth/login" className="font-medium text-[#0074e4] hover:text-[#0066cc]">
                Sign in
              </Link>
            </p>
          </div>

          <form onSubmit={handleSignUp} className="mt-8 space-y-6">
            {error && (
              <div className="rounded-lg bg-red-500/10 border border-red-500/20 p-4 text-sm text-red-400">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <Label htmlFor="email" className="text-[#a0a0a0]">Email address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-2 bg-[#2a2a2a] border-[#333] text-white placeholder:text-[#666] focus:border-[#0074e4] focus:ring-[#0074e4]"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <Label htmlFor="password" className="text-[#a0a0a0]">Password</Label>
                <div className="relative mt-2">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-[#2a2a2a] border-[#333] text-white placeholder:text-[#666] focus:border-[#0074e4] focus:ring-[#0074e4] pr-10"
                    placeholder="Create a password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#666] hover:text-[#a0a0a0]"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                <p className="mt-1 text-xs text-[#666]">Must be at least 6 characters</p>
              </div>

              <div>
                <Label htmlFor="confirmPassword" className="text-[#a0a0a0]">Confirm password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="mt-2 bg-[#2a2a2a] border-[#333] text-white placeholder:text-[#666] focus:border-[#0074e4] focus:ring-[#0074e4]"
                  placeholder="Confirm your password"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[#0074e4] text-white hover:bg-[#0066cc] h-11 rounded-lg font-medium"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                "Create account"
              )}
            </Button>

            <p className="text-xs text-[#666] text-center">
              By creating an account, you agree to our{" "}
              <Link href="#" className="text-[#0074e4] hover:underline">Terms of Service</Link>
              {" and "}
              <Link href="#" className="text-[#0074e4] hover:underline">Privacy Policy</Link>
            </p>
          </form>
        </div>
      </div>

      {/* Right Side - Image/Branding */}
      <div className="relative hidden w-0 flex-1 lg:block">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0074e4] to-[#0a3d6e]">
          <div className="flex h-full flex-col items-center justify-center p-12 text-white">
            <Gamepad2 className="h-24 w-24 mb-8 opacity-20" />
            <h3 className="text-3xl font-bold text-center mb-4">Join Potti Game</h3>
            <p className="text-lg text-center text-white/70 max-w-md">
              Create your free account and get access to thousands of amazing games, exclusive deals, and more.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
