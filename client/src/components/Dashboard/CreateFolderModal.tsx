import { X } from "lucide-react";
import { useState } from "react";

interface CreateFolderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (name: string, username: string) => void;
}

export function CreateFolderModal({
  isOpen,
  onClose,
  onCreate,
}: CreateFolderModalProps) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");

  if (!isOpen) return null;

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newName = event.target.value;
    setName(newName);
    setUsername(newName.toLowerCase().replace(/\s+/g, "-"));
  };

  const handleCreate = () => {
    if (name.trim() !== "" && username.trim() !== "") {
      onCreate(name, username);
      setName("");
      setUsername("");
      onClose();
    }
  };
  const handleClose = () => {
    setName("");
    setUsername("");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-900/90 backdrop-blur-lg p-8 rounded-2xl w-full max-w-md border border-gray-700/50 shadow-xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Create Folder</h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-white"
          >
            <X size={24} />
          </button>
        </div>

        {/* Folder Name Input */}
        <div className="mb-4">
          <label className="text-gray-300 text-sm block mb-2">
            Folder Name
          </label>
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            className="w-full bg-gray-800/50 text-white p-3 rounded-lg border border-gray-700/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter folder name"
          />
        </div>

        <div className="mb-4">
          <label className="text-gray-300 text-sm block mb-2">
            Folder Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full bg-gray-800/50 text-white p-3 rounded-lg border border-gray-700/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter folder username"
          />
        </div>

        {/* Create Button */}
        <button
          onClick={handleCreate}
          disabled={name.trim() === "" || username.trim() === ""}
          className={`w-full py-3 px-4 rounded-lg transition duration-200 text-white ${
            name.trim() !== "" && username.trim() !== ""
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-700 cursor-not-allowed"
          }`}
        >
          Create
        </button>
      </div>
    </div>
  );
}
