import { notFound } from "next/navigation"
import { getGameBySlug, getGameScreenshots } from "@/lib/rawg"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { GameDetailsContent } from "@/components/game-details-content"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  
  try {
    const game = await getGameBySlug(slug)
    return {
      title: `${game.name} - Potti Game`,
      description: game.description_raw?.slice(0, 160) || `Buy ${game.name} on Potti Game`,
    }
  } catch {
    return { title: "Game Not Found - Potti Game" }
  }
}

export default async function GameDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  
  try {
    const [game, screenshotsData] = await Promise.all([
      getGameBySlug(slug),
      getGameScreenshots(slug),
    ])

    const screenshots = screenshotsData.results.map(s => s.image)

    return (
      <div className="flex min-h-screen flex-col bg-[#121212]">
        <Header />
        <main className="flex-1">
          <GameDetailsContent game={game} screenshots={screenshots} />
        </main>
        <Footer />
      </div>
    )
  } catch {
    notFound()
  }
}
