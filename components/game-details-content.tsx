"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  Star,
  Heart,
  ShoppingCart,
  Calendar,
  Building,
  Monitor,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { useCart, useWishlist } from "@/hooks/use-store"
import { Game } from "@/lib/types"
import { cn } from "@/lib/utils"

interface GameDetailsContentProps {
  game: Game
}

export function GameDetailsContent({ game }: GameDetailsContentProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const { addToCart, cart } = useCart()
  const { isInWishlist, toggleWishlist } = useWishlist()

  const inWishlist = isInWishlist(game.id)
  const inCart = cart.some((item) => item.game.id === game.id)

  const allImages = [game.coverImage, ...game.screenshots]

  const discountPercent = game.originalPrice
    ? Math.round(((game.originalPrice - game.price) / game.originalPrice) * 100)
    : 0

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % allImages.length)
  }

  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length)
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav className="mb-6">
        <Link
          href="/games"
          className="flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-primary"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Browse
        </Link>
      </nav>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left Column - Images */}
        <div className="lg:col-span-2">
          {/* Main Image */}
          <div className="relative aspect-video overflow-hidden rounded-2xl bg-muted">
            <Image
              src={allImages[selectedImageIndex] || "/placeholder.svg"}
              alt={`${game.title} screenshot ${selectedImageIndex + 1}`}
              fill
              className="object-cover"
              priority
            />
            {allImages.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70"
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
                  key={image}
                  onClick={() => setSelectedImageIndex(index)}
                  className={cn(
                    "relative h-16 w-28 shrink-0 overflow-hidden rounded-lg transition-all",
                    selectedImageIndex === index
                      ? "ring-2 ring-primary"
                      : "opacity-70 hover:opacity-100"
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
          <Card className="mt-8 border-0 bg-card shadow-md">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold text-foreground">About This Game</h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                {game.description}
              </p>
            </CardContent>
          </Card>

          {/* Game Info Cards */}
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <Card className="border-0 bg-card shadow-md">
              <CardContent className="flex items-center gap-3 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                  <Building className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Developer</p>
                  <p className="font-semibold text-foreground">{game.developer}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-card shadow-md">
              <CardContent className="flex items-center gap-3 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/20">
                  <Calendar className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Release Date</p>
                  <p className="font-semibold text-foreground">
                    {new Date(game.releaseDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-card shadow-md">
              <CardContent className="flex items-center gap-3 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/20">
                  <Monitor className="h-5 w-5 text-accent-foreground" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Platforms</p>
                  <p className="font-semibold text-foreground">
                    {game.platforms.join(", ")}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Right Column - Purchase Info */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24 border-0 bg-card shadow-lg">
            <CardContent className="p-6">
              {/* Title & Rating */}
              <h1 className="text-2xl font-bold text-foreground">{game.title}</h1>
              <div className="mt-3 flex items-center gap-3">
                <div className="flex items-center gap-1 rounded-full bg-accent/20 px-3 py-1">
                  <Star className="h-4 w-4 fill-accent text-accent" />
                  <span className="font-semibold text-foreground">{game.rating}</span>
                </div>
                <span className="text-sm text-muted-foreground">{game.publisher}</span>
              </div>

              {/* Genres */}
              <div className="mt-4 flex flex-wrap gap-2">
                {game.genre.map((g) => (
                  <Badge key={g} variant="secondary" className="rounded-full">
                    {g}
                  </Badge>
                ))}
              </div>

              {/* Price */}
              <div className="mt-6 rounded-xl bg-muted p-4">
                {game.isFree ? (
                  <span className="text-3xl font-bold text-secondary">Free to Play</span>
                ) : (
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-bold text-foreground">
                      ${game.price.toFixed(2)}
                    </span>
                    {game.originalPrice && (
                      <>
                        <span className="text-lg text-muted-foreground line-through">
                          ${game.originalPrice.toFixed(2)}
                        </span>
                        <Badge className="bg-primary text-primary-foreground">
                          -{discountPercent}%
                        </Badge>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="mt-6 space-y-3">
                <Button
                  size="lg"
                  className="w-full rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/30 hover:bg-primary/90"
                  onClick={() => addToCart(game)}
                  disabled={inCart}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  {inCart ? "In Cart" : "Add to Cart"}
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  className={cn(
                    "w-full rounded-xl border-2",
                    inWishlist && "border-primary bg-primary/5"
                  )}
                  onClick={() => toggleWishlist(game.id)}
                >
                  <Heart
                    className={cn(
                      "mr-2 h-5 w-5",
                      inWishlist && "fill-primary text-primary"
                    )}
                  />
                  {inWishlist ? "In Wishlist" : "Add to Wishlist"}
                </Button>
              </div>

              {/* Additional Info */}
              <div className="mt-6 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Publisher</span>
                  <span className="font-medium text-foreground">{game.publisher}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Developer</span>
                  <span className="font-medium text-foreground">{game.developer}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Release Date</span>
                  <span className="font-medium text-foreground">
                    {new Date(game.releaseDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
