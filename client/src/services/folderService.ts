import { FolderProps } from "@/types";
import api from "./api";

export const getAllFolder = async (): Promise<FolderProps[]> => {
  try {
    const response = await api.get("/dashboard/folder");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching user info:", error);
    throw error;
  }
};
