import api from "./api";
import { DownloadProps } from "@/types";

export const downloadFile = async (fileId?: number): Promise<DownloadProps> => {
  try {
    const response = await api.get(`/download/${fileId}`);
    return response.data;
  } catch (error) {
    console.error("Error", error);
    throw error;
  }
};
