import { FileProps } from "@/types";
import {
  FolderOpen,
  Download,
  Share2,
  Trash2,
  MoreVertical,
} from "lucide-react";

type Props = {
  filesData: FileProps[];
  folderName: string;
};

export const Main = ({ filesData, folderName }: Props) => {
  return (
    <main className="ml-64 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-8">My Files</h1>

        <div className="grid gap-4">
          {/* File Card */}
          <div className="bg-gray-800/50 backdrop-blur-lg p-4 rounded-lg border border-gray-700/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FolderOpen className="w-8 h-8 text-blue-500" />
                <div>
                  <h3 className="font-medium">Project Files</h3>
                  <p className="text-sm text-gray-400">12 files • 256 MB</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-gray-700 rounded-lg">
                  <Download size={18} />
                </button>
                <button className="p-2 hover:bg-gray-700 rounded-lg">
                  <Share2 size={18} />
                </button>
                <button className="p-2 hover:bg-gray-700 rounded-lg">
                  <Trash2 size={18} />
                </button>
                <button className="p-2 hover:bg-gray-700 rounded-lg">
                  <MoreVertical size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
