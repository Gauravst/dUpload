import { useNavigate, Link, useLocation } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import { useEffect, useState } from "react";

interface NavbarProps {
  onGetStarted: () => void;
  isLoggedIn: boolean;
}

export function Navbar({ onGetStarted, isLoggedIn }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }

      const offset = 100;
      const elementPosition = element?.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition && elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  }, [location]);

  const handleDashboardClick = () => {
    navigate("/dashboard/main");
  };

  const navItem = [
    { name: "Home", link: "#home" },
    { name: "Features", link: "#features" },
    { name: "Working", link: "#working" },
  ];

  const githubRepoLink = "https://github.com/Gauravst/dUpload";
  const blogLink = "";

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

          <div className="hidden md:flex items-center gap-x-10">
            <ul className="flex gap-x-10 items-center">
              {navItem.map((item, index) => {
                return (
                  <li key={index}>
                    <Link
                      to={item.link}
                      className={`hover:underline ${item.name == "Home" && "text-blue-600 font-semibold"}`}
                    >
                      {item.name}
                    </Link>
                  </li>
                );
              })}

              <li>
                <Link
                  target={"_blank"}
                  to={blogLink}
                  className="hover:underline"
                >
                  Blog
                </Link>
              </li>

              <li>
                <Link
                  target={"_blank"}
                  to={githubRepoLink}
                  className="hover:underline"
                >
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

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex md:hidden relative w-6 h-6"
          >
            <span
              className={`absolute h-0.5 w-6 bg-white rounded-sm transition-transform duration-300 ease-in-out ${
                menuOpen ? "rotate-45 top-3" : "rotate-0 top-1"
              }`}
            />
            <span
              className={`absolute h-0.5 w-6 bg-white rounded-sm top-3 transition-opacity duration-300 ease-in-out ${
                menuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute h-0.5 w-6 bg-white rounded-sm transition-transform duration-300 ease-in-out ${
                menuOpen ? "-rotate-45 top-3" : "rotate-0 top-5"
              }`}
            />
          </button>
        </div>
      </div>

      <div
        className={`${menuOpen ? "flex" : "hidden"} md:hidden h-[calc(100vh-64px)] bottom-0 items-center gap-x-10`}
      >
        <ul className="w-full h-[100%] flex flex-col justify-center gap-y-10 items-center text-xl">
          {navItem.map((item, index) => {
            return (
              <li key={index}>
                <Link
                  to={item.link}
                  className={`hover:underline ${item.name == "Home" && "text-blue-600 font-semibold"}`}
                >
                  {item.name}
                </Link>
              </li>
            );
          })}

          <li>
            <Link target={"_blank"} to={blogLink} className="hover:underline">
              Blog
            </Link>
          </li>

          <li>
            <Link
              target={"_blank"}
              to={githubRepoLink}
              className="hover:underline"
            >
              <FaGithub size={20} />
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
