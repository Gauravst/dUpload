import { downloadFile } from "@/services/downloadService";
import { deleteFile } from "@/services/folderService";
import { FolderProps } from "@/types";
import { Download, Share2, Trash2, MoreVertical, File } from "lucide-react";
import { DeleteFileModal } from "./DeleteFileModal";
import { useState } from "react";
import { DownloadFileModal } from "./DonloadFileModal";

type Props = {
  data?: FolderProps;
};

export const Main = ({ data }: Props) => {
  const filesData = data?.files;
  const folderName = data?.name;
  const [deleteFileName, setDeleteFileName] = useState("");
  const [deleteFileId, setDeleteFileId] = useState(0);
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const [isDownloadModalOpen, setDownloadModalOpen] = useState(false);
  const [donloadFileName, setDonloadFileName] = useState("");
  const [downloadFileId, setDownloadFileId] = useState(0);

  const handleDownload = async (id: number, name: string) => {
    setDonloadFileName(name);
    setDownloadFileId(id);
    setDownloadModalOpen(true);
  };

  const hanldeDeleteButton = async (fileId: number, fileName: string) => {
    setDeleteFileName(fileName);
    setDeleteFileId(fileId);
    setDeleteOpen(true);
  };

  const handleDelete = async () => {
    const res = await deleteFile(deleteFileId);
    if (res) {
      setDeleteOpen(false);
    }
  };

  return (
    <main className="ml-64 p-8">
      <DeleteFileModal
        isOpen={isDeleteOpen}
        fileName={deleteFileName}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleDelete}
      />

      <DownloadFileModal
        isOpen={isDownloadModalOpen}
        fileName={donloadFileName}
        fileId={downloadFileId}
        onClose={() => setDownloadModalOpen(false)}
      />

      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-8">{folderName}</h1>

        <div className="grid gap-4">
          {/* File Card */}
          {filesData?.map((file, index) => {
            return (
              <div
                key={index}
                className="bg-gray-800/50 backdrop-blur-lg p-4 rounded-lg border border-gray-700/50"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <File className="mr-2 w-8 h-8 text-blue-500" />
                    <div>
                      <h3 className="font-medium">{file.name}</h3>
                      <p className="text-sm text-gray-400">
                        {file.size < 1024
                          ? `${file.size} KB`
                          : `${(file.size / 1024).toFixed(2)} MB`}{" "}
                        •{" "}
                        {file.type.split("/")[1].charAt(0).toUpperCase() +
                          file.type.split("/")[1].slice(1)}{" "}
                        • {"Private"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleDownload(file.id, file.name)}
                      className="p-2 hover:bg-gray-700 rounded-lg"
                    >
                      <Download size={18} />
                    </button>
                    <button className="p-2 hover:bg-gray-700 rounded-lg">
                      <Share2 size={18} />
                    </button>
                    <button
                      onClick={() => hanldeDeleteButton(file.id, file.name)}
                      className="p-2 hover:bg-gray-700 rounded-lg"
                    >
                      <Trash2 size={18} />
                    </button>
                    <button className="p-2 hover:bg-gray-700 rounded-lg">
                      <MoreVertical size={18} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
};
