import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Promotion from "@/components/Promotion";
import Footer from "@/components/Footer";
import QuikFlipDifference from "@/components/QuikFlipDifference";
import ContactForm from "@/components/Contact";
import ProductLanding from "@/components/ProductFeatures";
import Integration from "@/components/Integration";

export default function Home() {
  return (
    <>
    <Navbar />
    <Hero />
    <ProductLanding />
    <Integration />
    <QuikFlipDifference />
    <Promotion />
    <ContactForm />
    <Footer />
    </>
  );
}
