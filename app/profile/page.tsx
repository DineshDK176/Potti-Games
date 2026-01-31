"use client"

import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GameCard } from "@/components/game-card"
import { useWishlist } from "@/hooks/use-store"
import { mockUser, games } from "@/lib/data"
import {
  User,
  Trophy,
  Gamepad2,
  Calendar,
  Heart,
  Settings,
  ChevronRight,
  Star,
} from "lucide-react"

export default function ProfilePage() {
  const { wishlist } = useWishlist()
  const wishlistGames = games.filter((game) => wishlist.includes(game.id))

  // Mock owned games (random selection for demo)
  const ownedGames = games.slice(0, 4)

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Profile Header */}
          <Card className="overflow-hidden border-0 bg-gradient-to-br from-primary/20 via-card to-secondary/20 shadow-lg">
            <CardContent className="p-6 sm:p-8">
              <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
                {/* Avatar */}
                <div className="relative">
                  <div className="h-24 w-24 overflow-hidden rounded-full ring-4 ring-primary/20 sm:h-32 sm:w-32">
                    <Image
                      src={mockUser.avatar || "/placeholder.svg"}
                      alt={mockUser.name}
                      width={128}
                      height={128}
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground ring-2 ring-card">
                    {mockUser.level}
                  </div>
                </div>

                {/* User Info */}
                <div className="flex-1 text-center sm:text-left">
                  <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
                    {mockUser.name}
                  </h1>
                  <p className="mt-1 text-muted-foreground">{mockUser.email}</p>
                  <div className="mt-4 flex flex-wrap justify-center gap-2 sm:justify-start">
                    <Badge variant="secondary" className="gap-1 rounded-full">
                      <Star className="h-3 w-3 fill-accent text-accent" />
                      Level {mockUser.level}
                    </Badge>
                    <Badge variant="secondary" className="gap-1 rounded-full">
                      <Calendar className="h-3 w-3" />
                      Member since{" "}
                      {new Date(mockUser.memberSince).toLocaleDateString("en-US", {
                        month: "short",
                        year: "numeric",
                      })}
                    </Badge>
                  </div>
                </div>

                {/* Edit Button */}
                <Button variant="outline" className="rounded-xl bg-transparent">
                  <Settings className="mr-2 h-4 w-4" />
                  Edit Profile
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Stats Grid */}
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <Card className="border-0 bg-card shadow-md">
              <CardContent className="flex items-center gap-4 p-6">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                  <Gamepad2 className="h-7 w-7 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Games Owned</p>
                  <p className="text-3xl font-bold text-foreground">
                    {mockUser.gamesOwned}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-card shadow-md">
              <CardContent className="flex items-center gap-4 p-6">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary/20">
                  <Trophy className="h-7 w-7 text-secondary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Achievements</p>
                  <p className="text-3xl font-bold text-foreground">
                    {mockUser.achievements}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-card shadow-md">
              <CardContent className="flex items-center gap-4 p-6">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/20">
                  <Heart className="h-7 w-7 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Wishlist</p>
                  <p className="text-3xl font-bold text-foreground">
                    {wishlist.length}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* My Games Section */}
          <section className="mt-10">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-foreground sm:text-2xl">
                My Games
              </h2>
              <Link
                href="#"
                className="flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80"
              >
                View All
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {ownedGames.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          </section>

          {/* Wishlist Preview Section */}
          {wishlistGames.length > 0 && (
            <section className="mt-10">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-foreground sm:text-2xl">
                  My Wishlist
                </h2>
                <Link
                  href="/wishlist"
                  className="flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80"
                >
                  View All
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {wishlistGames.slice(0, 4).map((game) => (
                  <GameCard key={game.id} game={game} />
                ))}
              </div>
            </section>
          )}

          {/* Account Section */}
          <section className="mt-10">
            <h2 className="text-xl font-bold text-foreground sm:text-2xl">
              Account Settings
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Card className="border-0 bg-card shadow-md transition-all hover:shadow-lg">
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted">
                      <User className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Personal Info</p>
                      <p className="text-sm text-muted-foreground">
                        Update your profile details
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </CardContent>
              </Card>

              <Card className="border-0 bg-card shadow-md transition-all hover:shadow-lg">
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted">
                      <Settings className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Preferences</p>
                      <p className="text-sm text-muted-foreground">
                        Notifications & display
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
