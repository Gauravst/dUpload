import { useState } from "react";
import { X, Download } from "lucide-react";

interface DownloadModalProps {
  isOpen: boolean;
  fileName: string;
  fileUrl: string;
  onClose: () => void;
}

export function DownloadFileModal({
  isOpen,
  fileName,
  fileUrl,
  onClose,
}: DownloadModalProps) {
  const [isProcessing, setIsProcessing] = useState(true);

  // Simulate processing (e.g., verifying file)
  useState(() => {
    const timer = setTimeout(() => setIsProcessing(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-900/90 backdrop-blur-lg p-6 rounded-2xl w-full max-w-sm border border-gray-700/50 shadow-xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-white">Download File</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <p className="text-gray-300 text-sm">
          Preparing to download
          <span className="text-gray-100 font-medium"> "{fileName}"</span>...
        </p>

        {/* Actions */}
        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-400 hover:text-white transition"
          >
            Cancel
          </button>
          <a
            href={isProcessing ? "#" : fileUrl}
            download={fileName}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition ${
              isProcessing
                ? "bg-gray-700 cursor-not-allowed text-gray-400"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
            onClick={(e) => isProcessing && e.preventDefault()}
          >
            <Download size={18} />
            <span>{isProcessing ? "Processing..." : "Download"}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
