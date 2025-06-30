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


// export interface ProductImage {
//   id: string;
//   src: string;
//   alt: string;
// }

// export interface ProductColor {
//   id: string;
//   name: string;
//   value: string;
//   available: boolean;
// }

// export interface ProductSize {
//   id: string;
//   label: string;
//   available: boolean;
// }

// export interface Review {
//   id: string;
//   author: string;
//   authorImage: string;
//   rating: number;
//   date: string;
//   comment: string;
// }

// export interface Product {
//   id: string;
//   name: string;
//   brand: string;
//   price: number;
//   originalPrice: number;
//   discount: number;
//   rating: number;
//   reviewCount: number;
//   images: ProductImage[];
//   features: string[];
//   colors: ProductColor[];
//   sizes: ProductSize[];
//   reviews: Review[];
//   description: string;
//   shipping: {
//     free: boolean;
//     worldwide: boolean;
//     estimatedDelivery: string;
//   };
//   payment: {
//     secure: boolean;
//     methods: string[];
//   };
//   inStock: boolean;
//   sku: string;
//   isEco: boolean;
//   category: string;
// }

export const categories = [
  "Organic Beauty",
  "Sustainable Tech",
  "Eco Home & Garden",
  "Sustainable Fashion",
  "Green Sports",
  "Eco Accessories",
  "Clean Energy",
  "Zero Waste Living",
  "Eco Baby & Kids",
  "Sustainable Food & Nutrition",
  "Green Transportation",
  "Eco Office & Work",
];
//  Sample products for listing (simplified version)
interface SimpleProduct {
  id: string;
  name: string;
  price: number;
  discountPrice?: number;
  description: string;
  images: string[];
  category: string;
  rating: number;
  tags: string[];
  isNew?: boolean;
  isEco: boolean;
}

// All products for listing view
// export const allProducts: SimpleProduct[] = [
//   // Organic Beauty Products (8)
//   {
//     id: "ob-001",
//     name: "Organic Rose Face Serum",
//     price: 45.99,
//     discountPrice: 36.99,
//     description:
//       "Anti-aging serum with organic rose hip oil and vitamin C for radiant skin",
//     images: [
//       "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop&crop=center",
//     ],
//     category: "Organic Beauty",
//     rating: 4.8,
//     tags: ["Organic", "Anti-aging", "Vitamin C"],
//     isNew: true,
//     isEco: true,
//   },
//   {
//     id: "ob-002",
//     name: "Natural Charcoal Face Mask",
//     price: 24.99,
//     description:
//       "Detoxifying face mask with activated charcoal and organic clay",
//     images: [
//       "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=400&fit=crop&crop=center",
//     ],
//     category: "Organic Beauty",
//     rating: 4.7,
//     tags: ["Charcoal", "Detox", "Natural"],
//     isEco: true,
//   },
//   {
//     id: "ob-003",
//     name: "Coconut Oil Hair Treatment",
//     price: 18.99,
//     discountPrice: 14.99,
//     description:
//       "Nourishing hair treatment with organic coconut oil and essential oils",
//     images: [
//       "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=400&h=400&fit=crop&crop=center",
//     ],
//     category: "Organic Beauty",
//     rating: 4.6,
//     tags: ["Coconut Oil", "Hair Care", "Organic"],
//     isEco: true,
//   },
//   {
//     id: "ob-004",
//     name: "Lavender Body Lotion",
//     price: 22.99,
//     description:
//       "Moisturizing body lotion with organic lavender and shea butter",
//     images: [
//       "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop&crop=center",
//     ],
//     category: "Organic Beauty",
//     rating: 4.9,
//     tags: ["Lavender", "Moisturizing", "Shea Butter"],
//     isEco: true,
//   },
//   {
//     id: "ob-005",
//     name: "Natural Lip Balm Set",
//     price: 16.99,
//     discountPrice: 12.99,
//     description: "Set of 3 lip balms with organic beeswax and natural flavors",
//     images: [
//       "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop&crop=center",
//     ],
//     category: "Organic Beauty",
//     rating: 4.5,
//     tags: ["Lip Care", "Beeswax", "Natural"],
//     isEco: true,
//   },
//   {
//     id: "ob-006",
//     name: "Green Tea Eye Cream",
//     price: 32.99,
//     description: "Anti-puffiness eye cream with organic green tea and caffeine",
//     images: [
//       "https://images.unsplash.com/photo-1612817288484-6f916006741a?w=400&h=400&fit=crop&crop=center",
//     ],
//     category: "Organic Beauty",
//     rating: 4.7,
//     tags: ["Green Tea", "Eye Care", "Anti-puffiness"],
//     isEco: true,
//   },
//   {
//     id: "ob-007",
//     name: "Argan Oil Facial Cleanser",
//     price: 28.99,
//     description: "Gentle facial cleanser with organic argan oil and aloe vera",
//     images: [
//       "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=400&h=400&fit=crop&crop=center",
//     ],
//     category: "Organic Beauty",
//     rating: 4.8,
//     tags: ["Argan Oil", "Gentle", "Aloe Vera"],
//     isEco: true,
//   },
//   {
//     id: "ob-008",
//     name: "Organic Sunscreen SPF 30",
//     price: 26.99,
//     discountPrice: 21.99,
//     description: "Reef-safe sunscreen with zinc oxide and organic ingredients",
//     images: [
//       "https://images.unsplash.com/photo-1556228852-6d35c37bcf98?w=400&h=400&fit=crop&crop=center",
//     ],
//     category: "Organic Beauty",
//     rating: 4.6,
//     tags: ["SPF 30", "Reef-safe", "Zinc Oxide"],
//     isNew: true,
//     isEco: true,
//   },

//   // Sustainable Tech Products (8)
//   {
//     id: "st-001",
//     name: "Solar Power Bank 20000mAh",
//     price: 79.99,
//     discountPrice: 64.99,
//     description:
//       "High-capacity solar power bank with fast charging and LED flashlight",
//     images: [
//       "https://images.unsplash.com/photo-1609592806529-a8070e96b0ed?w=400&h=400&fit=crop&crop=center",
//     ],
//     category: "Sustainable Tech",
//     rating: 4.7,
//     tags: ["Solar", "Power Bank", "Fast Charging"],
//     isEco: true,
//   },
//   {
//     id: "st-002",
//     name: "Recycled Plastic Wireless Earbuds",
//     price: 149.99,
//     discountPrice: 119.99,
//     description:
//       "Premium wireless earbuds made from ocean plastic with noise cancellation",
//     images: [
//       "https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=400&h=400&fit=crop&crop=center",
//     ],
//     category: "Sustainable Tech",
//     rating: 4.8,
//     tags: ["Ocean Plastic", "Wireless", "Noise Cancelling"],
//     isNew: true,
//     isEco: true,
//   },
//   {
//     id: "st-003",
//     name: "Bamboo Wireless Charging Pad",
//     price: 34.99,
//     description:
//       "Qi-compatible wireless charger with sustainable bamboo housing",
//     images: [
//       "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop&crop=center",
//     ],
//     category: "Sustainable Tech",
//     rating: 4.6,
//     tags: ["Bamboo", "Wireless Charging", "Qi Compatible"],
//     isEco: true,
//   },
//   {
//     id: "st-004",
//     name: "Energy-Efficient Smart Bulbs",
//     price: 59.99,
//     discountPrice: 49.99,
//     description:
//       "Set of 4 LED smart bulbs with 90% energy savings and app control",
//     images: [
//       "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=400&fit=crop&crop=center",
//     ],
//     category: "Sustainable Tech",
//     rating: 4.9,
//     tags: ["LED", "Smart", "Energy Efficient"],
//     isEco: true,
//   },
//   {
//     id: "st-005",
//     name: "Biodegradable Phone Cases",
//     price: 24.99,
//     discountPrice: 19.99,
//     description: "Compostable phone cases made from plant-based materials",
//     images: [
//       "https://images.unsplash.com/photo-1601593346740-925612772716?w=400&h=400&fit=crop&crop=center",
//     ],
//     category: "Sustainable Tech",
//     rating: 4.5,
//     tags: ["Biodegradable", "Plant-based", "Compostable"],
//     isEco: true,
//   },
//   {
//     id: "st-006",
//     name: "Wind-Up Emergency Radio",
//     price: 42.99,
//     description: "Hand-crank emergency radio with solar panel and USB charging",
//     images: [
//       "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop&crop=center",
//     ],
//     category: "Sustainable Tech",
//     rating: 4.7,
//     tags: ["Hand-crank", "Emergency", "Solar"],
//     isEco: true,
//   },
//   {
//     id: "st-007",
//     name: "Eco-Friendly Laptop Stand",
//     price: 89.99,
//     description:
//       "Adjustable laptop stand made from recycled aluminum with cooling design",
//     images: [
//       "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop&crop=center",
//     ],
//     category: "Sustainable Tech",
//     rating: 4.8,
//     tags: ["Recycled Aluminum", "Adjustable", "Cooling"],
//     isEco: true,
//   },
//   {
//     id: "st-008",
//     name: "Solar Bluetooth Speaker",
//     price: 129.99,
//     discountPrice: 104.99,
//     description:
//       "Waterproof Bluetooth speaker with solar charging and 360° sound",
//     images: [
//       "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop&crop=center",
//     ],
//     category: "Sustainable Tech",
//     rating: 4.6,
//     tags: ["Solar", "Waterproof", "360° Sound"],
//     isNew: true,
//     isEco: true,
//   },

//   // Eco Home & Garden Products (8)
//   {
//     id: "ehg-001",
//     name: "Bamboo Kitchen Utensil Set",
//     price: 34.99,
//     discountPrice: 27.99,
//     description: "Complete 7-piece kitchen set made from sustainable bamboo",
//     images: [
//       "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop&crop=center",
//     ],
//     category: "Eco Home & Garden",
//     rating: 4.9,
//     tags: ["Bamboo", "Kitchen", "Sustainable"],
//     isEco: true,
//   },
//   {
//     id: "ehg-002",
//     name: "Organic Cotton Bed Sheets",
//     price: 89.99,
//     discountPrice: 69.99,
//     description: "Luxury bed sheet set made from GOTS certified organic cotton",
//     images: [
//       "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=400&fit=crop&crop=center",
//     ],
//     category: "Eco Home & Garden",
//     rating: 4.8,
//     tags: ["Organic Cotton", "GOTS Certified", "Luxury"],
//     isEco: true,
//   },
//   {
//     id: "ehg-003",
//     name: "Compost Bin for Kitchen",
//     price: 45.99,
//     description:
//       "Stainless steel compost bin with charcoal filter and easy-clean design",
//     images: [
//       "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&h=400&fit=crop&crop=center",
//     ],
//     category: "Eco Home & Garden",
//     rating: 4.7,
//     tags: ["Compost", "Stainless Steel", "Kitchen"],
//     isEco: true,
//   },
//   {
//     id: "ehg-004",
//     name: "Seed Starting Kit",
//     price: 28.99,
//     discountPrice: 22.99,
//     description:
//       "Complete seed starting kit with biodegradable pots and organic soil",
//     images: [
//       "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=400&fit=crop&crop=center",
//     ],
//     category: "Eco Home & Garden",
//     rating: 4.6,
//     tags: ["Seeds", "Biodegradable", "Organic Soil"],
//     isNew: true,
//     isEco: true,
//   },
//   {
//     id: "ehg-005",
//     name: "Recycled Glass Storage Jars",
//     price: 39.99,
//     description: "Set of 6 airtight storage jars made from 100% recycled glass",
//     images: [
//       "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop&crop=center",
//     ],
//     category: "Eco Home & Garden",
//     rating: 4.8,
//     tags: ["Recycled Glass", "Airtight", "Storage"],
//     isEco: true,
//   },
//   {
//     id: "ehg-006",
//     name: "Natural Wool Dryer Balls",
//     price: 19.99,
//     discountPrice: 15.99,
//     description:
//       "Set of 6 organic wool dryer balls to reduce drying time naturally",
//     images: [
//       "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=400&fit=crop&crop=center",
//     ],
//     category: "Eco Home & Garden",
//     rating: 4.5,
//     tags: ["Wool", "Natural", "Energy Saving"],
//     isEco: true,
//   },
//   {
//     id: "ehg-007",
//     name: "Solar Garden Lights",
//     price: 52.99,
//     description:
//       "Set of 8 solar-powered LED garden lights with automatic on/off",
//     images: [
//       "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop&crop=center",
//     ],
//     category: "Eco Home & Garden",
//     rating: 4.7,
//     tags: ["Solar", "LED", "Automatic"],
//     isEco: true,
//   },
//   {
//     id: "ehg-008",
//     name: "Hemp Fiber Bath Towels",
//     price: 64.99,
//     discountPrice: 51.99,
//     description: "Ultra-absorbent bath towel set made from organic hemp fiber",
//     images: [
//       "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=400&fit=crop&crop=center",
//     ],
//     category: "Eco Home & Garden",
//     rating: 4.9,
//     tags: ["Hemp Fiber", "Absorbent", "Organic"],
//     isEco: true,
//   },

