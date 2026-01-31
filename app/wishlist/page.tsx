"use client"

import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { GameCard } from "@/components/game-card"
import { useWishlist } from "@/hooks/use-store"
import { games } from "@/lib/data"
import { Heart, ArrowRight } from "lucide-react"

export default function WishlistPage() {
  const { wishlist } = useWishlist()

  const wishlistGames = games.filter((game) => wishlist.includes(game.id))

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
              <Heart className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
                My Wishlist
              </h1>
              <p className="text-muted-foreground">
                {wishlistGames.length}{" "}
                {wishlistGames.length === 1 ? "game" : "games"} saved
              </p>
            </div>
          </div>

          {wishlistGames.length === 0 ? (
            <Card className="border-0 bg-card shadow-md">
              <CardContent className="flex flex-col items-center justify-center py-16">
                <div className="rounded-full bg-muted p-6">
                  <Heart className="h-12 w-12 text-muted-foreground" />
                </div>
                <h2 className="mt-6 text-xl font-semibold text-foreground">
                  Your wishlist is empty
                </h2>
                <p className="mt-2 text-center text-muted-foreground">
                  Save games you are interested in by clicking the heart icon.
                  <br />
                  They will appear here for easy access!
                </p>
                <Link href="/games">
                  <Button className="mt-6 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90">
                    Browse Games
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {wishlistGames.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
