import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { GameCard } from "@/components/game-card"
import { Game } from "@/lib/types"

interface GamesSectionProps {
  title: string
  games: Game[]
  href?: string
  variant?: "default" | "featured" | "compact"
}

export function GamesSection({ title, games, href, variant = "default" }: GamesSectionProps) {
  return (
    <section className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">{title}</h2>
          {href && (
            <Link
              href={href}
              className="flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80"
            >
              View All
              <ChevronRight className="h-4 w-4" />
            </Link>
          )}
        </div>
        <div
          className={
            variant === "compact"
              ? "mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
              : "mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          }
        >
          {games.map((game) => (
            <GameCard key={game.id} game={game} variant={variant} />
          ))}
        </div>
      </div>
    </section>
  )
}
