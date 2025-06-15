import { useState, useRef, useEffect, useContext } from "react";
import { toast } from "react-toastify";

import { FolderProps } from "@/types";
import {
  LogOut,
  Upload,
  Plus,
  Folder,
  FolderOpen,
  MoreVertical,
  Trash,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { UploadModal } from "./UploadModal";
import { ConfirmModal } from "./ConfirmModal";
import { UplaodLoding } from "./UploadLoading";
import { CreateFolderModal } from "./CreateFolderModal";

import { createFolder, DeleteFolder } from "@/services/folderService";
import { uploadFiles } from "@/services/uploadService";
import { useAuth } from "@/context/authContext";
import { FolderContext } from "@/context/folderContext";

type Props = {
  data: FolderProps[];
  username?: string;
  setFoldersData: React.Dispatch<React.SetStateAction<FolderProps[]>>;
};

export const Sidebar = ({ data, username, setFoldersData }: Props) => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [isUploadOpen, setUploadOpen] = useState(false);
  const [isCreateFolderOpen, setCreateFolderOpen] = useState(false);
  const currentData = data.find((item) => item.username === username);
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);
  const menuRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const [deleteFolder, setDeleteFolder] = useState<FolderProps | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const context = useContext(FolderContext);
  if (!context) {
    throw new Error(
      "useContext(FolderContext) must be used inside a FolderProvider",
    );
  }

  const { setOpenFolder } = context;

  const handleUpload = async (files: File[]): Promise<void> => {
    setIsUploading(true);
    const res = await uploadFiles(files, currentData?.id);
    setUploadOpen(false);
    setIsUploading(false);

    if (res.status === 200 || res.status === 201) {
      // Get the current folder from context and update it directly
      const { openFolder } = context;
      if (openFolder) {
        const updatedFolder: FolderProps = {
          ...openFolder,
          files: [...(openFolder.files || []), res.data],
        };
        setOpenFolder(updatedFolder);
      }
      toast.success(`File uploaded`);
    } else {
      toast.error(`Something went wrong`);
    }
  };

  const handleCreateFolder = async (
    name: string,
    username: string,
  ): Promise<void> => {
    const res = await createFolder(name, username);
    if (res.status) {
      setOpenFolder(res.data);
      setCreateFolderOpen(false);
      setFoldersData((prev) => [...prev, res.data]);
      toast.success(`"${name}" created`);
      navigate(`/dashboard/${username}`);
    }
  };

  const handleLogout = async (): Promise<void> => {
    await logout();
  };

  const handleDelete = (folder: FolderProps): void => {
    setDeleteFolder(folder);
    setDeleteOpen(true);
  };

  const handleDeleteConfirm = async (): Promise<void> => {
    if (deleteFolder?.id) {
      const res = await DeleteFolder(deleteFolder.id);
      if (res) {
        setFoldersData((prev) =>
          prev.filter((folder) => folder.id !== deleteFolder.id),
        );
        setDeleteOpen(false);
        toast.success(`"${deleteFolder.name}" was deleted`);
      }
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        openMenuIndex !== null &&
        menuRefs.current[openMenuIndex] &&
        !menuRefs.current[openMenuIndex]?.contains(event.target as Node)
      ) {
        setOpenMenuIndex(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openMenuIndex]);

  const handleUploadLoadingClose = () => {
    setIsUploading(false);
  };

  return (
    <>
      {/* Modals */}
      <ConfirmModal
        isOpen={isDeleteOpen}
        title="Delete Folder"
        description={`Are you sure you want to delete folder - ${deleteFolder?.name}`}
        buttonText="Delete"
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleDeleteConfirm}
      />

      <UploadModal
        isOpen={isUploadOpen}
        onClose={() => setUploadOpen(false)}
        onUpload={handleUpload}
      />

      <CreateFolderModal
        isOpen={isCreateFolderOpen}
        onClose={() => setCreateFolderOpen(false)}
        onCreate={handleCreateFolder}
      />

      <UplaodLoding
        isOpen={isUploading}
        fileName={uploadFiles.name}
        onClose={handleUploadLoadingClose}
      />

      {/* Sidebar */}
      <aside className="flex flex-col justify-between items-center fixed left-0 top-0 h-screen w-72 bg-gray-800/50 backdrop-blur-lg border-r border-gray-700/50">
        <div className="p-4 w-full">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 mb-8">
              <img src="/logo.png" className="w-7 h-7" />
              <span className="text-xl font-bold">D Upload</span>
            </Link>
          </div>

          <button
            onClick={() => setUploadOpen(true)}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition duration-200"
          >
            <Upload size={20} />
            <span>Upload File</span>
          </button>

          <button
            onClick={() => setCreateFolderOpen(true)}
            className="w-full mt-2 flex items-center justify-center gap-2 border hover:bg-blue-400 text-white py-2 px-4 rounded-lg transition duration-200"
          >
            <Plus size={20} />
            <span>Create Folder</span>
          </button>

          <div className="mt-8 space-y-2 overflow-y-auto h-[60vh] scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-900 scrollbar-track-rounded-full">
            {data?.map((folder, index) => {
              const isCurrent = username === folder.username;

              return (
                <div
                  key={index}
                  className={`relative flex justify-between items-center ${isCurrent ? "bg-gray-700/50 text-blue-400 rounded-lg" : ""}`}
                  ref={(el) => {
                    menuRefs.current[index] = el;
                  }}
                >
                  <button
                    onClick={() => navigate(`/dashboard/${folder.username}`)}
                    className="w-full flex items-center gap-3 px-4 py-2 text-left"
                  >
                    {isCurrent ? (
                      <FolderOpen size={20} className="text-blue-400" />
                    ) : (
                      <Folder size={20} />
                    )}
                    <span>{folder.name}</span>
                  </button>

                  <button
                    onClick={() =>
                      setOpenMenuIndex(openMenuIndex === index ? null : index)
                    }
                    className="p-2 hover:bg-gray-700 rounded-lg"
                  >
                    <MoreVertical size={18} />
                  </button>

                  {openMenuIndex === index && (
                    <div className="absolute top-full right-2 mt-1 bg-gray-900 text-white rounded-md shadow-lg z-10 w-32">
                      <button
                        onClick={() => handleDelete(folder)}
                        className="flex items-center gap-2 px-4 py-2 hover:bg-red-600 w-full text-sm rounded-md"
                      >
                        <Trash size={16} />
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="mb-4 w-[90%] flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition duration-200"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </aside>
    </>
  );
};
