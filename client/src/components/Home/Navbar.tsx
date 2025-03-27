import { useNavigate, Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa";

interface NavbarProps {
  onGetStarted: () => void;
  isLoggedIn: boolean;
}

export function Navbar({ onGetStarted, isLoggedIn }: NavbarProps) {
  const navigate = useNavigate();
  const handleDashboardClick = () => {
    navigate("/dashboard/main");
  };
  return (
    <nav className="fixed top-0 w-full bg-gray-900/50 backdrop-blur-lg border-b border-gray-800/50 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <img src="/logo.png" className="w-7 h-7" />
              <span className="text-xl font-bold text-white">D Upload</span>
            </Link>
          </div>

          <div className="flex items-center gap-x-10">
            <ul className="flex gap-x-10 items-center">
              <li>
                <Link
                  to="/"
                  className="hover:underline text-blue-600 font-semibold"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link to="/" className="hover:underline">
                  Features
                </Link>
              </li>

              <li>
                <Link to="/" className="hover:underline">
                  Pricing
                </Link>
              </li>

              <li>
                <Link to="/" className="hover:underline">
                  About
                </Link>
              </li>

              <li>
                <Link to="/" className="hover:underline">
                  <FaGithub size={20} />
                </Link>
              </li>
            </ul>

            <button
              onClick={isLoggedIn ? handleDashboardClick : onGetStarted}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition duration-200"
            >
              {isLoggedIn ? "Dashboard" : "Get Started"}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
