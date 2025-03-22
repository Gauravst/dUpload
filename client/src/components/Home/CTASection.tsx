import { ArrowRight } from "lucide-react";
import { useState } from "react";

const CTASection = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  return (
    <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-lg py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Join thousands of users who trust D Upload for their file storage
          needs.
        </p>
        <button
          onClick={() => setIsLoginOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-3 rounded-lg transition duration-200 flex items-center gap-2 mx-auto"
        >
          Get Started Now
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default CTASection;
