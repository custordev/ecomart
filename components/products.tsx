"use client";
import type React from "react";
import { useState } from "react";
import {
  Search,
  Grid,
  List,
  ChevronDown,
  Heart,
  ShoppingCart,
  Sliders,
  Leaf,
} from "lucide-react";

// Product type definition
type Product = {
  id: string;
  name: string;
  price: number;
  discountPrice?: number;
  description: string;
  images: string[];
  category: string;
  rating: number;
  favorite?: boolean;
  isNew?: boolean;
  isEco?: boolean;
  tags?: string[];
};
export interface SimpleProduct {
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

// Sample eco-friendly product data

export const allProducts: SimpleProduct[] = [
  // Organic Beauty Products (8)
  {
    id: "ob-001",
    name: "Organic Rose Face Serum",
    price: 45.99,
    discountPrice: 36.99,
    description:
      "Anti-aging serum with organic rose hip oil and vitamin C for radiant skin",
    images: [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop&crop=center",
    ],
    category: "Organic Beauty",
    rating: 4.8,
    tags: ["Organic", "Anti-aging", "Vitamin C"],
    isNew: true,
    isEco: true,
  },
  {
    id: "ob-002",
    name: "Natural Charcoal Face Mask",
    price: 24.99,
    description:
      "Detoxifying face mask with activated charcoal and organic clay",
    images: [
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=400&fit=crop&crop=center",
    ],
    category: "Organic Beauty",
    rating: 4.7,
    tags: ["Charcoal", "Detox", "Natural"],
    isEco: true,
  },
  {
    id: "ob-003",
    name: "Coconut Oil Hair Treatment",
    price: 18.99,
    discountPrice: 14.99,
    description:
      "Nourishing hair treatment with organic coconut oil and essential oils",
    images: [
      "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=400&h=400&fit=crop&crop=center",
    ],
    category: "Organic Beauty",
    rating: 4.6,
    tags: ["Coconut Oil", "Hair Care", "Organic"],
    isEco: true,
  },
  {
    id: "ob-004",
    name: "Lavender Body Lotion",
    price: 22.99,
    description:
      "Moisturizing body lotion with organic lavender and shea butter",
    images: [
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop&crop=center",
    ],
    category: "Organic Beauty",
    rating: 4.9,
    tags: ["Lavender", "Moisturizing", "Shea Butter"],
    isEco: true,
  },
  {
    id: "ob-005",
    name: "Natural Lip Balm Set",
    price: 16.99,
    discountPrice: 12.99,
    description: "Set of 3 lip balms with organic beeswax and natural flavors",
    images: [
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop&crop=center",
    ],
    category: "Organic Beauty",
    rating: 4.5,
    tags: ["Lip Care", "Beeswax", "Natural"],
    isEco: true,
  },
  {
    id: "ob-006",
    name: "Green Tea Eye Cream",
    price: 32.99,
    description: "Anti-puffiness eye cream with organic green tea and caffeine",
    images: [
      "https://images.unsplash.com/photo-1612817288484-6f916006741a?w=400&h=400&fit=crop&crop=center",
    ],
    category: "Organic Beauty",
    rating: 4.7,
    tags: ["Green Tea", "Eye Care", "Anti-puffiness"],
    isEco: true,
  },
  {
    id: "ob-007",
    name: "Argan Oil Facial Cleanser",
    price: 28.99,
    description: "Gentle facial cleanser with organic argan oil and aloe vera",
    images: [
      "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=400&h=400&fit=crop&crop=center",
    ],
    category: "Organic Beauty",
    rating: 4.8,
    tags: ["Argan Oil", "Gentle", "Aloe Vera"],
    isEco: true,
  },

  // Sustainable Tech Products (8)

  {
    id: "st-002",
    name: "Recycled Plastic Wireless Earbuds",
    price: 149.99,
    discountPrice: 119.99,
    description:
      "Premium wireless earbuds made from ocean plastic with noise cancellation",
    images: [
      "https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=400&h=400&fit=crop&crop=center",
    ],
    category: "Sustainable Tech",
    rating: 4.8,
    tags: ["Ocean Plastic", "Wireless", "Noise Cancelling"],
    isNew: true,
    isEco: true,
  },
  {
    id: "st-003",
    name: "Bamboo Wireless Charging Pad",
    price: 34.99,
    description:
      "Qi-compatible wireless charger with sustainable bamboo housing",
    images: [
      "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop&crop=center",
    ],
    category: "Sustainable Tech",
    rating: 4.6,
    tags: ["Bamboo", "Wireless Charging", "Qi Compatible"],
    isEco: true,
  },

  {
    id: "st-005",
    name: "Biodegradable Phone Cases",
    price: 24.99,
    discountPrice: 19.99,
    description: "Compostable phone cases made from plant-based materials",
    images: [
      "https://images.unsplash.com/photo-1601593346740-925612772716?w=400&h=400&fit=crop&crop=center",
    ],
    category: "Sustainable Tech",
    rating: 4.5,
    tags: ["Biodegradable", "Plant-based", "Compostable"],
    isEco: true,
  },
  {
    id: "st-006",
    name: "Wind-Up Emergency Radio",
    price: 42.99,
    description: "Hand-crank emergency radio with solar panel and USB charging",
    images: [
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop&crop=center",
    ],
    category: "Sustainable Tech",
    rating: 4.7,
    tags: ["Hand-crank", "Emergency", "Solar"],
    isEco: true,
  },
  {
    id: "st-007",
    name: "Eco-Friendly Laptop Stand",
    price: 89.99,
    description:
      "Adjustable laptop stand made from recycled aluminum with cooling design",
    images: [
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop&crop=center",
    ],
    category: "Sustainable Tech",
    rating: 4.8,
    tags: ["Recycled Aluminum", "Adjustable", "Cooling"],
    isEco: true,
  },
  {
    id: "st-008",
    name: "Solar Bluetooth Speaker",
    price: 129.99,
    discountPrice: 104.99,
    description:
      "Waterproof Bluetooth speaker with solar charging and 360° sound",
    images: [
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop&crop=center",
    ],
    category: "Sustainable Tech",
    rating: 4.6,
    tags: ["Solar", "Waterproof", "360° Sound"],
    isNew: true,
    isEco: true,
  },

  // Eco Home & Garden Products (8)
  {
    id: "ehg-001",
    name: "Bamboo Kitchen Utensil Set",
    price: 34.99,
    discountPrice: 27.99,
    description: "Complete 7-piece kitchen set made from sustainable bamboo",
    images: [
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop&crop=center",
    ],
    category: "Eco Home & Garden",
    rating: 4.9,
    tags: ["Bamboo", "Kitchen", "Sustainable"],
    isEco: true,
  },
  {
    id: "ehg-002",
    name: "Organic Cotton Bed Sheets",
    price: 89.99,
    discountPrice: 69.99,
    description: "Luxury bed sheet set made from GOTS certified organic cotton",
    images: [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=400&fit=crop&crop=center",
    ],
    category: "Eco Home & Garden",
    rating: 4.8,
    tags: ["Organic Cotton", "GOTS Certified", "Luxury"],
    isEco: true,
  },
  {
    id: "ehg-003",
    name: "Compost Bin for Kitchen",
    price: 45.99,
    description:
      "Stainless steel compost bin with charcoal filter and easy-clean design",
    images: [
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&h=400&fit=crop&crop=center",
    ],
    category: "Eco Home & Garden",
    rating: 4.7,
    tags: ["Compost", "Stainless Steel", "Kitchen"],
    isEco: true,
  },
  {
    id: "ehg-004",
    name: "Seed Starting Kit",
    price: 28.99,
    discountPrice: 22.99,
    description:
      "Complete seed starting kit with biodegradable pots and organic soil",
    images: [
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=400&fit=crop&crop=center",
    ],
    category: "Eco Home & Garden",
    rating: 4.6,
    tags: ["Seeds", "Biodegradable", "Organic Soil"],
    isNew: true,
    isEco: true,
  },
  {
    id: "ehg-005",
    name: "Recycled Glass Storage Jars",
    price: 39.99,
    description: "Set of 6 airtight storage jars made from 100% recycled glass",
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop&crop=center",
    ],
    category: "Eco Home & Garden",
    rating: 4.8,
    tags: ["Recycled Glass", "Airtight", "Storage"],
    isEco: true,
  },

