"use client"

import Image from "next/image"
import Link from "next/link"
import { ChevronRight, Star, TrendingUp } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Game } from "@/lib/types"

interface TrendingSectionProps {
  games: Game[]
}

export function TrendingSection({ games }: TrendingSectionProps) {
  return (
    <section className="bg-gradient-to-br from-muted/50 to-muted py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
              <TrendingUp className="h-5 w-5 text-primary-foreground" />
            </div>
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">Top Trends</h2>
          </div>
          <Link
            href="/games?sort=trending"
            className="flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80"
          >
            View All
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {games.slice(0, 6).map((game, index) => (
            <Link
              key={game.id}
              href={`/games/${game.slug}`}
              className="group relative flex items-center gap-4 rounded-2xl bg-card p-4 shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              {/* Rank Badge */}
              <div className="absolute -left-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground shadow-lg">
                #{index + 1}
              </div>

              {/* Game Image */}
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl">
                <Image
                  src={game.coverImage || "/placeholder.svg"}
                  alt={game.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>

              {/* Game Info */}
              <div className="min-w-0 flex-1">
                <h3 className="truncate font-semibold text-foreground transition-colors group-hover:text-primary">
                  {game.title}
                </h3>
                <div className="mt-1 flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-accent text-accent" />
                    <span className="text-xs text-muted-foreground">{game.rating}</span>
                  </div>
                  <Badge variant="secondary" className="rounded-full text-xs">
                    {game.genre[0]}
                  </Badge>
                </div>
                <div className="mt-2">
                  {game.isFree ? (
                    <span className="text-sm font-bold text-secondary">Free</span>
                  ) : (
                    <span className="text-sm font-bold text-foreground">
                      ${game.price.toFixed(2)}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
