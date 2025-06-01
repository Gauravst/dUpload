import { useNavigate, useParams } from "react-router-dom";
import { Main } from "@/components/Dashboard/Main";
import { Sidebar } from "@/components/Dashboard/Sidebar";
import { FolderProps } from "@/types";
import { useContext, useEffect, useState } from "react";
import { getAllFolder } from "@/services/folderService";
import { FolderContext } from "@/context/folderContext";

const Dashboard = () => {
  const [foldersData, setFoldersData] = useState<FolderProps[]>([]);
  const [currentFolder, setCurrentFolder] = useState<FolderProps | null>(null);
  const { username } = useParams<{ username: string }>();
  const navigate = useNavigate();

  const context = useContext(FolderContext);
  if (!context) {
    throw new Error(
      "useContext(FolderContext) must be used inside a FolderProvider",
    );
  }

  const { setOpenFolder } = context;

  useEffect(() => {
    if (!username || username.trim() === "") {
      navigate(`/dashboard/main`);
    }
  }, [username, navigate]);

  async function fetchFolders() {
    const data = await getAllFolder();
    setFoldersData(data);
  }

  useEffect(() => {
    fetchFolders();
  }, []);

  useEffect(() => {
    const data = foldersData.find((item) => item.username === username);
    if (data) {
      setCurrentFolder(data);
      setOpenFolder(data);
    }
  }, [username, foldersData]);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <Sidebar
        data={foldersData}
        username={username}
        setFoldersData={setFoldersData}
      />

      {/* Main Content */}
      <Main data={currentFolder!} />
    </div>
  );
};

export default Dashboard;