//   // Sustainable Fashion Products (8)
//   {
//     id: "sf-001",
//     name: "Organic Cotton T-Shirt",
//     price: 29.99,
//     discountPrice: 24.99,
//     description:
//       "Classic fit t-shirt made from 100% organic cotton with natural dyes",
//     images: [
//       "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop&crop=center",
//     ],
//     category: "Sustainable Fashion",
//     rating: 4.8,
//     tags: ["Organic Cotton", "Natural Dyes", "Classic Fit"],
//     isEco: true,
//   },
//   {
//     id: "sf-002",
//     name: "Recycled Denim Jeans",
//     price: 89.99,
//     description:
//       "Sustainable jeans made from recycled denim with eco-friendly wash",
//     images: [
//       "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&h=400&fit=crop&crop=center",
//     ],
//     category: "Sustainable Fashion",
//     rating: 4.7,
//     tags: ["Recycled Denim", "Eco-friendly", "Sustainable"],
//     isEco: true,
//   },
//   {
//     id: "sf-003",
//     name: "Hemp Canvas Sneakers",
//     price: 74.99,
//     discountPrice: 59.99,
//     description:
//       "Comfortable sneakers made from hemp canvas with recycled rubber soles",
//     images: [
//       "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop&crop=center",
//     ],
//     category: "Sustainable Fashion",
//     rating: 4.6,
//     tags: ["Hemp Canvas", "Recycled Rubber", "Comfortable"],
//     isNew: true,
//     isEco: true,
//   },
//   {
//     id: "sf-004",
//     name: "Tencel Dress",
//     price: 119.99,
//     discountPrice: 95.99,
//     description:
//       "Elegant dress made from sustainable Tencel fabric with flowing design",
//     images: [
//       "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=400&fit=crop&crop=center",
//     ],
//     category: "Sustainable Fashion",
//     rating: 4.9,
//     tags: ["Tencel", "Elegant", "Sustainable"],
//     isEco: true,
//   },
//   {
//     id: "sf-005",
//     name: "Merino Wool Cardigan",
//     price: 149.99,
//     description: "Soft cardigan made from ethically sourced merino wool",
//     images: [
//       "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=400&fit=crop&crop=center",
//     ],
//     category: "Sustainable Fashion",
//     rating: 4.8,
//     tags: ["Merino Wool", "Ethical", "Soft"],
//     isEco: true,
//   },
//   {
//     id: "sf-006",
//     name: "Linen Button-Up Shirt",
//     price: 79.99,
//     discountPrice: 63.99,
//     description:
//       "Breathable linen shirt with mother-of-pearl buttons and relaxed fit",
//     images: [
//       "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=400&fit=crop&crop=center",
//     ],
//     category: "Sustainable Fashion",
//     rating: 4.5,
//     tags: ["Linen", "Breathable", "Relaxed Fit"],
//     isEco: true,
//   },
//   {
//     id: "sf-007",
//     name: "Cork Leather Belt",
//     price: 54.99,
//     description:
//       "Vegan belt made from sustainable cork leather with metal-free buckle",
//     images: [
//       "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop&crop=center",
//     ],
//     category: "Sustainable Fashion",
//     rating: 4.7,
//     tags: ["Cork Leather", "Vegan", "Metal-free"],
//     isEco: true,
//   },
//   {
//     id: "sf-008",
//     name: "Organic Cotton Hoodie",
//     price: 89.99,
//     discountPrice: 71.99,
//     description:
//       "Cozy hoodie made from organic cotton fleece with kangaroo pocket",
//     images: [
//       "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop&crop=center",
//     ],
//     category: "Sustainable Fashion",
//     rating: 4.8,
//     tags: ["Organic Cotton", "Fleece", "Cozy"],
//     isNew: true,
//     isEco: true,
//   },

//   // Green Sports Products (8)
//   {
//     id: "gs-001",
//     name: "Bamboo Yoga Mat",
//     price: 49.99,
//     discountPrice: 39.99,
//     description:
//       "Non-slip yoga mat made from bamboo fiber with natural rubber base",
//     images: [
//       "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop&crop=center",
//     ],
//     category: "Green Sports",
//     rating: 4.7,
//     tags: ["Bamboo", "Non-slip", "Natural Rubber"],
//     isEco: true,
//   },
//   {
//     id: "gs-002",
//     name: "Recycled Ocean Plastic Water Bottle",
//     price: 22.99,
//     description: "Insulated water bottle made from recycled ocean plastic",
//     images: [
//       "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop&crop=center",
//     ],
//     category: "Green Sports",
//     rating: 4.8,
//     tags: ["Ocean Plastic", "Insulated", "Recycled"],
//     isEco: true,
//   },
//   {
//     id: "gs-003",
//     name: "Organic Cotton Workout Gear",
//     price: 64.99,
//     discountPrice: 51.99,
//     description:
//       "Breathable workout set made from organic cotton with moisture-wicking",
//     images: [
//       "https://images.unsplash.com/photo-1506629905607-297b9684b305?w=400&h=400&fit=crop&crop=center",
//     ],
//     category: "Green Sports",
//     rating: 4.6,
//     tags: ["Organic Cotton", "Moisture-wicking", "Breathable"],
//     isNew: true,
//     isEco: true,
//   },
//   {
//     id: "gs-004",
//     name: "Natural Cork Yoga Blocks",
//     price: 34.99,
//     description:
//       "Set of 2 yoga blocks made from sustainable cork with rounded edges",
//     images: [
//       "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop&crop=center",
//     ],
//     category: "Green Sports",
//     rating: 4.9,
//     tags: ["Cork", "Yoga", "Sustainable"],
//     isEco: true,
//   },
//   {
//     id: "gs-005",
//     name: "Hemp Resistance Bands",
//     price: 28.99,
//     discountPrice: 23.99,
//     description:
//       "Durable resistance bands made from hemp fiber with varying resistance levels",
//     images: [
//       "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&crop=center",
//     ],
//     category: "Green Sports",
//     rating: 4.5,
//     tags: ["Hemp Fiber", "Durable", "Resistance"],
//     isEco: true,
//   },
//   {
//     id: "gs-006",
//     name: "Bamboo Tennis Racket",
//     price: 149.99,
//     description:
//       "Professional tennis racket with bamboo frame and recycled string",
//     images: [
//       "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop&crop=center",
//     ],
//     category: "Green Sports",
//     rating: 4.7,
//     tags: ["Bamboo Frame", "Professional", "Recycled String"],
//     isEco: true,
//   },
//   {
//     id: "gs-007",
//     name: "Organic Cotton Gym Towel",
//     price: 18.99,
//     discountPrice: 14.99,
//     description:
//       "Quick-dry gym towel made from organic cotton with antimicrobial treatment",
//     images: [
//       "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&crop=center",
//     ],
//     category: "Green Sports",
//     rating: 4.8,
//     tags: ["Organic Cotton", "Quick-dry", "Antimicrobial"],
//     isEco: true,
//   },
//   {
//     id: "gs-008",
//     name: "Recycled Foam Roller",
//     price: 42.99,
//     description:
//       "High-density foam roller made from recycled materials for muscle recovery",
//     images: [
//       "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&crop=center",
//     ],
//     category: "Green Sports",
//     rating: 4.6,
//     tags: ["Recycled", "High-density", "Muscle Recovery"],
//     isNew: true,
//     isEco: true,
//   },

//   // Eco Accessories Products (8)
//   {
//     id: "ea-001",
//     name: "Organic Cotton Tote Bag",
//     price: 29.99,
//     discountPrice: 24.99,
//     description:
//       "Handcrafted organic cotton tote bag with natural dyes and sustainable materials",
//     images: [
//       "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop&crop=center",
//     ],
//     category: "Eco Accessories",
//     rating: 4.8,
//     tags: ["Organic", "Handcrafted", "Sustainable"],
//     isNew: true,
//     isEco: true,
//   },
//   {
//     id: "ea-002",
//     name: "Bamboo Sunglasses",
//     price: 69.99,
//     discountPrice: 55.99,
//     description: "Stylish sunglasses with bamboo frames and polarized lenses",
//     images: [
//       "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=400&fit=crop&crop=center",
//     ],
//     category: "Eco Accessories",
//     rating: 4.7,
//     tags: ["Bamboo", "Polarized", "Stylish"],
//     isEco: true,
//   },
//   {
//     id: "ea-003",
//     name: "Recycled Plastic Backpack",
//     price: 89.99,
//     description:
//       "Durable backpack made from recycled plastic bottles with laptop compartment",
//     images: [
//       "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop&crop=center",
//     ],
//     category: "Eco Accessories",
//     rating: 4.9,
//     tags: ["Recycled Plastic", "Durable", "Laptop Compartment"],
//     isEco: true,
//   },
//   {
//     id: "ea-004",
//     name: "Cork Wallet",
//     price: 39.99,
//     discountPrice: 31.99,
//     description:
//       "Minimalist wallet made from sustainable cork with RFID blocking",
//     images: [
//       "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop&crop=center",
//     ],
//     category: "Eco Accessories",
//     rating: 4.6,
//     tags: ["Cork", "RFID Blocking", "Minimalist"],
//     isEco: true,
//   },
//   {
//     id: "ea-005",
//     name: "Hemp Crossbody Bag",
//     price: 54.99,
//     description:
//       "Versatile crossbody bag made from organic hemp with adjustable strap",
//     images: [
//       "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop&crop=center",
//     ],
//     category: "Eco Accessories",
//     rating: 4.8,
//     tags: ["Hemp", "Crossbody", "Adjustable"],
//     isEco: true,
//   },
//   {
//     id: "ea-006",
//     name: "Wooden Watch",
//     price: 129.99,
//     discountPrice: 103.99,
//     description:
//       "Handcrafted wooden watch with sustainable wood and Swiss movement",
//     images: [
//       "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=400&fit=crop&crop=center",
//     ],
//     category: "Eco Accessories",
//     rating: 4.5,
//     tags: ["Wooden", "Handcrafted", "Swiss Movement"],
//     isNew: true,
//     isEco: true,
//   },
//   {
//     id: "ea-007",
//     name: "Recycled Rubber Phone Case",
//     price: 24.99,
//     description:
//       "Protective phone case made from recycled rubber with shock absorption",
//     images: [
//       "https://images.unsplash.com/photo-1601593346740-925612772716?w=400&h=400&fit=crop&crop=center",
//     ],
//     category: "Eco Accessories",
//     rating: 4.7,
//     tags: ["Recycled Rubber", "Protective", "Shock Absorption"],
//     isEco: true,
//   },
//   {
//     id: "ea-008",
//     name: "Organic Cotton Scarf",
//     price: 44.99,
//     discountPrice: 35.99,
//     description:
//       "Soft scarf made from organic cotton with natural dyes and fringe details",
//     images: [
//       "https://images.unsplash.com/photo-1582142306909-195724d09c7c?w=400&h=400&fit=crop&crop=center",
//     ],
//     category: "Eco Accessories",
//     rating: 4.8,
//     tags: ["Organic Cotton", "Natural Dyes", "Soft"],
//     isEco: true,
//   },

//   // Natural Food & Beverages Products (8)
//   {
//     id: "nfb-001",
//     name: "Organic Herbal Tea Set",
//     price: 32.99,
//     discountPrice: 26.99,
//     description: "Collection of 8 organic herbal teas in compostable packaging",
//     images: [
//       "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=400&fit=crop&crop=center",
//     ],
//     category: "Natural Food & Beverages",
//     rating: 4.9,
//     tags: ["Organic", "Herbal", "Compostable"],
//     isNew: true,
//     isEco: true,
//   },
//   {
//     id: "nfb-002",
//     name: "Raw Organic Honey",
//     price: 18.99,
//     description:
//       "Pure raw honey from local beekeepers with sustainable practices",
//     images: [
//       "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&h=400&fit=crop&crop=center",
//     ],
//     category: "Natural Food & Beverages",
//     rating: 4.8,
//     tags: ["Raw", "Local", "Sustainable"],
//     isEco: true,
//   },
//   {
//     id: "nfb-003",
//     name: "Organic Coconut Oil",
//     price: 24.99,
//     discountPrice: 19.99,
//     description: "Cold-pressed virgin coconut oil in recyclable glass jar",
//     images: [
//       "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=400&fit=crop&crop=center",
//     ],
//     category: "Natural Food & Beverages",
//     rating: 4.7,
//     tags: ["Cold-pressed", "Virgin", "Glass Jar"],
//     isEco: true,
//   },
//   {
//     id: "nfb-004",
//     name: "Organic Protein Powder",
//     price: 45.99,
//     description: "Plant-based protein powder with organic pea and hemp protein",
//     images: [
//       "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=400&fit=crop&crop=center",
//     ],
//     category: "Natural Food & Beverages",
//     rating: 4.6,
//     tags: ["Plant-based", "Pea Protein", "Hemp"],
//     isEco: true,
//   },
//   {
//     id: "nfb-005",
//     name: "Fair Trade Coffee Beans",
//     price: 28.99,
//     discountPrice: 23.99,
//     description:
//       "Single-origin coffee beans with fair trade and organic certification",
//     images: [
//       "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=400&fit=crop&crop=center",
//     ],
//     category: "Natural Food & Beverages",
//     rating: 4.9,
//     tags: ["Fair Trade", "Single-origin", "Organic"],
//     isEco: true,
//   },
//   {
//     id: "nfb-006",
//     name: "Organic Nut Butter Trio",
//     price: 39.99,
//     description: "Set of 3 organic nut butters: almond, peanut, and cashew",
//     images: [
//       "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=400&h=400&fit=crop&crop=center",
//     ],
//     category: "Natural Food & Beverages",
//     rating: 4.8,
//     tags: ["Organic", "Nut Butter", "Set of 3"],
//     isEco: true,
//   },
//   {
//     id: "nfb-007",
//     name: "Kombucha Starter Kit",
//     price: 34.99,
//     discountPrice: 27.99,
//     description: "Complete kit to brew your own organic kombucha at home",
//     images: [
//       "https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=400&h=400&fit=crop&crop=center",
//     ],
//     category: "Natural Food & Beverages",
//     rating: 4.5,
//     tags: ["Kombucha", "DIY", "Organic"],
//     isNew: true,
//     isEco: true,
//   },
//   {
//     id: "nfb-008",
//     name: "Organic Superfood Powder",
//     price: 42.99,
//     description:
//       "Blend of organic superfoods: spirulina, chlorella, and wheatgrass",
//     images: [
//       "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=400&fit=crop&crop=center",
//     ],
//     category: "Natural Food & Beverages",
//     rating: 4.7,
//     tags: ["Superfood", "Spirulina", "Chlorella"],
//     isEco: true,
//   },

