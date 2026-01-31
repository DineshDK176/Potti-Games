"use client"

import { useState, useEffect } from "react"
import type { Game } from "@/lib/types"

interface GameUpdate {
  id: string
  price?: number
  originalPrice?: number
  discountEndsAt?: string
  isFree?: boolean
}

export function useRealtimeGames(initialGames: Game[]) {
  const [games, setGames] = useState<Game[]>(initialGames)
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())

  useEffect(() => {
    // Simulate real-time price updates (like Epic Games sales)
    const interval = setInterval(() => {
      setGames(currentGames => {
        const updates: GameUpdate[] = []
        
        // Randomly update prices for some games (10% chance per game)
        currentGames.forEach(game => {
          if (Math.random() < 0.1 && !game.isFree) {
            const hasDiscount = Math.random() < 0.6
            
            if (hasDiscount && !game.originalPrice) {
              // Add new discount
              const discountPercent = [0.15, 0.25, 0.30, 0.40, 0.50][Math.floor(Math.random() * 5)]
              const newPrice = Math.round(game.price * (1 - discountPercent) * 100) / 100
              const discountEndsAt = new Date(Date.now() + Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString()
              
              updates.push({
                id: game.id,
                price: newPrice,
                originalPrice: game.price,
                discountEndsAt,
              })
            } else if (!hasDiscount && game.originalPrice) {
              // Remove discount
              updates.push({
                id: game.id,
                price: game.originalPrice,
                originalPrice: undefined,
                discountEndsAt: undefined,
              })
            }
          }
        })
        
        if (updates.length > 0) {
          console.log(`[v0] Real-time update: ${updates.length} game(s) price changed`)
          setLastUpdate(new Date())
          
          return currentGames.map(game => {
            const update = updates.find(u => u.id === game.id)
            if (update) {
              return { ...game, ...update }
            }
            return game
          })
        }
        
        return currentGames
      })
    }, 30000) // Check for updates every 30 seconds

    return () => clearInterval(interval)
  }, [])

  return { games, lastUpdate }
}

// Hook for countdown timer to discount end
export function useDiscountCountdown(discountEndsAt?: string) {
  const [timeLeft, setTimeLeft] = useState<string>("")

  useEffect(() => {
    if (!discountEndsAt) {
      setTimeLeft("")
      return
    }

    const calculateTimeLeft = () => {
      const difference = new Date(discountEndsAt).getTime() - new Date().getTime()
      
      if (difference <= 0) {
        setTimeLeft("Sale ended")
        return
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24)
      const minutes = Math.floor((difference / 1000 / 60) % 60)

      if (days > 0) {
        setTimeLeft(`${days}d ${hours}h left`)
      } else if (hours > 0) {
        setTimeLeft(`${hours}h ${minutes}m left`)
      } else {
        setTimeLeft(`${minutes}m left`)
      }
    }

    calculateTimeLeft()
    const interval = setInterval(calculateTimeLeft, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [discountEndsAt])

  return timeLeft
}
