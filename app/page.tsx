import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { HeroSection } from "@/components/home/hero-section"
import { GamesSection } from "@/components/home/games-section"
import { TrendingSection } from "@/components/home/trending-section"
import {
  getFeaturedGames,
  getTrendingGames,
  getFreeGames,
  getPaidGames,
} from "@/lib/data"

export default function HomePage() {
  const featuredGames = getFeaturedGames()
  const trendingGames = getTrendingGames()
  const freeGames = getFreeGames()
  const paidGames = getPaidGames()

  const heroGame = featuredGames[0]

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        {heroGame && <HeroSection game={heroGame} />}

        {/* Featured Games */}
        <GamesSection
          title="Featured Games"
          games={featuredGames.slice(0, 4)}
          href="/games?filter=featured"
          variant="featured"
        />

        {/* Trending Section */}
        <TrendingSection games={trendingGames} />

        {/* Free Games */}
        <GamesSection
          title="Free to Play"
          games={freeGames.slice(0, 4)}
          href="/games?filter=free"
        />

        {/* Paid Games / Premium */}
        <div className="bg-gradient-to-br from-primary/5 via-background to-secondary/5">
          <GamesSection
            title="Premium Games"
            games={paidGames.slice(0, 8)}
            href="/games"
          />
        </div>
      </main>
      <Footer />
    </div>
  )
}
