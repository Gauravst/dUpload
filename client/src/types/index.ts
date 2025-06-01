export type User = {
  id: number;
  strategy: string;
};

export type FolderProps = {
  id?: number;
  name?: string;
  username?: string;
  files?: FileProps[];
  createdAt?: string;
  updatedAt?: string;
};

export type FileProps = {
  id?: number;
  name?: string;
  size?: number;
  type?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type DownloadProps = {
  fileUrl: string;
};
