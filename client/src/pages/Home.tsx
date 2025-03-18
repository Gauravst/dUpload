import { LoginModal } from "@/components/Home/LoginModal";
import { Navbar } from "@/components/Home/Navbar";
import { useEffect, useState } from "react";
import HeroSection from "@/components/Home/HeroSection";
import FeaturesSection from "@/components/Home/FeaturesSection";
import StatsSection from "@/components/Home/StatsSection";
import CTASection from "@/components/Home/CTASection";
import Footer from "@/components/Home/Footer";
import HowSection from "@/components/Home/HowSection";
import { useAuth } from "@/context/authContext";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const { user } = useAuth();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const { login } = useParams<{ login: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (login && login === "login") {
      setIsLoginOpen(true);
    }
  }, [login]);

  useEffect(() => {
    setIsLoggedIn(!!user);
    if (user && login) {
      setIsLoginOpen(false);
      navigate("/dashboard/main", { replace: true });
    }
  }, [user]);

  const openLogin = () => {
    setIsLoginOpen(true);
    navigate("/login", { replace: true });
  };

  const closeLogin = () => {
    setIsLoginOpen(false);
    navigate("/", { replace: true });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <LoginModal isOpen={isLoginOpen} onClose={closeLogin} />
      <Navbar onGetStarted={openLogin} isLoggedIn={isLoggedIn} />

      {/* Hero Section */}
      <HeroSection onGetStarted={openLogin} isLoggedIn={isLoggedIn} />

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
