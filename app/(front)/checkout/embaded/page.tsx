import Header from "@/components/header"

import Footer from "@/components/footer"
import StripeEmbedded from "@/components/StripeEmbaded"

export default function EmbeddedCheckoutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <StripeEmbedded />
      </main>
      <Footer />
    </div>
  )
}