//   // Eco Baby & Kids Products (8)
//   {
//     id: "ebk-001",
//     name: "Organic Cotton Baby Onesies",
//     price: 35.99,
//     discountPrice: 28.99,
//     description:
//       "Set of 3 baby onesies made from GOTS certified organic cotton",
//     images: [
//       "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&h=400&fit=crop&crop=center",
//     ],
//     category: "Eco Baby & Kids",
//     rating: 4.9,
//     tags: ["Organic Cotton", "GOTS Certified", "Baby"],
//     isEco: true,
//   },
//   {
//     id: "ebk-002",
//     name: "Wooden Toy Building Blocks",
//     price: 48.99,
//     description:
//       "Natural wooden building blocks made from sustainably sourced wood",
//     images: [
//       "https://images.unsplash.com/photo-1558877385-09c4d6c8b4c6?w=400&h=400&fit=crop&crop=center",
//     ],
//     category: "Eco Baby & Kids",
//     rating: 4.8,
//     tags: ["Wooden", "Sustainable", "Building Blocks"],
//     isEco: true,
//   },
//   {
//     id: "ebk-003",
//     name: "Bamboo Baby Dinnerware Set",
//     price: 29.99,
//     discountPrice: 23.99,
//     description: "Complete baby dinnerware set made from bamboo fiber",
//     images: [
//       "https://images.unsplash.com/photo-1576089626100-4e2e7a60d6e2?w=400&h=400&fit=crop&crop=center",
//     ],
//     category: "Eco Baby & Kids",
//     rating: 4.7,
//     tags: ["Bamboo Fiber", "Baby", "Dinnerware"],
//     isNew: true,
//     isEco: true,
//   },
//   {
//     id: "ebk-004",
//     name: "Organic Cotton Baby Blanket",
//     price: 54.99,
//     description: "Soft baby blanket made from organic cotton with natural dyes",
//     images: [
//       "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&h=400&fit=crop&crop=center",
//     ],
//     category: "Eco Baby & Kids",
//     rating: 4.9,
//     tags: ["Organic Cotton", "Natural Dyes", "Soft"],
//     isEco: true,
//   },
//   {
//     id: "ebk-005",
//     name: "Natural Rubber Teething Toy",
//     price: 22.99,
//     discountPrice: 18.99,
//     description: "Safe teething toy made from 100% natural rubber",
//     images: [
//       "https://images.unsplash.com/photo-1558877385-09c4d6c8b4c6?w=400&h=400&fit=crop&crop=center",
//     ],
//     category: "Eco Baby & Kids",
//     rating: 4.6,
//     tags: ["Natural Rubber", "Teething", "Safe"],
//     isEco: true,
//   },
//   {
//     id: "ebk-006",
//     name: "Organic Baby Lotion",
//     price: 19.99,
//     description:
//       "Gentle baby lotion with organic ingredients and no harmful chemicals",
//     images: [
//       "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop&crop=center",
//     ],
//     category: "Eco Baby & Kids",
//     rating: 4.8,
//     tags: ["Organic", "Gentle", "Chemical-free"],
//     isEco: true,
//   },
//   {
//     id: "ebk-007",
//     name: "Wooden Puzzle Set",
//     price: 32.99,
//     discountPrice: 26.99,
//     description:
//       "Educational wooden puzzle set for toddlers with non-toxic finish",
//     images: [
//       "https://images.unsplash.com/photo-1558877385-09c4d6c8b4c6?w=400&h=400&fit=crop&crop=center",
//     ],
//     category: "Eco Baby & Kids",
//     rating: 4.7,
//     tags: ["Wooden", "Educational", "Non-toxic"],
//     isEco: true,
//   },
//   {
//     id: "ebk-008",
//     name: "Organic Cotton Stuffed Animal",
//     price: 38.99,
//     description:
//       "Cuddly stuffed animal made from organic cotton with natural filling",
//     images: [
//       "https://images.unsplash.com/photo-1558877385-09c4d6c8b4c6?w=400&h=400&fit=crop&crop=center",
//     ],
//     category: "Eco Baby & Kids",
//     rating: 4.9,
//     tags: ["Organic Cotton", "Cuddly", "Natural Filling"],
//     isNew: true,
//     isEco: true,
//   },

//   // Green Office Supplies Products (8)
//   {
//     id: "gos-001",
//     name: "Bamboo Desk Organizer",
//     price: 42.99,
//     discountPrice: 34.99,
//     description:
//       "Multi-compartment desk organizer made from sustainable bamboo",
//     images: [
//       "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop&crop=center",
//     ],
//     category: "Green Office Supplies",
//     rating: 4.8,
//     tags: ["Bamboo", "Multi-compartment", "Sustainable"],
//     isEco: true,
//   },
//   {
//     id: "gos-002",
//     name: "Recycled Paper Notebooks",
//     price: 24.99,
//     description:
//       "Set of 3 notebooks made from 100% recycled paper with soy-based ink",
//     images: [
//       "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=400&fit=crop&crop=center",
//     ],
//     category: "Green Office Supplies",
//     rating: 4.7,
//     tags: ["Recycled Paper", "Soy-based Ink", "Set of 3"],
//     isEco: true,
//   },
//   {
//     id: "gos-003",
//     name: "Cork Mouse Pad",
//     price: 18.99,
//     discountPrice: 14.99,
//     description:
//       "Natural cork mouse pad with smooth surface and anti-slip base",
//     images: [
//       "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop&crop=center",
//     ],
//     category: "Green Office Supplies",
//     rating: 4.6,
//     tags: ["Cork", "Anti-slip", "Smooth Surface"],
//     isNew: true,
//     isEco: true,
//   },
//   {
//     id: "gos-004",
//     name: "Wooden Pen Holder",
//     price: 28.99,
//     description:
//       "Handcrafted pen holder made from reclaimed wood with natural finish",
//     images: [
//       "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop&crop=center",
//     ],
//     category: "Green Office Supplies",
//     rating: 4.9,
//     tags: ["Reclaimed Wood", "Handcrafted", "Natural Finish"],
//     isEco: true,
//   },
//   {
//     id: "gos-005",
//     name: "Eco-Friendly Sticky Notes",
//     price: 16.99,
//     discountPrice: 13.99,
//     description:
//       "Plant-based sticky notes with natural adhesive and biodegradable paper",
//     images: [
//       "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=400&fit=crop&crop=center",
//     ],
//     category: "Green Office Supplies",
//     rating: 4.5,
//     tags: ["Plant-based", "Natural Adhesive", "Biodegradable"],
//     isEco: true,
//   },
//   {
//     id: "gos-006",
//     name: "Bamboo Wireless Keyboard",
//     price: 89.99,
//     description: "Wireless keyboard with bamboo keys and recycled plastic base",
//     images: [
//       "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop&crop=center",
//     ],
//     category: "Green Office Supplies",
//     rating: 4.8,
//     tags: ["Bamboo Keys", "Wireless", "Recycled Plastic"],
//     isEco: true,
//   },
//   {
//     id: "gos-007",
//     name: "Recycled Plastic File Folders",
//     price: 21.99,
//     discountPrice: 17.99,
//     description: "Set of 12 file folders made from recycled plastic bottles",
//     images: [
//       "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=400&fit=crop&crop=center",
//     ],
//     category: "Green Office Supplies",
//     rating: 4.7,
//     tags: ["Recycled Plastic", "File Folders", "Set of 12"],
//     isEco: true,
//   },
//   {
//     id: "gos-008",
//     name: "Solar Calculator",
//     price: 35.99,
//     description:
//       "Solar-powered calculator with backup battery and durable construction",
//     images: [
//       "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop&crop=center",
//     ],
//     category: "Green Office Supplies",
//     rating: 4.6,
//     tags: ["Solar-powered", "Backup Battery", "Durable"],
//     isNew: true,
//     isEco: true,
//   },

//   // Sustainable Travel Products (8)
//   {
//     id: "st-001",
//     name: "Collapsible Water Bottle",
//     price: 26.99,
//     discountPrice: 21.99,
//     description: "Space-saving silicone water bottle that collapses when empty",
//     images: [
//       "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop&crop=center",
//     ],
//     category: "Sustainable Travel",
//     rating: 4.8,
//     tags: ["Collapsible", "Silicone", "Space-saving"],
//     isEco: true,
//   },
//   {
//     id: "st-002",
//     name: "Bamboo Travel Cutlery Set",
//     price: 19.99,
//     description: "Portable cutlery set with bamboo utensils and carrying pouch",
//     images: [
//       "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop&crop=center",
//     ],
//     category: "Sustainable Travel",
//     rating: 4.7,
//     tags: ["Bamboo", "Portable", "Carrying Pouch"],
//     isEco: true,
//   },
//   {
//     id: "st-003",
//     name: "Organic Cotton Travel Towel",
//     price: 32.99,
//     discountPrice: 26.99,
//     description:
//       "Quick-dry travel towel made from organic cotton with compact design",
//     images: [
//       "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=400&fit=crop&crop=center",
//     ],
//     category: "Sustainable Travel",
//     rating: 4.6,
//     tags: ["Organic Cotton", "Quick-dry", "Compact"],
//     isNew: true,
//     isEco: true,
//   },
//   {
//     id: "st-004",
//     name: "Solar Travel Charger",
//     price: 65.99,
//     description:
//       "Portable solar charger with multiple USB ports and weather resistance",
//     images: [
//       "https://images.unsplash.com/photo-1609592806529-a8070e96b0ed?w=400&h=400&fit=crop&crop=center",
//     ],
//     category: "Sustainable Travel",
//     rating: 4.9,
//     tags: ["Solar", "Multiple USB", "Weather Resistant"],
//     isEco: true,
//   },
//   {
//     id: "st-005",
//     name: "Hemp Travel Backpack",
//     price: 119.99,
//     discountPrice: 95.99,
//     description:
//       "Durable travel backpack made from hemp fiber with multiple compartments",
//     images: [
//       "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop&crop=center",
//     ],
//     category: "Sustainable Travel",
//     rating: 4.8,
//     tags: ["Hemp Fiber", "Durable", "Multiple Compartments"],
//     isEco: true,
//   },
//   {
//     id: "st-006",
//     name: "Biodegradable Toiletry Kit",
//     price: 38.99,
//     description:
//       "Complete toiletry kit with biodegradable products in recyclable containers",
//     images: [
//       "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop&crop=center",
//     ],
//     category: "Sustainable Travel",
//     rating: 4.5,
//     tags: ["Biodegradable", "Complete Kit", "Recyclable"],
//     isEco: true,
//   },
//   {
//     id: "st-007",
//     name: "Reusable Travel Containers",
//     price: 24.99,
//     discountPrice: 19.99,
//     description: "Set of leak-proof containers made from recycled materials",
//     images: [
//       "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop&crop=center",
//     ],
//     category: "Sustainable Travel",
//     rating: 4.7,
//     tags: ["Leak-proof", "Recycled Materials", "Set"],
//     isEco: true,
//   },
//   {
//     id: "st-008",
//     name: "Eco-Friendly Luggage Tags",
//     price: 14.99,
//     description:
//       "Durable luggage tags made from recycled leather with secure closure",
//     images: [
//       "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop&crop=center",
//     ],
//     category: "Sustainable Travel",
//     rating: 4.6,
//     tags: ["Recycled Leather", "Durable", "Secure Closure"],
//     isNew: true,
//     isEco: true,
//   },

//   // Renewable Energy Products (8)
//   {
//     id: "re-001",
//     name: "Portable Solar Panel Kit",
//     price: 189.99,
//     discountPrice: 151.99,
//     description:
//       "Foldable solar panel kit with charge controller and battery pack",
//     images: [
//       "https://images.unsplash.com/photo-1609592806529-a8070e96b0ed?w=400&h=400&fit=crop&crop=center",
//     ],
//     category: "Renewable Energy",
//     rating: 4.9,
//     tags: ["Solar Panel", "Foldable", "Battery Pack"],
//     isEco: true,
//   },
//   {
//     id: "re-002",
//     name: "Wind-Powered Phone Charger",
//     price: 79.99,
//     description: "Portable wind turbine charger for outdoor adventures",
//     images: [
//       "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop&crop=center",
//     ],
//     category: "Renewable Energy",
//     rating: 4.6,
//     tags: ["Wind Turbine", "Portable", "Outdoor"],
//     isEco: true,
//   },
//   {
//     id: "re-003",
//     name: "Solar Garden Light Set",
//     price: 89.99,
//     discountPrice: 71.99,
//     description: "Set of 10 solar-powered garden lights with automatic sensors",
//     images: [
//       "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop&crop=center",
//     ],
//     category: "Renewable Energy",
//     rating: 4.8,
//     tags: ["Solar-powered", "Garden Lights", "Automatic Sensors"],
//     isNew: true,
//     isEco: true,
//   },
//   {
//     id: "re-004",
//     name: "Energy Monitoring Device",
//     price: 124.99,
//     description: "Smart device to monitor and reduce home energy consumption",
//     images: [
//       "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=400&fit=crop&crop=center",
//     ],
//     category: "Renewable Energy",
//     rating: 4.7,
//     tags: ["Energy Monitoring", "Smart Device", "Home"],
//     isEco: true,
//   },
//   {
//     id: "re-005",
//     name: "Solar Water Heater",
//     price: 299.99,
//     discountPrice: 239.99,
//     description: "Compact solar water heater for camping and outdoor use",
//     images: [
//       "https://images.unsplash.com/photo-1609592806529-a8070e96b0ed?w=400&h=400&fit=crop&crop=center",
//     ],
//     category: "Renewable Energy",
//     rating: 4.5,
//     tags: ["Solar Water Heater", "Camping", "Compact"],
//     isEco: true,
//   },
//   {
//     id: "re-006",
//     name: "Hand Crank Generator",
//     price: 156.99,
//     description: "Manual generator for emergency power and off-grid living",
//     images: [
//       "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop&crop=center",
//     ],
//     category: "Renewable Energy",
//     rating: 4.8,
//     tags: ["Hand Crank", "Emergency Power", "Off-grid"],
//     isEco: true,
//   },
//   {
//     id: "re-007",
//     name: "Solar Lantern with Radio",
//     price: 49.99,
//     discountPrice: 39.99,
//     description:
//       "Multi-function solar lantern with AM/FM radio and USB charging",
//     images: [
//       "https://images.unsplash.com/photo-1609592806529-a8070e96b0ed?w=400&h=400&fit=crop&crop=center",
//     ],
//     category: "Renewable Energy",
//     rating: 4.7,
//     tags: ["Solar Lantern", "AM/FM Radio", "USB Charging"],
//     isEco: true,
//   },
//   {
//     id: "re-008",
//     name: "Micro Wind Turbine",
//     price: 199.99,
//     description:
//       "Small wind turbine for residential renewable energy generation",
//     images: [
//       "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop&crop=center",
//     ],
//     category: "Renewable Energy",
//     rating: 4.6,
//     tags: ["Wind Turbine", "Residential", "Energy Generation"],
//     isNew: true,
//     isEco: true,
//   },

