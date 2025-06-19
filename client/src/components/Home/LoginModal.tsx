import { X } from "lucide-react";
import { FaGithub, FaUserClock } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  if (!isOpen) return null;

  const handleGithubClick = () => {
    window.open(`${baseUrl}/auth/github`, "_self");
  };

  const handleGoogleClick = () => {
    window.open(`${baseUrl}/auth/google`, "_self");
  };

  const handleTempUserClick = async () => {};

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-900/90 backdrop-blur-lg p-8 rounded-2xl w-full max-w-md border border-gray-700/50 shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Welcome to D Upload</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <div className="space-y-4">
          <button
            onClick={handleGithubClick}
            className="w-full flex items-center justify-center gap-3 bg-gray-800/50 hover:bg-gray-800 text-white py-3 px-4 rounded-lg border border-gray-700/50 transition duration-200"
          >
            <FaGithub size={20} />
            <span>Continue with GitHub</span>
          </button>

          <button
            onClick={handleGoogleClick}
            className="w-full flex items-center justify-center gap-3 bg-gray-800/50 hover:bg-gray-800 text-white py-3 px-4 rounded-lg border border-gray-700/50 transition duration-200"
          >
            <FcGoogle size={20} />
            <span>Continue with Google</span>
          </button>

          <button
            onClick={handleTempUserClick}
            className="w-full flex items-center justify-center gap-3 bg-gray-800/50 hover:bg-gray-800 text-white py-3 px-4 rounded-lg border border-gray-700/50 transition duration-200"
          >
            <FaUserClock size={20} />
            <span>Continue without Auth</span>
          </button>

          <p className="text-sm text-gray-400 text-center mt-6">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>

          {import.meta.env.VITE_OAUTH === "true" && (
            <p className="text-sm text-red-400 text-center mt-2 w-full">
              Google and GitHub login might not work at the moment. Please use
              the "Continue without Auth" option instead.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
