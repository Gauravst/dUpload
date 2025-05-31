import { FolderProps } from "@/types";
import { createContext, ReactNode, useState } from "react";

type FolderContextProps = {
  openFolder: FolderProps | null;
  setOpenFolder: (data: FolderProps | null) => void;
};

export const FolderContext = createContext<FolderContextProps | null>(null);

type FolderProviderProps = {
  children: ReactNode;
};

export const FolderProvider = ({ children }: FolderProviderProps) => {
  const [openFolder, setOpenFolder] = useState<FolderProps | null>(null);

  return (
    <FolderContext.Provider value={{ openFolder, setOpenFolder }}>
      {children}
    </FolderContext.Provider>
  );
};
