export interface Game {
  id: string
  title: string
  slug: string
  coverImage: string
  screenshots: string[]
  description: string
  price: number
  originalPrice?: number
  rating: number
  genre: string[]
  developer: string
  publisher: string
  releaseDate: string
  isFeatured: boolean
  isTrending: boolean
  isFree: boolean
  platforms: string[]
  discountEndsAt?: string
  metacritic?: number
}

export interface CartItem {
  game: Game
  quantity: number
}

export interface User {
  id: string
  name: string
  email: string
  avatar: string
  memberSince: string
  gamesOwned: number
  achievements: number
  level: number
}
