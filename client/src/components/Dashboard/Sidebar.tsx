import { FolderProps } from "@/types";
import { Upload, Plus, Folder, FolderOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { UploadModal } from "./UploadModal";
import { useState } from "react";
import { uploadFiles } from "@/services/uploadService";

type Props = {
  data: FolderProps[];
  username?: string;
};

export const Sidebar = ({ data, username }: Props) => {
  const navigate = useNavigate();
  const [isUploadOpen, setUploadOpen] = useState(false);

  const handleUpload = async (files: File[]) => {
    await uploadFiles(files);
  };

  return (
    <>
      <UploadModal
        isOpen={isUploadOpen}
        onClose={() => setUploadOpen(false)}
        onUpload={handleUpload}
      />

      <aside className="fixed left-0 top-0 h-screen w-64 bg-gray-800/50 backdrop-blur-lg border-r border-gray-700/50">
        <div className="p-4">
          <div className="flex items-center gap-2 mb-8">
            <Upload className="w-8 h-8 text-blue-500" />
            <span className="text-xl font-bold">D Upload</span>
          </div>

          <button
            onClick={() => setUploadOpen(true)}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition duration-200"
          >
            <Plus size={20} />
            <span>Upload File</span>
          </button>

          <button className="w-full mt-2 flex items-center justify-center gap-2 border border-blue-200 hover:bg-blue-400 text-white py-2 px-4 rounded-lg transition duration-200">
            <Plus size={20} />
            <span>Create Folder</span>
          </button>

          <div className="mt-8 space-y-2">
            {data?.map((folder, index) => {
              return (
                <button
                  key={index}
                  onClick={() => {
                    navigate(`/dashboard/${folder.username}`);
                  }}
                  className={`${username == folder.username && "bg-gray-700/50 text-blue-400"} w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-700/50`}
                >
                  {username == folder.username ? (
                    <FolderOpen size={20} className="text-blue-400" />
                  ) : (
                    <Folder size={20} />
                  )}
                  <span>{folder.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </aside>
    </>
  );
};
