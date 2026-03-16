import CTA from "@/components/Cta";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Hero from "@/components/hero";
import HowItWorks from "@/components/HowIt_works.";
import Navbar from "@/components/Topbar";


export default function Home() {
  return (
    <main>
      <Navbar />



      <Hero />

      <Features />

      <HowItWorks />

      <CTA />

      <Footer />

    </main>
  )
}