//   // Zero Waste Living Products (8)
//   {
//     id: "zwl-001",
//     name: "Stainless Steel Straws Set",
//     price: 12.99,
//     discountPrice: 9.99,
//     description:
//       "Set of 4 reusable straws with cleaning brush and carrying pouch",
//     images: [
//       "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop&crop=center",
//     ],
//     category: "Zero Waste Living",
//     rating: 4.8,
//     tags: ["Stainless Steel", "Reusable", "Cleaning Brush"],
//     isEco: true,
//   },
//   {
//     id: "zwl-002",
//     name: "Beeswax Food Wraps",
//     price: 22.99,
//     description: "Set of 3 beeswax wraps to replace plastic wrap and bags",
//     images: [
//       "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop&crop=center",
//     ],
//     category: "Zero Waste Living",
//     rating: 4.7,
//     tags: ["Beeswax", "Food Wraps", "Plastic Alternative"],
//     isEco: true,
//   },
//   {
//     id: "zwl-003",
//     name: "Reusable Produce Bags",
//     price: 18.99,
//     discountPrice: 14.99,
//     description: "Set of 6 mesh produce bags made from organic cotton",
//     images: [
//       "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop&crop=center",
//     ],
//     category: "Zero Waste Living",
//     rating: 4.9,
//     tags: ["Mesh", "Organic Cotton", "Produce Bags"],
//     isNew: true,
//     isEco: true,
//   },
//   {
//     id: "zwl-004",
//     name: "Bamboo Toothbrush Pack",
//     price: 16.99,
//     description:
//       "Pack of 4 biodegradable bamboo toothbrushes with soft bristles",
//     images: [
//       "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop&crop=center",
//     ],
//     category: "Zero Waste Living",
//     rating: 4.6,
//     tags: ["Bamboo", "Biodegradable", "Soft Bristles"],
//     isEco: true,
//   },
//   {
//     id: "zwl-005",
//     name: "Glass Storage Containers",
//     price: 49.99,
//     discountPrice: 39.99,
//     description: "Set of 8 borosilicate glass containers with airtight lids",
//     images: [
//       "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop&crop=center",
//     ],
//     category: "Zero Waste Living",
//     rating: 4.8,
//     tags: ["Borosilicate Glass", "Airtight", "Set of 8"],
//     isEco: true,
//   },
//   {
//     id: "zwl-006",
//     name: "Compostable Trash Bags",
//     price: 24.99,
//     description:
//       "Roll of 50 compostable trash bags made from plant-based materials",
//     images: [
//       "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&h=400&fit=crop&crop=center",
//     ],
//     category: "Zero Waste Living",
//     rating: 4.5,
//     tags: ["Compostable", "Plant-based", "50 Count"],
//     isEco: true,
//   },
//   {
//     id: "zwl-007",
//     name: "Refillable Soap Dispenser",
//     price: 28.99,
//     discountPrice: 23.99,
//     description: "Stainless steel soap dispenser with pump mechanism",
//     images: [
//       "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop&crop=center",
//     ],
//     category: "Zero Waste Living",
//     rating: 4.7,
//     tags: ["Stainless Steel", "Refillable", "Pump Mechanism"],
//     isEco: true,
//   },
//   {
//     id: "zwl-008",
//     name: "Silicone Food Storage Bags",
//     price: 32.99,
//     description:
//       "Set of 4 leak-proof silicone bags for food storage and freezing",
//     images: [
//       "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop&crop=center",
//     ],
//     category: "Zero Waste Living",
//     rating: 4.9,
//     tags: ["Silicone", "Leak-proof", "Food Storage"],
//     isNew: true,
//     isEco: true,
//   },
// ];

// export const products: Product[] = [
//   // Organic Beauty Products
//   {
//     id: "organic-face-serum-001",
//     name: "Vitamin C Brightening Serum",
//     brand: "Pure Nature",
//     price: 45,
//     originalPrice: 65,
//     discount: 31,
//     rating: 4.9,
//     reviewCount: 312,
//     images: [
//       {
//         id: "img-1",
//         src: "https://images.pexels.com/photos/5938567/pexels-photo-5938567.jpeg?auto=compress&cs=tinysrgb&w=600",
//         alt: "Vitamin C serum bottle",
//       },
//       {
//         id: "img-2",
//         src: "https://images.pexels.com/photos/7428097/pexels-photo-7428097.jpeg?auto=compress&cs=tinysrgb&w=600",
//         alt: "Serum application",
//       },
//     ],
//     features: [
//       "20% Vitamin C concentration",
//       "Organic botanical extracts",
//       "Cruelty-free and vegan",
//       "Recyclable glass packaging",
//     ],
//     colors: [],
//     sizes: [
//       { id: "30ml", label: "30ml", available: true },
//       { id: "50ml", label: "50ml", available: true },
//     ],
//     reviews: [
//       {
//         id: "review-1",
//         author: "Lisa Chen",
//         authorImage:
//           "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=48",
//         rating: 5,
//         date: "March 20, 2024",
//         comment:
//           "Amazing results after just two weeks! My skin looks brighter and more even.",
//       },
//     ],
//     description:
//       "A powerful vitamin C serum formulated with organic ingredients to brighten skin and reduce signs of aging. Made with sustainable practices and eco-friendly packaging.",
//     shipping: {
//       free: true,
//       worldwide: true,
//       estimatedDelivery: "2-4 business days",
//     },
//     payment: {
//       secure: true,
//       methods: ["Credit Card", "PayPal", "Apple Pay"],
//     },
//     inStock: true,
//     sku: "PN-VCS-001",
//     isEco: true,
//     category: "Organic Beauty",
//   },
//   {
//     id: "organic-moisturizer-002",
//     name: "Hydrating Aloe Vera Moisturizer",
//     brand: "Green Glow",
//     price: 32,
//     originalPrice: 48,
//     discount: 33,
//     rating: 4.7,
//     reviewCount: 198,
//     images: [
//       {
//         id: "img-1",
//         src: "https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg?auto=compress&cs=tinysrgb&w=600",
//         alt: "Aloe vera moisturizer jar",
//       },
//       {
//         id: "img-2",
//         src: "https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=600",
//         alt: "Moisturizer texture",
//       },
//     ],
//     features: [
//       "99% organic aloe vera",
//       "Hyaluronic acid for deep hydration",
//       "Zero plastic packaging",
//       "Suitable for sensitive skin",
//     ],
//     colors: [],
//     sizes: [
//       { id: "50ml", label: "50ml", available: true },
//       { id: "100ml", label: "100ml", available: true },
//     ],
//     reviews: [
//       {
//         id: "review-1",
//         author: "Maria Rodriguez",
//         authorImage:
//           "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=48",
//         rating: 5,
//         date: "March 15, 2024",
//         comment:
//           "Perfect for my sensitive skin. Love the sustainable packaging!",
//       },
//     ],
//     description:
//       "A deeply hydrating moisturizer with organic aloe vera and natural botanicals. Packaged in compostable materials for zero environmental impact.",
//     shipping: {
//       free: true,
//       worldwide: true,
//       estimatedDelivery: "2-4 business days",
//     },
//     payment: {
//       secure: true,
//       methods: ["Credit Card", "PayPal", "Apple Pay"],
//     },
//     inStock: true,
//     sku: "GG-AVM-002",
//     isEco: true,
//     category: "Organic Beauty",
//   },
//   {
//     id: "organic-cleanser-003",
//     name: "Gentle Foam Cleanser",
//     brand: "EcoGlow",
//     price: 28,
//     originalPrice: 42,
//     discount: 33,
//     rating: 4.8,
//     reviewCount: 267,
//     images: [
//       {
//         id: "img-1",
//         src: "https://images.pexels.com/photos/3785815/pexels-photo-3785815.jpeg?auto=compress&cs=tinysrgb&w=600",
//         alt: "Foam cleanser bottle",
//       },
//       {
//         id: "img-2",
//         src: "https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=600",
//         alt: "Cleanser foam",
//       },
//     ],
//     features: [
//       "Sulfate-free formula",
//       "Organic chamomile extract",
//       "pH balanced",
//       "Refillable container",
//     ],
//     colors: [],
//     sizes: [
//       { id: "120ml", label: "120ml", available: true },
//       { id: "200ml", label: "200ml", available: true },
//     ],
//     reviews: [
//       {
//         id: "review-1",
//         author: "Sarah Kim",
//         authorImage:
//           "https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=48",
//         rating: 5,
//         date: "March 18, 2024",
//         comment:
//           "Leaves my skin feeling clean but not stripped. The refill system is genius!",
//       },
//     ],
//     description:
//       "A gentle, sulfate-free cleanser that removes impurities while maintaining skin's natural moisture barrier. Made with certified organic ingredients.",
//     shipping: {
//       free: true,
//       worldwide: true,
//       estimatedDelivery: "2-4 business days",
//     },
//     payment: {
//       secure: true,
//       methods: ["Credit Card", "PayPal", "Apple Pay"],
//     },
//     inStock: true,
//     sku: "EG-GFC-003",
//     isEco: true,
//     category: "Organic Beauty",
//   },
//   {
//     id: "organic-sunscreen-004",
//     name: "Mineral Sunscreen SPF 50",
//     brand: "Sun Shield",
//     price: 38,
//     originalPrice: 55,
//     discount: 31,
//     rating: 4.6,
//     reviewCount: 184,
//     images: [
//       {
//         id: "img-1",
//         src: "https://images.pexels.com/photos/4465831/pexels-photo-4465831.jpeg?auto=compress&cs=tinysrgb&w=600",
//         alt: "Mineral sunscreen tube",
//       },
//       {
//         id: "img-2",
//         src: "https://images.pexels.com/photos/4465821/pexels-photo-4465821.jpeg?auto=compress&cs=tinysrgb&w=600",
//         alt: "Sunscreen application",
//       },
//     ],
//     features: [
//       "Reef-safe zinc oxide formula",
//       "Water-resistant for 80 minutes",
//       "Non-comedogenic",
//       "Biodegradable tube",
//     ],
//     colors: [],
//     sizes: [
//       { id: "60ml", label: "60ml", available: true },
//       { id: "100ml", label: "100ml", available: true },
//     ],
//     reviews: [
//       {
//         id: "review-1",
//         author: "Jake Wilson",
//         authorImage:
//           "https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=48",
//         rating: 4,
//         date: "March 12, 2024",
//         comment:
//           "Great protection without the white cast. Perfect for sensitive skin.",
//       },
//     ],
//     description:
//       "A mineral-based sunscreen that provides broad-spectrum protection while being safe for marine life. Formula contains organic botanicals and antioxidants.",
//     shipping: {
//       free: true,
//       worldwide: true,
//       estimatedDelivery: "2-4 business days",
//     },
//     payment: {
//       secure: true,
//       methods: ["Credit Card", "PayPal", "Apple Pay"],
//     },
//     inStock: true,
//     sku: "SS-MS50-004",
//     isEco: true,
//     category: "Organic Beauty",
//   },
//   {
//     id: "organic-lipbalm-005",
//     name: "Nourishing Lip Balm Set",
//     brand: "Pure Lips",
//     price: 18,
//     originalPrice: 25,
//     discount: 28,
//     rating: 4.9,
//     reviewCount: 423,
//     images: [
//       {
//         id: "img-1",
//         src: "https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg?auto=compress&cs=tinysrgb&w=600",
//         alt: "Organic lip balm set",
//       },
//       {
//         id: "img-2",
//         src: "https://images.pexels.com/photos/3785815/pexels-photo-3785815.jpeg?auto=compress&cs=tinysrgb&w=600",
//         alt: "Lip balm application",
//       },
//     ],
//     features: [
//       "Organic coconut oil base",
//       "Shea butter and beeswax",
//       "Natural flavor oils",
//       "Compostable packaging",
//     ],
//     colors: [
//       {
//         id: "clear",
//         name: "Clear",
//         value: "transparent",
//         available: true,
//       },
//       {
//         id: "tinted",
//         name: "Rose Tint",
//         value: "oklch(0.8 0.1 15)",
//         available: true,
//       },
//     ],
//     sizes: [
//       { id: "3pack", label: "3-Pack", available: true },
//       { id: "6pack", label: "6-Pack", available: true },
//     ],
//     reviews: [
//       {
//         id: "review-1",
//         author: "Emma Thompson",
//         authorImage:
//           "https://images.pexels.com/photos/1239288/pexels-photo-1239288.jpeg?auto=compress&cs=tinysrgb&w=48",
//         rating: 5,
//         date: "March 22, 2024",
//         comment: "Best lip balm I've ever used! Keeps my lips soft all day.",
//       },
//     ],
//     description:
//       "A set of nourishing lip balms made with organic ingredients. Available in clear and tinted options, perfect for daily lip care.",
//     shipping: {
//       free: true,
//       worldwide: true,
//       estimatedDelivery: "2-4 business days",
//     },
//     payment: {
//       secure: true,
//       methods: ["Credit Card", "PayPal", "Apple Pay"],
//     },
//     inStock: true,
//     sku: "PL-NLB-005",
//     isEco: true,
//     category: "Organic Beauty",
//   },
//   {
//     id: "organic-shampoo-006",
//     name: "Revitalizing Hair Shampoo",
//     brand: "Eco Hair",
//     price: 24,
//     originalPrice: 36,
//     discount: 33,
//     rating: 4.7,
//     reviewCount: 201,
//     images: [
//       {
//         id: "img-1",
//         src: "https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg?auto=compress&cs=tinysrgb&w=600",
//         alt: "Organic shampoo bottle",
//       },
//       {
//         id: "img-2",
//         src: "https://images.pexels.com/photos/3785815/pexels-photo-3785815.jpeg?auto=compress&cs=tinysrgb&w=600",
//         alt: "Shampoo lather",
//       },
//     ],
//     features: [
//       "Sulfate and paraben-free",
//       "Organic argan oil",
//       "Strengthens and repairs",
//       "Recycled bottle",
//     ],
//     colors: [],
//     sizes: [
//       { id: "250ml", label: "250ml", available: true },
//       { id: "500ml", label: "500ml", available: true },
//     ],
//     reviews: [
//       {
//         id: "review-1",
//         author: "Rachel Green",
//         authorImage:
//           "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=48",
//         rating: 5,
//         date: "March 19, 2024",
//         comment:
//           "My hair has never felt healthier! Love the natural ingredients.",
//       },
//     ],
//     description:
//       "A revitalizing shampoo formulated with organic botanicals and essential oils. Gently cleanses while nourishing hair from root to tip.",
//     shipping: {
//       free: true,
//       worldwide: true,
//       estimatedDelivery: "2-4 business days",
//     },
//     payment: {
//       secure: true,
//       methods: ["Credit Card", "PayPal", "Apple Pay"],
//     },
//     inStock: true,
//     sku: "EH-RHS-006",
//     isEco: true,
//     category: "Organic Beauty",
//   },
//   {
//     id: "organic-bodywash-007",
//     name: "Hydrating Body Wash",
//     brand: "Pure Body",
//     price: 22,
//     originalPrice: 32,
//     discount: 31,
//     rating: 4.8,
//     reviewCount: 156,
//     images: [
//       {
//         id: "img-1",
//         src: "https://images.pexels.com/photos/4465831/pexels-photo-4465831.jpeg?auto=compress&cs=tinysrgb&w=600",
//         alt: "Organic body wash bottle",
//       },
//       {
//         id: "img-2",
//         src: "https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=600",
//         alt: "Body wash foam",
//       },
//     ],
//     features: [
//       "Organic coconut oil base",
//       "Essential oil blend",
//       "Moisturizing formula",
//       "Refillable design",
//     ],
//     colors: [],
//     sizes: [
//       { id: "300ml", label: "300ml", available: true },
//       { id: "500ml", label: "500ml", available: true },
//     ],
//     reviews: [
//       {
//         id: "review-1",
//         author: "Michael Davis",
//         authorImage:
//           "https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=48",
//         rating: 5,
//         date: "March 16, 2024",
//         comment: "Leaves skin feeling soft and smells amazing. Great value!",
//       },
//     ],
//     description:
//       "A luxurious body wash with organic ingredients that cleanses and moisturizes simultaneously. Infused with natural essential oils for aromatherapy benefits.",
//     shipping: {
//       free: true,
//       worldwide: true,
//       estimatedDelivery: "2-4 business days",
//     },
//     payment: {
//       secure: true,
//       methods: ["Credit Card", "PayPal", "Apple Pay"],
//     },
//     inStock: true,
//     sku: "PB-HBW-007",
//     isEco: true,
//     category: "Organic Beauty",
//   },
//   {
//     id: "organic-facemask-008",
//     name: "Purifying Clay Face Mask",
//     brand: "Earth Pure",
//     price: 35,
//     originalPrice: 50,
//     discount: 30,
//     rating: 4.6,
//     reviewCount: 178,
//     images: [
//       {
//         id: "img-1",
//         src: "https://images.pexels.com/photos/5938567/pexels-photo-5938567.jpeg?auto=compress&cs=tinysrgb&w=600",
//         alt: "Clay face mask jar",
//       },
//       {
//         id: "img-2",
//         src: "https://images.pexels.com/photos/7428097/pexels-photo-7428097.jpeg?auto=compress&cs=tinysrgb&w=600",
//         alt: "Face mask application",
//       },
//     ],
//     features: [
//       "French green clay",
//       "Organic botanical extracts",
//       "Deep pore cleansing",
//       "Glass jar packaging",
//     ],
//     colors: [],
//     sizes: [
//       { id: "75ml", label: "75ml", available: true },
//       { id: "150ml", label: "150ml", available: true },
//     ],
//     reviews: [
//       {
//         id: "review-1",
//         author: "Ashley Brown",
//         authorImage:
//           "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=48",
//         rating: 4,
//         date: "March 14, 2024",
//         comment: "Really helps with blackheads and leaves skin feeling smooth.",
//       },
//     ],
//     description:
//       "A purifying face mask with French green clay and organic botanicals. Deep cleanses pores and removes impurities for clearer, healthier-looking skin.",
//     shipping: {
//       free: true,
//       worldwide: true,
//       estimatedDelivery: "2-4 business days",
//     },
//     payment: {
//       secure: true,
//       methods: ["Credit Card", "PayPal", "Apple Pay"],
//     },
//     inStock: true,
//     sku: "EP-PCM-008",
//     isEco: true,
//     category: "Organic Beauty",
//   },

