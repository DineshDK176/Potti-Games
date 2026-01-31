"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Star, Play, ShoppingCart, Calendar } from "lucide-react"
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

  const handleAddToCart = () => {
    addToCart(game)
  }

  const price = game.price;
  const originalPrice = game.originalPrice;

  return (
    <section className="relative overflow-hidden bg-[#121212]">
      {/* Background Image */}
      <div className="absolute inset-0">
        {game.coverImage && (
          <Image
            src={game.coverImage || "/placeholder.svg"}
            alt=""
            fill
            className="object-cover opacity-30"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-[#121212] via-[#121212]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-[#121212]/50" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Content */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="rounded bg-[#0074e4] px-3 py-1 text-xs font-bold text-white uppercase tracking-wider">
                Featured
              </span>
              {discountPercent > 0 && (
                <span className="rounded bg-[#10b981] px-3 py-1 text-xs font-bold text-white">
                  -{discountPercent}%
                </span>
              )}
            </div>
            
            <h1 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
              {game.title}
            </h1>
            
            <div className="mt-4 flex flex-wrap items-center gap-4">
              {game.rating > 0 && (
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-[#f59e0b] text-[#f59e0b]" />
                  <span className="font-semibold text-white">{game.rating.toFixed(1)}</span>
                </div>
              )}
              {game.releaseDate && (
                <div className="flex items-center gap-1 text-[#a0a0a0]">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm">{new Date(game.releaseDate).getFullYear()}</span>
                </div>
              )}
              <div className="flex flex-wrap gap-2">
                {game.genre?.slice(0, 3).map((g) => (
                  <span key={g} className="rounded-full bg-[#2a2a2a] px-3 py-1 text-xs text-[#a0a0a0]">
                    {g}
                  </span>
                ))}
              </div>
            </div>

            {/* Platforms */}
            <div className="mt-4 flex items-center gap-2 text-[#666]">
              {game.platforms?.slice(0, 4).map((p) => (
                <span key={p} className="text-xs">
                  {p}
                </span>
              ))}
            </div>

            {/* Price */}
            <div className="mt-8 flex items-center gap-4">
              {price === 0 ? (
                <span className="text-3xl font-bold text-[#10b981]">Free to Play</span>
              ) : (
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-bold text-white">${price.toFixed(2)}</span>
                  {originalPrice && (
                    <span className="text-xl text-[#666] line-through">${originalPrice.toFixed(2)}</span>
                  )}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="mt-6 flex flex-wrap gap-3">
              <Button
                size="lg"
                className="rounded bg-[#0074e4] px-8 text-white hover:bg-[#0066cc]"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
              <Link href={`/games/${game.slug}`}>
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded border-[#333] bg-transparent text-white hover:bg-[#2a2a2a]"
                >
                  <Play className="mr-2 h-5 w-5" />
                  Learn More
                </Button>
              </Link>
            </div>
          </div>

          {/* Featured Image */}
          <div className="hidden lg:block">
            <Link href={`/games/${game.slug}`}>
              <div className="relative aspect-video overflow-hidden rounded-lg shadow-2xl transition-transform duration-300 hover:scale-[1.02]">
                {game.coverImage && (
                  <Image
                    src={game.coverImage || "/placeholder.svg"}
                    alt={game.title}
                    fill
                    className="object-cover"
                    priority
                  />
                )}
                <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-lg" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
