"use client"

import React from "react"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Search, Heart, Star, ChevronLeft, ChevronRight } from "lucide-react"
import { useCart, useWishlist } from "@/hooks/use-store"
import { RawgGame, generatePrice, generateOriginalPrice } from "@/lib/rawg"
import { cn } from "@/lib/utils"

interface BrowseContentProps {
  initialGames: RawgGame[]
  genres: { id: number; name: string; slug: string }[]
  totalCount: number
  currentPage: number
  hasNextPage: boolean
}

const sortOptions = [
  { value: "-rating", label: "Top Rated" },
  { value: "-released", label: "Newest" },
  { value: "-added", label: "Most Popular" },
  { value: "-metacritic", label: "Best Metacritic" },
  { value: "name", label: "A-Z" },
]

export function BrowseContent({ 
  initialGames, 
  genres, 
  totalCount, 
  currentPage, 
  hasNextPage 
}: BrowseContentProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "")

  const currentGenre = searchParams.get("genres") || ""
  const currentOrdering = searchParams.get("ordering") || "-rating"

  const updateFilters = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value && value !== "all") {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    params.delete("page")
    router.push(`/games?${params.toString()}`)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    updateFilters("search", searchQuery)
  }

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("page", String(page))
    router.push(`/games?${params.toString()}`)
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Browse Games</h1>
        <p className="mt-1 text-sm text-[#666]">
          {totalCount.toLocaleString()} games available
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Search */}
        <form onSubmit={handleSearch} className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#666]" />
            <Input
              type="text"
              placeholder="Search games..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-10 rounded bg-[#2a2a2a] border-[#333] pl-10 text-white placeholder:text-[#666] focus:border-[#0074e4]"
            />
          </div>
        </form>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <Select value={currentGenre || "all"} onValueChange={(v) => updateFilters("genres", v)}>
            <SelectTrigger className="w-40 rounded bg-[#2a2a2a] border-[#333] text-white">
              <SelectValue placeholder="All Genres" />
            </SelectTrigger>
            <SelectContent className="bg-[#1a1a1a] border-[#333]">
              <SelectItem value="all" className="text-white">All Genres</SelectItem>
              {genres.map((genre) => (
                <SelectItem key={genre.id} value={genre.slug} className="text-white">
                  {genre.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={currentOrdering} onValueChange={(v) => updateFilters("ordering", v)}>
            <SelectTrigger className="w-44 rounded bg-[#2a2a2a] border-[#333] text-white">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent className="bg-[#1a1a1a] border-[#333]">
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value} className="text-white">
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Games Grid */}
      {initialGames.length > 0 ? (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
            {initialGames.map((game) => (
              <GameBrowseCard key={game.id} game={game} />
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-12 flex items-center justify-center gap-4">
            <Button
              variant="outline"
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="rounded bg-transparent border-[#333] text-white hover:bg-[#2a2a2a] disabled:opacity-50"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>
            <span className="text-sm text-[#a0a0a0]">
              Page {currentPage}
            </span>
            <Button
              variant="outline"
              onClick={() => goToPage(currentPage + 1)}
              disabled={!hasNextPage}
              className="rounded bg-transparent border-[#333] text-white hover:bg-[#2a2a2a] disabled:opacity-50"
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="rounded-full bg-[#2a2a2a] p-4">
            <Search className="h-8 w-8 text-[#666]" />
          </div>
          <h3 className="mt-4 text-lg font-semibold text-white">No games found</h3>
          <p className="mt-2 text-[#a0a0a0]">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  )
}

function GameBrowseCard({ game }: { game: RawgGame }) {
  const { addToCart } = useCart()
  const { isInWishlist, toggleWishlist } = useWishlist()
  const inWishlist = isInWishlist(String(game.id))

  const price = generatePrice(game)
  const originalPrice = generateOriginalPrice(game)
  const discountPercent = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0

  const handleAddToCart = () => {
    addToCart({
      id: String(game.id),
      title: game.name,
      slug: game.slug,
      coverImage: game.background_image,
      screenshots: game.short_screenshots?.map(s => s.image) || [],
      description: "",
      price,
      originalPrice: originalPrice || undefined,
      rating: game.rating,
      genre: game.genres?.map(g => g.name) || [],
      developer: game.developers?.[0]?.name || "Unknown",
      publisher: game.publishers?.[0]?.name || "Unknown",
      releaseDate: game.released || "",
      isFeatured: false,
      isTrending: false,
      isFree: price === 0,
      platforms: game.platforms?.map(p => p.platform.name) || [],
    })
  }

  return (
    <div className="group">
      <Link href={`/games/${game.slug}`}>
        <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-[#2a2a2a]">
          {game.background_image ? (
            <Image
              src={game.background_image || "/placeholder.svg"}
              alt={game.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-[#666]">No Image</div>
          )}
          
          {discountPercent > 0 && (
            <div className="absolute left-2 top-2 rounded bg-[#0074e4] px-2 py-0.5 text-xs font-bold text-white">
              -{discountPercent}%
            </div>
          )}

          <button
            onClick={(e) => {
              e.preventDefault()
              toggleWishlist(String(game.id))
            }}
            className="absolute right-2 top-2 rounded-full bg-black/50 p-1.5 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-black/70"
          >
            <Heart
              className={cn(
                "h-4 w-4 transition-colors",
                inWishlist ? "fill-[#0074e4] text-[#0074e4]" : "text-white"
              )}
            />
          </button>

          <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100">
            <Button
              onClick={(e) => {
                e.preventDefault()
                handleAddToCart()
              }}
              className="m-2 w-full bg-[#0074e4] text-white hover:bg-[#0066cc] rounded text-xs h-8"
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </Link>

      <div className="mt-2">
        <Link href={`/games/${game.slug}`}>
          <h3 className="text-sm font-medium text-white truncate hover:text-[#0074e4] transition-colors">
            {game.name}
          </h3>
        </Link>
        <div className="mt-1 flex items-center gap-2">
          {game.genres?.[0] && (
            <span className="text-xs text-[#666]">{game.genres[0].name}</span>
          )}
          {game.rating > 0 && (
            <div className="flex items-center gap-0.5">
              <Star className="h-3 w-3 fill-[#f59e0b] text-[#f59e0b]" />
              <span className="text-xs text-[#a0a0a0]">{game.rating.toFixed(1)}</span>
            </div>
          )}
        </div>
        <div className="mt-1 flex items-center gap-2">
          {price === 0 ? (
            <span className="text-sm font-medium text-[#10b981]">Free</span>
          ) : (
            <>
              <span className="text-sm font-medium text-white">${price.toFixed(2)}</span>
              {originalPrice && (
                <span className="text-xs text-[#666] line-through">${originalPrice.toFixed(2)}</span>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
