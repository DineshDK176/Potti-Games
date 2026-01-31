const RAWG_API_KEY = process.env.RAWG_API_KEY
const BASE_URL = "https://api.rawg.io/api"

const API_AVAILABLE = RAWG_API_KEY && RAWG_API_KEY !== 'POTTI_GAMES_API_VAR'

if (!API_AVAILABLE) {
  console.warn('[v0] RAWG_API_KEY not configured. Using demo data. Set your API key in Vars to use real data.')
}

// Mock games for demo purposes
const MOCK_GAMES: RawgGame[] = [
  {
    id: 1,
    slug: "elden-ring",
    name: "Elden Ring",
    released: "2022-02-25",
    background_image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&h=450&fit=crop",
    rating: 4.4,
    ratings_count: 5000,
    metacritic: 96,
    playtime: 60,
    genres: [{ id: 1, name: "Action", slug: "action" }],
    platforms: [{ platform: { id: 1, name: "PC", slug: "pc" } }],
    stores: [{ store: { id: 1, name: "Steam", slug: "steam" } }],
  },
  {
    id: 2,
    slug: "baldurs-gate-3",
    name: "Baldur's Gate 3",
    released: "2023-08-03",
    background_image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800&h=450&fit=crop",
    rating: 4.6,
    ratings_count: 4500,
    metacritic: 95,
    playtime: 100,
    genres: [{ id: 2, name: "RPG", slug: "role-playing-games-rpg" }],
    platforms: [{ platform: { id: 1, name: "PC", slug: "pc" } }],
    stores: [{ store: { id: 1, name: "Steam", slug: "steam" } }],
  },
  {
    id: 3,
    slug: "starfield",
    name: "Starfield",
    released: "2023-09-06",
    background_image: "https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=800&h=450&fit=crop",
    rating: 4.0,
    ratings_count: 3000,
    metacritic: 83,
    playtime: 80,
    genres: [{ id: 2, name: "RPG", slug: "role-playing-games-rpg" }],
    platforms: [{ platform: { id: 1, name: "PC", slug: "pc" } }],
    stores: [{ store: { id: 1, name: "Steam", slug: "steam" } }],
  },
  {
    id: 4,
    slug: "cyberpunk-2077",
    name: "Cyberpunk 2077",
    released: "2020-12-10",
    background_image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=450&fit=crop",
    rating: 3.8,
    ratings_count: 2500,
    metacritic: 78,
    playtime: 50,
    genres: [{ id: 1, name: "Action", slug: "action" }],
    platforms: [{ platform: { id: 1, name: "PC", slug: "pc" } }],
    stores: [{ store: { id: 1, name: "Steam", slug: "steam" } }],
  },
  {
    id: 5,
    slug: "the-legend-of-zelda-tears-of-the-kingdom",
    name: "The Legend of Zelda: Tears of the Kingdom",
    released: "2023-05-12",
    background_image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=450&fit=crop",
    rating: 4.5,
    ratings_count: 3500,
    metacritic: 96,
    playtime: 70,
    genres: [{ id: 2, name: "RPG", slug: "role-playing-games-rpg" }],
    platforms: [{ platform: { id: 2, name: "Nintendo Switch", slug: "nintendo-switch" } }],
    stores: [{ store: { id: 2, name: "Nintendo Store", slug: "nintendo" } }],
  },
  {
    id: 6,
    slug: "helldivers-2",
    name: "Helldivers 2",
    released: "2024-02-08",
    background_image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=450&fit=crop",
    rating: 4.2,
    ratings_count: 2000,
    metacritic: 84,
    playtime: 40,
    genres: [{ id: 1, name: "Action", slug: "action" }],
    platforms: [{ platform: { id: 1, name: "PC", slug: "pc" } }],
    stores: [{ store: { id: 1, name: "Steam", slug: "steam" } }],
  },
]

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
  if (!API_AVAILABLE) {
    throw new Error('API not available')
  }

  const searchParams = new URLSearchParams({
    key: RAWG_API_KEY,
    ...params,
  })

  const response = await fetch(`${BASE_URL}${endpoint}?${searchParams}`, {
    next: { revalidate: 3600 },
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
  if (!API_AVAILABLE) {
    return { count: MOCK_GAMES.length, next: null, previous: null, results: MOCK_GAMES }
  }
  
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
  if (!API_AVAILABLE) {
    return { count: MOCK_GAMES.length, next: null, previous: null, results: MOCK_GAMES.slice(0, 6) }
  }
  return fetchRawg<RawgResponse>("/games", {
    page_size: "6",
    ordering: "-rating",
    metacritic: "80,100",
  })
}

export async function getTrendingGames(): Promise<RawgResponse> {
  if (!API_AVAILABLE) {
    return { count: MOCK_GAMES.length, next: null, previous: null, results: MOCK_GAMES.slice(0, 8) }
  }
  
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
  if (!API_AVAILABLE) {
    return { count: MOCK_GAMES.length, next: null, previous: null, results: MOCK_GAMES.slice(0, 8) }
  }
  
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
  if (!API_AVAILABLE) {
    return { count: MOCK_GAMES.length, next: null, previous: null, results: MOCK_GAMES.slice(0, 6) }
  }
  
  return fetchRawg<RawgResponse>("/games", {
    page_size: "8",
    ordering: "-metacritic",
    metacritic: "85,100",
  })
}

export async function getGameBySlug(slug: string): Promise<GameDetails> {
  if (!API_AVAILABLE) {
    const game = MOCK_GAMES.find(g => g.slug === slug) || MOCK_GAMES[0]
    return {
      ...game,
      description_raw: "This is a demo game store experience. To see real game data with thousands of titles, configure your RAWG API key in the Vars section.",
      developers: [{ id: 1, name: "Demo Studio", slug: "demo-studio" }],
      publishers: [{ id: 1, name: "Demo Publisher", slug: "demo-publisher" }],
      website: "https://example.com",
    } as GameDetails
  }
  
  return fetchRawg<GameDetails>(`/games/${slug}`)
}

export async function getGameScreenshots(slug: string): Promise<{ results: { id: number; image: string }[] }> {
  if (!API_AVAILABLE) {
    return { results: [] }
  }
  
  return fetchRawg<{ results: { id: number; image: string }[] }>(`/games/${slug}/screenshots`)
}

export async function getGenres(): Promise<{ results: { id: number; name: string; slug: string; image_background: string }[] }> {
  if (!API_AVAILABLE) {
    return {
      results: [
        { id: 1, name: "Action", slug: "action", image_background: "" },
        { id: 2, name: "RPG", slug: "role-playing-games-rpg", image_background: "" },
        { id: 3, name: "Adventure", slug: "adventure", image_background: "" },
      ],
    }
  }
  
  return fetchRawg("/genres", { page_size: "20" })
}

export async function searchGames(query: string): Promise<RawgResponse> {
  if (!API_AVAILABLE) {
    const results = MOCK_GAMES.filter(g => 
      g.name.toLowerCase().includes(query.toLowerCase()) ||
      g.genres.some(g => g.name.toLowerCase().includes(query.toLowerCase()))
    )
    return { count: results.length, next: null, previous: null, results }
  }
  
  return fetchRawg<RawgResponse>("/games", {
    search: query,
    page_size: "20",
  })
}
