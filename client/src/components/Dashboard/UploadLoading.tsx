import { useState, useEffect } from "react";
import { X, CheckCircle } from "lucide-react";

interface UploadModalProps {
  isOpen: boolean;
  fileName: string;
  onClose: () => void;
}

const steps = [
  "Uploading file in server",
  "Crating file chunks",
  "Uplading into discord",
  "Saving Meta data",
];

export function UplaodLoding({ isOpen, fileName, onClose }: UploadModalProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const [isProcessing, setIsProcessing] = useState(true);
  console.log(isProcessing);

  useEffect(() => {
    if (!isOpen) return;
    setStepIndex(0);
    setIsProcessing(true);

    const interval = setInterval(() => {
      setStepIndex((prev) => {
        if (prev < steps.length - 1) {
          return prev + 1;
        } else {
          setIsProcessing(false);
          clearInterval(interval);
        }
        return prev;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-900/90 backdrop-blur-lg p-6 rounded-2xl w-full max-w-md border border-gray-700/50 shadow-xl min-h-[280px]">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold text-white">Uploading File</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition"
          >
            <X size={24} />
          </button>
        </div>

        <p className="text-gray-400 text-sm mb-6">{fileName}</p>

        <div className="text-gray-300 text-sm space-y-2 min-h-[120px] overflow-hidden">
          {steps.map((step, index) => (
            <p
              key={index}
              className={`flex items-center space-x-2 ${index > stepIndex ? "opacity-50" : ""}`}
            >
              {index < stepIndex ? (
                <CheckCircle size={20} className="text-green-500" />
              ) : index === stepIndex ? (
                <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <div className="w-5 h-5"></div>
              )}
              <span className="text-gray-100 font-medium">{step}</span>
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