//   // Sustainable Tech Products
//   {
//     id: "solar-charger-001",
//     name: "Portable Solar Power Bank",
//     brand: "SolarTech",
//     price: 89,
//     originalPrice: 129,
//     discount: 31,
//     rating: 4.8,
//     reviewCount: 342,
//     images: [
//       {
//         id: "img-1",
//         src: "https://images.pexels.com/photos/433308/pexels-photo-433308.jpeg?auto=compress&cs=tinysrgb&w=600",
//         alt: "Solar power bank charging",
//       },
//       {
//         id: "img-2",
//         src: "https://images.pexels.com/photos/414579/pexels-photo-414579.jpeg?auto=compress&cs=tinysrgb&w=600",
//         alt: "Solar panel detail",
//       },
//     ],
//     features: [
//       "20,000mAh battery capacity",
//       "Wireless charging capability",
//       "IP67 waterproof rating",
//       "Recycled aluminum housing",
//     ],
//     colors: [
//       {
//         id: "black",
//         name: "Matte Black",
//         value: "oklch(0.2 0 0)",
//         available: true,
//       },
//       {
//         id: "green",
//         name: "Forest Green",
//         value: "oklch(0.4 0.15 150)",
//         available: true,
//       },
//     ],
//     sizes: [],
//     reviews: [
//       {
//         id: "review-1",
//         author: "David Chen",
//         authorImage:
//           "https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=48",
//         rating: 5,
//         date: "March 21, 2024",
//         comment: "Perfect for camping trips! Charges my phone multiple times.",
//       },
//     ],
//     description:
//       "A high-capacity solar power bank with wireless charging and rugged design. Perfect for outdoor adventures and emergency backup power.",
//     shipping: {
//       free: true,
//       worldwide: true,
//       estimatedDelivery: "3-5 business days",
//     },
//     payment: {
//       secure: true,
//       methods: ["Credit Card", "PayPal", "Apple Pay"],
//     },
//     inStock: true,
//     sku: "ST-SPB-001",
//     isEco: true,
//     category: "Sustainable Tech",
//   },
//   {
//     id: "eco-speaker-002",
//     name: "Bamboo Bluetooth Speaker",
//     brand: "EcoSound",
//     price: 75,
//     originalPrice: 99,
//     discount: 24,
//     rating: 4.7,
//     reviewCount: 189,
//     images: [
//       {
//         id: "img-1",
//         src: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=600",
//         alt: "Bamboo bluetooth speaker",
//       },
//       {
//         id: "img-2",
//         src: "https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=600",
//         alt: "Speaker controls",
//       },
//     ],
//     features: [
//       "Sustainable bamboo housing",
//       "12-hour battery life",
//       "360-degree sound",
//       "Water-resistant design",
//     ],
//     colors: [
//       {
//         id: "natural",
//         name: "Natural Bamboo",
//         value: "oklch(0.85 0.05 80)",
//         available: true,
//       },
//     ],
//     sizes: [],
//     reviews: [
//       {
//         id: "review-1",
//         author: "Sophie Miller",
//         authorImage:
//           "https://images.pexels.com/photos/1239288/pexels-photo-1239288.jpeg?auto=compress&cs=tinysrgb&w=48",
//         rating: 5,
//         date: "March 18, 2024",
//         comment:
//           "Beautiful design and amazing sound quality. Love the eco-friendly materials!",
//       },
//     ],
//     description:
//       "A premium Bluetooth speaker crafted from sustainable bamboo with exceptional sound quality and long battery life.",
//     shipping: {
//       free: true,
//       worldwide: true,
//       estimatedDelivery: "3-5 business days",
//     },
//     payment: {
//       secure: true,
//       methods: ["Credit Card", "PayPal", "Apple Pay"],
//     },
//     inStock: true,
//     sku: "ES-BBS-002",
//     isEco: true,
//     category: "Sustainable Tech",
//   },
//   {
//     id: "eco-phone-case-003",
//     name: "Biodegradable Phone Case",
//     brand: "GreenGuard",
//     price: 29,
//     originalPrice: 39,
//     discount: 26,
//     rating: 4.6,
//     reviewCount: 267,
//     images: [
//       {
//         id: "img-1",
//         src: "https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=600",
//         alt: "Biodegradable phone case",
//       },
//       {
//         id: "img-2",
//         src: "https://images.pexels.com/photos/147641/pexels-photo-147641.jpeg?auto=compress&cs=tinysrgb&w=600",
//         alt: "Phone case protection",
//       },
//     ],
//     features: [
//       "Plant-based materials",
//       "Drop protection up to 6ft",
//       "Compostable within 6 months",
//       "Precise cutouts for all ports",
//     ],
//     colors: [
//       {
//         id: "earth",
//         name: "Earth Brown",
//         value: "oklch(0.6 0.1 60)",
//         available: true,
//       },
//       {
//         id: "forest",
//         name: "Forest Green",
//         value: "oklch(0.5 0.15 150)",
//         available: true,
//       },
//       {
//         id: "ocean",
//         name: "Ocean Blue",
//         value: "oklch(0.6 0.15 240)",
//         available: true,
//       },
//     ],
//     sizes: [
//       { id: "iphone15", label: "iPhone 15", available: true },
//       { id: "iphone15pro", label: "iPhone 15 Pro", available: true },
//       { id: "samsung-s24", label: "Samsung S24", available: true },
//     ],
//     reviews: [
//       {
//         id: "review-1",
//         author: "Alex Johnson",
//         authorImage:
//           "https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=48",
//         rating: 4,
//         date: "March 15, 2024",
//         comment: "Great protection and feels good knowing it's eco-friendly!",
//       },
//     ],
//     description:
//       "A fully biodegradable phone case made from plant-based materials. Provides excellent protection while being kind to the environment.",
//     shipping: {
//       free: true,
//       worldwide: true,
//       estimatedDelivery: "2-4 business days",
//     },
//     payment: {
//       secure: true,
//       methods: ["Credit Card", "PayPal", "Apple Pay"],
//     },
//     inStock: true,
//     sku: "GG-BPC-003",
//     isEco: true,
//     category: "Sustainable Tech",
//   },
//   {
//     id: "wind-charger-004",
//     name: "Mini Wind Turbine Charger",
//     brand: "WindPower",
//     price: 149,
//     originalPrice: 199,
//     discount: 25,
//     rating: 4.5,
//     reviewCount: 87,
//     images: [
//       {
//         id: "img-1",
//         src: "https://images.pexels.com/photos/433308/pexels-photo-433308.jpeg?auto=compress&cs=tinysrgb&w=600",
//         alt: "Mini wind turbine charger",
//       },
//       {
//         id: "img-2",
//         src: "https://images.pexels.com/photos/414579/pexels-photo-414579.jpeg?auto=compress&cs=tinysrgb&w=600",
//         alt: "Wind turbine in action",
//       },
//     ],
//     features: [
//       "Generates power in 7mph winds",
//       "Foldable design for portability",
//       "Built-in battery storage",
//       "Multiple device charging",
//     ],
//     colors: [
//       {
//         id: "silver",
//         name: "Aluminum Silver",
//         value: "oklch(0.8 0 0)",
//         available: true,
//       },
//     ],
//     sizes: [],
//     reviews: [
//       {
//         id: "review-1",
//         author: "Chris Wilson",
//         authorImage:
//           "https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=48",
//         rating: 4,
//         date: "March 12, 2024",
//         comment: "Innovative product! Works great on windy days at the beach.",
//       },
//     ],
//     description:
//       "A portable wind turbine that generates clean energy to charge your devices. Perfect for outdoor enthusiasts and off-grid adventures.",
//     shipping: {
//       free: true,
//       worldwide: true,
//       estimatedDelivery: "5-7 business days",
//     },
//     payment: {
//       secure: true,
//       methods: ["Credit Card", "PayPal", "Apple Pay"],
//     },
//     inStock: true,
//     sku: "WP-MWT-004",
//     isEco: true,
//     category: "Sustainable Tech",
//   },
//   {
//     id: "eco-headphones-005",
//     name: "Recycled Plastic Headphones",
//     brand: "EcoBeats",
//     price: 119,
//     originalPrice: 159,
//     discount: 25,
//     rating: 4.8,
//     reviewCount: 234,
//     images: [
//       {
//         id: "img-1",
//         src: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=600",
//         alt: "Recycled plastic headphones",
//       },
//       {
//         id: "img-2",
//         src: "https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=600",
//         alt: "Headphone comfort padding",
//       },
//     ],
//     features: [
//       "Made from 75% ocean plastic",
//       "Active noise cancellation",
//       "30-hour battery life",
//       "Comfortable memory foam",
//     ],
//     colors: [
//       {
//         id: "ocean",
//         name: "Ocean Blue",
//         value: "oklch(0.6 0.15 240)",
//         available: true,
//       },
//       {
//         id: "coral",
//         name: "Coral Pink",
//         value: "oklch(0.7 0.15 15)",
//         available: true,
//       },
//     ],
//     sizes: [],
//     reviews: [
//       {
//         id: "review-1",
//         author: "Jessica Lee",
//         authorImage:
//           "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=48",
//         rating: 5,
//         date: "March 20, 2024",
//         comment: "Incredible sound quality and I love the sustainable mission!",
//       },
//     ],
//     description:
//       "Premium headphones crafted from recycled ocean plastic with studio-quality sound and advanced noise cancellation technology.",
//     shipping: {
//       free: true,
//       worldwide: true,
//       estimatedDelivery: "3-5 business days",
//     },
//     payment: {
//       secure: true,
//       methods: ["Credit Card", "PayPal", "Apple Pay"],
//     },
//     inStock: true,
//     sku: "EB-RPH-005",
//     isEco: true,
//     category: "Sustainable Tech",
//   },
//   {
//     id: "smart-thermostat-006",
//     name: "Energy-Saving Smart Thermostat",
//     brand: "EcoControl",
//     price: 179,
//     originalPrice: 229,
//     discount: 22,
//     rating: 4.9,
//     reviewCount: 156,
//     images: [
//       {
//         id: "img-1",
//         src: "https://images.pexels.com/photos/147641/pexels-photo-147641.jpeg?auto=compress&cs=tinysrgb&w=600",
//         alt: "Smart thermostat display",
//       },
//       {
//         id: "img-2",
//         src: "https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=600",
//         alt: "Thermostat app interface",
//       },
//     ],
//     features: [
//       "Learns your schedule automatically",
//       "Saves up to 23% on energy bills",
//       "Smart home integration",
//       "Remote control via app",
//     ],
//     colors: [
//       {
//         id: "white",
//         name: "Pearl White",
//         value: "oklch(0.95 0 0)",
//         available: true,
//       },
//       {
//         id: "black",
//         name: "Carbon Black",
//         value: "oklch(0.2 0 0)",
//         available: true,
//       },
//     ],
//     sizes: [],
//     reviews: [
//       {
//         id: "review-1",
//         author: "Mark Rodriguez",
//         authorImage:
//           "https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=48",
//         rating: 5,
//         date: "March 17, 2024",
//         comment:
//           "Easy installation and already seeing savings on my energy bill!",
//       },
//     ],
//     description:
//       "An intelligent thermostat that learns your preferences and optimizes energy usage. Reduces carbon footprint while maintaining perfect comfort.",
//     shipping: {
//       free: true,
//       worldwide: true,
//       estimatedDelivery: "3-5 business days",
//     },
//     payment: {
//       secure: true,
//       methods: ["Credit Card", "PayPal", "Apple Pay"],
//     },
//     inStock: true,
//     sku: "EC-EST-006",
//     isEco: true,
//     category: "Sustainable Tech",
//   },
//   {
//     id: "solar-keyboard-007",
//     name: "Solar-Powered Wireless Keyboard",
//     brand: "SunType",
//     price: 89,
//     originalPrice: 119,
//     discount: 25,
//     rating: 4.6,
//     reviewCount: 143,
//     images: [
//       {
//         id: "img-1",
//         src: "https://images.pexels.com/photos/433308/pexels-photo-433308.jpeg?auto=compress&cs=tinysrgb&w=600",
//         alt: "Solar keyboard with panels",
//       },
//       {
//         id: "img-2",
//         src: "https://images.pexels.com/photos/414579/pexels-photo-414579.jpeg?auto=compress&cs=tinysrgb&w=600",
//         alt: "Keyboard typing experience",
//       },
//     ],
//     features: [
//       "Never needs battery replacement",
//       "Works in low light conditions",
//       "Mechanical key switches",
//       "Wireless connectivity",
//     ],
//     colors: [
//       {
//         id: "black",
//         name: "Matte Black",
//         value: "oklch(0.2 0 0)",
//         available: true,
//       },
//       {
//         id: "white",
//         name: "Arctic White",
//         value: "oklch(0.95 0 0)",
//         available: true,
//       },
//     ],
//     sizes: [],
//     reviews: [
//       {
//         id: "review-1",
//         author: "Anna Kim",
//         authorImage:
//           "https://images.pexels.com/photos/1239288/pexels-photo-1239288.jpeg?auto=compress&cs=tinysrgb&w=48",
//         rating: 4,
//         date: "March 14, 2024",
//         comment:
//           "Great typing experience and love not having to worry about batteries!",
//       },
//     ],
//     description:
//       "A premium wireless keyboard powered entirely by solar energy. Features mechanical switches and works perfectly in both bright and dim lighting.",
//     shipping: {
//       free: true,
//       worldwide: true,
//       estimatedDelivery: "3-5 business days",
//     },
//     payment: {
//       secure: true,
//       methods: ["Credit Card", "PayPal", "Apple Pay"],
//     },
//     inStock: true,
//     sku: "ST-SPK-007",
//     isEco: true,
//     category: "Sustainable Tech",
//   },
//   {
//     id: "eco-tablet-stand-008",
//     name: "Bamboo Tablet Stand",
//     brand: "EcoDesk",
//     price: 45,
//     originalPrice: 65,
//     discount: 31,
//     rating: 4.7,
//     reviewCount: 198,
//     images: [
//       {
//         id: "img-1",
//         src: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=600",
//         alt: "Bamboo tablet stand",
//       },
//       {
//         id: "img-2",
//         src: "https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=600",
//         alt: "Tablet on bamboo stand",
//       },
//     ],
//     features: [
//       "Sustainable bamboo construction",
//       "Adjustable viewing angles",
//       "Universal device compatibility",
//       "Cable management slots",
//     ],
//     colors: [
//       {
//         id: "natural",
//         name: "Natural Bamboo",
//         value: "oklch(0.85 0.05 80)",
//         available: true,
//       },
//     ],
//     sizes: [
//       { id: "small", label: "Small (7-10 inch)", available: true },
//       { id: "large", label: "Large (11-13 inch)", available: true },
//     ],
//     reviews: [
//       {
//         id: "review-1",
//         author: "Tom Wilson",
//         authorImage:
//           "https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=48",
//         rating: 5,
//         date: "March 16, 2024",
//         comment:
//           "Sturdy, beautiful, and works perfectly with my iPad. Great value!",
//       },
//     ],
//     description:
//       "An elegant tablet stand crafted from sustainable bamboo. Features adjustable angles and works with all tablet sizes and brands.",
//     shipping: {
//       free: true,
//       worldwide: true,
//       estimatedDelivery: "2-4 business days",
//     },
//     payment: {
//       secure: true,
//       methods: ["Credit Card", "PayPal", "Apple Pay"],
//     },
//     inStock: true,
//     sku: "ED-BTS-008",
//     isEco: true,
//     category: "Sustainable Tech",
//   },

