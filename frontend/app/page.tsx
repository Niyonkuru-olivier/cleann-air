import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HeroSection from "./sections/HeroSection";
import FeaturesSection from "./sections/FeaturesSection";
import HowItWorksSection from "./sections/HowItWorksSection";
import StatsSection from "./sections/StatsSection";
import CTASection from "./sections/CTASection";
import PageBackground from "./components/PageBackground";

export default function LandingPage() {
  return (
    <main className="relative min-h-screen text-slate-900 dark:text-white pt-20">
      <PageBackground />
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <StatsSection />
      <CTASection />
      <Footer />
    </main>
  );
}
