"use client"

import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useCart } from "@/hooks/use-store"
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight, ShoppingBag } from "lucide-react"

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart()

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
              <ShoppingCart className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
                Shopping Cart
              </h1>
              <p className="text-muted-foreground">
                {cart.length} {cart.length === 1 ? "item" : "items"} in your cart
              </p>
            </div>
          </div>

          {cart.length === 0 ? (
            <Card className="border-0 bg-card shadow-md">
              <CardContent className="flex flex-col items-center justify-center py-16">
                <div className="rounded-full bg-muted p-6">
                  <ShoppingBag className="h-12 w-12 text-muted-foreground" />
                </div>
                <h2 className="mt-6 text-xl font-semibold text-foreground">
                  Your cart is empty
                </h2>
                <p className="mt-2 text-center text-muted-foreground">
                  Looks like you have not added any games yet.
                  <br />
                  Start browsing to find your next favorite!
                </p>
                <Link href="/games">
                  <Button className="mt-6 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90">
                    Browse Games
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Cart Items */}
              <div className="space-y-4 lg:col-span-2">
                {cart.map((item) => (
                  <Card
                    key={item.game.id}
                    className="overflow-hidden border-0 bg-card shadow-md"
                  >
                    <CardContent className="p-0">
                      <div className="flex flex-col sm:flex-row">
                        {/* Image */}
                        <Link
                          href={`/games/${item.game.slug}`}
                          className="relative h-32 w-full shrink-0 sm:h-auto sm:w-40"
                        >
                          <Image
                            src={item.game.coverImage || "/placeholder.svg"}
                            alt={item.game.title}
                            fill
                            className="object-cover"
                          />
                        </Link>

                        {/* Details */}
                        <div className="flex flex-1 flex-col justify-between p-4">
                          <div>
                            <Link href={`/games/${item.game.slug}`}>
                              <h3 className="font-semibold text-foreground transition-colors hover:text-primary">
                                {item.game.title}
                              </h3>
                            </Link>
                            <p className="mt-1 text-sm text-muted-foreground">
                              {item.game.genre.join(", ")}
                            </p>
                          </div>

                          <div className="mt-4 flex items-center justify-between">
                            {/* Quantity Controls */}
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 rounded-lg bg-transparent"
                                onClick={() =>
                                  updateQuantity(item.game.id, item.quantity - 1)
                                }
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <span className="w-8 text-center font-medium text-foreground">
                                {item.quantity}
                              </span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 rounded-lg bg-transparent"
                                onClick={() =>
                                  updateQuantity(item.game.id, item.quantity + 1)
                                }
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>

                            {/* Price & Remove */}
                            <div className="flex items-center gap-4">
                              {item.game.isFree ? (
                                <span className="font-bold text-secondary">Free</span>
                              ) : (
                                <span className="font-bold text-foreground">
                                  ${(item.game.price * item.quantity).toFixed(2)}
                                </span>
                              )}
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-muted-foreground hover:text-destructive"
                                onClick={() => removeFromCart(item.game.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {/* Clear Cart */}
                <div className="flex justify-end">
                  <Button
                    variant="ghost"
                    className="text-muted-foreground hover:text-destructive"
                    onClick={clearCart}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Clear Cart
                  </Button>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <Card className="sticky top-24 border-0 bg-card shadow-lg">
                  <CardContent className="p-6">
                    <h2 className="text-lg font-bold text-foreground">Order Summary</h2>

                    <div className="mt-6 space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span className="text-foreground">${cartTotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Tax</span>
                        <span className="text-foreground">
                          ${(cartTotal * 0.1).toFixed(2)}
                        </span>
                      </div>
                      <div className="h-px bg-border" />
                      <div className="flex justify-between">
                        <span className="font-semibold text-foreground">Total</span>
                        <span className="text-xl font-bold text-foreground">
                          ${(cartTotal * 1.1).toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <Button
                      size="lg"
                      className="mt-6 w-full rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/30 hover:bg-primary/90"
                    >
                      Proceed to Checkout
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>

                    <p className="mt-4 text-center text-xs text-muted-foreground">
                      Secure checkout powered by Potti Game
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
