import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { X, Download, CheckCircle } from "lucide-react";
import { downloadFile } from "@/services/downloadService";

interface DownloadModalProps {
  isOpen: boolean;
  fileName: string;
  fileId: number;
  onClose: () => void;
}

const steps = [
  "Getting data",
  "Downloading file from Discord",
  "Merging file",
  "Processing file",
];

export function DownloadFileModal({
  isOpen,
  fileName,
  fileId,
  onClose,
}: DownloadModalProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const [isProcessing, setIsProcessing] = useState(true);
  const [fileUrl, setFileUrl] = useState("");

  const downloadFileFunc = async () => {
    const res = await downloadFile(fileId);
    console.log("data---", res);
    setFileUrl(res.fileUrl);
  };

  useEffect(() => {
    if (fileId != 0) {
      downloadFileFunc();
    }
  }, [fileId]);

  useEffect(() => {
    if (!isOpen) return;
    setStepIndex(0);
    setIsProcessing(true);

    const interval = setInterval(() => {
      setStepIndex((prev) => {
        if (prev < steps.length - 1) {
          return prev + 1;
        } else {
          if (fileUrl) {
            setIsProcessing(false);
            clearInterval(interval);
          }
          return prev;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen, fileUrl]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-900/90 backdrop-blur-lg p-6 rounded-2xl w-full max-w-md border border-gray-700/50 shadow-xl min-h-[280px]">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold text-white">Download File</h3>
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

        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-400 hover:text-white transition"
          >
            Cancel
          </button>
          <a
            href={isProcessing || !fileUrl ? "#" : fileUrl}
            download={fileName}
            rel="noopener noreferrer"
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition ${
              isProcessing || !fileUrl
                ? "bg-gray-700 cursor-not-allowed text-gray-400"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
            onClick={(e) => {
              e.preventDefault();
              if (isProcessing || !fileUrl) return;

              try {
                fetch(fileUrl)
                  .then((response) => {
                    if (!response.ok) {
                      throw new Error("Network response was not ok");
                    }
                    return response.blob();
                  })
                  .then((blob) => {
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = fileName;
                    document.body.appendChild(a);
                    a.click();
                    window.URL.revokeObjectURL(url);
                    document.body.removeChild(a);
                  })
                  .catch((err) => {
                    console.error("Download failed:", err);
                    alert("Download failed. Please try again.");
                  });
              } catch (err) {
                console.error("Unexpected error:", err);
                alert("Something went wrong.");
              }
            }}
          >
            <Download size={18} />
            <span>
              {isProcessing || !fileUrl ? "Processing..." : "Download"}
            </span>
          </a>
          <Link to={"http://localhost:5000/tmp/x.png"} target="_blank" download>
            Download
          </Link>
        </div>
      </div>
    </div>
  );
}