//   // Eco Home & Garden Products
//   {
//     id: "compost-bin-001",
//     name: "Rotating Compost Tumbler",
//     brand: "GreenCycle",
//     price: 129,
//     originalPrice: 179,
//     discount: 28,
//     rating: 4.8,
//     reviewCount: 234,
//     images: [
//       {
//         id: "img-1",
//         src: "https://images.pexels.com/photos/4503738/pexels-photo-4503738.jpeg?auto=compress&cs=tinysrgb&w=600",
//         alt: "Rotating compost tumbler",
//       },
//       {
//         id: "img-2",
//         src: "https://images.pexels.com/photos/4503744/pexels-photo-4503744.jpeg?auto=compress&cs=tinysrgb&w=600",
//         alt: "Compost tumbler in garden",
//       },
//     ],
//     features: [
//       "Dual chamber design",
//       "Weather-resistant construction",
//       "Easy rotation mechanism",
//       "80-gallon capacity",
//     ],
//     colors: [
//       {
//         id: "green",
//         name: "Forest Green",
//         value: "oklch(0.4 0.15 150)",
//         available: true,
//       },
//       {
//         id: "black",
//         name: "Charcoal Black",
//         value: "oklch(0.2 0 0)",
//         available: true,
//       },
//     ],
//     sizes: [],
//     reviews: [
//       {
//         id: "review-1",
//         author: "Linda Garcia",
//         authorImage:
//           "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=48",
//         rating: 5,
//         date: "March 18, 2024",
//         comment: "Makes composting so easy! Got rich compost in just 6 weeks.",
//       },
//     ],
//     description:
//       "A premium rotating compost bin that accelerates decomposition and makes turning compost effortless. Perfect for creating nutrient-rich soil.",
//     shipping: {
//       free: true,
//       worldwide: true,
//       estimatedDelivery: "5-7 business days",
//     },
//     payment: {
//       secure: true,
//       methods: ["Credit Card", "PayPal", "Apple Pay"],
//     },
//     inStock: true,
//     sku: "GC-RCT-001",
//     isEco: true,
//     category: "Eco Home & Garden",
//   },
//   {
//     id: "solar-lights-002",
//     name: "Solar Garden Path Lights",
//     brand: "SolarGlow",
//     price: 59,
//     originalPrice: 89,
//     discount: 34,
//     rating: 4.6,
//     reviewCount: 189,
//     images: [
//       {
//         id: "img-1",
//         src: "https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg?auto=compress&cs=tinysrgb&w=600",
//         alt: "Solar garden path lights",
//       },
//       {
//         id: "img-2",
//         src: "https://images.pexels.com/photos/1108701/pexels-photo-1108701.jpeg?auto=compress&cs=tinysrgb&w=600",
//         alt: "Path lights illuminated at night",
//       },
//     ],
//     features: [
//       "Auto on/off at dusk/dawn",
//       "Weather-resistant design",
//       "12-hour lighting duration",
//       "Easy installation",
//     ],
//     colors: [
//       {
//         id: "warm",
//         name: "Warm White",
//         value: "oklch(0.9 0.05 80)",
//         available: true,
//       },
//       {
//         id: "cool",
//         name: "Cool White",
//         value: "oklch(0.95 0.02 240)",
//         available: true,
//       },
//     ],
//     sizes: [
//       { id: "6pack", label: "6-Pack", available: true },
//       { id: "12pack", label: "12-Pack", available: true },
//     ],
//     reviews: [
//       {
//         id: "review-1",
//         author: "Robert Chen",
//         authorImage:
//           "https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=48",
//         rating: 4,
//         date: "March 15, 2024",
//         comment: "Great value and they last all night. Easy to install too!",
//       },
//     ],
//     description:
//       "Solar-powered LED path lights that automatically illuminate your garden walkways. No wiring required - just stake into the ground.",
//     shipping: {
//       free: true,
//       worldwide: true,
//       estimatedDelivery: "3-5 business days",
//     },
//     payment: {
//       secure: true,
//       methods: ["Credit Card", "PayPal", "Apple Pay"],
//     },
//     inStock: true,
//     sku: "SG-GPL-002",
//     isEco: true,
//     category: "Eco Home & Garden",
//   },
//   {
//     id: "rain-barrel-003",
//     name: "Eco Rain Water Barrel",
//     brand: "AquaSave",
//     price: 89,
//     originalPrice: 129,
//     discount: 31,
//     rating: 4.7,
//     reviewCount: 156,
//     images: [
//       {
//         id: "img-1",
//         src: "https://images.pexels.com/photos/4503738/pexels-photo-4503738.jpeg?auto=compress&cs=tinysrgb&w=600",
//         alt: "Rain water collection barrel",
//       },
//       {
//         id: "img-2",
//         src: "https://images.pexels.com/photos/4503744/pexels-photo-4503744.jpeg?auto=compress&cs=tinysrgb&w=600",
//         alt: "Rain barrel with spigot",
//       },
//     ],
//     features: [
//       "55-gallon capacity",
//       "Food-grade plastic construction",
//       "Mosquito-proof screen",
//       "Easy-access spigot",
//     ],
//     colors: [
//       {
//         id: "green",
//         name: "Earth Green",
//         value: "oklch(0.4 0.15 150)",
//         available: true,
//       },
//       {
//         id: "brown",
//         name: "Terra Brown",
//         value: "oklch(0.5 0.1 60)",
//         available: true,
//       },
//     ],
//     sizes: [],
//     reviews: [
//       {
//         id: "review-1",
//         author: "Sarah Martinez",
//         authorImage:
//           "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=48",
//         rating: 5,
//         date: "March 20, 2024",
//         comment:
//           "Perfect for watering my garden. Easy setup and great quality!",
//       },
//     ],
//     description:
//       "A durable rain water collection system that helps conserve water and reduce utility bills. Perfect for garden irrigation and outdoor use.",
//     shipping: {
//       free: true,
//       worldwide: true,
//       estimatedDelivery: "5-7 business days",
//     },
//     payment: {
//       secure: true,
//       methods: ["Credit Card", "PayPal", "Apple Pay"],
//     },
//     inStock: true,
//     sku: "AS-RWB-003",
//     isEco: true,
//     category: "Eco Home & Garden",
//   },
//   {
//     id: "bamboo-planters-004",
//     name: "Bamboo Planter Set",
//     brand: "EcoGrow",
//     price: 45,
//     originalPrice: 65,
//     discount: 31,
//     rating: 4.8,
//     reviewCount: 201,
//     images: [
//       {
//         id: "img-1",
//         src: "https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg?auto=compress&cs=tinysrgb&w=600",
//         alt: "Bamboo planters with plants",
//       },
//       {
//         id: "img-2",
//         src: "https://images.pexels.com/photos/1172518/pexels-photo-1172518.jpeg?auto=compress&cs=tinysrgb&w=600",
//         alt: "Bamboo planter detail",
//       },
//     ],
//     features: [
//       "Sustainable bamboo construction",
//       "Natural water resistance",
//       "Multiple sizes included",
//       "Drainage holes pre-drilled",
//     ],
//     colors: [
//       {
//         id: "natural",
//         name: "Natural Bamboo",
//         value: "oklch(0.85 0.05 80)",
//         available: true,
//       },
//     ],
//     sizes: [
//       { id: "3pack", label: "3-Piece Set", available: true },
//       { id: "5pack", label: "5-Piece Set", available: true },
//     ],
//     reviews: [
//       {
//         id: "review-1",
//         author: "Jennifer Kim",
//         authorImage:
//           "https://images.pexels.com/photos/1239288/pexels-photo-1239288.jpeg?auto=compress&cs=tinysrgb&w=48",
//         rating: 5,
//         date: "March 17, 2024",
//         comment:
//           "Beautiful planters that look great on my patio. Plants are thriving!",
//       },
//     ],
//     description:
//       "A set of sustainable bamboo planters perfect for herbs, flowers, and small plants. Naturally water-resistant and environmentally friendly.",
//     shipping: {
//       free: true,
//       worldwide: true,
//       estimatedDelivery: "3-5 business days",
//     },
//     payment: {
//       secure: true,
//       methods: ["Credit Card", "PayPal", "Apple Pay"],
//     },
//     inStock: true,
//     sku: "EG-BPS-004",
//     isEco: true,
//     category: "Eco Home & Garden",
//   },
//   {
//     id: "organic-fertilizer-005",
//     name: "Organic Plant Fertilizer",
//     brand: "NatureFeed",
//     price: 24,
//     originalPrice: 35,
//     discount: 31,
//     rating: 4.9,
//     reviewCount: 298,
//     images: [
//       {
//         id: "img-1",
//         src: "https://images.pexels.com/photos/4503738/pexels-photo-4503738.jpeg?auto=compress&cs=tinysrgb&w=600",
//         alt: "Organic fertilizer package",
//       },
//       {
//         id: "img-2",
//         src: "https://images.pexels.com/photos/4503744/pexels-photo-4503744.jpeg?auto=compress&cs=tinysrgb&w=600",
//         alt: "Fertilizer granules close-up",
//       },
//     ],
//     features: [
//       "100% organic ingredients",
//       "Slow-release formula",
//       "Suitable for all plants",
//       "Pet and child safe",
//     ],
//     colors: [],
//     sizes: [
//       { id: "5lb", label: "5 lb Bag", available: true },
//       { id: "10lb", label: "10 lb Bag", available: true },
//       { id: "25lb", label: "25 lb Bag", available: true },
//     ],
//     reviews: [
//       {
//         id: "review-1",
//         author: "Michael Davis",
//         authorImage:
//           "https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=48",
//         rating: 5,
//         date: "March 19, 2024",
//         comment:
//           "My vegetables have never looked better! Truly organic results.",
//       },
//     ],
//     description:
//       "A premium organic fertilizer made from composted materials and natural minerals. Provides slow-release nutrition for healthy plant growth.",
//     shipping: {
//       free: true,
//       worldwide: true,
//       estimatedDelivery: "3-5 business days",
//     },
//     payment: {
//       secure: true,
//       methods: ["Credit Card", "PayPal", "Apple Pay"],
//     },
//     inStock: true,
//     sku: "NF-OPF-005",
//     isEco: true,
//     category: "Eco Home & Garden",
//   },
//   {
//     id: "drip-irrigation-006",
//     name: "Water-Saving Drip Kit",
//     brand: "AquaWise",
//     price: 79,
//     originalPrice: 109,
//     discount: 28,
//     rating: 4.6,
//     reviewCount: 134,
//     images: [
//       {
//         id: "img-1",
//         src: "https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg?auto=compress&cs=tinysrgb&w=600",
//         alt: "Drip irrigation system",
//       },
//       {
//         id: "img-2",
//         src: "https://images.pexels.com/photos/1108701/pexels-photo-1108701.jpeg?auto=compress&cs=tinysrgb&w=600",
//         alt: "Drip emitters on plants",
//       },
//     ],
//     features: [
//       "Saves up to 50% water usage",
//       "Covers 50 square feet",
//       "Self-regulating emitters",
//       "Easy DIY installation",
//     ],
//     colors: [
//       {
//         id: "black",
//         name: "UV-Resistant Black",
//         value: "oklch(0.2 0 0)",
//         available: true,
//       },
//     ],
//     sizes: [
//       { id: "basic", label: "Basic Kit (25 plants)", available: true },
//       { id: "extended", label: "Extended Kit (50 plants)", available: true },
//     ],
//     reviews: [
//       {
//         id: "review-1",
//         author: "Amanda Lee",
//         authorImage:
//           "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=48",
//         rating: 4,
//         date: "March 16, 2024",
//         comment:
//           "Great water conservation system. Plants stay perfectly hydrated!",
//       },
//     ],
//     description:
//       "An efficient drip irrigation system that delivers water directly to plant roots, reducing waste and ensuring optimal hydration.",
//     shipping: {
//       free: true,
//       worldwide: true,
//       estimatedDelivery: "3-5 business days",
//     },
//     payment: {
//       secure: true,
//       methods: ["Credit Card", "PayPal", "Apple Pay"],
//     },
//     inStock: true,
//     sku: "AW-WSD-006",
//     isEco: true,
//     category: "Eco Home & Garden",
//   },
//   {
//     id: "seed-starter-007",
//     name: "Biodegradable Seed Starter Pots",
//     brand: "SeedStart",
//     price: 19,
//     originalPrice: 28,
//     discount: 32,
//     rating: 4.7,
//     reviewCount: 245,
//     images: [
//       {
//         id: "img-1",
//         src: "https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg?auto=compress&cs=tinysrgb&w=600",
//         alt: "Biodegradable seed starter pots",
//       },
//       {
//         id: "img-2",
//         src: "https://images.pexels.com/photos/1172518/pexels-photo-1172518.jpeg?auto=compress&cs=tinysrgb&w=600",
//         alt: "Seedlings in starter pots",
//       },
//     ],
//     features: [
//       "100% biodegradable peat fiber",
//       "Plant directly in ground",
//       "Excellent root development",
//       "50 pots per pack",
//     ],
//     colors: [],
//     sizes: [
//       { id: "small", label: "2.25 inch (50 pots)", available: true },
//       { id: "medium", label: "3 inch (36 pots)", available: true },
//       { id: "large", label: "4 inch (24 pots)", available: true },
//     ],
//     reviews: [
//       {
//         id: "review-1",
//         author: "Kevin Brown",
//         authorImage:
//           "https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=48",
//         rating: 5,
//         date: "March 21, 2024",
//         comment:
//           "Perfect for starting my vegetable garden. Great germination rates!",
//       },
//     ],
//     description:
//       "Eco-friendly seed starter pots made from biodegradable peat fiber. Plant directly in the ground - pots decompose naturally to nourish plants.",
//     shipping: {
//       free: true,
//       worldwide: true,
//       estimatedDelivery: "2-4 business days",
//     },
//     payment: {
//       secure: true,
//       methods: ["Credit Card", "PayPal", "Apple Pay"],
//     },
//     inStock: true,
//     sku: "SS-BSP-007",
//     isEco: true,
//     category: "Eco Home & Garden",
//   },
//   {
//     id: "natural-mulch-008",
//     name: "Organic Cedar Mulch",
//     brand: "EcoMulch",
//     price: 32,
//     originalPrice: 45,
//     discount: 29,
//     rating: 4.8,
//     reviewCount: 187,
//     images: [
//       {
//         id: "img-1",
//         src: "https://images.pexels.com/photos/4503738/pexels-photo-4503738.jpeg?auto=compress&cs=tinysrgb&w=600",
//         alt: "Cedar mulch spread in garden",
//       },
//       {
//         id: "img-2",
//         src: "https://images.pexels.com/photos/4503744/pexels-photo-4503744.jpeg?auto=compress&cs=tinysrgb&w=600",
//         alt: "Close-up of cedar mulch texture",
//       },
//     ],
//     features: [
//       "Natural pest repellent properties",
//       "Retains soil moisture",
//       "Slow decomposition rate",
//       "Pleasant cedar aroma",
//     ],
//     colors: [
//       {
//         id: "natural",
//         name: "Natural Cedar",
//         value: "oklch(0.7 0.08 50)",
//         available: true,
//       },
//     ],
//     sizes: [
//       { id: "2cuft", label: "2 Cubic Feet", available: true },
//       { id: "3cuft", label: "3 Cubic Feet", available: true },
//     ],
//     reviews: [
//       {
//         id: "review-1",
//         author: "Diana Wilson",
//         authorImage:
//           "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=48",
//         rating: 5,
//         date: "March 14, 2024",
//         comment: "Excellent quality mulch. Keeps weeds down and smells great!",
//       },
//     ],
//     description:
//       "Premium organic cedar mulch that naturally repels insects while conserving soil moisture and suppressing weeds. Perfect for flower beds and landscaping.",
//     shipping: {
//       free: true,
//       worldwide: true,
//       estimatedDelivery: "5-7 business days",
//     },
//     payment: {
//       secure: true,
//       methods: ["Credit Card", "PayPal", "Apple Pay"],
//     },
//     inStock: true,
//     sku: "EM-OCM-008",
//     isEco: true,
//     category: "Eco Home & Garden",
//   },

