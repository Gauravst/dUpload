import { useNavigate, useParams } from "react-router-dom";
import { Main } from "@/components/Dashboard/Main";
import { Sidebar } from "@/components/Dashboard/Sidebar";
import { FolderProps } from "@/types";
import { useEffect, useState } from "react";
import { getAllFolder } from "@/services/folderService";

const Dashboard = () => {
  const [foldersData, setFoldersData] = useState<FolderProps[]>([]);
  const [currentFolder, setCurrentFolder] = useState<FolderProps>();
  const { username } = useParams<{ username: string }>();
  const navigate = useNavigate();

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
    setCurrentFolder(data);
  }, [username, foldersData]);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <Sidebar data={foldersData} username={username} />

      {/* Main Content */}
      <Main data={currentFolder} />
    </div>
  );
};

export default Dashboard;
