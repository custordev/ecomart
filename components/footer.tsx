"use client"

import { Leaf, Github, Twitter, Instagram, Mail } from "lucide-react"

export default function Footer() {
  return (
    <footer className="relative z-10 mt-8 w-full overflow-hidden pb-8 pt-16">
      <div className="pointer-events-none absolute left-1/2 top-0 z-0 h-full w-full -translate-x-1/2 select-none">
        <div className="absolute -top-32 left-1/4 h-72 w-72 rounded-full bg-primary/10 blur-3xl"></div>
        <div className="absolute -bottom-24 right-1/4 h-80 w-80 rounded-full bg-primary/5 blur-3xl"></div>
      </div>
      <div className="glass relative mx-auto flex max-w-6xl flex-col items-center gap-8 rounded-2xl px-6 py-10 md:flex-row md:items-start md:justify-between md:gap-12">
        <div className="flex flex-col items-center md:items-start">
          <a href="#" className="mb-4 flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/80 text-2xl font-extrabold text-primary-foreground shadow-md">
              <Leaf className="h-5 w-5" />
            </span>
            <span className="bg-gradient-to-br from-primary to-primary/80 bg-clip-text text-xl font-semibold tracking-tight text-transparent">
              EcoMat
            </span>
          </a>
          <p className="mb-6 max-w-xs text-center text-sm text-foreground md:text-left">
            EcoMat provides sustainable products and eco-friendly solutions to help you create a better future for our
            planet while enjoying exceptional quality and style.
          </p>
          <div className="mt-2 flex gap-3 text-primary">
            <a href="#" aria-label="Twitter" className="transition hover:text-foreground">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" aria-label="GitHub" className="transition hover:text-foreground">
              <Github className="h-5 w-5" />
            </a>
            <a href="#" aria-label="Instagram" className="transition hover:text-foreground">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="#" aria-label="Email" className="transition hover:text-foreground">
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
        <nav className="flex w-full flex-col gap-9 text-center md:w-auto md:flex-row md:justify-end md:text-left">
          <div>
            <div className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">Products</div>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-foreground/70 hover:text-foreground transition-colors">
                  Sustainable Fashion
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground/70 hover:text-foreground transition-colors">
                  Eco Home & Garden
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground/70 hover:text-foreground transition-colors">
                  Green Technology
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground/70 hover:text-foreground transition-colors">
                  Organic Beauty
                </a>
              </li>
            </ul>
          </div>
          <div>
            <div className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">Company</div>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-foreground/70 hover:text-foreground transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground/70 hover:text-foreground transition-colors">
                  Sustainability
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground/70 hover:text-foreground transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground/70 hover:text-foreground transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <div className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">Support</div>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-foreground/70 hover:text-foreground transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground/70 hover:text-foreground transition-colors">
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground/70 hover:text-foreground transition-colors">
                  Returns
                </a>
              </li>
              <li>
                <a href="#" className="text-foreground/70 hover:text-foreground transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <div className="relative z-10 mt-10 text-center text-xs text-foreground">
        <span>&copy; 2025 EcoMat. All rights reserved. Building a sustainable future together.</span>
      </div>
    </footer>
  )
}