//   // Sustainable Fashion Products (8 products)
//   {
//     id: "organic-cotton-tee-001",
//     name: "Organic Cotton Basic Tee",
//     brand: "EcoWear",
//     price: 28,
//     originalPrice: 40,
//     discount: 30,
//     rating: 4.8,
//     reviewCount: 324,
//     images: [
//       {
//         id: "img-1",
//         src: "https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=600",
//         alt: "Organic cotton t-shirt",
//       },
//       {
//         id: "img-2",
//         src: "https://images.pexels.com/photos/996334/pexels-photo-996334.jpeg?auto=compress&cs=tinysrgb&w=600",
//         alt: "T-shirt fabric detail",
//       },
//     ],
//     features: [
//       "GOTS certified organic cotton",
//       "Fair trade manufacturing",
//       "Natural dyes only",
//       "Pre-shrunk fabric",
//     ],
//     colors: [
//       {
//         id: "white",
//         name: "Natural White",
//         value: "oklch(0.95 0 0)",
//         available: true,
//       },
//       {
//         id: "sage",
//         name: "Sage Green",
//         value: "oklch(0.7 0.1 140)",
//         available: true,
//       },
//       {
//         id: "navy",
//         name: "Navy Blue",
//         value: "oklch(0.3 0.15 240)",
//         available: true,
//       },
//     ],
//     sizes: [
//       { id: "xs", label: "XS", available: true },
//       { id: "s", label: "S", available: true },
//       { id: "m", label: "M", available: true },
//       { id: "l", label: "L", available: true },
//       { id: "xl", label: "XL", available: true },
//     ],
//     reviews: [
//       {
//         id: "review-1",
//         author: "Taylor Swift",
//         authorImage:
//           "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=48",
//         rating: 5,
//         date: "March 18, 2024",
//         comment:
//           "Super soft and comfortable. Love knowing it's made ethically!",
//       },
//     ],
//     description:
//       "A classic organic cotton t-shirt made with GOTS certified materials and fair trade practices. Soft, comfortable, and environmentally responsible.",
//     shipping: {
//       free: true,
//       worldwide: true,
//       estimatedDelivery: "3-5 business days",
//     },
//     payment: {
//       secure: true,
//       methods: ["Credit Card", "PayPal", "Apple Pay"],
//     },
//     inStock: true,
//     sku: "EW-OCT-001",
//     isEco: true,
//     category: "Sustainable Fashion",
//   },
//   {
//     id: "st-001",
//     name: "Collapsible Water Bottle",
//     price: 26.99,
//     discountPrice: 21.99,
//     description: "Space-saving silicone water bottle that collapses when empty",
//     images: [
//       "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop&crop=center",
//     ],
//     category: "Sustainable Travel",
//     rating: 4.8,
//     tags: ["Collapsible", "Silicone", "Space-saving"],
//     isEco: true,
//   },
//   {
//     id: "st-002",
//     name: "Bamboo Travel Cutlery Set",
//     price: 19.99,
//     description: "Portable cutlery set with bamboo utensils and carrying pouch",
//     images: [
//       "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop&crop=center",
//     ],
//     category: "Sustainable Travel",
//     rating: 4.7,
//     tags: ["Bamboo", "Portable", "Carrying Pouch"],
//     isEco: true,
//   },
//   {
//     id: "st-003",
//     name: "Organic Cotton Travel Towel",
//     price: 32.99,
//     discountPrice: 26.99,
//     description:
//       "Quick-dry travel towel made from organic cotton with compact design",
//     images: [
//       "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=400&fit=crop&crop=center",
//     ],
//     category: "Sustainable Travel",
//     rating: 4.6,
//     tags: ["Organic Cotton", "Quick-dry", "Compact"],
//     isNew: true,
//     isEco: true,
//   },
//   {
//     id: "st-004",
//     name: "Solar Travel Charger",
//     price: 65.99,
//     description:
//       "Portable solar charger with multiple USB ports and weather resistance",
//     images: [
//       "https://images.unsplash.com/photo-1609592806529-a8070e96b0ed?w=400&h=400&fit=crop&crop=center",
//     ],
//     category: "Sustainable Travel",
//     rating: 4.9,
//     tags: ["Solar", "Multiple USB", "Weather Resistant"],
//     isEco: true,
//   },
//   {
//     id: "st-005",
//     name: "Hemp Travel Backpack",
//     price: 119.99,
//     discountPrice: 95.99,
//     description:
//       "Durable travel backpack made from hemp fiber with multiple compartments",
//     images: [
//       "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop&crop=center",
//     ],
//     category: "Sustainable Travel",
//     rating: 4.8,
//     tags: ["Hemp Fiber", "Durable", "Multiple Compartments"],
//     isEco: true,
//   },
//   {
//     id: "st-006",
//     name: "Biodegradable Toiletry Kit",
//     price: 38.99,
//     description:
//       "Complete toiletry kit with biodegradable products in recyclable containers",
//     images: [
//       "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop&crop=center",
//     ],
//     category: "Sustainable Travel",
//     rating: 4.5,
//     tags: ["Biodegradable", "Complete Kit", "Recyclable"],
//     isEco: true,
//   },
//   {
//     id: "st-007",
//     name: "Reusable Travel Containers",
//     price: 24.99,
//     discountPrice: 19.99,
//     description: "Set of leak-proof containers made from recycled materials",
//     images: [
//       "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop&crop=center",
//     ],
//     category: "Sustainable Travel",
//     rating: 4.7,
//     tags: ["Leak-proof", "Recycled Materials", "Set"],
//     isEco: true,
//   },
//   {
//     id: "st-008",
//     name: "Eco-Friendly Luggage Tags",
//     price: 14.99,
//     description:
//       "Durable luggage tags made from recycled leather with secure closure",
//     images: [
//       "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop&crop=center",
//     ],
//     category: "Sustainable Travel",
//     rating: 4.6,
//     tags: ["Recycled Leather", "Durable", "Secure Closure"],
//     isNew: true,
//     isEco: true,
//   },
//   // Green Sports Products (8 products)
//   {
//     id: "bamboo-yoga-mat-001",
//     name: "Natural Bamboo Yoga Mat",
//     brand: "ZenFlow",
//     price: 79,
//     originalPrice: 99,
//     discount: 20,
//     rating: 4.9,
//     reviewCount: 267,
//     images: [
//       {
//         id: "img-1",
//         src: "https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=600",
//         alt: "Bamboo yoga mat",
//       },
//       {
//         id: "img-2",
//         src: "https://images.pexels.com/photos/3822621/pexels-photo-3822621.jpeg?auto=compress&cs=tinysrgb&w=600",
//         alt: "Yoga mat in use",
//       },
//     ],
//     features: [
//       "Anti-microbial bamboo surface",
//       "Natural rubber base",
//       "Excellent grip in any condition",
//       "Biodegradable materials",
//     ],
//     colors: [
//       {
//         id: "natural",
//         name: "Natural Bamboo",
//         value: "oklch(0.85 0.05 80)",
//         available: true,
//       },
//     ],
//     sizes: [
//       { id: "standard", label: 'Standard (24" x 68")', available: true },
//       { id: "long", label: 'Long (24" x 72")', available: true },
//     ],
//     reviews: [
//       {
//         id: "review-1",
//         author: "Maya Patel",
//         authorImage:
//           "https://images.pexels.com/photos/1239288/pexels-photo-1239288.jpeg?auto=compress&cs=tinysrgb&w=48",
//         rating: 5,
//         date: "March 20, 2024",
//         comment:
//           "Perfect grip and feels amazing. Love the natural bamboo surface!",
//       },
//     ],
//     description:
//       "A premium yoga mat with natural bamboo top layer and eco-friendly rubber base. Provides superior grip and antimicrobial properties.",
//     shipping: {
//       free: true,
//       worldwide: true,
//       estimatedDelivery: "3-5 business days",
//     },
//     payment: {
//       secure: true,
//       methods: ["Credit Card", "PayPal", "Apple Pay"],
//     },
//     inStock: true,
//     sku: "ZF-BYM-001",
//     isEco: true,
//     category: "Green Sports",
//   },
//   {
//     id: "gs-001",
//     name: "Bamboo Yoga Mat",
//     price: 49.99,
//     discountPrice: 39.99,
//     description: "Non-slip yoga mat made from bamboo fiber with natural rubber base",
//     images: ["https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop&crop=center"],
//     category: "Green Sports",
//     rating: 4.7,
//     tags: ["Bamboo", "Non-slip", "Natural Rubber"],
//     isEco: true,
//   },
//   {
//     id: "gs-002",
//     name: "Recycled Ocean Plastic Water Bottle",
//     price: 22.99,
//     description: "Insulated water bottle made from recycled ocean plastic",
//     images: ["https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop&crop=center"],
//     category: "Green Sports",
//     rating: 4.8,
//     tags: ["Ocean Plastic", "Insulated", "Recycled"],
//     isEco: true,
//   },
//   {
//     id: "gs-003",
//     name: "Organic Cotton Workout Gear",
//     price: 64.99,
//     discountPrice: 51.99,
//     description: "Breathable workout set made from organic cotton with moisture-wicking",
//     images: ["https://images.unsplash.com/photo-1506629905607-297b9684b305?w=400&h=400&fit=crop&crop=center"],
//     category: "Green Sports",
//     rating: 4.6,
//     tags: ["Organic Cotton", "Moisture-wicking", "Breathable"],
//     isNew: true,
//     isEco: true,
//   },
//   {
//     id: "gs-004",
//     name: "Natural Cork Yoga Blocks",
//     price: 34.99,
//     description: "Set of 2 yoga blocks made from sustainable cork with rounded edges",
//     images: ["https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop&crop=center"],
//     category: "Green Sports",
//     rating: 4.9,
//     tags: ["Cork", "Yoga", "Sustainable"],
//     isEco: true,
//   },
//   {
//     id: "gs-005",
//     name: "Hemp Resistance Bands",
//     price: 28.99,
//     discountPrice: 23.99,
//     description: "Durable resistance bands made from hemp fiber with varying resistance levels",
//     images: ["https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&crop=center"],
//     category: "Green Sports",
//     rating: 4.5,
//     tags: ["Hemp Fiber", "Durable", "Resistance"],
//     isEco: true,
//   },
//   {
//     id: "gs-006",
//     name: "Bamboo Tennis Racket",
//     price: 149.99,
//     description: "Professional tennis racket with bamboo frame and recycled string",
//     images: ["https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop&crop=center"],
//     category: "Green Sports",
//     rating: 4.7,
//     tags: ["Bamboo Frame", "Professional", "Recycled String"],
//     isEco: true,
//   },
//   {
//     id: "gs-007",
//     name: "Organic Cotton Gym Towel",
//     price: 18.99,
//     discountPrice: 14.99,
//     description: "Quick-dry gym towel made from organic cotton with antimicrobial treatment",
//     images: ["https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&crop=center"],
//     category: "Green Sports",
//     rating: 4.8,
//     tags: ["Organic Cotton", "Quick-dry", "Antimicrobial"],
//     isEco: true,
//   },
//   {
//     id: "gs-008",
//     name: "Recycled Foam Roller",
//     price: 42.99,
//     description: "High-density foam roller made from recycled materials for muscle recovery",
//     images: ["https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&crop=center"],
//     category: "Green Sports",
//     rating: 4.6,
//     tags: ["Recycled", "High-density", "Muscle Recovery"],
//     isNew: true,
//     isEco: true,
//   },