  {
    id: "ehg-007",
    name: "Solar Garden Lights",
    price: 52.99,
    description:
      "Set of 8 solar-powered LED garden lights with automatic on/off",
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop&crop=center",
    ],
    category: "Eco Home & Garden",
    rating: 4.7,
    tags: ["Solar", "LED", "Automatic"],
    isEco: true,
  },
  {
    id: "ehg-008",
    name: "Hemp Fiber Bath Towels",
    price: 64.99,
    discountPrice: 51.99,
    description: "Ultra-absorbent bath towel set made from organic hemp fiber",
    images: [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=400&fit=crop&crop=center",
    ],
    category: "Eco Home & Garden",
    rating: 4.9,
    tags: ["Hemp Fiber", "Absorbent", "Organic"],
    isEco: true,
  },

  // Sustainable Fashion Products (8)
  {
    id: "sf-001",
    name: "Organic Cotton T-Shirt",
    price: 29.99,
    discountPrice: 24.99,
    description:
      "Classic fit t-shirt made from 100% organic cotton with natural dyes",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop&crop=center",
    ],
    category: "Sustainable Fashion",
    rating: 4.8,
    tags: ["Organic Cotton", "Natural Dyes", "Classic Fit"],
    isEco: true,
  },
  {
    id: "sf-002",
    name: "Recycled Denim Jeans",
    price: 89.99,
    description:
      "Sustainable jeans made from recycled denim with eco-friendly wash",
    images: [
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&h=400&fit=crop&crop=center",
    ],
    category: "Sustainable Fashion",
    rating: 4.7,
    tags: ["Recycled Denim", "Eco-friendly", "Sustainable"],
    isEco: true,
  },
  {
    id: "sf-003",
    name: "Hemp Canvas Sneakers",
    price: 74.99,
    discountPrice: 59.99,
    description:
      "Comfortable sneakers made from hemp canvas with recycled rubber soles",
    images: [
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop&crop=center",
    ],
    category: "Sustainable Fashion",
    rating: 4.6,
    tags: ["Hemp Canvas", "Recycled Rubber", "Comfortable"],
    isNew: true,
    isEco: true,
  },
  {
    id: "sf-004",
    name: "Tencel Dress",
    price: 119.99,
    discountPrice: 95.99,
    description:
      "Elegant dress made from sustainable Tencel fabric with flowing design",
    images: [
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=400&fit=crop&crop=center",
    ],
    category: "Sustainable Fashion",
    rating: 4.9,
    tags: ["Tencel", "Elegant", "Sustainable"],
    isEco: true,
  },
  {
    id: "sf-005",
    name: "Merino Wool Cardigan",
    price: 149.99,
    description: "Soft cardigan made from ethically sourced merino wool",
    images: [
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=400&fit=crop&crop=center",
    ],
    category: "Sustainable Fashion",
    rating: 4.8,
    tags: ["Merino Wool", "Ethical", "Soft"],
    isEco: true,
  },
  {
    id: "sf-006",
    name: "Linen Button-Up Shirt",
    price: 79.99,
    discountPrice: 63.99,
    description:
      "Breathable linen shirt with mother-of-pearl buttons and relaxed fit",
    images: [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=400&fit=crop&crop=center",
    ],
    category: "Sustainable Fashion",
    rating: 4.5,
    tags: ["Linen", "Breathable", "Relaxed Fit"],
    isEco: true,
  },
  {
    id: "sf-007",
    name: "Cork Leather Belt",
    price: 54.99,
    description:
      "Vegan belt made from sustainable cork leather with metal-free buckle",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop&crop=center",
    ],
    category: "Sustainable Fashion",
    rating: 4.7,
    tags: ["Cork Leather", "Vegan", "Metal-free"],
    isEco: true,
  },
  {
    id: "sf-008",
    name: "Organic Cotton Hoodie",
    price: 89.99,
    discountPrice: 71.99,
    description:
      "Cozy hoodie made from organic cotton fleece with kangaroo pocket",
    images: [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop&crop=center",
    ],
    category: "Sustainable Fashion",
    rating: 4.8,
    tags: ["Organic Cotton", "Fleece", "Cozy"],
    isNew: true,
    isEco: true,
  },

  // Green Sports Products (8)
  {
    id: "gs-001",
    name: "Bamboo Yoga Mat",
    price: 49.99,
    discountPrice: 39.99,
    description:
      "Non-slip yoga mat made from bamboo fiber with natural rubber base",
    images: [
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop&crop=center",
    ],
    category: "Green Sports",
    rating: 4.7,
    tags: ["Bamboo", "Non-slip", "Natural Rubber"],
    isEco: true,
  },
  {
    id: "gs-002",
    name: "Recycled Ocean Plastic Water Bottle",
    price: 22.99,
    description: "Insulated water bottle made from recycled ocean plastic",
    images: [
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop&crop=center",
    ],
    category: "Green Sports",
    rating: 4.8,
    tags: ["Ocean Plastic", "Insulated", "Recycled"],
    isEco: true,
  },
  {
    id: "gs-003",
    name: "Organic Cotton Workout Gear",
    price: 64.99,
    discountPrice: 51.99,
    description:
      "Breathable workout set made from organic cotton with moisture-wicking",
    images: [
      "https://images.unsplash.com/photo-1506629905607-297b9684b305?w=400&h=400&fit=crop&crop=center",
    ],
    category: "Green Sports",
    rating: 4.6,
    tags: ["Organic Cotton", "Moisture-wicking", "Breathable"],
    isNew: true,
    isEco: true,
  },
  {
    id: "gs-004",
    name: "Natural Cork Yoga Blocks",
    price: 34.99,
    description:
      "Set of 2 yoga blocks made from sustainable cork with rounded edges",
    images: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop&crop=center",
    ],
    category: "Green Sports",
    rating: 4.9,
    tags: ["Cork", "Yoga", "Sustainable"],
    isEco: true,
  },
  {
    id: "gs-005",
    name: "Hemp Resistance Bands",
    price: 28.99,
    discountPrice: 23.99,
    description:
      "Durable resistance bands made from hemp fiber with varying resistance levels",
    images: [
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&crop=center",
    ],
    category: "Green Sports",
    rating: 4.5,
    tags: ["Hemp Fiber", "Durable", "Resistance"],
    isEco: true,
  },
  {
    id: "gs-006",
    name: "Bamboo Tennis Racket",
    price: 149.99,
    description:
      "Professional tennis racket with bamboo frame and recycled string",
    images: [
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop&crop=center",
    ],
    category: "Green Sports",
    rating: 4.7,
    tags: ["Bamboo Frame", "Professional", "Recycled String"],
    isEco: true,
  },
  {
    id: "gs-007",
    name: "Organic Cotton Gym Towel",
    price: 18.99,
    discountPrice: 14.99,
    description:
      "Quick-dry gym towel made from organic cotton with antimicrobial treatment",
    images: [
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&crop=center",
    ],
    category: "Green Sports",
    rating: 4.8,
    tags: ["Organic Cotton", "Quick-dry", "Antimicrobial"],
    isEco: true,
  },
  {
    id: "gs-008",
    name: "Recycled Foam Roller",
    price: 42.99,
    description:
      "High-density foam roller made from recycled materials for muscle recovery",
    images: [
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&crop=center",
    ],
    category: "Green Sports",
    rating: 4.6,
    tags: ["Recycled", "High-density", "Muscle Recovery"],
    isNew: true,
    isEco: true,
  },

  // Eco Accessories Products (8)
  {
    id: "ea-001",
    name: "Organic Cotton Tote Bag",
    price: 29.99,
    discountPrice: 24.99,
    description:
      "Handcrafted organic cotton tote bag with natural dyes and sustainable materials",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop&crop=center",
    ],
    category: "Eco Accessories",
    rating: 4.8,
    tags: ["Organic", "Handcrafted", "Sustainable"],
    isNew: true,
    isEco: true,
  },
  {
    id: "ea-002",
    name: "Bamboo Sunglasses",
    price: 69.99,
    discountPrice: 55.99,
    description: "Stylish sunglasses with bamboo frames and polarized lenses",
    images: [
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=400&fit=crop&crop=center",
    ],
    category: "Eco Accessories",
    rating: 4.7,
    tags: ["Bamboo", "Polarized", "Stylish"],
    isEco: true,
  },
  {
    id: "ea-003",
    name: "Recycled Plastic Backpack",
    price: 89.99,
    description:
      "Durable backpack made from recycled plastic bottles with laptop compartment",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop&crop=center",
    ],
    category: "Eco Accessories",
    rating: 4.9,
    tags: ["Recycled Plastic", "Durable", "Laptop Compartment"],
    isEco: true,
  },
  {
    id: "ea-004",
    name: "Cork Wallet",
    price: 39.99,
    discountPrice: 31.99,
    description:
      "Minimalist wallet made from sustainable cork with RFID blocking",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop&crop=center",
    ],
    category: "Eco Accessories",
    rating: 4.6,
    tags: ["Cork", "RFID Blocking", "Minimalist"],
    isEco: true,
  },
  {
    id: "ea-005",
    name: "Hemp Crossbody Bag",
    price: 54.99,
    description:
      "Versatile crossbody bag made from organic hemp with adjustable strap",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop&crop=center",
    ],
    category: "Eco Accessories",
    rating: 4.8,
    tags: ["Hemp", "Crossbody", "Adjustable"],
    isEco: true,
  },
  {
    id: "ea-006",
    name: "Wooden Watch",
    price: 129.99,
    discountPrice: 103.99,
    description:
      "Handcrafted wooden watch with sustainable wood and Swiss movement",
    images: [
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=400&fit=crop&crop=center",
    ],
    category: "Eco Accessories",
    rating: 4.5,
    tags: ["Wooden", "Handcrafted", "Swiss Movement"],
    isNew: true,
    isEco: true,
  },
  {
    id: "ea-007",
    name: "Recycled Rubber Phone Case",
    price: 24.99,
    description:
      "Protective phone case made from recycled rubber with shock absorption",
    images: [
      "https://images.unsplash.com/photo-1601593346740-925612772716?w=400&h=400&fit=crop&crop=center",
    ],
    category: "Eco Accessories",
    rating: 4.7,
    tags: ["Recycled Rubber", "Protective", "Shock Absorption"],
    isEco: true,
  },
  {
    id: "ea-008",
    name: "Organic Cotton Scarf",
    price: 44.99,
    discountPrice: 35.99,
    description:
      "Soft scarf made from organic cotton with natural dyes and fringe details",
    images: [
      "https://images.unsplash.com/photo-1582142306909-195724d09c7c?w=400&h=400&fit=crop&crop=center",
    ],
    category: "Eco Accessories",
    rating: 4.8,
    tags: ["Organic Cotton", "Natural Dyes", "Soft"],
    isEco: true,
  },

  // Natural Food & Beverages Products (8)
  {
    id: "nfb-001",
    name: "Organic Herbal Tea Set",
    price: 32.99,
    discountPrice: 26.99,
    description: "Collection of 8 organic herbal teas in compostable packaging",
    images: [
      "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=400&fit=crop&crop=center",
    ],
    category: "Natural Food & Beverages",
    rating: 4.9,
    tags: ["Organic", "Herbal", "Compostable"],
    isNew: true,
    isEco: true,
  },
  {
    id: "nfb-002",
    name: "Raw Organic Honey",
    price: 18.99,
    description:
      "Pure raw honey from local beekeepers with sustainable practices",
    images: [
      "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&h=400&fit=crop&crop=center",
    ],
    category: "Natural Food & Beverages",
    rating: 4.8,
    tags: ["Raw", "Local", "Sustainable"],
    isEco: true,
  },
  {
    id: "nfb-003",
    name: "Organic Coconut Oil",
    price: 24.99,
    discountPrice: 19.99,
    description: "Cold-pressed virgin coconut oil in recyclable glass jar",
    images: [
      "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=400&fit=crop&crop=center",
    ],
    category: "Natural Food & Beverages",
    rating: 4.7,
    tags: ["Cold-pressed", "Virgin", "Glass Jar"],
    isEco: true,
  },
  {
    id: "nfb-004",
    name: "Organic Protein Powder",
    price: 45.99,
    description: "Plant-based protein powder with organic pea and hemp protein",
    images: [
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=400&fit=crop&crop=center",
    ],
    category: "Natural Food & Beverages",
    rating: 4.6,
    tags: ["Plant-based", "Pea Protein", "Hemp"],
    isEco: true,
  },
  {
    id: "nfb-005",
    name: "Fair Trade Coffee Beans",
    price: 28.99,
    discountPrice: 23.99,
    description:
      "Single-origin coffee beans with fair trade and organic certification",
    images: [
      "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=400&fit=crop&crop=center",
    ],
    category: "Natural Food & Beverages",
    rating: 4.9,
    tags: ["Fair Trade", "Single-origin", "Organic"],
    isEco: true,
  },
  {
    id: "nfb-006",
    name: "Organic Nut Butter Trio",
    price: 39.99,
    description: "Set of 3 organic nut butters: almond, peanut, and cashew",
    images: [
      "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=400&h=400&fit=crop&crop=center",
    ],
    category: "Natural Food & Beverages",
    rating: 4.8,
    tags: ["Organic", "Nut Butter", "Set of 3"],
    isEco: true,
  },
  {
    id: "nfb-007",
    name: "Kombucha Starter Kit",
    price: 34.99,
    discountPrice: 27.99,
    description: "Complete kit to brew your own organic kombucha at home",
    images: [
      "https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=400&h=400&fit=crop&crop=center",
    ],
    category: "Natural Food & Beverages",
    rating: 4.5,
    tags: ["Kombucha", "DIY", "Organic"],
    isNew: true,
    isEco: true,
  },
  {
    id: "nfb-008",
    name: "Organic Superfood Powder",
    price: 42.99,
    description:
      "Blend of organic superfoods: spirulina, chlorella, and wheatgrass",
    images: [
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=400&fit=crop&crop=center",
    ],
    category: "Natural Food & Beverages",
    rating: 4.7,
    tags: ["Superfood", "Spirulina", "Chlorella"],
    isEco: true,
  },

  // Eco Baby & Kids Products (8)
  {
    id: "ebk-001",
    name: "Organic Cotton Baby Onesies",
    price: 35.99,
    discountPrice: 28.99,
    description:
      "Set of 3 baby onesies made from GOTS certified organic cotton",
    images: [
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&h=400&fit=crop&crop=center",
    ],
    category: "Eco Baby & Kids",
    rating: 4.9,
    tags: ["Organic Cotton", "GOTS Certified", "Baby"],
    isEco: true,
  },
  {
    id: "ebk-002",
    name: "Wooden Toy Building Blocks",
    price: 48.99,
    description:
      "Natural wooden building blocks made from sustainably sourced wood",
    images: [
      "https://images.unsplash.com/photo-1558877385-09c4d6c8b4c6?w=400&h=400&fit=crop&crop=center",
    ],
    category: "Eco Baby & Kids",
    rating: 4.8,
    tags: ["Wooden", "Sustainable", "Building Blocks"],
    isEco: true,
  },
  {
    id: "ebk-003",
    name: "Bamboo Baby Dinnerware Set",
    price: 29.99,
    discountPrice: 23.99,
    description: "Complete baby dinnerware set made from bamboo fiber",
    images: [
      "https://images.unsplash.com/photo-1576089626100-4e2e7a60d6e2?w=400&h=400&fit=crop&crop=center",
    ],
    category: "Eco Baby & Kids",
    rating: 4.7,
    tags: ["Bamboo Fiber", "Baby", "Dinnerware"],
    isNew: true,
    isEco: true,
  },
  {
    id: "ebk-004",
    name: "Organic Cotton Baby Blanket",
    price: 54.99,
    description: "Soft baby blanket made from organic cotton with natural dyes",
    images: [
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&h=400&fit=crop&crop=center",
    ],
    category: "Eco Baby & Kids",
    rating: 4.9,
    tags: ["Organic Cotton", "Natural Dyes", "Soft"],
    isEco: true,
  },
  {
    id: "ebk-005",
    name: "Natural Rubber Teething Toy",
    price: 22.99,
    discountPrice: 18.99,
    description: "Safe teething toy made from 100% natural rubber",
    images: [
      "https://images.unsplash.com/photo-1558877385-09c4d6c8b4c6?w=400&h=400&fit=crop&crop=center",
    ],
    category: "Eco Baby & Kids",
    rating: 4.6,
    tags: ["Natural Rubber", "Teething", "Safe"],
    isEco: true,
  },
  {
    id: "ebk-006",
    name: "Organic Baby Lotion",
    price: 19.99,
    description:
      "Gentle baby lotion with organic ingredients and no harmful chemicals",
    images: [
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop&crop=center",
    ],
    category: "Eco Baby & Kids",
    rating: 4.8,
    tags: ["Organic", "Gentle", "Chemical-free"],
    isEco: true,
  },
  {
    id: "ebk-007",
    name: "Wooden Puzzle Set",
    price: 32.99,
    discountPrice: 26.99,
    description:
      "Educational wooden puzzle set for toddlers with non-toxic finish",
    images: [
      "https://images.unsplash.com/photo-1558877385-09c4d6c8b4c6?w=400&h=400&fit=crop&crop=center",
    ],
    category: "Eco Baby & Kids",
    rating: 4.7,
    tags: ["Wooden", "Educational", "Non-toxic"],
    isEco: true,
  },
  {
    id: "ebk-008",
    name: "Organic Cotton Stuffed Animal",
    price: 38.99,
    description:
      "Cuddly stuffed animal made from organic cotton with natural filling",
    images: [
      "https://images.unsplash.com/photo-1558877385-09c4d6c8b4c6?w=400&h=400&fit=crop&crop=center",
    ],
    category: "Eco Baby & Kids",
    rating: 4.9,
    tags: ["Organic Cotton", "Cuddly", "Natural Filling"],
    isNew: true,
    isEco: true,
  },

  // Green Office Supplies Products (8)
  {
    id: "gos-001",
    name: "Bamboo Desk Organizer",
    price: 42.99,
    discountPrice: 34.99,
    description:
      "Multi-compartment desk organizer made from sustainable bamboo",
    images: [
      "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop&crop=center",
    ],
    category: "Green Office Supplies",
    rating: 4.8,
    tags: ["Bamboo", "Multi-compartment", "Sustainable"],
    isEco: true,
  },
  {
    id: "gos-002",
    name: "Recycled Paper Notebooks",
    price: 24.99,
    description:
      "Set of 3 notebooks made from 100% recycled paper with soy-based ink",
    images: [
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=400&fit=crop&crop=center",
    ],
    category: "Green Office Supplies",
    rating: 4.7,
    tags: ["Recycled Paper", "Soy-based Ink", "Set of 3"],
    isEco: true,
  },
  {
    id: "gos-003",
    name: "Cork Mouse Pad",
    price: 18.99,
    discountPrice: 14.99,
    description:
      "Natural cork mouse pad with smooth surface and anti-slip base",
    images: [
      "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop&crop=center",
    ],
    category: "Green Office Supplies",
    rating: 4.6,
    tags: ["Cork", "Anti-slip", "Smooth Surface"],
    isNew: true,
    isEco: true,
  },
  {
    id: "gos-004",
    name: "Wooden Pen Holder",
    price: 28.99,
    description:
      "Handcrafted pen holder made from reclaimed wood with natural finish",
    images: [
      "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop&crop=center",
    ],
    category: "Green Office Supplies",
    rating: 4.9,
    tags: ["Reclaimed Wood", "Handcrafted", "Natural Finish"],
    isEco: true,
  },
  {
    id: "gos-005",
    name: "Eco-Friendly Sticky Notes",
    price: 16.99,
    discountPrice: 13.99,
    description:
      "Plant-based sticky notes with natural adhesive and biodegradable paper",
    images: [
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=400&fit=crop&crop=center",
    ],
    category: "Green Office Supplies",
    rating: 4.5,
    tags: ["Plant-based", "Natural Adhesive", "Biodegradable"],
    isEco: true,
  },
  {
    id: "gos-006",
    name: "Bamboo Wireless Keyboard",
    price: 89.99,
    description: "Wireless keyboard with bamboo keys and recycled plastic base",
    images: [
      "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop&crop=center",
    ],
    category: "Green Office Supplies",
    rating: 4.8,
    tags: ["Bamboo Keys", "Wireless", "Recycled Plastic"],
    isEco: true,
  },
  {
    id: "gos-007",
    name: "Recycled Plastic File Folders",
    price: 21.99,
    discountPrice: 17.99,
    description: "Set of 12 file folders made from recycled plastic bottles",
    images: [
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=400&fit=crop&crop=center",
    ],
    category: "Green Office Supplies",
    rating: 4.7,
    tags: ["Recycled Plastic", "File Folders", "Set of 12"],
    isEco: true,
  },
  {
    id: "gos-008",
    name: "Solar Calculator",
    price: 35.99,
    description:
      "Solar-powered calculator with backup battery and durable construction",
    images: [
      "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop&crop=center",
    ],
    category: "Green Office Supplies",
    rating: 4.6,
    tags: ["Solar-powered", "Backup Battery", "Durable"],
    isNew: true,
    isEco: true,
  },

  // Sustainable Travel Products (8)
  {
    id: "st-001",
    name: "Collapsible Water Bottle",
    price: 26.99,
    discountPrice: 21.99,
    description: "Space-saving silicone water bottle that collapses when empty",
    images: [
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop&crop=center",
    ],
    category: "Sustainable Travel",
    rating: 4.8,
    tags: ["Collapsible", "Silicone", "Space-saving"],
    isEco: true,
  },
  {
    id: "st-002",
    name: "Bamboo Travel Cutlery Set",
    price: 19.99,
    description: "Portable cutlery set with bamboo utensils and carrying pouch",
    images: [
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop&crop=center",
    ],
    category: "Sustainable Travel",
    rating: 4.7,
    tags: ["Bamboo", "Portable", "Carrying Pouch"],
    isEco: true,
  },
  {
    id: "st-003",
    name: "Organic Cotton Travel Towel",
    price: 32.99,
    discountPrice: 26.99,
    description:
      "Quick-dry travel towel made from organic cotton with compact design",
    images: [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=400&fit=crop&crop=center",
    ],
    category: "Sustainable Travel",
    rating: 4.6,
    tags: ["Organic Cotton", "Quick-dry", "Compact"],
    isNew: true,
    isEco: true,
  },
  {
    id: "st-004",
    name: "Solar Travel Charger",
    price: 65.99,
    description:
      "Portable solar charger with multiple USB ports and weather resistance",
    images: [
      "https://images.unsplash.com/photo-1609592806529-a8070e96b0ed?w=400&h=400&fit=crop&crop=center",
    ],
    category: "Sustainable Travel",
    rating: 4.9,
    tags: ["Solar", "Multiple USB", "Weather Resistant"],
    isEco: true,
  },
  {
    id: "st-005",
    name: "Hemp Travel Backpack",
    price: 119.99,
    discountPrice: 95.99,
    description:
      "Durable travel backpack made from hemp fiber with multiple compartments",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop&crop=center",
    ],
    category: "Sustainable Travel",
    rating: 4.8,
    tags: ["Hemp Fiber", "Durable", "Multiple Compartments"],
    isEco: true,
  },
  {
    id: "st-006",
    name: "Biodegradable Toiletry Kit",
    price: 38.99,
    description:
      "Complete toiletry kit with biodegradable products in recyclable containers",
    images: [
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop&crop=center",
    ],
    category: "Sustainable Travel",
    rating: 4.5,
    tags: ["Biodegradable", "Complete Kit", "Recyclable"],
    isEco: true,
  },
  {
    id: "st-007",
    name: "Reusable Travel Containers",
    price: 24.99,
    discountPrice: 19.99,
    description: "Set of leak-proof containers made from recycled materials",
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop&crop=center",
    ],
    category: "Sustainable Travel",
    rating: 4.7,
    tags: ["Leak-proof", "Recycled Materials", "Set"],
    isEco: true,
  },
  {
    id: "st-008",
    name: "Eco-Friendly Luggage Tags",
    price: 14.99,
    description:
      "Durable luggage tags made from recycled leather with secure closure",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop&crop=center",
    ],
    category: "Sustainable Travel",
    rating: 4.6,
    tags: ["Recycled Leather", "Durable", "Secure Closure"],
    isNew: true,
    isEco: true,
  },

  // Renewable Energy Products (8)
  {
    id: "re-001",
    name: "Portable Solar Panel Kit",
    price: 189.99,
    discountPrice: 151.99,
    description:
      "Foldable solar panel kit with charge controller and battery pack",
    images: [
      "https://images.unsplash.com/photo-1609592806529-a8070e96b0ed?w=400&h=400&fit=crop&crop=center",
    ],
    category: "Renewable Energy",
    rating: 4.9,
    tags: ["Solar Panel", "Foldable", "Battery Pack"],
    isEco: true,
  },
  {
    id: "re-002",
    name: "Wind-Powered Phone Charger",
    price: 79.99,
    description: "Portable wind turbine charger for outdoor adventures",
    images: [
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop&crop=center",
    ],
    category: "Renewable Energy",
    rating: 4.6,
    tags: ["Wind Turbine", "Portable", "Outdoor"],
    isEco: true,
  },
  {
    id: "re-003",
    name: "Solar Garden Light Set",
    price: 89.99,
    discountPrice: 71.99,
    description: "Set of 10 solar-powered garden lights with automatic sensors",
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop&crop=center",
    ],
    category: "Renewable Energy",
    rating: 4.8,
    tags: ["Solar-powered", "Garden Lights", "Automatic Sensors"],
    isNew: true,
    isEco: true,
  },
  {
    id: "re-004",
    name: "Energy Monitoring Device",
    price: 124.99,
    description: "Smart device to monitor and reduce home energy consumption",
    images: [
      "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=400&fit=crop&crop=center",
    ],
    category: "Renewable Energy",
    rating: 4.7,
    tags: ["Energy Monitoring", "Smart Device", "Home"],
    isEco: true,
  },
  {
    id: "re-005",
    name: "Solar Water Heater",
    price: 299.99,
    discountPrice: 239.99,
    description: "Compact solar water heater for camping and outdoor use",
    images: [
      "https://images.unsplash.com/photo-1609592806529-a8070e96b0ed?w=400&h=400&fit=crop&crop=center",
    ],
    category: "Renewable Energy",
    rating: 4.5,
    tags: ["Solar Water Heater", "Camping", "Compact"],
    isEco: true,
  },
  {
    id: "re-006",
    name: "Hand Crank Generator",
    price: 156.99,
    description: "Manual generator for emergency power and off-grid living",
    images: [
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop&crop=center",
    ],
    category: "Renewable Energy",
    rating: 4.8,
    tags: ["Hand Crank", "Emergency Power", "Off-grid"],
    isEco: true,
  },
  {
    id: "re-007",
    name: "Solar Lantern with Radio",
    price: 49.99,
    discountPrice: 39.99,
    description:
      "Multi-function solar lantern with AM/FM radio and USB charging",
    images: [
      "https://images.unsplash.com/photo-1609592806529-a8070e96b0ed?w=400&h=400&fit=crop&crop=center",
    ],
    category: "Renewable Energy",
    rating: 4.7,
    tags: ["Solar Lantern", "AM/FM Radio", "USB Charging"],
    isEco: true,
  },
  {
    id: "re-008",
    name: "Micro Wind Turbine",
    price: 199.99,
    description:
      "Small wind turbine for residential renewable energy generation",
    images: [
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop&crop=center",
    ],
    category: "Renewable Energy",
    rating: 4.6,
    tags: ["Wind Turbine", "Residential", "Energy Generation"],
    isNew: true,
    isEco: true,
  },

  // Zero Waste Living Products (8)
  {
    id: "zwl-001",
    name: "Stainless Steel Straws Set",
    price: 12.99,
    discountPrice: 9.99,
    description:
      "Set of 4 reusable straws with cleaning brush and carrying pouch",
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop&crop=center",
    ],
    category: "Zero Waste Living",
    rating: 4.8,
    tags: ["Stainless Steel", "Reusable", "Cleaning Brush"],
    isEco: true,
  },
  {
    id: "zwl-002",
    name: "Beeswax Food Wraps",
    price: 22.99,
    description: "Set of 3 beeswax wraps to replace plastic wrap and bags",
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop&crop=center",
    ],
    category: "Zero Waste Living",
    rating: 4.7,
    tags: ["Beeswax", "Food Wraps", "Plastic Alternative"],
    isEco: true,
  },
  {
    id: "zwl-003",
    name: "Reusable Produce Bags",
    price: 18.99,
    discountPrice: 14.99,
    description: "Set of 6 mesh produce bags made from organic cotton",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop&crop=center",
    ],
    category: "Zero Waste Living",
    rating: 4.9,
    tags: ["Mesh", "Organic Cotton", "Produce Bags"],
    isNew: true,
    isEco: true,
  },
  {
    id: "zwl-004",
    name: "Bamboo Toothbrush Pack",
    price: 16.99,
    description:
      "Pack of 4 biodegradable bamboo toothbrushes with soft bristles",
    images: [
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop&crop=center",
    ],
    category: "Zero Waste Living",
    rating: 4.6,
    tags: ["Bamboo", "Biodegradable", "Soft Bristles"],
    isEco: true,
  },
  {
    id: "zwl-005",
    name: "Glass Storage Containers",
    price: 49.99,
    discountPrice: 39.99,
    description: "Set of 8 borosilicate glass containers with airtight lids",
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop&crop=center",
    ],
    category: "Zero Waste Living",
    rating: 4.8,
    tags: ["Borosilicate Glass", "Airtight", "Set of 8"],
    isEco: true,
  },
  {
    id: "zwl-006",
    name: "Compostable Trash Bags",
    price: 24.99,
    description:
      "Roll of 50 compostable trash bags made from plant-based materials",
    images: [
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&h=400&fit=crop&crop=center",
    ],
    category: "Zero Waste Living",
    rating: 4.5,
    tags: ["Compostable", "Plant-based", "50 Count"],
    isEco: true,
  },
  {
    id: "zwl-007",
    name: "Refillable Soap Dispenser",
    price: 28.99,
    discountPrice: 23.99,
    description: "Stainless steel soap dispenser with pump mechanism",
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop&crop=center",
    ],
    category: "Zero Waste Living",
    rating: 4.7,
    tags: ["Stainless Steel", "Refillable", "Pump Mechanism"],
    isEco: true,
  },
  {
    id: "zwl-008",
    name: "Silicone Food Storage Bags",
    price: 32.99,
    description:
      "Set of 4 leak-proof silicone bags for food storage and freezing",
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop&crop=center",
    ],
    category: "Zero Waste Living",
    rating: 4.9,
    tags: ["Silicone", "Leak-proof", "Food Storage"],
    isNew: true,
    isEco: true,
  },
];

