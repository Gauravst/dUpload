import { User } from "@/types";
import api from "./api";

export const getUserInfo = async (): Promise<User> => {
  try {
    const response = await api.get("/auth/user");
    return response.data;
  } catch (error) {
    console.error("Error fetching user info:", error);
    throw error;
  }
};

export const logoutUser = async (): Promise<boolean> => {
  try {
    const response = await api.post("/auth/logout");
    return response.status == 200;
  } catch (error) {
    console.error("Error :", error);
    throw error;
  }
};
