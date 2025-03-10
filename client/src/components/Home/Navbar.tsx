import { Upload } from "lucide-react";

interface NavbarProps {
  onGetStarted: () => void;
}

export function Navbar({ onGetStarted }: NavbarProps) {
  return (
    <nav className="fixed top-0 w-full bg-gray-900/50 backdrop-blur-lg border-b border-gray-800/50 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Upload className="w-8 h-8 text-blue-500" />
            <span className="text-xl font-bold text-white">D Upload</span>
          </div>

          <button
            onClick={onGetStarted}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition duration-200"
          >
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
}
