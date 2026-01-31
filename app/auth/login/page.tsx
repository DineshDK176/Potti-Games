"use client"

import React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Gamepad2, Eye, EyeOff, Loader2 } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [resending, setResending] = useState(false)
  const [emailNotConfirmed, setEmailNotConfirmed] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleResendVerification = async () => {
    setResending(true)
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      }
    })
    setResending(false)
    if (error) {
      setError(error.message)
    } else {
      setError("")
      alert('Verification email sent! Please check your inbox.')
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setEmailNotConfirmed(false)
    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      if (error.message.toLowerCase().includes('email not confirmed')) {
        setEmailNotConfirmed(true)
      }
      setError(error.message)
      setLoading(false)
      return
    }

    router.push("/")
    router.refresh()
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
            <h2 className="text-2xl font-bold text-white">Sign in to your account</h2>
            <p className="mt-2 text-sm text-[#a0a0a0]">
              {"Don't have an account? "}
              <Link href="/auth/sign-up" className="font-medium text-[#0074e4] hover:text-[#0066cc]">
                Sign up for free
              </Link>
            </p>
          </div>

          <form onSubmit={handleLogin} className="mt-8 space-y-6">
            {error && (
              <div className="rounded-lg bg-red-500/10 border border-red-500/20 p-4 text-sm text-red-400">
                <p>{error}</p>
                {emailNotConfirmed && (
                  <button
                    type="button"
                    onClick={handleResendVerification}
                    disabled={resending}
                    className="mt-2 text-[#0074e4] hover:underline font-medium"
                  >
                    {resending ? 'Sending...' : 'Resend verification email'}
                  </button>
                )}
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
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-[#2a2a2a] border-[#333] text-white placeholder:text-[#666] focus:border-[#0074e4] focus:ring-[#0074e4] pr-10"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#666] hover:text-[#a0a0a0]"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
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
                  Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </Button>
          </form>
        </div>
      </div>

      {/* Right Side - Image/Branding */}
      <div className="relative hidden w-0 flex-1 lg:block">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0074e4] to-[#0a3d6e]">
          <div className="flex h-full flex-col items-center justify-center p-12 text-white">
            <Gamepad2 className="h-24 w-24 mb-8 opacity-20" />
            <h3 className="text-3xl font-bold text-center mb-4">Welcome to Potti Game</h3>
            <p className="text-lg text-center text-white/70 max-w-md">
              Your ultimate destination for the best games. Discover, collect, and play thousands of titles.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