//   // Eco Accessories
//   {
//     id: "cork-wallet-001",
//     name: "Vegan Cork Wallet",
//     brand: "CorkCraft",
//     price: 45,
//     originalPrice: 65,
//     discount: 31,
//     rating: 4.7,
//     reviewCount: 189,
//     images: [
//       {
//         id: "img-1",
//         src: "https://images.pexels.com/photos/236986/pexels-photo-236986.jpeg?auto=compress&cs=tinysrgb&w=600",
//         alt: "Cork wallet",
//       },
//       {
//         id: "img-2",
//         src: "https://images.pexels.com/photos/236988/pexels-photo-236988.jpeg?auto=compress&cs=tinysrgb&w=600",
//         alt: "Cork wallet interior",
//       },
//     ],
//     features: [
//       "Sustainable cork leather",
//       "RFID blocking technology",
//       "8 card slots + bill pocket",
//       "Cruelty-free alternative",
//     ],
//     colors: [
//       {
//         id: "natural",
//         name: "Natural Cork",
//         value: "oklch(0.75 0.08 60)",
//         available: true,
//       },
//       {
//         id: "dark",
//         name: "Dark Cork",
//         value: "oklch(0.4 0.05 60)",
//         available: true,
//       },
//     ],
//     sizes: [],
//     reviews: [
//       {
//         id: "review-1",
//         author: "James Wilson",
//         authorImage:
//           "https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=48",
//         rating: 5,
//         date: "March 17, 2024",
//         comment:
//           "Great quality and unique texture. Perfect leather alternative!",
//       },
//     ],
//     description:
//       "A stylish wallet made from sustainable cork leather with RFID protection. Offers the look and feel of leather while being completely vegan.",
//     shipping: {
//       free: true,
//       worldwide: true,
//       estimatedDelivery: "2-4 business days",
//     },
//     payment: {
//       secure: true,
//       methods: ["Credit Card", "PayPal", "Apple Pay"],
//     },
//     inStock: true,
//     sku: "CC-VCW-001",
//     isEco: true,
//     category: "Eco Accessories",
//   },
//   {
//     id: "ea-001",
//     name: "Organic Cotton Tote Bag",
//     price: 29.99,
//     discountPrice: 24.99,
//     description:
//       "Handcrafted organic cotton tote bag with natural dyes and sustainable materials",
//     images: [
//       "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop&crop=center",
//     ],
//     category: "Eco Accessories",
//     rating: 4.8,
//     tags: ["Organic", "Handcrafted", "Sustainable"],
//     isNew: true,
//     isEco: true,
//   },
//   {
//     id: "ea-002",
//     name: "Bamboo Sunglasses",
//     price: 69.99,
//     discountPrice: 55.99,
//     description: "Stylish sunglasses with bamboo frames and polarized lenses",
//     images: [
//       "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=400&fit=crop&crop=center",
//     ],
//     category: "Eco Accessories",
//     rating: 4.7,
//     tags: ["Bamboo", "Polarized", "Stylish"],
//     isEco: true,
//   },
//   {
//     id: "ea-003",
//     name: "Recycled Plastic Backpack",
//     price: 89.99,
//     description:
//       "Durable backpack made from recycled plastic bottles with laptop compartment",
//     images: [
//       "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop&crop=center",
//     ],
//     category: "Eco Accessories",
//     rating: 4.9,
//     tags: ["Recycled Plastic", "Durable", "Laptop Compartment"],
//     isEco: true,
//   },
//   {
//     id: "ea-004",
//     name: "Cork Wallet",
//     price: 39.99,
//     discountPrice: 31.99,
//     description:
//       "Minimalist wallet made from sustainable cork with RFID blocking",
//     images: [
//       "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop&crop=center",
//     ],
//     category: "Eco Accessories",
//     rating: 4.6,
//     tags: ["Cork", "RFID Blocking", "Minimalist"],
//     isEco: true,
//   },
//   {
//     id: "ea-005",
//     name: "Hemp Crossbody Bag",
//     price: 54.99,
//     description:
//       "Versatile crossbody bag made from organic hemp with adjustable strap",
//     images: [
//       "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop&crop=center",
//     ],
//     category: "Eco Accessories",
//     rating: 4.8,
//     tags: ["Hemp", "Crossbody", "Adjustable"],
//     isEco: true,
//   },
//   {
//     id: "ea-006",
//     name: "Wooden Watch",
//     price: 129.99,
//     discountPrice: 103.99,
//     description:
//       "Handcrafted wooden watch with sustainable wood and Swiss movement",
//     images: [
//       "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=400&fit=crop&crop=center",
//     ],
//     category: "Eco Accessories",
//     rating: 4.5,
//     tags: ["Wooden", "Handcrafted", "Swiss Movement"],
//     isNew: true,
//     isEco: true,
//   },
//   {
//     id: "ea-007",
//     name: "Recycled Rubber Phone Case",
//     price: 24.99,
//     description:
//       "Protective phone case made from recycled rubber with shock absorption",
//     images: [
//       "https://images.unsplash.com/photo-1601593346740-925612772716?w=400&h=400&fit=crop&crop=center",
//     ],
//     category: "Eco Accessories",
//     rating: 4.7,
//     tags: ["Recycled Rubber", "Protective", "Shock Absorption"],
//     isEco: true,
//   },
//   {
//     id: "ea-008",
//     name: "Organic Cotton Scarf",
//     price: 44.99,
//     discountPrice: 35.99,
//     description:
//       "Soft scarf made from organic cotton with natural dyes and fringe details",
//     images: [
//       "https://images.unsplash.com/photo-1582142306909-195724d09c7c?w=400&h=400&fit=crop&crop=center",
//     ],
//     category: "Eco Accessories",
//     rating: 4.8,
//     tags: ["Organic Cotton", "Natural Dyes", "Soft"],
//     isEco: true,
//   },

// ];

// Star rating component
