const RAWG_API_KEY = process.env.RAWG_API_KEY
const BASE_URL = "https://api.rawg.io/api" // Declare BASE_URL variable

if (!RAWG_API_KEY || RAWG_API_KEY === 'POTTI_GAMES_API_VAR') {
  console.error('[v0] RAWG_API_KEY is not set. Please add it to your environment variables in the Vars section.')
}

export interface RawgGame {
  id: number
  slug: string
  name: string
  released: string
  background_image: string
  rating: number
  ratings_count: number
  metacritic: number | null
  playtime: number
  genres: { id: number; name: string; slug: string }[]
  platforms: { platform: { id: number; name: string; slug: string } }[]
  stores: { store: { id: number; name: string; slug: string } }[]
  developers?: { id: number; name: string; slug: string }[]
  publishers?: { id: number; name: string; slug: string }[]
  description_raw?: string
  website?: string
  esrb_rating?: { id: number; name: string; slug: string } | null
  short_screenshots?: { id: number; image: string }[]
  tags?: { id: number; name: string; slug: string }[]
}

export interface RawgResponse {
  count: number
  next: string | null
  previous: string | null
  results: RawgGame[]
}

export interface GameDetails extends RawgGame {
  description_raw: string
  developers: { id: number; name: string; slug: string }[]
  publishers: { id: number; name: string; slug: string }[]
  website: string
}

// Generate a pseudo-price based on game attributes
export function generatePrice(game: RawgGame): number {
  if (!game.metacritic && game.rating < 3) return 0 // Free
  if (game.metacritic && game.metacritic >= 85) return 59.99
  if (game.metacritic && game.metacritic >= 75) return 49.99
  if (game.metacritic && game.metacritic >= 60) return 39.99
  if (game.rating >= 4) return 29.99
  if (game.rating >= 3) return 19.99
  return 9.99
}

// Generate original price for discount calculation
export function generateOriginalPrice(game: RawgGame): number | null {
  const price = generatePrice(game)
  // 30% of games have a discount
  if (game.id % 3 === 0 && price > 0) {
    return Math.round(price * 1.4 * 100) / 100
  }
  return null
}

async function fetchRawg<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
  if (!RAWG_API_KEY || RAWG_API_KEY === 'POTTI_GAMES_API_VAR') {
    throw new Error('RAWG_API_KEY is not configured. Please add your RAWG API key to the environment variables.')
  }

  const searchParams = new URLSearchParams({
    key: RAWG_API_KEY,
    ...params,
  })

  const response = await fetch(`${BASE_URL}${endpoint}?${searchParams}`, {
    next: { revalidate: 3600 }, // Cache for 1 hour
  })

  if (!response.ok) {
    throw new Error(`RAWG API error: ${response.status}`)
  }

  return response.json()
}

export async function getGames(params: {
  page?: number
  page_size?: number
  search?: string
  genres?: string
  ordering?: string
  metacritic?: string
}): Promise<RawgResponse> {
  const queryParams: Record<string, string> = {
    page: String(params.page || 1),
    page_size: String(params.page_size || 20),
  }

  if (params.search) queryParams.search = params.search
  if (params.genres) queryParams.genres = params.genres
  if (params.ordering) queryParams.ordering = params.ordering
  if (params.metacritic) queryParams.metacritic = params.metacritic

  return fetchRawg<RawgResponse>("/games", queryParams)
}

export async function getFeaturedGames(): Promise<RawgResponse> {
  return fetchRawg<RawgResponse>("/games", {
    page_size: "6",
    ordering: "-rating",
    metacritic: "80,100",
  })
}

export async function getTrendingGames(): Promise<RawgResponse> {
  const today = new Date()
  const lastMonth = new Date(today.setMonth(today.getMonth() - 3))
  const dateString = lastMonth.toISOString().split("T")[0]

  return fetchRawg<RawgResponse>("/games", {
    page_size: "10",
    ordering: "-added",
    dates: `${dateString},${new Date().toISOString().split("T")[0]}`,
  })
}

export async function getNewReleases(): Promise<RawgResponse> {
  const today = new Date()
  const lastMonth = new Date(today.setMonth(today.getMonth() - 1))
  const dateString = lastMonth.toISOString().split("T")[0]

  return fetchRawg<RawgResponse>("/games", {
    page_size: "8",
    ordering: "-released",
    dates: `${dateString},${new Date().toISOString().split("T")[0]}`,
  })
}

export async function getTopRatedGames(): Promise<RawgResponse> {
  return fetchRawg<RawgResponse>("/games", {
    page_size: "8",
    ordering: "-metacritic",
    metacritic: "85,100",
  })
}

export async function getGameBySlug(slug: string): Promise<GameDetails> {
  return fetchRawg<GameDetails>(`/games/${slug}`)
}

export async function getGameScreenshots(slug: string): Promise<{ results: { id: number; image: string }[] }> {
  return fetchRawg<{ results: { id: number; image: string }[] }>(`/games/${slug}/screenshots`)
}

export async function getGenres(): Promise<{ results: { id: number; name: string; slug: string; image_background: string }[] }> {
  return fetchRawg("/genres", { page_size: "20" })
}

export async function searchGames(query: string): Promise<RawgResponse> {
  return fetchRawg<RawgResponse>("/games", {
    search: query,
    page_size: "20",
  })
}
