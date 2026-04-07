import CTA from "@/components/Cta";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Hero from "@/components/hero";
import HowItWorks from "@/components/HowItWorks";
import Navbar from "@/components/Topbar";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <Navbar />
      <Hero />
      <div className="space-y-0">
        <Features />
        <HowItWorks />
        <CTA />
      </div>
      <Footer />
    </main>
  )
}