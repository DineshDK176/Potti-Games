"use client"

import useSWR from "swr"
import { CartItem, Game } from "@/lib/types"

const CART_KEY = "game-store-cart"
const WISHLIST_KEY = "game-store-wishlist"

function getStoredCart(): CartItem[] {
  if (typeof window === "undefined") return []
  const stored = localStorage.getItem(CART_KEY)
  return stored ? JSON.parse(stored) : []
}

function getStoredWishlist(): string[] {
  if (typeof window === "undefined") return []
  const stored = localStorage.getItem(WISHLIST_KEY)
  return stored ? JSON.parse(stored) : []
}

export function useCart() {
  const { data: cart = [], mutate } = useSWR<CartItem[]>("cart", getStoredCart, {
    fallbackData: [],
  })

  const addToCart = (game: Game) => {
    const existingItem = cart.find((item) => item.game.id === game.id)
    let newCart: CartItem[]

    if (existingItem) {
      newCart = cart.map((item) =>
        item.game.id === game.id ? { ...item, quantity: item.quantity + 1 } : item
      )
    } else {
      newCart = [...cart, { game, quantity: 1 }]
    }

    localStorage.setItem(CART_KEY, JSON.stringify(newCart))
    mutate(newCart)
  }

  const removeFromCart = (gameId: string) => {
    const newCart = cart.filter((item) => item.game.id !== gameId)
    localStorage.setItem(CART_KEY, JSON.stringify(newCart))
    mutate(newCart)
  }

  const updateQuantity = (gameId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(gameId)
      return
    }

    const newCart = cart.map((item) =>
      item.game.id === gameId ? { ...item, quantity } : item
    )
    localStorage.setItem(CART_KEY, JSON.stringify(newCart))
    mutate(newCart)
  }

  const clearCart = () => {
    localStorage.setItem(CART_KEY, JSON.stringify([]))
    mutate([])
  }

  const cartTotal = cart.reduce((total, item) => total + item.game.price * item.quantity, 0)
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0)

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    cartCount,
  }
}

export function useWishlist() {
  const { data: wishlist = [], mutate } = useSWR<string[]>("wishlist", getStoredWishlist, {
    fallbackData: [],
  })

  const addToWishlist = (gameId: string) => {
    if (wishlist.includes(gameId)) return
    const newWishlist = [...wishlist, gameId]
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(newWishlist))
    mutate(newWishlist)
  }

  const removeFromWishlist = (gameId: string) => {
    const newWishlist = wishlist.filter((id) => id !== gameId)
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(newWishlist))
    mutate(newWishlist)
  }

  const toggleWishlist = (gameId: string) => {
    if (wishlist.includes(gameId)) {
      removeFromWishlist(gameId)
    } else {
      addToWishlist(gameId)
    }
  }

  const isInWishlist = (gameId: string) => wishlist.includes(gameId)

  return {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    isInWishlist,
  }
}
