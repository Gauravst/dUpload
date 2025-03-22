import { X } from "lucide-react";

interface DeleteModalProps {
  isOpen: boolean;
  fileName: string;
  onClose: () => void;
  onConfirm: () => void;
}

export function DeleteFileModal({
  isOpen,
  fileName,
  onClose,
  onConfirm,
}: DeleteModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-900/90 backdrop-blur-lg p-6 rounded-2xl w-full max-w-sm border border-gray-700/50 shadow-xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-white">Delete File</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <p className="text-gray-300 text-sm">
          Are you sure you want to delete
          <span className="text-gray-100 font-medium"> "{fileName}"</span>?
        </p>

        {/* Actions */}
        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={onClose}
            className="border rounded-lg px-4 py-2 text-gray-400 hover:text-white transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
