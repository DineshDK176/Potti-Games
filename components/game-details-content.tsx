"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Star,
  Heart,
  ShoppingCart,
  Calendar,
  Building2,
  Monitor,
  ChevronLeft,
  ChevronRight,
  Globe,
  Tag,
} from "lucide-react"
import { useCart, useWishlist } from "@/hooks/use-store"
import { GameDetails, generatePrice, generateOriginalPrice } from "@/lib/rawg"
import { cn } from "@/lib/utils"

interface GameDetailsContentProps {
  game: GameDetails
  screenshots: string[]
}

export function GameDetailsContent({ game, screenshots }: GameDetailsContentProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const { addToCart, cart } = useCart()
  const { isInWishlist, toggleWishlist } = useWishlist()

  const price = generatePrice(game)
  const originalPrice = generateOriginalPrice(game)
  const discountPercent = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0

  const inWishlist = isInWishlist(String(game.id))
  const inCart = cart.some((item) => item.game.id === String(game.id))

  const allImages = [game.background_image, ...screenshots].filter(Boolean)

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % allImages.length)
  }

  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length)
  }

  const handleAddToCart = () => {
    addToCart({
      id: String(game.id),
      title: game.name,
      slug: game.slug,
      coverImage: game.background_image,
      screenshots,
      description: game.description_raw || "",
      price,
      originalPrice: originalPrice || undefined,
      rating: game.rating,
      genre: game.genres?.map(g => g.name) || [],
      developer: game.developers?.[0]?.name || "Unknown",
      publisher: game.publishers?.[0]?.name || "Unknown",
      releaseDate: game.released || "",
      isFeatured: false,
      isTrending: false,
      isFree: price === 0,
      platforms: game.platforms?.map(p => p.platform.name) || [],
    })
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav className="mb-6">
        <Link
          href="/games"
          className="flex items-center gap-1 text-sm text-[#a0a0a0] transition-colors hover:text-white"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Store
        </Link>
      </nav>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left Column - Images & Description */}
        <div className="lg:col-span-2">
          {/* Main Image */}
          <div className="relative aspect-video overflow-hidden rounded-lg bg-[#2a2a2a]">
            {allImages[selectedImageIndex] && (
              <Image
                src={allImages[selectedImageIndex] || "/placeholder.svg"}
                alt={`${game.name} screenshot ${selectedImageIndex + 1}`}
                fill
                className="object-cover"
                priority
              />
            )}
            {allImages.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-black/80"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-black/80"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}
          </div>

          {/* Thumbnail Gallery */}
          {allImages.length > 1 && (
            <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
              {allImages.map((image, index) => (
                <button
                  key={`thumb-${index}`}
                  onClick={() => setSelectedImageIndex(index)}
                  className={cn(
                    "relative h-16 w-28 shrink-0 overflow-hidden rounded transition-all",
                    selectedImageIndex === index
                      ? "ring-2 ring-[#0074e4]"
                      : "opacity-60 hover:opacity-100"
                  )}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`Thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Description */}
          <div className="mt-8 rounded-lg bg-[#1a1a1a] p-6">
            <h2 className="text-lg font-bold text-white">About This Game</h2>
            <div className="mt-4 prose prose-invert prose-sm max-w-none">
              <p className="leading-relaxed text-[#a0a0a0] whitespace-pre-line">
                {game.description_raw || "No description available."}
              </p>
            </div>
          </div>

          {/* Game Info Grid */}
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {/* Developer */}
            {game.developers && game.developers.length > 0 && (
              <div className="flex items-center gap-3 rounded-lg bg-[#1a1a1a] p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0074e4]/10">
                  <Building2 className="h-5 w-5 text-[#0074e4]" />
                </div>
                <div>
                  <p className="text-xs text-[#666]">Developer</p>
                  <p className="font-medium text-white">{game.developers.map(d => d.name).join(", ")}</p>
                </div>
              </div>
            )}

            {/* Publisher */}
            {game.publishers && game.publishers.length > 0 && (
              <div className="flex items-center gap-3 rounded-lg bg-[#1a1a1a] p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#10b981]/10">
                  <Tag className="h-5 w-5 text-[#10b981]" />
                </div>
                <div>
                  <p className="text-xs text-[#666]">Publisher</p>
                  <p className="font-medium text-white">{game.publishers.map(p => p.name).join(", ")}</p>
                </div>
              </div>
            )}

            {/* Release Date */}
            {game.released && (
              <div className="flex items-center gap-3 rounded-lg bg-[#1a1a1a] p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#f59e0b]/10">
                  <Calendar className="h-5 w-5 text-[#f59e0b]" />
                </div>
                <div>
                  <p className="text-xs text-[#666]">Release Date</p>
                  <p className="font-medium text-white">
                    {new Date(game.released).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            )}

            {/* Platforms */}
            {game.platforms && game.platforms.length > 0 && (
              <div className="flex items-center gap-3 rounded-lg bg-[#1a1a1a] p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#8b5cf6]/10">
                  <Monitor className="h-5 w-5 text-[#8b5cf6]" />
                </div>
                <div>
                  <p className="text-xs text-[#666]">Platforms</p>
                  <p className="font-medium text-white text-sm">
                    {game.platforms.slice(0, 3).map(p => p.platform.name).join(", ")}
                    {game.platforms.length > 3 && ` +${game.platforms.length - 3}`}
                  </p>
                </div>
              </div>
            )}

            {/* Website */}
            {game.website && (
              <div className="flex items-center gap-3 rounded-lg bg-[#1a1a1a] p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#ec4899]/10">
                  <Globe className="h-5 w-5 text-[#ec4899]" />
                </div>
                <div>
                  <p className="text-xs text-[#666]">Website</p>
                  <a 
                    href={game.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-medium text-[#0074e4] hover:underline text-sm truncate block max-w-[150px]"
                  >
                    Visit Website
                  </a>
                </div>
              </div>
            )}

            {/* ESRB Rating */}
            {game.esrb_rating && (
              <div className="flex items-center gap-3 rounded-lg bg-[#1a1a1a] p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#666]/10">
                  <span className="text-xs font-bold text-[#a0a0a0]">ESRB</span>
                </div>
                <div>
                  <p className="text-xs text-[#666]">Rating</p>
                  <p className="font-medium text-white">{game.esrb_rating.name}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Purchase Info */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 rounded-lg bg-[#1a1a1a] p-6">
            {/* Game Title */}
            <h1 className="text-2xl font-bold text-white">{game.name}</h1>
            
            {/* Rating & Meta */}
            <div className="mt-3 flex items-center gap-3">
              {game.rating > 0 && (
                <div className="flex items-center gap-1 rounded bg-[#2a2a2a] px-2 py-1">
                  <Star className="h-4 w-4 fill-[#f59e0b] text-[#f59e0b]" />
                  <span className="font-medium text-white">{game.rating.toFixed(1)}</span>
                </div>
              )}
              {game.metacritic && (
                <div className={cn(
                  "rounded px-2 py-1 text-sm font-bold",
                  game.metacritic >= 75 ? "bg-[#10b981] text-white" : 
                  game.metacritic >= 50 ? "bg-[#f59e0b] text-black" : "bg-[#ef4444] text-white"
                )}>
                  {game.metacritic}
                </div>
              )}
            </div>

            {/* Genres */}
            <div className="mt-4 flex flex-wrap gap-2">
              {game.genres?.map((g) => (
                <span key={g.id} className="rounded bg-[#2a2a2a] px-2 py-1 text-xs text-[#a0a0a0]">
                  {g.name}
                </span>
              ))}
            </div>

            {/* Price Section */}
            <div className="mt-6 rounded-lg bg-[#2a2a2a] p-4">
              {price === 0 ? (
                <span className="text-2xl font-bold text-[#10b981]">Free to Play</span>
              ) : (
                <div className="flex items-baseline gap-3">
                  <span className="text-2xl font-bold text-white">${price.toFixed(2)}</span>
                  {originalPrice && (
                    <>
                      <span className="text-lg text-[#666] line-through">${originalPrice.toFixed(2)}</span>
                      <span className="rounded bg-[#0074e4] px-2 py-0.5 text-xs font-bold text-white">
                        -{discountPercent}%
                      </span>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="mt-6 space-y-3">
              <Button
                size="lg"
                className="w-full rounded bg-[#0074e4] text-white hover:bg-[#0066cc]"
                onClick={handleAddToCart}
                disabled={inCart}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                {inCart ? "In Cart" : "Add to Cart"}
              </Button>

              <Button
                size="lg"
                variant="outline"
                className={cn(
                  "w-full rounded border-[#333] bg-transparent text-white hover:bg-[#2a2a2a]",
                  inWishlist && "border-[#0074e4] bg-[#0074e4]/10"
                )}
                onClick={() => toggleWishlist(String(game.id))}
              >
                <Heart
                  className={cn(
                    "mr-2 h-5 w-5",
                    inWishlist && "fill-[#0074e4] text-[#0074e4]"
                  )}
                />
                {inWishlist ? "In Wishlist" : "Add to Wishlist"}
              </Button>
            </div>

            {/* Game Details */}
            <div className="mt-6 space-y-3 border-t border-[#333] pt-6 text-sm">
              {game.developers && game.developers.length > 0 && (
                <div className="flex justify-between">
                  <span className="text-[#666]">Developer</span>
                  <span className="font-medium text-white text-right">{game.developers[0].name}</span>
                </div>
              )}
              {game.publishers && game.publishers.length > 0 && (
                <div className="flex justify-between">
                  <span className="text-[#666]">Publisher</span>
                  <span className="font-medium text-white text-right">{game.publishers[0].name}</span>
                </div>
              )}
              {game.released && (
                <div className="flex justify-between">
                  <span className="text-[#666]">Release Date</span>
                  <span className="font-medium text-white">{new Date(game.released).toLocaleDateString()}</span>
                </div>
              )}
              {game.playtime > 0 && (
                <div className="flex justify-between">
                  <span className="text-[#666]">Average Playtime</span>
                  <span className="font-medium text-white">{game.playtime} hours</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
