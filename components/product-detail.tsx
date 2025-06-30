"use client"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingBag, Globe, Shield, Award, ChevronRight, ChevronLeft, ZoomIn, Star, Leaf } from "lucide-react"

// Types
interface ProductImage {
  id: string
  src: string
  alt: string
}

interface ProductColor {
  id: string
  name: string
  value: string
  available: boolean
}

interface ProductSize {
  id: string
  label: string
  available: boolean
}

interface Review {
  id: string
  author: string
  authorImage: string
  rating: number
  date: string
  comment: string
}

interface Product {
  id: string
  name: string
  brand: string
  price: number
  originalPrice: number
  discount: number
  rating: number
  reviewCount: number
  images: ProductImage[]
  features: string[]
  colors: ProductColor[]
  sizes: ProductSize[]
  reviews: Review[]
  description: string
  shipping: {
    free: boolean
    worldwide: boolean
    estimatedDelivery: string
  }
  payment: {
    secure: boolean
    methods: string[]
  }
  inStock: boolean
  sku: string
  isEco: boolean
}

// Mock data
const productData: Product = {
  id: "eco-sweater-green-001",
  name: "Sustainable Organic Cotton Sweater",
  brand: "EcoMart Essentials",
  price: 49,
  originalPrice: 99,
  discount: 50,
  rating: 4.8,
  reviewCount: 157,
  images: [
    {
      id: "img-1",
      src: "/placeholder.svg?height=600&width=600",
      alt: "Green organic cotton sweater front view",
    },
    {
      id: "img-2",
      src: "/placeholder.svg?height=600&width=600",
      alt: "Green organic cotton sweater side view",
    },
    {
      id: "img-3",
      src: "/placeholder.svg?height=600&width=600",
      alt: "Green organic cotton sweater back view",
    },
    {
      id: "img-4",
      src: "/placeholder.svg?height=600&width=600",
      alt: "Green organic cotton sweater detail view",
    },
  ],
  features: [
    "Made with 100% organic cotton",
    "Sustainable dyeing process",
    "Fair trade certified",
    "Carbon neutral shipping",
  ],
  colors: [
    {
      id: "forest",
      name: "Forest Green",
      value: "oklch(0.723 0.219 149.579)",
      available: true,
    },
    {
      id: "sage",
      name: "Sage Green",
      value: "oklch(0.8 0.1 140)",
      available: true,
    },
    {
      id: "olive",
      name: "Olive Green",
      value: "oklch(0.6 0.15 120)",
      available: true,
    },
    {
      id: "mint",
      name: "Mint Green",
      value: "oklch(0.85 0.08 160)",
      available: false,
    },
  ],
  sizes: [
    { id: "xs", label: "XS", available: true },
    { id: "s", label: "S", available: true },
    { id: "m", label: "M", available: true },
    { id: "l", label: "L", available: false },
    { id: "xl", label: "XL", available: true },
  ],
  reviews: [
    {
      id: "review-1",
      author: "Sarah Johnson",
      authorImage: "/placeholder.svg?height=48&width=48",
      rating: 5,
      date: "March 14, 2024",
      comment:
        "Amazing quality and so soft! Love that it's made sustainably. The fit is perfect and the color is exactly as shown.",
    },
    {
      id: "review-2",
      author: "Emma Wilson",
      authorImage: "/placeholder.svg?height=48&width=48",
      rating: 5,
      date: "January 28, 2024",
      comment:
        "Best eco-friendly sweater I've owned. The organic cotton feels incredible and I love supporting sustainable fashion.",
    },
    {
      id: "review-3",
      author: "Maya Cooper",
      authorImage: "/placeholder.svg?height=48&width=48",
      rating: 4,
      date: "January 11, 2024",
      comment:
        "Great quality and comfortable. Shipping was fast and packaging was minimal and recyclable. Highly recommend!",
    },
  ],
  description:
    "This beautiful organic cotton sweater represents the perfect blend of comfort, style, and sustainability. Crafted from 100% certified organic cotton using eco-friendly dyes, this sweater is designed for the conscious consumer who doesn't want to compromise on quality or ethics. The relaxed fit and soft texture make it perfect for everyday wear, while the timeless design ensures it will remain a wardrobe staple for years to come.",
  shipping: {
    free: true,
    worldwide: true,
    estimatedDelivery: "3-5 business days",
  },
  payment: {
    secure: true,
    methods: ["Credit Card", "PayPal", "Apple Pay"],
  },
  inStock: true,
  sku: "EM-OSC-G-001",
  isEco: true,
}

