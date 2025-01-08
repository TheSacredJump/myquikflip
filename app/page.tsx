import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Features from "@/components/Features";
import Promotion from "@/components/Promotion";
import Footer from "@/components/Footer";
import QuikFlipDifference from "@/components/QuikFlipDifference";
import PricingSection from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import ContactForm from "@/components/Contact";

export default function Home() {
  return (
    <>
    <Navbar />
    <Hero />
    <Features />
    <QuikFlipDifference />
    <PricingSection />
    <Promotion />
    <FAQ />
    <ContactForm />
    <Footer />
    </>
  );
}
