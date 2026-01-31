"use client"

import { useRealtimeGames } from "@/hooks/use-realtime-games"
import { GameGrid } from "./game-grid"
import type { Game } from "@/lib/types"

interface RealtimeGameSectionProps {
  title: string
  initialGames: Game[]
  href: string
}

export function RealtimeGameSection({ title, initialGames, href }: RealtimeGameSectionProps) {
  const { games, lastUpdate } = useRealtimeGames(initialGames)

  return (
    <div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {lastUpdate && (
          <div className="mb-2 text-xs text-[#666] text-right">
            Last updated: {lastUpdate.toLocaleTimeString()}
          </div>
        )}
      </div>
      <GameGrid title={title} games={games} href={href} />
    </div>
  )
}