const ProductDetail = () => {
  const [activeImage, setActiveImage] = useState(0)
  const [activeTab, setActiveTab] = useState("description")
  const [selectedColor, setSelectedColor] = useState("forest")
  const [selectedSize, setSelectedSize] = useState("m")
  const [quantity, setQuantity] = useState(1)
  const [showAllReviews, setShowAllReviews] = useState(false)

  // Get visible reviews based on showAllReviews state
  const visibleReviews = showAllReviews ? productData.reviews : productData.reviews.slice(0, 3)

  // Format price with currency
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  // Handle image navigation
  const nextImage = () => {
    setActiveImage((prev) => (prev === productData.images.length - 1 ? 0 : prev + 1))
  }

  const prevImage = () => {
    setActiveImage((prev) => (prev === 0 ? productData.images.length - 1 : prev - 1))
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumbs */}
      <nav className="flex text-sm text-muted-foreground mb-8">
        <Link href="/" className="hover:text-foreground">
          Home
        </Link>
        <ChevronRight className="h-4 w-4 mx-1 text-muted-foreground self-center" />
        <Link href="/products" className="hover:text-foreground">
          Products
        </Link>
        <ChevronRight className="h-4 w-4 mx-1 text-muted-foreground self-center" />
        <span className="text-foreground">EcoMart Essentials</span>
      </nav>

      <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
        {/* Product Image Gallery */}
        <div className="flex flex-col">
          {/* Main Image */}
          <div className="relative overflow-hidden rounded-lg mb-4 bg-muted border border-border">
            <div className="relative h-96 sm:h-[500px] overflow-hidden flex items-center justify-center">
              <Image
                src={productData.images[activeImage].src || "/placeholder.svg"}
                alt={productData.images[activeImage].alt}
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />

              {/* Navigation Arrows */}
              <button
                onClick={prevImage}
                className="absolute left-4 p-2 rounded-full bg-background/80 text-foreground hover:bg-background focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 p-2 rounded-full bg-background/80 text-foreground hover:bg-background focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                <ChevronRight className="h-5 w-5" />
              </button>

              {/* Zoom Button */}
              <button className="absolute bottom-4 right-4 p-2 rounded-full bg-background/80 text-foreground hover:bg-background focus:outline-none">
                <ZoomIn className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Thumbnails */}
          <div className="flex space-x-2 overflow-auto pb-2 scrollbar-thin">
            {productData.images.map((image, index) => (
              <button
                key={image.id}
                onClick={() => setActiveImage(index)}
                className={`relative flex-shrink-0 h-20 w-20 rounded-md overflow-hidden ${
                  activeImage === index ? "ring-2 ring-primary" : "ring-1 ring-border hover:ring-primary/50"
                }`}
              >
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Information */}
        <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              {productData.brand} - {productData.name}
            </h1>
            {productData.isEco && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary/20 text-primary text-xs font-medium rounded-md">
                <Leaf className="h-3 w-3" />
                ECO
              </span>
            )}
          </div>

          {/* Rating */}
          <div className="mt-3 flex items-center">
            <div className="flex items-center">
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  className={`h-5 w-5 ${
                    index < Math.floor(productData.rating)
                      ? "text-primary fill-primary"
                      : index < productData.rating
                        ? "text-primary fill-primary opacity-60"
                        : "text-muted-foreground"
                  }`}
                />
              ))}
            </div>
            <p className="ml-2 text-sm text-muted-foreground">{productData.reviewCount} Reviews</p>
          </div>

          {/* Price */}
          <div className="mt-4 flex items-center">
            <p className="text-3xl font-bold text-foreground">{formatPrice(productData.price)}</p>
            {productData.discount > 0 && (
              <>
                <p className="ml-3 text-lg text-muted-foreground line-through">
                  {formatPrice(productData.originalPrice)}
                </p>
                <p className="ml-3 inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-primary/20 text-primary">
                  Save {productData.discount}% right now
                </p>
              </>
            )}
          </div>

          {/* Features */}
          <div className="mt-6">
            <h3 className="text-lg font-medium text-foreground">Eco Features</h3>
            <ul className="mt-2 space-y-2">
              {productData.features.map((feature, index) => (
                <li key={index} className="flex items-center text-muted-foreground">
                  <Leaf className="h-4 w-4 text-primary mr-2" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Colors */}
          <div className="mt-6">
            <h3 className="text-lg font-medium text-foreground">Colors</h3>
            <div className="mt-2 flex space-x-2">
              {productData.colors.map((color) => (
                <button
                  key={color.id}
                  onClick={() => color.available && setSelectedColor(color.id)}
                  disabled={!color.available}
                  className={`
                    relative inline-flex items-center justify-center h-10 w-10 rounded-full border p-0.5
                    ${selectedColor === color.id ? "ring-2 ring-offset-2 ring-primary" : ""}
                    ${!color.available ? "opacity-50 cursor-not-allowed" : ""}
                  `}
                  title={color.name}
                >
                  <span className="rounded-full h-full w-full" style={{ backgroundColor: color.value }}></span>
                  {!color.available && (
                    <span className="absolute inset-0 flex items-center justify-center">
                      <svg
                        className="h-6 w-6 text-muted-foreground"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                        />
                      </svg>
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Sizes */}
          <div className="mt-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-foreground">Size</h3>
              <button className="text-sm font-medium text-primary hover:text-primary/80">Size guide</button>
            </div>
            <div className="mt-2 grid grid-cols-5 gap-2">
              {productData.sizes.map((size) => (
                <button
                  key={size.id}
                  onClick={() => size.available && setSelectedSize(size.id)}
                  disabled={!size.available}
                  className={`
                    py-2 px-3 border rounded-md text-sm font-medium
                    ${
                      selectedSize === size.id
                        ? "bg-foreground text-background border-foreground"
                        : "border-border text-foreground hover:bg-muted"
                    }
                    ${!size.available ? "bg-muted text-muted-foreground cursor-not-allowed" : ""}
                  `}
                >
                  {size.label}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity and Add to Cart */}
          <div className="mt-8 flex items-center space-x-4">
            <div className="flex border border-border rounded-md">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-2 text-muted-foreground hover:bg-muted"
              >
                -
              </button>
              <span className="w-12 text-center py-2 border-x border-border">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-2 text-muted-foreground hover:bg-muted"
              >
                +
              </button>
            </div>

            <button className="flex-1 bg-foreground hover:bg-foreground/90 text-background py-3 px-6 rounded-md font-medium flex items-center justify-center transition duration-150">
              <ShoppingBag className="h-5 w-5 mr-2" />
              Add to cart
            </button>

            <button className="p-3 border border-border rounded-md hover:bg-muted text-muted-foreground">
              <Heart className="h-5 w-5" />
            </button>
          </div>

          {/* Additional Info */}
          <div className="mt-8 space-y-4">
            <div className="flex items-center">
              <Globe className="h-5 w-5 text-primary mr-2" />
              <p className="text-sm text-muted-foreground">Free shipping worldwide</p>
            </div>
            <div className="flex items-center">
              <Shield className="h-5 w-5 text-primary mr-2" />
              <p className="text-sm text-muted-foreground">100% Secure Payment</p>
            </div>
            <div className="flex items-center">
              <Award className="h-5 w-5 text-primary mr-2" />
              <p className="text-sm text-muted-foreground">Sustainably Made</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs - Description, Reviews, Sustainability */}
      <div className="mt-16 border-t border-border pt-8">
        <div className="border-b border-border">
          <nav className="-mb-px flex space-x-8">
            {["description", "reviews", "sustainability"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`
                  capitalize py-4 px-1 border-b-2 font-medium text-sm
                  ${
                    activeTab === tab
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                  }
                `}
              >
                {tab}
                {tab === "reviews" && ` (${productData.reviewCount})`}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-8">
          {/* Description Tab */}
          {activeTab === "description" && (
            <div className="prose max-w-none">
              <p className="text-muted-foreground">{productData.description}</p>
            </div>
          )}

          {/* Reviews Tab */}
          {activeTab === "reviews" && (
            <div className="space-y-8">
              {visibleReviews.map((review) => (
                <div key={review.id} className="border-b border-border pb-8 last:border-0">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-4">
                      <Image
                        src={review.authorImage || "/placeholder.svg"}
                        alt={review.author}
                        className="h-12 w-12 rounded-full object-cover"
                        width={48}
                        height={48}
                      />
                    </div>
                    <div>
                      <div className="flex items-center">
                        <div className="flex">
                          {[...Array(5)].map((_, index) => (
                            <Star
                              key={index}
                              className={`h-4 w-4 ${
                                index < review.rating ? "text-primary fill-primary" : "text-muted-foreground"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="mt-1 text-sm font-medium text-foreground">{review.author}</p>
                      <p className="mt-1 text-sm text-muted-foreground">{review.date}</p>
                      <div className="mt-2 text-sm text-muted-foreground">
                        <p>{review.comment}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {productData.reviews.length > 3 && (
                <button
                  onClick={() => setShowAllReviews(!showAllReviews)}
                  className="flex items-center text-sm font-medium text-primary hover:text-primary/80"
                >
                  {showAllReviews ? "Show less reviews" : "Load more reviews"}
                </button>
              )}
            </div>
          )}

          {/* Sustainability Tab */}
          {activeTab === "sustainability" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-foreground flex items-center gap-2">
                  <Leaf className="h-5 w-5 text-primary" />
                  Environmental Impact
                </h3>
                <p className="mt-2 text-muted-foreground">
                  This product is made with 100% organic cotton, reducing water usage by 91% compared to conventional
                  cotton. Our sustainable dyeing process eliminates harmful chemicals and reduces water pollution.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-foreground">Fair Trade Certification</h3>
                <p className="mt-2 text-muted-foreground">
                  We work directly with fair trade certified suppliers, ensuring fair wages and safe working conditions
                  for all workers involved in the production process.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-foreground">Carbon Neutral Shipping</h3>
                <p className="mt-2 text-muted-foreground">
                  All orders are shipped carbon neutral through our partnership with environmental organizations. We
                  offset 100% of shipping emissions through verified carbon reduction projects.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
