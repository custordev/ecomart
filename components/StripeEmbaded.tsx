"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Check, Leaf, ShoppingCart, CreditCard, Shield, Lock, User } from "lucide-react"

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

export default function StripeEmbedded() {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState<"products" | "checkout" | "success">("products")
  const [customerInfo, setCustomerInfo] = useState({
    email: "",
    name: "",
    address: "",
    city: "",
    postalCode: "",
    country: "US",
  })

  const toggleProduct = (productId: string) => {
    setSelectedProducts((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId],
    )
  }

  const handleContinueToCheckout = () => {
    if (selectedProducts.length > 0) {
      setStep("checkout")
    }
  }

  const handlePayment = async () => {
    setLoading(true)

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // In a real app, you would:
      // 1. Create a Payment Intent with Stripe
      // 2. Confirm the payment using Stripe Elements
      // 3. Handle the payment result

      setStep("success")
    } catch (error) {
      console.error("Payment failed:", error)
    } finally {
      setLoading(false)
    }
  }

  const selectedTotal = selectedProducts.reduce((total, productId) => {
    const product = products.find((p) => p.id === productId)
    return total + (product?.price || 0)
  }, 0)

  const tax = selectedTotal * 0.08 // 8% tax
  const shipping = selectedTotal > 50 ? 0 : 5.99
  const finalTotal = selectedTotal + tax + shipping

  if (step === "success") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-primary/5 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <Card className="border-border/50">
              <CardContent className="pt-12 pb-8">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="h-8 w-8 text-primary" />
                </div>
                <h1 className="text-3xl font-bold text-foreground mb-4">Order Confirmed!</h1>
                <p className="text-muted-foreground mb-8">
                  Thank you for your sustainable purchase. Your order has been processed successfully.
                </p>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>
                    Order total: <span className="font-semibold text-foreground">${finalTotal.toFixed(2)}</span>
                  </p>
                  <p>
                    Confirmation email sent to:{" "}
                    <span className="font-semibold text-foreground">{customerInfo.email}</span>
                  </p>
                </div>
                <Button
                  onClick={() => {
                    setStep("products")
                    setSelectedProducts([])
                    setCustomerInfo({
                      email: "",
                      name: "",
                      address: "",
                      city: "",
                      postalCode: "",
                      country: "US",
                    })
                  }}
                  className="mt-8"
                >
                  Continue Shopping
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-primary/5 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Leaf className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold text-foreground">EcoMart Checkout</h1>
          </div>
          <p className="text-xl text-muted-foreground">Stripe Embedded Checkout Experience</p>
          <Badge variant="outline" className="mt-4 border-primary/30 text-primary">
            <Lock className="h-4 w-4 mr-1" />
            Embedded Secure Payment
          </Badge>
        </div>

        {step === "products" && (
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
                                <div className="text-sm text-muted-foreground line-through">
                                  ${product.originalPrice}
                                </div>
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

            {/* Order Summary */}
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

                      <Separator />

                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Subtotal</span>
                          <span>${selectedTotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Tax</span>
                          <span>${tax.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Shipping</span>
                          <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                        </div>
                      </div>

                      <Separator />

                      <div className="flex justify-between items-center text-lg font-bold">
                        <span>Total</span>
                        <span className="text-primary">${finalTotal.toFixed(2)}</span>
                      </div>

                      <Button
                        onClick={handleContinueToCheckout}
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                        size="lg"
                      >
                        Continue to Checkout
                      </Button>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {step === "checkout" && (
          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Checkout Form */}
            <div>
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5 text-primary" />
                    Customer Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={customerInfo.name}
                        onChange={(e:React.ChangeEvent<HTMLInputElement>) => setCustomerInfo((prev) => ({ ...prev, name: e.target.value }))}
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={customerInfo.email}
                        onChange={(e:React.ChangeEvent<HTMLInputElement>) => setCustomerInfo((prev) => ({ ...prev, email: e.target.value }))}
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      value={customerInfo.address}
                      onChange={(e:React.ChangeEvent<HTMLInputElement>) => setCustomerInfo((prev) => ({ ...prev, address: e.target.value }))}
                      placeholder="123 Main St"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={customerInfo.city}
                        onChange={(e:React.ChangeEvent<HTMLInputElement>) => setCustomerInfo((prev) => ({ ...prev, city: e.target.value }))}
                        placeholder="New York"
                      />
                    </div>
                    <div>
                      <Label htmlFor="postalCode">Postal Code</Label>
                      <Input
                        id="postalCode"
                        value={customerInfo.postalCode}
                        onChange={(e:React.ChangeEvent<HTMLInputElement>) => setCustomerInfo((prev) => ({ ...prev, postalCode: e.target.value }))}
                        placeholder="10001"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/50 mt-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-primary" />
                    Payment Information
                  </CardTitle>
                  <CardDescription>Your payment information is processed securely by Stripe</CardDescription>
                </CardHeader>
                <CardContent>
                  {/* This would be replaced with Stripe Elements in a real implementation */}
                  <div className="space-y-4">
                    <div className="p-4 border border-border rounded-lg bg-muted/30">
                      <div className="flex items-center gap-2 mb-2">
                        <Lock className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium">Stripe Elements would be embedded here</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        In a real implementation, Stripe Elements would provide secure card input fields
                      </p>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Shield className="h-4 w-4 text-primary" />
                      Your payment information is encrypted and secure
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div>
              <Card className="border-border/50 sticky top-8">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {selectedProducts.map((productId) => {
                      const product = products.find((p) => p.id === productId)
                      if (!product) return null

                      return (
                        <div key={productId} className="flex items-center gap-3">
                          <img
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            className="w-12 h-12 object-cover rounded bg-muted"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium text-sm">{product.name}</h4>
                            <p className="text-xs text-muted-foreground">{product.description}</p>
                          </div>
                          <span className="font-medium">${product.price}</span>
                        </div>
                      )
                    })}
                  </div>

                  <Separator />

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${selectedTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>Total</span>
                    <span className="text-primary">${finalTotal.toFixed(2)}</span>
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
                    onClick={handlePayment}
                    disabled={loading || !customerInfo.email || !customerInfo.name}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                    size="lg"
                  >
                    {loading ? "Processing Payment..." : `Pay $${finalTotal.toFixed(2)}`}
                  </Button>

                  <Button variant="outline" onClick={() => setStep("products")} className="w-full">
                    Back to Products
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* How it Works */}
        <div className="mt-16 max-w-4xl mx-auto">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-center">How Stripe Embedded Checkout Works</CardTitle>
              <CardDescription className="text-center">
                Seamless payment experience without leaving our site
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-primary font-bold">1</span>
                  </div>
                  <h3 className="font-semibold mb-2">Select & Configure</h3>
                  <p className="text-sm text-muted-foreground">
                    Choose products and enter your information on our site
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-primary font-bold">2</span>
                  </div>
                  <h3 className="font-semibold mb-2">Embedded Payment</h3>
                  <p className="text-sm text-muted-foreground">
                    Pay securely using Stripe Elements embedded in our checkout
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-primary font-bold">3</span>
                  </div>
                  <h3 className="font-semibold mb-2">Instant Confirmation</h3>
                  <p className="text-sm text-muted-foreground">Get immediate confirmation without any redirects</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