// Categories for filtering
const categories = [
  "All Categories",
  "Organic Beauty",
  "Sustainable Tech",
  "Eco Home & Garden",
  "Sustainable Fashion",
  "Green Sports",
  "Eco Accessories",
];

// Star rating component
const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${
            i < Math.floor(rating)
              ? "text-primary fill-primary"
              : i < rating
              ? "text-primary fill-primary opacity-60"
              : "text-muted-foreground"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="ml-1 text-sm text-muted-foreground">
        {rating.toFixed(1)}
      </span>
    </div>
  );
};

// Grid View Product Card
const GridProductCard: React.FC<{
  product: Product;
  onFavoriteToggle: (id: string) => void;
}> = ({ product, onFavoriteToggle }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleImageChange = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="group relative flex flex-col h-full rounded-xl overflow-hidden bg-card shadow-sm hover:shadow-md transition-all duration-300 ">
      {/* Image container with aspect ratio */}
      <div
        className="relative w-full pb-[100%] bg-muted overflow-hidden cursor-pointer"
        onMouseEnter={() => product.images.length > 1 && handleImageChange()}
        onMouseLeave={() =>
          product.images.length > 1 && setCurrentImageIndex(0)
        }
      >
        {product.images.map((image, index) => (
          <img
            key={index}
            src={image || "/placeholder.svg"}
            alt={`${product.name} - view ${index + 1}`}
            className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-300 ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.discountPrice && (
            <span className="px-2 py-1 bg-destructive text-destructive-foreground text-xs font-medium rounded-md">
              SALE
            </span>
          )}
          {product.isNew && (
            <span className="px-2 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-md">
              NEW
            </span>
          )}
          {product.isEco && (
            <span className="px-2 py-1 bg-primary/20 text-primary text-xs font-medium rounded-md flex items-center gap-1">
              <Leaf className="h-3 w-3" />
              ECO
            </span>
          )}
        </div>

        {/* Favorite button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onFavoriteToggle(product.id);
          }}
          className="absolute top-3 right-3 p-1.5 rounded-full bg-background/80 hover:bg-background transition-all duration-200 shadow-sm"
          aria-label="Add to favorites"
        >
          <Heart
            size={18}
            className={
              product.favorite
                ? "fill-destructive text-destructive"
                : "text-muted-foreground"
            }
          />
        </button>

        {/* Quick add to cart button */}
        <div className="absolute bottom-3 left-3 right-3 transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <button className="w-full flex items-center justify-center gap-2 py-2 bg-foreground hover:bg-foreground/90 text-background text-sm font-medium rounded-md transition-colors duration-200">
            <ShoppingCart size={16} />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>

      {/* Product details */}
      <div className="flex flex-col p-4">
        <div className="mb-1.5">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            {product.category}
          </span>
          <h3 className="text-base font-medium text-card-foreground line-clamp-1 mt-1">
            {product.name}
          </h3>
        </div>

        <div className="mb-2">
          <StarRating rating={product.rating} />
        </div>

        <div className="mt-auto pt-2 flex items-baseline">
          {product.discountPrice ? (
            <>
              <span className="font-bold text-lg text-card-foreground">
                ${product.discountPrice.toFixed(2)}
              </span>
              <span className="ml-2 text-sm text-muted-foreground line-through">
                ${product.price.toFixed(2)}
              </span>
            </>
          ) : (
            <span className="font-bold text-lg text-card-foreground">
              ${product.price.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

// List View Product Card
const ListProductCard: React.FC<{
  product: Product;
  onFavoriteToggle: (id: string) => void;
}> = ({ product, onFavoriteToggle }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleImageChange = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="group relative flex flex-col sm:flex-row h-full rounded-xl overflow-hidden bg-card shadow-sm hover:shadow-md transition-all duration-300 border border-border">
      {/* Image container */}
      <div
        className="relative w-full sm:w-48 md:w-56 lg:w-64 h-48 sm:h-auto bg-muted overflow-hidden cursor-pointer"
        onMouseEnter={() => product.images.length > 1 && handleImageChange()}
        onMouseLeave={() =>
          product.images.length > 1 && setCurrentImageIndex(0)
        }
      >
        {product.images.map((image, index) => (
          <img
            key={index}
            src={image || "/placeholder.svg"}
            alt={`${product.name} - view ${index + 1}`}
            className={`w-full h-full object-cover object-center transition-opacity duration-300 ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.discountPrice && (
            <span className="px-2 py-1 bg-destructive text-destructive-foreground text-xs font-medium rounded-md">
              SALE
            </span>
          )}
          {product.isNew && (
            <span className="px-2 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-md">
              NEW
            </span>
          )}
          {product.isEco && (
            <span className="px-2 py-1 bg-primary/20 text-primary text-xs font-medium rounded-md flex items-center gap-1">
              <Leaf className="h-3 w-3" />
              ECO
            </span>
          )}
        </div>

        {/* Favorite button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onFavoriteToggle(product.id);
          }}
          className="absolute top-3 right-3 p-1.5 rounded-full bg-background/80 hover:bg-background transition-all duration-200 shadow-sm"
          aria-label="Add to favorites"
        >
          <Heart
            size={18}
            className={
              product.favorite
                ? "fill-destructive text-destructive"
                : "text-muted-foreground"
            }
          />
        </button>
      </div>

      {/* Product details */}
      <div className="flex flex-col p-4 flex-grow">
        <div className="mb-1.5 flex justify-between">
          <div>
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              {product.category}
            </span>
            <h3 className="text-lg font-medium text-card-foreground mt-1">
              {product.name}
            </h3>
          </div>
          <div className="flex flex-col items-end">
            {product.discountPrice ? (
              <>
                <span className="font-bold text-lg text-card-foreground">
                  ${product.discountPrice.toFixed(2)}
                </span>
                <span className="text-sm text-muted-foreground line-through">
                  ${product.price.toFixed(2)}
                </span>
              </>
            ) : (
              <span className="font-bold text-lg text-card-foreground">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>
        </div>

        <div className="mb-3">
          <StarRating rating={product.rating} />
        </div>

        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {product.description}
        </p>

        <div className="mt-auto flex flex-wrap gap-2 mb-4">
          {product.tags?.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex gap-3">
          <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-foreground hover:bg-foreground/90 text-background text-sm font-medium rounded-md transition-colors duration-200">
            <ShoppingCart size={16} />
            <span>Add to Cart</span>
          </button>
          <button className="px-3 py-2 border border-border hover:bg-muted text-muted-foreground text-sm font-medium rounded-md transition-colors duration-200">
            Quick View
          </button>
        </div>
      </div>
    </div>
  );
};

// Main component
const Products = () => {
  const [products, setProducts] = useState<Product[]>(allProducts);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");

  // Toggle product as favorite
  const toggleFavorite = (id: string) => {
    setProducts(
      products.map((p) => (p.id === id ? { ...p, favorite: !p.favorite } : p))
    );
  };

  // Filter products based on category and search query
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "All Categories" ||
      product.category === selectedCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.tags?.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );

    return matchesCategory && (searchQuery === "" || matchesSearch);
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return (a.discountPrice || a.price) - (b.discountPrice || b.price);
      case "price-high":
        return (b.discountPrice || b.price) - (a.discountPrice || a.price);
      case "rating":
        return b.rating - a.rating;
      case "newest":
        return a.isNew ? -1 : b.isNew ? 1 : 0;
      default: // 'featured'
        return 0;
    }
  });

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="relative bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-8 overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="w-full h-full"
            >
              <path
                fill="white"
                d="M0,0 L100,0 L100,100 L80,100 C60,100 40,60 20,80 L0,100 Z"
              ></path>
            </svg>
          </div>
          <div className="relative z-10 max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Discover Sustainable Products
            </h1>
            <p className="text-primary-foreground/90 mb-6">
              Explore our curated collection of eco-friendly items, crafted for
              those who care about the planet and appreciate exceptional
              quality.
            </p>
            <div className="relative">
              <input
                type="text"
                placeholder="Search for eco-friendly products..."
                className="w-full py-3 pl-4 pr-12 rounded-xl bg-background/90 backdrop-blur text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                size={20}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and controls */}
      <div className="flex flex-col lg:flex-row gap-4 mb-6 items-start lg:items-center justify-between">
        <div className="flex flex-wrap gap-3">
          {/* Category filter */}
          <div className="relative w-48">
            <select
              className="w-full appearance-none bg-background border border-border rounded-lg py-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <ChevronDown
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
              size={16}
            />
          </div>

          {/* Sort by */}
          <div className="relative w-48">
            <select
              className="w-full appearance-none bg-background border border-border rounded-lg py-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
              <option value="newest">Newest</option>
            </select>
            <ChevronDown
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
              size={16}
            />
          </div>

          {/* Filter button */}
          <button className="flex items-center gap-2 py-2 px-4 bg-muted hover:bg-muted/80 text-muted-foreground rounded-lg transition-colors duration-200">
            <Sliders size={16} />
            <span>Filters</span>
          </button>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-sm text-muted-foreground">
            Showing{" "}
            <span className="font-medium text-foreground">
              {sortedProducts.length}
            </span>{" "}
            products
          </div>

          {/* View toggle */}
          <div className="flex border border-border rounded-lg overflow-hidden">
            <button
              className={`p-2 ${
                viewMode === "grid"
                  ? "bg-foreground text-background"
                  : "bg-background text-muted-foreground hover:bg-muted"
              }`}
              onClick={() => setViewMode("grid")}
              aria-label="Grid view"
            >
              <Grid size={18} />
            </button>
            <button
              className={`p-2 ${
                viewMode === "list"
                  ? "bg-foreground text-background"
                  : "bg-background text-muted-foreground hover:bg-muted"
              }`}
              onClick={() => setViewMode("list")}
              aria-label="List view"
            >
              <List size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Product grid */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedProducts.map((product) => (
            <GridProductCard
              key={product.id}
              product={product}
              onFavoriteToggle={toggleFavorite}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {sortedProducts.map((product) => (
            <ListProductCard
              key={product.id}
              product={product}
              onFavoriteToggle={toggleFavorite}
            />
          ))}
        </div>
      )}

      {/* Empty state */}
      {sortedProducts.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="bg-muted p-4 rounded-full mb-4">
            <Search size={32} className="text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium text-foreground mb-2">
            No products found
          </h3>
          <p className="text-muted-foreground max-w-md">
            We couldn't find any products matching your filters. Try adjusting
            your search criteria or browse our categories.
          </p>
        </div>
      )}

      {/* Pagination */}
      <div className="mt-12 flex justify-center">
        <div className="flex items-center gap-2">
          <button className="px-3 py-1 border border-border rounded-md text-muted-foreground hover:bg-muted">
            Previous
          </button>
          <button className="px-3 py-1 bg-foreground text-background rounded-md hover:bg-foreground/90">
            1
          </button>
          <button className="px-3 py-1 border border-border rounded-md text-muted-foreground hover:bg-muted">
            2
          </button>
          <button className="px-3 py-1 border border-border rounded-md text-muted-foreground hover:bg-muted">
            3
          </button>
          <span className="px-2 text-muted-foreground">...</span>
          <button className="px-3 py-1 border border-border rounded-md text-muted-foreground hover:bg-muted">
            8
          </button>
          <button className="px-3 py-1 border border-border rounded-md text-muted-foreground hover:bg-muted">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Products;
