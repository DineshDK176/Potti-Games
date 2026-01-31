"use client"

import { useState, useMemo } from "react"
import { useSearchParams } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { GameCard } from "@/components/game-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, SlidersHorizontal, X } from "lucide-react"
import { games, genres } from "@/lib/data"

const priceRanges = [
  { value: "all", label: "All Prices" },
  { value: "free", label: "Free" },
  { value: "under20", label: "Under $20" },
  { value: "under40", label: "Under $40" },
  { value: "above40", label: "$40+" },
]

const sortOptions = [
  { value: "popular", label: "Most Popular" },
  { value: "rating", label: "Highest Rated" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "newest", label: "Newest" },
]

export default function GamesPage() {
  const searchParams = useSearchParams()
  const initialFilter = searchParams.get("filter") || ""

  const [searchQuery, setSearchQuery] = useState("")
  const [selectedGenre, setSelectedGenre] = useState("All")
  const [priceRange, setPriceRange] = useState(
    initialFilter === "free" ? "free" : "all"
  )
  const [sortBy, setSortBy] = useState("popular")
  const [showFilters, setShowFilters] = useState(false)

  const filteredGames = useMemo(() => {
    let result = [...games]

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (game) =>
          game.title.toLowerCase().includes(query) ||
          game.genre.some((g) => g.toLowerCase().includes(query)) ||
          game.developer.toLowerCase().includes(query)
      )
    }

    // Genre filter
    if (selectedGenre && selectedGenre !== "All") {
      result = result.filter((game) => game.genre.includes(selectedGenre))
    }

    // Price filter
    if (priceRange !== "all") {
      switch (priceRange) {
        case "free":
          result = result.filter((game) => game.isFree)
          break
        case "under20":
          result = result.filter((game) => !game.isFree && game.price < 20)
          break
        case "under40":
          result = result.filter((game) => !game.isFree && game.price < 40)
          break
        case "above40":
          result = result.filter((game) => game.price >= 40)
          break
      }
    }

    // Featured filter
    if (initialFilter === "featured") {
      result = result.filter((game) => game.isFeatured)
    }

    // Sorting
    switch (sortBy) {
      case "rating":
        result.sort((a, b) => b.rating - a.rating)
        break
      case "price-low":
        result.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        result.sort((a, b) => b.price - a.price)
        break
      case "newest":
        result.sort(
          (a, b) =>
            new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
        )
        break
      default:
        // Popular - use rating * (isFeatured ? 1.5 : 1)
        result.sort((a, b) => {
          const aScore = a.rating * (a.isFeatured ? 1.5 : 1) * (a.isTrending ? 1.3 : 1)
          const bScore = b.rating * (b.isFeatured ? 1.5 : 1) * (b.isTrending ? 1.3 : 1)
          return bScore - aScore
        })
    }

    return result
  }, [searchQuery, selectedGenre, priceRange, sortBy, initialFilter])

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedGenre("All")
    setPriceRange("all")
    setSortBy("popular")
  }

  const hasActiveFilters =
    searchQuery || selectedGenre !== "All" || priceRange !== "all"

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
              Browse Games
            </h1>
            <p className="mt-2 text-muted-foreground">
              Discover your next favorite game from our collection
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mb-8 space-y-4">
            {/* Search Bar */}
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search games, genres, developers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-12 rounded-xl pl-10"
                />
              </div>
              <Button
                variant="outline"
                className="h-12 gap-2 rounded-xl px-4 md:hidden bg-transparent"
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal className="h-5 w-5" />
                Filters
              </Button>
            </div>

            {/* Desktop Filters */}
            <div className="hidden flex-wrap items-center gap-3 md:flex">
              <Select value={selectedGenre} onValueChange={setSelectedGenre}>
                <SelectTrigger className="w-40 rounded-xl">
                  <SelectValue placeholder="Genre" />
                </SelectTrigger>
                <SelectContent>
                  {genres.map((genre) => (
                    <SelectItem key={genre} value={genre}>
                      {genre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={priceRange} onValueChange={setPriceRange}>
                <SelectTrigger className="w-40 rounded-xl">
                  <SelectValue placeholder="Price" />
                </SelectTrigger>
                <SelectContent>
                  {priceRanges.map((range) => (
                    <SelectItem key={range.value} value={range.value}>
                      {range.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48 rounded-xl">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="gap-1 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                  Clear filters
                </Button>
              )}
            </div>

            {/* Mobile Filters */}
            {showFilters && (
              <div className="flex flex-col gap-3 rounded-xl border border-border bg-card p-4 md:hidden">
                <Select value={selectedGenre} onValueChange={setSelectedGenre}>
                  <SelectTrigger className="rounded-xl">
                    <SelectValue placeholder="Genre" />
                  </SelectTrigger>
                  <SelectContent>
                    {genres.map((genre) => (
                      <SelectItem key={genre} value={genre}>
                        {genre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={priceRange} onValueChange={setPriceRange}>
                  <SelectTrigger className="rounded-xl">
                    <SelectValue placeholder="Price" />
                  </SelectTrigger>
                  <SelectContent>
                    {priceRanges.map((range) => (
                      <SelectItem key={range.value} value={range.value}>
                        {range.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="rounded-xl">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {hasActiveFilters && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearFilters}
                    className="rounded-xl bg-transparent"
                  >
                    Clear all filters
                  </Button>
                )}
              </div>
            )}
          </div>

          {/* Active Filters Display */}
          {hasActiveFilters && (
            <div className="mb-6 flex flex-wrap items-center gap-2">
              <span className="text-sm text-muted-foreground">Active filters:</span>
              {searchQuery && (
                <Badge
                  variant="secondary"
                  className="cursor-pointer gap-1 rounded-full"
                  onClick={() => setSearchQuery("")}
                >
                  Search: {searchQuery}
                  <X className="h-3 w-3" />
                </Badge>
              )}
              {selectedGenre !== "All" && (
                <Badge
                  variant="secondary"
                  className="cursor-pointer gap-1 rounded-full"
                  onClick={() => setSelectedGenre("All")}
                >
                  {selectedGenre}
                  <X className="h-3 w-3" />
                </Badge>
              )}
              {priceRange !== "all" && (
                <Badge
                  variant="secondary"
                  className="cursor-pointer gap-1 rounded-full"
                  onClick={() => setPriceRange("all")}
                >
                  {priceRanges.find((r) => r.value === priceRange)?.label}
                  <X className="h-3 w-3" />
                </Badge>
              )}
            </div>
          )}

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-sm text-muted-foreground">
              Showing {filteredGames.length} game
              {filteredGames.length !== 1 ? "s" : ""}
            </p>
          </div>

          {/* Games Grid */}
          {filteredGames.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredGames.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="rounded-full bg-muted p-4">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-foreground">
                No games found
              </h3>
              <p className="mt-2 text-muted-foreground">
                Try adjusting your search or filter criteria
              </p>
              <Button
                variant="outline"
                className="mt-4 rounded-xl bg-transparent"
                onClick={clearFilters}
              >
                Clear all filters
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
