export type FileProps = {
  id: number;
  name: string;
  size: number;
  type: string;
  createdAt: string;
  url: string;
};

export type FolderProps = {
  id: number;
  name: string;
  username: string;
  files?: File[];
  createdAt?: string;
};
