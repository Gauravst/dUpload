import { useNavigate } from "react-router-dom";

interface Props {
  onGetStarted: () => void;
  isLoggedIn: boolean;
}

const HeroSection = ({ onGetStarted, isLoggedIn }: Props) => {
  const navigate = useNavigate();
  const handleDashboardClick = () => {
    navigate("/dashboard/main");
  };

  return (
    <section id="home" className="relative pt-20">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 via-purple-500/10 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500 mb-6">
            Your Discord-Powered Cloud Storage
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-12">
            Store, share, and manage your files using Discord as your secure
            cloud storage solution. Fast, reliable, and always accessible.
          </p>

          <button
            onClick={isLoggedIn ? handleDashboardClick : onGetStarted}
            className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-3 rounded-lg transition duration-200"
          >
            {isLoggedIn ? "Go to Dashboard" : "Get Started for Free"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
