"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CategoryItem {
  id: number;
  name: string;
  slug: string;
  image: string;
  color: string;
}

export default function Categories() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [sliding, setSliding] = useState(false);
  const [visibleItems, setVisibleItems] = useState(6);
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Animation on mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Eco-friendly categories data
  const categories: CategoryItem[] = [
    {
      id: 1,
      name: "Organic Beauty",
      slug: "organic-beauty",
      image:
        "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop&crop=center",
      color: "bg-primary/10",
    },
    {
      id: 2,
      name: "Sustainable Tech",
      slug: "sustainable-tech",
      image:
        "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop&crop=center",
      color: "bg-secondary/50",
    },
    {
      id: 3,
      name: "Eco Home & Garden",
      slug: "eco-home-garden",
      image:
        "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop&crop=center",
      color: "bg-accent/50",
    },
    {
      id: 4,
      name: "Sustainable Fashion",
      slug: "sustainable-fashion",
      image:
        "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop&crop=center",
      color: "bg-primary/20",
    },
    {
      id: 5,
      name: "Green Sports",
      slug: "green-sports",
      image:
        "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop&crop=center",
      color: "bg-muted",
    },
    {
      id: 6,
      name: "Eco Accessories",
      slug: "eco-accessories",
      image:
        "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop&crop=center",
      color: "bg-primary/15",
    },
    {
      id: 7,
      name: "Natural Health",
      slug: "natural-health",
      image:
        "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop&crop=center",
      color: "bg-secondary/30",
    },
    {
      id: 8,
      name: "Organic Food",
      slug: "organic-food",
      image:
        "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop&crop=center",
      color: "bg-accent/30",
    },
    {
      id: 9,
      name: "Kids Eco",
      slug: "kids-eco",
      image:
        "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop&crop=center",
      color: "bg-primary/25",
    },
    {
      id: 10,
      name: "Refurbished",
      slug: "refurbished",
      image:
        "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop&crop=center",
      color: "bg-muted/80",
    },
    {
      id: 11,
      name: "Eco Books & Media",
      slug: "eco-books-media",
      image:
        "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop&crop=center",
      color: "bg-secondary/40",
    },
    {
      id: 12,
      name: "Baby Eco",
      slug: "baby-eco",
      image:
        "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop&crop=center",
      color: "bg-primary/30",
    },
  ];

  // Calculate visible items based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleItems(3);
      } else if (window.innerWidth < 768) {
        setVisibleItems(4);
      } else if (window.innerWidth < 1024) {
        setVisibleItems(5);
      } else if (window.innerWidth < 1280) {
        setVisibleItems(6);
      } else {
        setVisibleItems(8);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Calculate maximum pages
  const totalPages = Math.ceil(categories.length / visibleItems);
  const maxIndex = totalPages - 1;

  // Navigation functions
  const goToNext = () => {
    if (sliding) return;
    setSliding(true);
    setActiveIndex((current) => (current === maxIndex ? 0 : current + 1));
    setTimeout(() => setSliding(false), 500);
  };

  const goToPrev = () => {
    if (sliding) return;
    setSliding(true);
    setActiveIndex((current) => (current === 0 ? maxIndex : current - 1));
    setTimeout(() => setSliding(false), 500);
  };

  const goToPage = (index: number) => {
    if (sliding || index === activeIndex) return;
    setSliding(true);
    setActiveIndex(index);
    setTimeout(() => setSliding(false), 500);
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      goToNext();
    }
    if (isRightSwipe) {
      goToPrev();
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  // Calculate visible categories based on active index
  const visibleCategories = () => {
    const startIdx = activeIndex * visibleItems;
    return categories.slice(startIdx, startIdx + visibleItems);
  };

  return (
    <div className="w-full overflow-hidden bg-gradient-to-b from-primary/5 to-background py-8 px-4 md:px-8 relative  border-y border-lime-400 border-1 ">
      <div className="max-w-7xl mx-auto">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-primary/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>

        <div
          className={`flex items-center justify-between mb-8 transition-opacity duration-1000 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <div>
            <div className="flex items-center">
              <div className="w-1.5 h-8 bg-primary rounded-full mr-3"></div>
              <h2 className="text-xl md:text-2xl font-bold text-foreground">
                Shop by Category
              </h2>
            </div>
            <p className="text-muted-foreground text-sm mt-1 ml-4">
              Explore our sustainable collections
            </p>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={goToPrev}
              disabled={sliding}
              className="p-2.5 rounded-full bg-background border border-border text-muted-foreground hover:bg-muted hover:border-primary/30 transition-all shadow-sm disabled:opacity-50 hover:scale-105 active:scale-95"
              aria-label="Previous categories"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={goToNext}
              disabled={sliding}
              className="p-2.5 rounded-full bg-background border border-border text-muted-foreground hover:bg-muted hover:border-primary/30 transition-all shadow-sm disabled:opacity-50 hover:scale-105 active:scale-95"
              aria-label="Next categories"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Categories Carousel */}
        <div
          ref={carouselRef}
          className="relative overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className={`flex transition-transform duration-500 ease-in-out ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
            style={{
              transform: `translateX(0%)`,
              width: "100%",
              transitionDelay: "0.2s",
            }}
          >
            <div className="w-full grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-4 md:gap-6">
              {visibleCategories().map((category, idx) => (
                <a
                  key={category.id}
                  href={`/category/${category.slug}`}
                  className="flex flex-col items-center group"
                  onMouseEnter={() => setHoveredCategory(category.id)}
                  onMouseLeave={() => setHoveredCategory(null)}
                  style={{
                    transition: "all 0.5s ease",
                    transitionDelay: `${idx * 0.05}s`,
                  }}
                >
                  <div
                    className={`w-full aspect-square rounded-full overflow-hidden ${
                      category.color
                    } p-1.5 ${
                      hoveredCategory === category.id
                        ? "shadow-md ring-2 ring-lime-500"
                        : "shadow-sm"
                    } transition-all duration-300 transform ${
                      hoveredCategory === category.id ? "scale-105" : ""
                    }`}
                  >
                    <div className="relative w-full h-full rounded-full overflow-hidden bg-background flex items-center justify-center">
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-foreground/5"></div>
                      <img
                        src={category.image || "/placeholder.svg"}
                        alt={category.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                  </div>
                  <div className="mt-3 text-center">
                    <h3 className="text-xs sm:text-sm font-medium text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Dot Navigation */}
        <div className="flex justify-center items-center space-x-3 mt-8">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToPage(index)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                activeIndex === index
                  ? "w-10 bg-gradient-to-r from-primary to-primary/80 shadow-sm"
                  : "w-2.5 bg-muted hover:bg-primary/30"
              }`}
              aria-label={`Go to page ${index + 1}`}
              aria-current={activeIndex === index ? "true" : "false"}
            />
          ))}
        </div>

        {/* View All Categories Button */}
        {/* <div
          className={`flex justify-center mt-8 transition-opacity duration-1000 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
          style={{ transitionDelay: "0.4s" }}
        >
          <a
            href="/categories"
            className="inline-flex items-center px-6 py-2.5 rounded-full bg-background border border-border text-primary hover:bg-muted hover:text-primary hover:border-primary/30 transition-all shadow-sm hover:shadow hover:scale-105 active:scale-95"
          >
            <span className="font-medium">View All Categories</span>
            <ChevronRight className="h-4 w-4 ml-1" />
          </a>
        </div> */}
      </div>
    </div>
  );
}
