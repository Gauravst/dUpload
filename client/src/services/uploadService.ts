import api from "./api";

export const uploadFiles = async (files: File[]): Promise<boolean> => {
  const formData = new FormData();
  files.forEach((file) => formData.append("files", file));

  try {
    const response = await api.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.status === 200 || response.status === 201;
  } catch (error) {
    console.error("Error uploading files:", error);
    throw error;
  }
};
