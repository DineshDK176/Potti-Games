"use client"

import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingCart, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useCart, useWishlist } from "@/hooks/use-store"
import { Game } from "@/lib/types"
import { cn } from "@/lib/utils"

interface GameCardProps {
  game: Game
  variant?: "default" | "featured" | "compact"
}

export function GameCard({ game, variant = "default" }: GameCardProps) {
  const { addToCart } = useCart()
  const { isInWishlist, toggleWishlist } = useWishlist()
  const inWishlist = isInWishlist(game.id)

  const discountPercent = game.originalPrice
    ? Math.round(((game.originalPrice - game.price) / game.originalPrice) * 100)
    : 0

  if (variant === "featured") {
    return (
      <Card className="group relative overflow-hidden border-0 bg-card shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        <Link href={`/games/${game.slug}`}>
          <div className="relative aspect-video overflow-hidden">
            <Image
              src={game.coverImage || "/placeholder.svg"}
              alt={game.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            {game.isFree && (
              <Badge className="absolute left-3 top-3 bg-secondary text-secondary-foreground">
                Free
              </Badge>
            )}
            {discountPercent > 0 && (
              <Badge className="absolute right-3 top-3 bg-primary text-primary-foreground">
                -{discountPercent}%
              </Badge>
            )}
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="text-xl font-bold text-white">{game.title}</h3>
              <div className="mt-1 flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-accent text-accent" />
                  <span className="text-sm font-medium text-white">{game.rating}</span>
                </div>
                <span className="text-sm text-white/70">{game.genre[0]}</span>
              </div>
            </div>
          </div>
        </Link>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {game.isFree ? (
                <span className="text-lg font-bold text-secondary">Free to Play</span>
              ) : (
                <>
                  <span className="text-lg font-bold text-foreground">
                    ${game.price.toFixed(2)}
                  </span>
                  {game.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">
                      ${game.originalPrice.toFixed(2)}
                    </span>
                  )}
                </>
              )}
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-xl hover:bg-muted"
                onClick={() => toggleWishlist(game.id)}
              >
                <Heart
                  className={cn(
                    "h-5 w-5 transition-colors",
                    inWishlist ? "fill-primary text-primary" : "text-muted-foreground"
                  )}
                />
              </Button>
              <Button
                size="sm"
                className="rounded-xl bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={() => addToCart(game)}
              >
                <ShoppingCart className="mr-1 h-4 w-4" />
                Add
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (variant === "compact") {
    return (
      <Card className="group flex overflow-hidden border-0 bg-card shadow-md transition-all duration-300 hover:shadow-lg">
        <Link href={`/games/${game.slug}`} className="relative h-24 w-24 shrink-0">
          <Image
            src={game.coverImage || "/placeholder.svg"}
            alt={game.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
        <CardContent className="flex flex-1 flex-col justify-center p-3">
          <Link href={`/games/${game.slug}`}>
            <h3 className="font-semibold text-foreground transition-colors hover:text-primary">
              {game.title}
            </h3>
          </Link>
          <div className="mt-1 flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-accent text-accent" />
              <span className="text-xs text-muted-foreground">{game.rating}</span>
            </div>
            {game.isFree ? (
              <span className="text-sm font-semibold text-secondary">Free</span>
            ) : (
              <span className="text-sm font-semibold text-foreground">
                ${game.price.toFixed(2)}
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="group overflow-hidden border-0 bg-card shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <Link href={`/games/${game.slug}`}>
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={game.coverImage || "/placeholder.svg"}
            alt={game.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {game.isFree && (
            <Badge className="absolute left-3 top-3 bg-secondary text-secondary-foreground">
              Free
            </Badge>
          )}
          {discountPercent > 0 && (
            <Badge className="absolute right-3 top-3 bg-primary text-primary-foreground">
              -{discountPercent}%
            </Badge>
          )}
          <button
            onClick={(e) => {
              e.preventDefault()
              toggleWishlist(game.id)
            }}
            className="absolute right-3 bottom-3 rounded-full bg-white/90 p-2 opacity-0 shadow-md transition-all duration-300 group-hover:opacity-100 hover:bg-white"
          >
            <Heart
              className={cn(
                "h-4 w-4 transition-colors",
                inWishlist ? "fill-primary text-primary" : "text-muted-foreground"
              )}
            />
          </button>
        </div>
      </Link>
      <CardContent className="p-4">
        <Link href={`/games/${game.slug}`}>
          <h3 className="font-semibold text-foreground transition-colors hover:text-primary">
            {game.title}
          </h3>
        </Link>
        <div className="mt-2 flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-accent text-accent" />
            <span className="text-sm text-muted-foreground">{game.rating}</span>
          </div>
          <span className="text-xs text-muted-foreground">{game.genre[0]}</span>
        </div>
        <div className="mt-3 flex items-center justify-between">
          {game.isFree ? (
            <span className="font-bold text-secondary">Free to Play</span>
          ) : (
            <div className="flex items-center gap-2">
              <span className="font-bold text-foreground">${game.price.toFixed(2)}</span>
              {game.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  ${game.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
          )}
          <Button
            size="sm"
            className="rounded-xl bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={() => addToCart(game)}
          >
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
