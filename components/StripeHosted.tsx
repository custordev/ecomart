"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Leaf, ShoppingCart, CreditCard, Shield } from "lucide-react"

interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  description: string
  image: string
  features: string[]
  isEco: boolean
}

const products: Product[] = [
  {
    id: "eco-tote-bag",
    name: "Organic Cotton Tote Bag",
    price: 24.99,
    originalPrice: 29.99,
    description: "Sustainable tote bag made from 100% organic cotton",
    image: "/placeholder.svg?height=200&width=200",
    features: ["100% Organic Cotton", "Fair Trade Certified", "Biodegradable"],
    isEco: true,
  },
  {
    id: "bamboo-water-bottle",
    name: "Bamboo Water Bottle",
    price: 19.99,
    description: "Eco-friendly water bottle with bamboo exterior",
    image: "/placeholder.svg?height=200&width=200",
    features: ["Bamboo Exterior", "BPA Free", "Leak Proof"],
    isEco: true,
  },
  {
    id: "solar-charger",
    name: "Solar Phone Charger",
    price: 49.99,
    originalPrice: 59.99,
    description: "Portable solar charger for sustainable energy",
    image: "/placeholder.svg?height=200&width=200",
    features: ["Solar Powered", "Fast Charging", "Weather Resistant"],
    isEco: true,
  },
]

export default function StripeHosted() {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  const toggleProduct = (productId: string) => {
    setSelectedProducts((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId],
    )
  }

  const handleCheckout = async () => {
    if (selectedProducts.length === 0) return

    setLoading(true)

    try {
      // In a real app, you would call your API to create a Stripe Checkout session
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          products: selectedProducts.map((id) => products.find((p) => p.id === id)),
        }),
      })

      const { url } = await response.json()

      // Redirect to Stripe Checkout
      window.location.href = url
    } catch (error) {
      console.error("Error creating checkout session:", error)
    } finally {
      setLoading(false)
    }
  }

  const selectedTotal = selectedProducts.reduce((total, productId) => {
    const product = products.find((p) => p.id === productId)
    return total + (product?.price || 0)
  }, 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-primary/5 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Leaf className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold text-foreground">EcoMart Checkout</h1>
          </div>
          <p className="text-xl text-muted-foreground">Stripe Hosted Checkout Experience</p>
          <Badge variant="outline" className="mt-4 border-primary/30 text-primary">
            <Shield className="h-4 w-4 mr-1" />
            Secure Payment with Stripe
          </Badge>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Product Selection */}
          <div className="lg:col-span-2">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5 text-primary" />
                  Select Products
                </CardTitle>
                <CardDescription>Choose from our sustainable product collection</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                      selectedProducts.includes(product.id)
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                    onClick={() => toggleProduct(product.id)}
                  >
                    <div className="flex items-start gap-4">
                      <div className="relative">
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="w-20 h-20 object-cover rounded-lg bg-muted"
                        />
                        {selectedProducts.includes(product.id) && (
                          <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full p-1">
                            <Check className="h-4 w-4" />
                          </div>
                        )}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-foreground flex items-center gap-2">
                              {product.name}
                              {product.isEco && (
                                <Badge variant="secondary" className="bg-primary/20 text-primary">
                                  <Leaf className="h-3 w-3 mr-1" />
                                  ECO
                                </Badge>
                              )}
                            </h3>
                            <p className="text-sm text-muted-foreground mt-1">{product.description}</p>
                          </div>

                          <div className="text-right">
                            <div className="font-bold text-lg text-foreground">${product.price}</div>
                            {product.originalPrice && (
                              <div className="text-sm text-muted-foreground line-through">${product.originalPrice}</div>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mt-3">
                          {product.features.map((feature, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Checkout Summary */}
          <div className="lg:col-span-1">
            <Card className="border-border/50 sticky top-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-primary" />
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedProducts.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">Select products to see your order summary</p>
                ) : (
                  <>
                    <div className="space-y-3">
                      {selectedProducts.map((productId) => {
                        const product = products.find((p) => p.id === productId)
                        if (!product) return null

                        return (
                          <div key={productId} className="flex justify-between items-center">
                            <span className="text-sm text-foreground">{product.name}</span>
                            <span className="font-medium">${product.price}</span>
                          </div>
                        )
                      })}
                    </div>

                    <div className="border-t border-border pt-4">
                      <div className="flex justify-between items-center text-lg font-bold">
                        <span>Total</span>
                        <span className="text-primary">${selectedTotal.toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="space-y-3 pt-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Shield className="h-4 w-4 text-primary" />
                        Secure payment with Stripe
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Leaf className="h-4 w-4 text-primary" />
                        Carbon neutral shipping
                      </div>
                    </div>

                    <Button
                      onClick={handleCheckout}
                      disabled={loading}
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                      size="lg"
                    >
                      {loading ? "Creating checkout..." : "Proceed to Stripe Checkout"}
                    </Button>

                    <p className="text-xs text-muted-foreground text-center">
                      You'll be redirected to Stripe's secure checkout page
                    </p>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* How it Works */}
        <div className="mt-16 max-w-4xl mx-auto">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-center">How Stripe Hosted Checkout Works</CardTitle>
              <CardDescription className="text-center">Secure, PCI-compliant payment processing</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-primary font-bold">1</span>
                  </div>
                  <h3 className="font-semibold mb-2">Select Products</h3>
                  <p className="text-sm text-muted-foreground">
                    Choose your eco-friendly products and review your order
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-primary font-bold">2</span>
                  </div>
                  <h3 className="font-semibold mb-2">Secure Redirect</h3>
                  <p className="text-sm text-muted-foreground">Get redirected to Stripe's secure checkout page</p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-primary font-bold">3</span>
                  </div>
                  <h3 className="font-semibold mb-2">Complete Payment</h3>
                  <p className="text-sm text-muted-foreground">Pay securely and return to our confirmation page</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
