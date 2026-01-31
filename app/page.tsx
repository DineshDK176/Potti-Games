import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { HeroSection } from "@/components/home/hero-section"
import { GameGrid } from "@/components/home/game-grid"
import { TrendingSection } from "@/components/home/trending-section"
import { getFeaturedGames, getTrendingGames, getTopRatedGames, getNewReleases } from "@/lib/rawg"

export default async function HomePage() {
  const [featuredData, trendingData, topRatedData, newReleasesData] = await Promise.all([
    getFeaturedGames(),
    getTrendingGames(),
    getTopRatedGames(),
    getNewReleases(),
  ])

  const featuredGames = featuredData.results
  const trendingGames = trendingData.results
  const topRatedGames = topRatedData.results
  const newReleases = newReleasesData.results

  const heroGame = featuredGames[0]

  return (
    <div className="flex min-h-screen flex-col bg-[#121212]">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        {heroGame && <HeroSection game={heroGame} />}

        {/* Featured Games */}
        <GameGrid
          title="Featured & Recommended"
          games={featuredGames.slice(1, 7)}
          href="/games?ordering=-rating"
        />

        {/* Trending Section */}
        <TrendingSection games={trendingGames.slice(0, 8)} />

        {/* Top Rated */}
        <GameGrid
          title="Top Rated"
          games={topRatedGames.slice(0, 6)}
          href="/games?metacritic=85,100"
        />

        {/* New Releases */}
        <div className="border-t border-[#333]">
          <GameGrid
            title="New Releases"
            games={newReleases.slice(0, 6)}
            href="/games?ordering=-released"
          />
        </div>
      </main>
      <Footer />
    </div>
  )
}
