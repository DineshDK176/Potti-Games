import type { Game } from "./types"
import type { RawgGame } from "./rawg"
import { RawgGameWithPrice } from "./rawg"

// Convert RAWG game to our Game type
export function convertRawgToGame(rawgGame: RawgGame | RawgGameWithPrice): Game {
  const price = 'price' in rawgGame ? rawgGame.price : generatePrice(rawgGame)
  const originalPrice = 'originalPrice' in rawgGame ? rawgGame.originalPrice : generateOriginalPrice(rawgGame)
  const isFree = 'isFree' in rawgGame ? rawgGame.isFree : price === 0
  const discountEndsAt = 'discountEndsAt' in rawgGame ? rawgGame.discountEndsAt : undefined

  return {
    id: String(rawgGame.id),
    title: rawgGame.name,
    slug: rawgGame.slug,
    coverImage: rawgGame.background_image || "/placeholder.svg",
    screenshots: rawgGame.short_screenshots?.map(s => s.image) || [],
    description: rawgGame.description_raw || `${rawgGame.name} is an exciting game.`,
    price,
    originalPrice,
    rating: rawgGame.rating,
    genre: rawgGame.genres.map(g => g.name),
    developer: rawgGame.developers?.[0]?.name || "Unknown Developer",
    publisher: rawgGame.publishers?.[0]?.name || "Unknown Publisher",
    releaseDate: rawgGame.released,
    isFeatured: (rawgGame.metacritic || 0) >= 85,
    isTrending: rawgGame.ratings_count > 1000,
    isFree,
    platforms: rawgGame.platforms.map(p => p.platform.name),
    discountEndsAt,
    metacritic: rawgGame.metacritic || undefined,
  }
}

// Generate price based on game attributes (for API games without pricing)
function generatePrice(game: RawgGame): number {
  if (!game.metacritic && game.rating < 3) return 0
  if (game.metacritic && game.metacritic >= 90) return 59.99
  if (game.metacritic && game.metacritic >= 85) return 49.99
  if (game.metacritic && game.metacritic >= 75) return 39.99
  if (game.metacritic && game.metacritic >= 60) return 29.99
  if (game.rating >= 4) return 24.99
  if (game.rating >= 3) return 19.99
  return 9.99
}

// Generate original price for discount (30% chance of discount)
function generateOriginalPrice(game: RawgGame): number | undefined {
  const price = generatePrice(game)
  if (price === 0) return undefined
  
  // Use game ID to determine if it has a discount (deterministic)
  if (game.id % 3 === 0) {
    const discountPercent = [0.15, 0.25, 0.30, 0.40, 0.50][game.id % 5]
    return Math.round(price / (1 - discountPercent) * 100) / 100
  }
  
  return undefined
}
