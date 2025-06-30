"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Leaf, ShoppingBag, Recycle } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-background via-muted/30 to-primary/5 pb-10 lg:pt-32 pt-24 font-light text-foreground antialiased md:pb-16 md:pt-20">
      <div
        className="absolute right-0 top-0 h-1/2 w-1/2"
        style={{
          background:
            "radial-gradient(circle at 70% 30%, oklch(0.723 0.219 149.579 / 0.15) 0%, transparent 60%)",
        }}
      />
      <div
        className="absolute left-0 top-0 h-1/2 w-1/2 -scale-x-100"
        style={{
          background:
            "radial-gradient(circle at 70% 30%, oklch(0.723 0.219 149.579 / 0.15) 0%, transparent 60%)",
        }}
      />

      <div className="container relative z-10 mx-auto max-w-2xl px-4 text-center md:max-w-4xl md:px-6 lg:max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="mb-6 inline-block rounded-full border border-lime-900 px-3 py-1 text-xs text-primary bg-primary/5">
            SUSTAINABLE SHOPPING REVOLUTION
          </span>
          <h1 className="mx-auto mb-6 max-w-4xl text-4xl font-light md:text-5xl lg:text-7xl">
            Shop Smarter with <span className="text-primary">Eco-Friendly</span>{" "}
            Products
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground md:text-xl">
            EcoMart combines sustainable products with seamless shopping
            experiences to help you make environmentally conscious choices
            without compromising on quality or style.
          </p>

          <div className="mb-10 flex flex-col items-center justify-center gap-4 sm:mb-0 sm:flex-row">
            <Link
              href="/products"
              className="relative w-full overflow-hidden rounded-full  bg-primary px-8 py-4 text-primary-foreground shadow-lg transition-all duration-300 hover:bg-primary/90 hover:shadow-xl sm:w-auto"
            >
              <span className="flex items-center justify-center gap-2">
                <ShoppingBag className="h-5 w-5" />
                Start Shopping
              </span>
            </Link>
            <a
              href="#features"
              className="flex w-full items-center justify-center gap-2 text-muted-foreground transition-colors hover:text-foreground sm:w-auto"
            >
              <span>Learn about sustainability</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m6 9 6 6 6-6"></path>
              </svg>
            </a>
          </div>
        </motion.div>

        <motion.div
          className="relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
        >
          <div className="relative flex h-40 w-full overflow-hidden md:h-64 items-center justify-center">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="grid grid-cols-3 gap-8 opacity-20">
                <Leaf className="h-16 w-16 text-primary" />
                <Recycle className="h-16 w-16 text-primary" />
                <ShoppingBag className="h-16 w-16 text-primary" />
              </div>
            </div>
          </div>
          <div className="relative z-10 mx-auto max-w-5xl overflow-hidden rounded-lg shadow-[0_0_50px_oklch(0.723_0.219_149.579_/_0.2)] border border-border/50">
            <img
              src="/placeholder.svg?height=600&width=1200"
              alt="EcoMart Dashboard"
              width={1920}
              height={1080}
              className="h-auto w-full rounded-lg bg-muted"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
