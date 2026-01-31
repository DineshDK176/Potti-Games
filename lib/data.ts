import { Game, User } from "./types"

export const games: Game[] = [
  {
    id: "1",
    title: "Cosmic Odyssey",
    slug: "cosmic-odyssey",
    coverImage: "https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=600&h=400&fit=crop",
    screenshots: [
      "https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=1200&h=675&fit=crop",
      "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1200&h=675&fit=crop",
      "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1200&h=675&fit=crop",
    ],
    description: "Embark on an epic journey through the cosmos in this stunning space exploration game. Discover new planets, encounter alien civilizations, and uncover the mysteries of the universe. With breathtaking visuals and an immersive storyline, Cosmic Odyssey will take you on an unforgettable adventure across the stars.",
    price: 49.99,
    originalPrice: 59.99,
    rating: 4.8,
    genre: ["Adventure", "Sci-Fi", "Open World"],
    developer: "Stellar Games",
    publisher: "Galaxy Entertainment",
    releaseDate: "2025-03-15",
    isFeatured: true,
    isTrending: true,
    isFree: false,
    platforms: ["PC", "PlayStation", "Xbox"],
    discountEndsAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    metacritic: 94,
  },
  {
    id: "2",
    title: "Dragon's Fury",
    slug: "dragons-fury",
    coverImage: "https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?w=600&h=400&fit=crop",
    screenshots: [
      "https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?w=1200&h=675&fit=crop",
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200&h=675&fit=crop",
    ],
    description: "Enter a world of magic and dragons in this action-packed RPG. Battle fierce creatures, master powerful spells, and forge your destiny as the chosen hero. With deep character customization and an expansive open world, Dragon's Fury offers hundreds of hours of thrilling gameplay.",
    price: 39.99,
    rating: 4.6,
    genre: ["RPG", "Fantasy", "Action"],
    developer: "Mythic Studios",
    publisher: "Legend Interactive",
    releaseDate: "2024-11-20",
    isFeatured: true,
    isTrending: true,
    isFree: false,
    platforms: ["PC", "PlayStation", "Xbox", "Switch"],
  },
  {
    id: "3",
    title: "Speed Racers X",
    slug: "speed-racers-x",
    coverImage: "https://images.unsplash.com/photo-1511882150382-421056c89033?w=600&h=400&fit=crop",
    screenshots: [
      "https://images.unsplash.com/photo-1511882150382-421056c89033?w=1200&h=675&fit=crop",
      "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=1200&h=675&fit=crop",
    ],
    description: "Feel the adrenaline rush in the most realistic racing simulation ever created. With over 200 licensed vehicles and 50 real-world tracks, Speed Racers X delivers unparalleled racing excitement. Compete online, build your dream garage, and become the ultimate champion.",
    price: 59.99,
    rating: 4.5,
    genre: ["Racing", "Sports", "Simulation"],
    developer: "Turbo Games",
    publisher: "Racing World Inc",
    releaseDate: "2025-01-10",
    isFeatured: true,
    isTrending: false,
    isFree: false,
    platforms: ["PC", "PlayStation", "Xbox"],
  },
  {
    id: "4",
    title: "Puzzle Kingdom",
    slug: "puzzle-kingdom",
    coverImage: "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=600&h=400&fit=crop",
    screenshots: [
      "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=1200&h=675&fit=crop",
    ],
    description: "Challenge your mind with over 1000 unique puzzles in this enchanting puzzle adventure. Explore magical kingdoms, solve intricate mysteries, and unlock hidden treasures. Perfect for puzzle enthusiasts of all ages!",
    price: 0,
    rating: 4.4,
    genre: ["Puzzle", "Casual", "Family"],
    developer: "Brain Games Co",
    publisher: "Fun Factory",
    releaseDate: "2024-08-05",
    isFeatured: false,
    isTrending: true,
    isFree: true,
    platforms: ["PC", "Mobile", "Switch"],
  },
  {
    id: "5",
    title: "Shadow Warrior: Legends",
    slug: "shadow-warrior-legends",
    coverImage: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&h=400&fit=crop",
    screenshots: [
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&h=675&fit=crop",
      "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=1200&h=675&fit=crop",
    ],
    description: "Master the art of stealth and combat in this ninja action game. Navigate through beautifully crafted Japanese landscapes, defeat powerful enemies, and uncover an ancient conspiracy. With fluid combat mechanics and stunning visuals, become the ultimate shadow warrior.",
    price: 34.99,
    originalPrice: 44.99,
    rating: 4.7,
    genre: ["Action", "Adventure", "Stealth"],
    developer: "Ninja Arts Studio",
    publisher: "Eastern Games",
    releaseDate: "2024-09-30",
    isFeatured: false,
    isTrending: true,
    isFree: false,
    platforms: ["PC", "PlayStation", "Xbox"],
    discountEndsAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    metacritic: 88,
  },
  {
    id: "6",
    title: "Farm Life Simulator",
    slug: "farm-life-simulator",
    coverImage: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&h=400&fit=crop",
    screenshots: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&h=675&fit=crop",
    ],
    description: "Build your dream farm from the ground up! Plant crops, raise animals, and create a thriving agricultural empire. With seasonal events, multiplayer co-op, and endless customization options, Farm Life Simulator is the ultimate farming experience.",
    price: 0,
    rating: 4.3,
    genre: ["Simulation", "Casual", "Strategy"],
    developer: "Harvest Games",
    publisher: "Country Living Studios",
    releaseDate: "2024-06-15",
    isFeatured: false,
    isTrending: false,
    isFree: true,
    platforms: ["PC", "Mobile"],
  },
  {
    id: "7",
    title: "Battle Royale Legends",
    slug: "battle-royale-legends",
    coverImage: "https://images.unsplash.com/photo-1552820728-8b83bb6b2b0d?w=600&h=400&fit=crop",
    screenshots: [
      "https://images.unsplash.com/photo-1552820728-8b83bb6b2b0d?w=1200&h=675&fit=crop",
    ],
    description: "Drop into intense 100-player battles and fight to be the last one standing. With unique characters, powerful abilities, and ever-changing maps, every match is a new adventure. Team up with friends or go solo in this free-to-play battle royale sensation.",
    price: 0,
    rating: 4.5,
    genre: ["Shooter", "Battle Royale", "Multiplayer"],
    developer: "Victory Games",
    publisher: "Arena Entertainment",
    releaseDate: "2024-02-28",
    isFeatured: true,
    isTrending: true,
    isFree: true,
    platforms: ["PC", "PlayStation", "Xbox", "Mobile"],
  },
  {
    id: "8",
    title: "Medieval Conquest",
    slug: "medieval-conquest",
    coverImage: "https://images.unsplash.com/photo-1519074069444-1ba4fff66d16?w=600&h=400&fit=crop",
    screenshots: [
      "https://images.unsplash.com/photo-1519074069444-1ba4fff66d16?w=1200&h=675&fit=crop",
    ],
    description: "Command vast armies and conquer kingdoms in this epic strategy game. Build your empire, forge alliances, and wage war across a beautifully detailed medieval world. With deep strategic gameplay and massive battles, Medieval Conquest is a must-play for strategy fans.",
    price: 44.99,
    rating: 4.6,
    genre: ["Strategy", "War", "Historical"],
    developer: "Empire Studios",
    publisher: "Kingdom Games",
    releaseDate: "2025-02-01",
    isFeatured: false,
    isTrending: true,
    isFree: false,
    platforms: ["PC"],
  },
  {
    id: "9",
    title: "Neon City Nights",
    slug: "neon-city-nights",
    coverImage: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=600&h=400&fit=crop",
    screenshots: [
      "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=1200&h=675&fit=crop",
    ],
    description: "Dive into a cyberpunk metropolis where neon lights hide dark secrets. As a rogue hacker, uncover corporate conspiracies and fight for freedom in this story-driven action RPG. With stunning visuals and meaningful choices, your decisions shape the fate of the city.",
    price: 54.99,
    rating: 4.9,
    genre: ["RPG", "Cyberpunk", "Action"],
    developer: "Future Vision Games",
    publisher: "Digital Dreams",
    releaseDate: "2025-04-20",
    isFeatured: true,
    isTrending: false,
    isFree: false,
    platforms: ["PC", "PlayStation", "Xbox"],
  },
  {
    id: "10",
    title: "Ocean Explorer",
    slug: "ocean-explorer",
    coverImage: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=600&h=400&fit=crop",
    screenshots: [
      "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=1200&h=675&fit=crop",
    ],
    description: "Discover the wonders of the deep sea in this relaxing exploration game. Swim with exotic marine life, uncover ancient shipwrecks, and photograph stunning underwater landscapes. A peaceful journey into the ocean's mysteries.",
    price: 19.99,
    rating: 4.2,
    genre: ["Adventure", "Exploration", "Casual"],
    developer: "Deep Blue Studios",
    publisher: "Aquatic Games",
    releaseDate: "2024-07-12",
    isFeatured: false,
    isTrending: false,
    isFree: false,
    platforms: ["PC", "Switch"],
  },
  {
    id: "11",
    title: "Zombie Outbreak",
    slug: "zombie-outbreak",
    coverImage: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&h=400&fit=crop",
    screenshots: [
      "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1200&h=675&fit=crop",
    ],
    description: "Survive the apocalypse in this intense zombie survival game. Scavenge for resources, build fortifications, and fight off hordes of the undead. With co-op multiplayer and procedurally generated worlds, no two playthroughs are the same.",
    price: 29.99,
    rating: 4.4,
    genre: ["Horror", "Survival", "Co-op"],
    developer: "Undead Games",
    publisher: "Horror Entertainment",
    releaseDate: "2024-10-31",
    isFeatured: false,
    isTrending: false,
    isFree: false,
    platforms: ["PC", "PlayStation", "Xbox"],
  },
  {
    id: "12",
    title: "Rhythm Dance Party",
    slug: "rhythm-dance-party",
    coverImage: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop",
    screenshots: [
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&h=675&fit=crop",
    ],
    description: "Get your groove on with the hottest rhythm game around! Dance to chart-topping hits, compete in online tournaments, and unlock fabulous outfits. With easy-to-learn controls and addictive gameplay, everyone can join the party!",
    price: 0,
    rating: 4.1,
    genre: ["Music", "Rhythm", "Party"],
    developer: "Beat Studios",
    publisher: "Music Games Inc",
    releaseDate: "2024-05-20",
    isFeatured: false,
    isTrending: false,
    isFree: true,
    platforms: ["PC", "Mobile", "Switch"],
  },
]

