import { X, UploadCloud } from "lucide-react";
import { useState } from "react";

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (files: File[]) => void;
}

export function UploadModal({ isOpen, onClose, onUpload }: UploadModalProps) {
  const [files, setFiles] = useState<File[]>([]);

  if (!isOpen) return null;

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFiles = Array.from(event.dataTransfer.files);
    setFiles((prev) => [...prev, ...droppedFiles]);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFiles = Array.from(event.target.files);
      setFiles((prev) => [...prev, ...selectedFiles]);
    }
  };

  const handleUpload = async () => {
    if (files.length > 0) {
      onUpload(files);
      setFiles([]);
      onClose();
    }
  };

  const handleClose = () => {
    setFiles([]);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-900/90 backdrop-blur-lg p-8 rounded-2xl w-full max-w-md border border-gray-700/50 shadow-xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Upload File</h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-white"
          >
            <X size={24} />
          </button>
        </div>

        <div
          className="border-2 border-dashed border-gray-600/50 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 transition"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          onClick={() => document.getElementById("fileInput")?.click()}
        >
          <UploadCloud size={40} className="text-gray-400 mb-3" />
          <p className="text-gray-300 text-sm">Drag & drop files here</p>
          <p className="text-gray-500 text-xs">or click to select</p>
        </div>

        <input
          type="file"
          multiple
          id="fileInput"
          className="hidden"
          onChange={handleFileChange}
        />

        <label
          htmlFor="fileInput"
          className="mt-4 w-full bg-gray-800/50 hover:bg-gray-800 text-white py-3 px-4 rounded-lg border border-gray-700/50 transition duration-200 text-center cursor-pointer block"
        >
          Select Files
        </label>

        {files.length > 0 && (
          <div className="mt-4 max-h-40 overflow-auto space-y-2 bg-gray-800 p-2 rounded-lg">
            {files.map((file, index) => (
              <p key={index} className="text-sm text-gray-400 truncate">
                {file.name}
              </p>
            ))}
          </div>
        )}

        <button
          onClick={handleUpload}
          disabled={files.length === 0}
          className={`mt-4 w-full py-3 px-4 rounded-lg transition duration-200 text-white ${
            files.length > 0
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-700 cursor-not-allowed"
          }`}
        >
          Upload
        </button>
      </div>
    </div>
  );
}
