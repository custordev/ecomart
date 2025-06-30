import Header from "@/components/header"

import Footer from "@/components/footer"
import StripeHosted from "@/components/StripeHosted"

export default function HostedCheckoutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <StripeHosted />
      </main>
      <Footer />
    </div>
  )
}
