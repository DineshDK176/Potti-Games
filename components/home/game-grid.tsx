"use client"

import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Heart, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart, useWishlist } from "@/hooks/use-store"
import { Game } from "@/lib/types"
import { cn } from "@/lib/utils"

interface GameGridProps {
  title: string
  games: Game[]
  href?: string
}

export function GameGrid({ title, games, href }: GameGridProps) {
  return (
    <section className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">{title}</h2>
          {href && (
            <Link
              href={href}
              className="flex items-center gap-1 text-sm text-[#a0a0a0] hover:text-white transition-colors"
            >
              View All
              <ChevronRight className="h-4 w-4" />
            </Link>
          )}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {games.map((game) => (
            <GameGridCard key={game.id} game={game} />
          ))}
        </div>
      </div>
    </section>
  )
}

function GameGridCard({ game }: { game: Game }) {
  const { addToCart } = useCart()
  const { isInWishlist, toggleWishlist } = useWishlist()
  const inWishlist = isInWishlist(game.id)

  const discountPercent = game.originalPrice 
    ? Math.round(((game.originalPrice - game.price) / game.originalPrice) * 100) 
    : 0

  const handleAddToCart = () => {
    addToCart(game)
  }

  return (
    <div className="group">
      <Link href={`/games/${game.slug}`}>
        <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-[#2a2a2a]">
          {game.coverImage ? (
            <Image
              src={game.coverImage}
              alt={game.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-[#666]">No Image</div>
          )}
          
          {/* Discount Badge */}
          {discountPercent > 0 && (
            <div className="absolute left-2 top-2 rounded bg-[#0074e4] px-2 py-0.5 text-xs font-bold text-white">
              -{discountPercent}%
            </div>
          )}

          {/* Wishlist Button */}
          <button
            onClick={(e) => {
              e.preventDefault()
              toggleWishlist(game.id)
            }}
            className="absolute right-2 top-2 rounded-full bg-black/50 p-1.5 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-black/70"
          >
            <Heart
              className={cn(
                "h-4 w-4 transition-colors",
                inWishlist ? "fill-[#0074e4] text-[#0074e4]" : "text-white"
              )}
            />
          </button>

          {/* Hover Overlay */}
          <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100">
            <Button
              onClick={(e) => {
                e.preventDefault()
                handleAddToCart()
              }}
              className="m-2 w-full bg-[#0074e4] text-white hover:bg-[#0066cc] rounded text-xs h-8"
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </Link>

      {/* Game Info */}
      <div className="mt-2">
        <Link href={`/games/${game.slug}`}>
          <h3 className="text-sm font-medium text-white truncate hover:text-[#0074e4] transition-colors">
            {game.title}
          </h3>
        </Link>
        <div className="mt-1 flex items-center gap-2">
          {game.genre?.[0] && (
            <span className="text-xs text-[#666]">{game.genre[0]}</span>
          )}
          {game.rating > 0 && (
            <div className="flex items-center gap-0.5">
              <Star className="h-3 w-3 fill-[#f59e0b] text-[#f59e0b]" />
              <span className="text-xs text-[#a0a0a0]">{game.rating.toFixed(1)}</span>
            </div>
          )}
        </div>
        <div className="mt-1 flex items-center gap-2">
          {game.isFree ? (
            <span className="text-sm font-medium text-[#10b981]">Free</span>
          ) : (
            <>
              <span className="text-sm font-medium text-white">${game.price.toFixed(2)}</span>
              {game.originalPrice && (
                <span className="text-xs text-[#666] line-through">${game.originalPrice.toFixed(2)}</span>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
