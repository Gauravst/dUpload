import { Upload, Users, Globe2 } from "lucide-react";

const HowSection = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="w-8 h-8 text-blue-500" />
          </div>
          <h3 className="text-xl font-bold mb-2">1. Create Account</h3>
          <p className="text-gray-400">
            Create Account to Use secure Discord-powered cloud storage
          </p>
        </div>
        <div className="text-center">
          <div className="w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Upload className="w-8 h-8 text-purple-500" />
          </div>
          <h3 className="text-xl font-bold mb-2">2. Upload Files</h3>
          <p className="text-gray-400">
            Drag and drop your files into our secure platform
          </p>
        </div>
        <div className="text-center">
          <div className="w-16 h-16 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Globe2 className="w-8 h-8 text-yellow-500" />
          </div>
          <h3 className="text-xl font-bold mb-2">3. Access Anywhere</h3>
          <p className="text-gray-400">
            Access your files from any device, anytime
          </p>
        </div>
      </div>
    </div>
  );
};

export default HowSection;
