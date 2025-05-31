import api from "./api";

export const uploadFiles = async (
  files: File[],
  folderId?: number,
): Promise<number> => {
  const formData = new FormData();
  files.forEach((file) => formData.append("file", file));

  try {
    const response = await api.post(`/upload/${folderId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.status;
  } catch (error) {
    console.error("Error uploading files:", error);
    throw error;
  }
};
