import { FolderProps } from "@/types";
import {
  LogOut,
  Upload,
  Plus,
  Folder,
  FolderOpen,
  MoreVertical,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { UploadModal } from "./UploadModal";
import { useRef, useState } from "react";
import { uploadFiles } from "@/services/uploadService";
import { CreateFolderModal } from "./CreateFolderModal";
import { createFolder } from "@/services/folderService";
import { useAuth } from "@/context/authContext";
import { SidebarNavMenuModal } from "./SidebarNavMenuModal";

type Props = {
  data: FolderProps[];
  username?: string;
  setFoldersData: (data: FolderProps[]) => void;
};

export const Sidebar = ({ data, username, setFoldersData }: Props) => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [isUploadOpen, setUploadOpen] = useState(false);
  const [isCreateFolderOpen, setCreateFolderOpen] = useState(false);
  const currentData = data.find((item) => item.username === username);
  const [openNavMenu, setOpenNavMenu] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleUpload = async (files: File[]) => {
    const res = await uploadFiles(files, currentData?.id);
    if (res) {
      setUploadOpen(false);
    }
  };

  const handleCreateFolder = async (name: string, username: string) => {
    const res = await createFolder(name, username);
    console.log(res);
    if (res.status) {
      console.log("hello", res.data);
      setCreateFolderOpen(false);
      setFoldersData((prev) => [...prev, res.data]);
      navigate(`/dashboard/${username}`);
    }
  };

  const handleLogout = async () => {
    await logout();
  };

  const handleDeleteClick = async () => {};

  const handleDeleteConform = async () => {};

  return (
    <>
      <SidebarNavMenuModal
        open={openNavMenu}
        setOpen={setOpenNavMenu}
        triggerRef={btnRef}
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
              return (
                <div
                  key={index}
                  className={`flex ${username == folder.username && "bg-gray-700/50 text-blue-400 rounded-lg hover:bg-gray-700/50"}`}
                >
                  <button
                    key={index}
                    onClick={() => {
                      navigate(`/dashboard/${folder.username}`);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-2`}
                  >
                    {username == folder.username ? (
                      <FolderOpen size={20} className="text-blue-400" />
                    ) : (
                      <Folder size={20} />
                    )}
                    <span>{folder.name}</span>
                  </button>

                  <button
                    ref={btnRef}
                    onClick={() => setOpenNavMenu(true)}
                    className="p-2 hover:bg-gray-700 rounded-lg"
                  >
                    <MoreVertical size={18} />
                  </button>
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
