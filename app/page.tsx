import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { HeroSection } from "@/components/home/hero-section"
import { GameGrid } from "@/components/home/game-grid"
import { TrendingSection } from "@/components/home/trending-section"
import { getFeaturedGames, getTrendingGames, getTopRatedGames, getNewReleases } from "@/lib/rawg"
import { convertRawgToGame } from "@/lib/game-converter"

// Rebuild cache
export default async function HomePage() {
  try {
    const [featuredData, trendingData, topRatedData, newReleasesData] = await Promise.all([
      getFeaturedGames().catch(() => ({ results: [] })),
      getTrendingGames().catch(() => ({ results: [] })),
      getTopRatedGames().catch(() => ({ results: [] })),
      getNewReleases().catch(() => ({ results: [] })),
    ])

    // Convert RAWG games to our Game type with pricing
    const featuredGames = featuredData.results.map(convertRawgToGame)
    const trendingGames = trendingData.results.map(convertRawgToGame)
    const topRatedGames = topRatedData.results.map(convertRawgToGame)
    const newReleases = newReleasesData.results.map(convertRawgToGame)

    const heroGame = featuredGames[0]

    return (
      <div className="flex min-h-screen flex-col bg-[#121212]">
        <Header />
        <main className="flex-1">
          {!heroGame && (
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
              <div className="rounded-lg bg-[#1a1a1a] border border-[#333] p-8 text-center">
                <h2 className="text-2xl font-bold text-white mb-4">API Configuration Required</h2>
                <p className="text-[#a0a0a0] mb-6">
                  To use Potti Game, you need to configure your RAWG API key.
                </p>
                <ol className="text-left max-w-md mx-auto text-[#a0a0a0] space-y-3 mb-6">
                  <li>1. Visit <a href="https://rawg.io/apidocs" target="_blank" rel="noopener noreferrer" className="text-[#0074e4] hover:underline">https://rawg.io/apidocs</a></li>
                  <li>2. Sign up for a free account</li>
                  <li>3. Copy your API key</li>
                  <li>4. Click the <strong>Vars</strong> button in the sidebar</li>
                  <li>5. Update <code className="bg-[#2a2a2a] px-2 py-1 rounded text-[#0074e4]">RAWG_API_KEY</code> with your real key</li>
                  <li>6. Refresh this page</li>
                </ol>
                <p className="text-sm text-[#666]">Your current key appears to be a placeholder. Replace it with a valid RAWG API key.</p>
              </div>
            </div>
          )}

          {/* Hero Section */}
          {heroGame && <HeroSection game={heroGame} />}

          {/* Featured Games */}
          {featuredGames.length > 0 && (
            <GameGrid
              title="Featured & Recommended"
              games={featuredGames.slice(1, 7)}
              href="/games?ordering=-rating"
            />
          )}

          {/* Trending Section */}
          {trendingGames.length > 0 && <TrendingSection games={trendingGames.slice(0, 8)} />}

          {/* Top Rated */}
          {topRatedGames.length > 0 && (
            <GameGrid
              title="Top Rated"
              games={topRatedGames.slice(0, 6)}
              href="/games?metacritic=85,100"
            />
          )}

          {/* New Releases */}
          {newReleases.length > 0 && (
            <div className="border-t border-[#333]">
              <GameGrid
                title="New Releases"
                games={newReleases.slice(0, 6)}
                href="/games?ordering=-released"
              />
            </div>
          )}
        </main>
        <Footer />
      </div>
    )
  } catch (error) {
    console.error("[v0] HomePage error:", error)
    return (
      <div className="flex min-h-screen flex-col bg-[#121212]">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="rounded-lg bg-[#1a1a1a] border border-[#333] p-8 text-center max-w-md">
            <h2 className="text-xl font-bold text-white mb-4">Unable to Load Games</h2>
            <p className="text-[#a0a0a0]">Please ensure your RAWG API key is correctly configured in the Vars section.</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }
}