export const mockUser: User = {
  id: "user-1",
  name: "Alex Gamer",
  email: "alex@gamestore.com",
  avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop",
  memberSince: "2023-01-15",
  gamesOwned: 47,
  achievements: 234,
  level: 42,
}

export const genres = [
  "All",
  "Action",
  "Adventure",
  "RPG",
  "Strategy",
  "Simulation",
  "Sports",
  "Racing",
  "Puzzle",
  "Horror",
  "Multiplayer",
]

export function getGameBySlug(slug: string): Game | undefined {
  return games.find((game) => game.slug === slug)
}

export function getFeaturedGames(): Game[] {
  return games.filter((game) => game.isFeatured)
}

export function getTrendingGames(): Game[] {
  return games.filter((game) => game.isTrending)
}

export function getFreeGames(): Game[] {
  return games.filter((game) => game.isFree)
}

export function getPaidGames(): Game[] {
  return games.filter((game) => !game.isFree)
}

export function searchGames(query: string): Game[] {
  const lowercaseQuery = query.toLowerCase()
  return games.filter(
    (game) =>
      game.title.toLowerCase().includes(lowercaseQuery) ||
      game.genre.some((g) => g.toLowerCase().includes(lowercaseQuery)) ||
      game.developer.toLowerCase().includes(lowercaseQuery)
  )
}

export function filterGames(filters: {
  genre?: string
  priceRange?: "free" | "under20" | "under40" | "above40" | "all"
  minRating?: number
}): Game[] {
  return games.filter((game) => {
    if (filters.genre && filters.genre !== "All") {
      if (!game.genre.includes(filters.genre)) return false
    }
    if (filters.priceRange) {
      switch (filters.priceRange) {
        case "free":
          if (!game.isFree) return false
          break
        case "under20":
          if (game.price >= 20 || game.isFree) return false
          break
        case "under40":
          if (game.price >= 40 || game.isFree) return false
          break
        case "above40":
          if (game.price < 40) return false
          break
      }
    }
    if (filters.minRating && game.rating < filters.minRating) return false
    return true
  })
}
