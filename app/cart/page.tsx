"use client"

import { useState, useEffect } from "react"
import { useCart } from "@/contexts/CartContext"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Minus, Plus, Trash2, ShoppingCart } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useToast } from "@/components/ui/use-toast"
import { DashboardNav } from "@/components/dashboard/dashboard-nav"

export default function CartPage() {
  const { cart, removeFromCart, addToCart, getCartTotal } = useCart()
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  const handleQuantityChange = (itemId: string, change: number) => {
    const item = cart.find((i) => i.id === itemId);
    if (!item) return;

    if (change > 0) {
      addToCart({ ...item, quantity: 1 })
      toast({ title: "Item quantity increased", description: "Updated in your cart." })
    } else {
      removeFromCart(itemId)
      toast({ title: "Item quantity decreased", description: "Updated in your cart." })
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ShoppingCart className="h-16 w-16 animate-pulse text-primary" />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-background overflow-hidden">
      <DashboardNav />
      <div className="flex-1 flex flex-col">
        <div className="container mx-auto px-4 py-16 flex flex-col h-screen">
          <h1 className="text-4xl font-bold text-center text-primary mb-6">Your Shopping Cart</h1>

          <div className="flex-1 overflow-auto max-h-[70vh]">
            {cart.length === 0 ? (
              <Card>
                <CardContent className="text-center py-16">
                  <ShoppingCart className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-xl mb-4">Your cart is empty</p>
                  <Link href="/services">
                    <Button>Browse Our Services</Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 overflow-auto max-h-[60vh]">
                  {cart.map((item) => (
                    <Card key={item.id} className="mb-4">
                      <CardContent className="flex items-center space-x-4 p-4">
                        <div className="relative w-24 h-24 rounded overflow-hidden">
                          <Image
                            src={item.image || "/default-placeholder.png"}
                            alt={item.name}
                            width={96}
                            height={96}
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{item.name}</h3>
                          <p className="text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="icon" onClick={() => handleQuantityChange(item.id, -1)}>
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button variant="outline" size="icon" onClick={() => handleQuantityChange(item.id, 1)}>
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <div className="sticky bottom-0">
                  <Card>
                    <CardHeader>
                      <CardTitle>Order Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {cart.map((item) => (
                          <div key={item.id} className="flex justify-between text-sm">
                            <span>{item.name}</span>
                            <span>${(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                      <div className="border-t mt-4 pt-4">
                        <div className="flex justify-between font-semibold">
                          <span>Total</span>
                          <span>${getCartTotal().toFixed(2)}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="p-4">
                      <Link href="/checkout" className="w-full">
                        <Button className="w-full">Proceed to Checkout</Button>
                      </Link>
                    </CardFooter>
                  </Card>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
