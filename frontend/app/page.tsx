import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeatureSection from "@/components/FeatureSection";
import DashboardPreview from "@/components/dashboard/DashboardPreview";
import HowItWorks from "@/components/HowItWorks";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-[#09090B] text-white">
      <Navbar />
      <Hero />
      <FeatureSection />
      <HowItWorks />
      <DashboardPreview />
      <CTA />
      <Footer />
    </main>
  );
}