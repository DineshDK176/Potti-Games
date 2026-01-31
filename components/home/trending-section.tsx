"use client"

import Image from "next/image"
import Link from "next/link"
import { ChevronRight, Star, TrendingUp } from "lucide-react"
import { Game } from "@/lib/types"

interface TrendingSectionProps {
  games: Game[]
}

export function TrendingSection({ games }: TrendingSectionProps) {
  return (
    <section className="bg-[#0a0a0a] py-12 border-t border-[#333]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0074e4]">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-white">Trending Now</h2>
          </div>
          <Link
            href="/games?ordering=-added"
            className="flex items-center gap-1 text-sm text-[#a0a0a0] hover:text-white transition-colors"
          >
            View All
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {games.slice(0, 8).map((game, index) => (
            <Link
              key={game.id}
              href={`/games/${game.slug}`}
              className="group relative flex items-center gap-3 rounded-lg bg-[#1a1a1a] p-3 transition-all duration-300 hover:bg-[#2a2a2a]"
            >
              {/* Rank Badge */}
              <div className="absolute -left-1 -top-1 flex h-6 w-6 items-center justify-center rounded bg-[#0074e4] text-xs font-bold text-white shadow-lg">
                {index + 1}
              </div>

              {/* Game Image */}
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded">
                {game.coverImage ? (
                  <Image
                    src={game.coverImage}
                    alt={game.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-[#2a2a2a] text-[#666]">
                    ?
                  </div>
                )}
              </div>

              {/* Game Info */}
              <div className="min-w-0 flex-1">
                <h3 className="truncate text-sm font-medium text-white group-hover:text-[#0074e4] transition-colors">
                  {game.title}
                </h3>
                <div className="mt-1 flex items-center gap-2">
                  {game.rating > 0 && (
                    <div className="flex items-center gap-0.5">
                      <Star className="h-3 w-3 fill-[#f59e0b] text-[#f59e0b]" />
                      <span className="text-xs text-[#a0a0a0]">{game.rating.toFixed(1)}</span>
                    </div>
                  )}
                  {game.genre?.[0] && (
                    <span className="text-xs text-[#666]">{game.genre[0]}</span>
                  )}
                </div>
                <div className="mt-1">
                  {game.isFree ? (
                    <span className="text-xs font-medium text-[#10b981]">Free</span>
                  ) : (
                    <span className="text-xs font-medium text-white">${game.price.toFixed(2)}</span>
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
