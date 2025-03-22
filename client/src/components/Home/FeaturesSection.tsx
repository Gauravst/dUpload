import { Upload, Shield, Zap } from "lucide-react";

const FeaturesSection = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-gray-800/50 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50">
          <Upload className="w-12 h-12 text-blue-500 mb-4" />
          <h3 className="text-xl font-bold mb-2">Easy Upload</h3>
          <p className="text-gray-400">
            Drag and drop your files or use our intuitive interface to upload
            content instantly.
          </p>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50">
          <Shield className="w-12 h-12 text-purple-500 mb-4" />
          <h3 className="text-xl font-bold mb-2">Secure Storage</h3>
          <p className="text-gray-400">
            Your files are encrypted and stored securely using Discord's
            reliable infrastructure.
          </p>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-lg p-6 rounded-xl border border-gray-700/50">
          <Zap className="w-12 h-12 text-yellow-500 mb-4" />
          <h3 className="text-xl font-bold mb-2">Fast Access</h3>
          <p className="text-gray-400">
            Access your files instantly from anywhere with our high-speed
            delivery network.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
