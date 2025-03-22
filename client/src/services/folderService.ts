import { FolderProps } from "@/types";
import api from "./api";

export const getAllFolder = async (): Promise<FolderProps[]> => {
  try {
    const response = await api.get("/dashboard/folder");
    return response.data.data;
  } catch (error) {
    console.error("Error :", error);
    throw error;
  }
};

export const createFolder = async (
  name: string,
  username: string,
): Promise<boolean> => {
  try {
    const response = await api.post("/dashboard/folder", { name, username });
    return response.status === 200 || response.status === 201;
  } catch (error) {
    console.error("Error :", error);
    throw error;
  }
};

export const deleteFile = async (id: number): Promise<boolean> => {
  try {
    const response = await api.delete(`/dashboard/file/${id}`);
    return response.status === 200 || response.status === 201;
  } catch (error) {
    console.error("Error :", error);
    throw error;
  }
};
