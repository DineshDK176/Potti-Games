"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Play, ShoppingCart } from "lucide-react"
import { useCart } from "@/hooks/use-store"
import { Game } from "@/lib/types"

interface HeroSectionProps {
  game: Game
}

export function HeroSection({ game }: HeroSectionProps) {
  const { addToCart } = useCart()

  const discountPercent = game.originalPrice
    ? Math.round(((game.originalPrice - game.price) / game.originalPrice) * 100)
    : 0

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-secondary/10">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Content */}
          <div className="order-2 lg:order-1">
            <div className="flex items-center gap-2">
              <Badge className="bg-accent text-accent-foreground">Featured</Badge>
              {discountPercent > 0 && (
                <Badge className="bg-primary text-primary-foreground">
                  {discountPercent}% OFF
                </Badge>
              )}
            </div>
            <h1 className="mt-4 text-balance text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              {game.title}
            </h1>
            <p className="mt-4 text-pretty text-lg text-muted-foreground">
              {game.description.slice(0, 200)}...
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-1">
                <Star className="h-5 w-5 fill-accent text-accent" />
                <span className="font-semibold text-foreground">{game.rating}</span>
                <span className="text-muted-foreground">rating</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {game.genre.map((g) => (
                  <Badge key={g} variant="secondary" className="rounded-full">
                    {g}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <div className="flex items-baseline gap-2">
                {game.isFree ? (
                  <span className="text-3xl font-bold text-secondary">Free to Play</span>
                ) : (
                  <>
                    <span className="text-3xl font-bold text-foreground">
                      ${game.price.toFixed(2)}
                    </span>
                    {game.originalPrice && (
                      <span className="text-xl text-muted-foreground line-through">
                        ${game.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </>
                )}
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button
                size="lg"
                className="rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/30 hover:bg-primary/90"
                onClick={() => addToCart(game)}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
              <Link href={`/games/${game.slug}`}>
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-xl border-2 hover:bg-muted bg-transparent"
                >
                  <Play className="mr-2 h-5 w-5" />
                  View Details
                </Button>
              </Link>
            </div>
          </div>

          {/* Image */}
          <div className="order-1 lg:order-2">
            <Link href={`/games/${game.slug}`}>
              <div className="relative aspect-video overflow-hidden rounded-2xl shadow-2xl shadow-primary/20 transition-transform duration-500 hover:scale-[1.02]">
                <Image
                  src={game.coverImage || "/placeholder.svg"}
                  alt={game.title}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10" />
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-secondary/10 blur-3xl" />
    </section>
  )
}
