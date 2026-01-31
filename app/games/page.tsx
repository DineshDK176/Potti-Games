import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { BrowseContent } from "@/components/browse-content"
import { getGames, getGenres } from "@/lib/rawg"

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function GamesPage({ searchParams }: PageProps) {
  const params = await searchParams
  
  const search = typeof params.search === "string" ? params.search : undefined
  const genres = typeof params.genres === "string" ? params.genres : undefined
  const ordering = typeof params.ordering === "string" ? params.ordering : "-rating"
  const metacritic = typeof params.metacritic === "string" ? params.metacritic : undefined
  const page = typeof params.page === "string" ? parseInt(params.page) : 1

  const [gamesData, genresData] = await Promise.all([
    getGames({
      search,
      genres,
      ordering,
      metacritic,
      page,
      page_size: 24,
    }),
    getGenres(),
  ])

  return (
    <div className="flex min-h-screen flex-col bg-[#121212]">
      <Header />
      <main className="flex-1">
        <BrowseContent 
          initialGames={gamesData.results}
          genres={genresData.results}
          totalCount={gamesData.count}
          currentPage={page}
          hasNextPage={!!gamesData.next}
        />
      </main>
      <Footer />
    </div>
  )
}
