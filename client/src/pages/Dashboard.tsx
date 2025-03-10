import { useNavigate, useParams } from "react-router-dom";
import { Main } from "@/components/Dashboard/Main";
import { Sidebar } from "@/components/Dashboard/Sidebar";
import { FileProps, FolderProps } from "@/types";
import { useEffect, useState } from "react";

const data: FolderProps[] = [
  {
    id: 90,
    name: "Main",
    username: "main",
  },
  {
    id: 0,
    name: "My Folder",
    username: "my-folder",
  },
  {
    id: 1,
    name: "Movies",
    username: "movies",
  },
  {
    id: 3,
    name: "Songs",
    username: "songs",
  },
  {
    id: 4,
    name: "Photos",
    username: "photos",
  },
  {
    id: 5,
    name: "Docs",
    username: "docs",
  },
];

export function Dashboard() {
  const [filesData, setFilesData] = useState<FileProps[]>([]);
  const [folderName, setFolderName] = useState<string>("");
  const { username } = useParams<{ username: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!username || username.trim() === "") {
      navigate(`/dashboard/main`);
    }
  }, [username, navigate]);

  useEffect(() => {
    // call the api/or fect data here
  }, [username]);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <Sidebar data={data} username={username} />

      {/* Main Content */}
      <Main filesData={filesData} folderName={folderName} />
    </div>
  );
}
