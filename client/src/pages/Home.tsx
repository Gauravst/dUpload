import { Upload, Shield, Zap, Users, Globe2, ArrowRight } from "lucide-react";
import { LoginModal } from "@/components/Home/LoginModal";
import { Navbar } from "@/components/Home/Navbar";
import { useState } from "react";
import HeroSection from "@/components/Home/HeroSection";
import FeaturesSection from "@/components/Home/FeaturesSection";
import StatsSection from "@/components/Home/StatsSection";
import CTASection from "@/components/Home/CTASection";
import Footer from "@/components/Home/Footer";
import HowSection from "@/components/Home/HowSection";

const Home = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      <Navbar onGetStarted={() => setIsLoginOpen(true)} />

      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* Stats Section */}
      <StatsSection />

      {/* How It Works */}
      <HowSection />

      {/* CTA Section */}
      <CTASection />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
