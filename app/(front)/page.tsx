import Hero from "@/components/hero";
import Categories from "@/components/categories";
import Products from "@/components/products";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <main>
        <Hero />
        <Categories />
        <Products />
      </main>
    </div>
  );
}
