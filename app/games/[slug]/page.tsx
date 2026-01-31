import { notFound } from "next/navigation"
import { getGameBySlug, games } from "@/lib/data"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { GameDetailsContent } from "@/components/game-details-content"

export function generateStaticParams() {
  return games.map((game) => ({
    slug: game.slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const game = getGameBySlug(slug)
  if (!game) return { title: "Game Not Found" }

  return {
    title: `${game.title} - PlayVault`,
    description: game.description,
  }
}

export default async function GameDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const game = getGameBySlug(slug)

  if (!game) {
    notFound()
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <GameDetailsContent game={game} />
      </main>
      <Footer />
    </div>
  )
}
