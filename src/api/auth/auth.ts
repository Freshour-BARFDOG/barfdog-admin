import axiosInstance, { publicAxios } from "@/api/axiosInstance";
import { AxiosInstance } from "axios";

const login = async (formData: { email: string; password: string }) => {
  const response = await publicAxios.post("/api/login", formData);

  return response;
};

const logout = async () => {
  const response = await axiosInstance.get("/api/logout");

  return response;
};

const getUserData = async (instance: AxiosInstance = axiosInstance) => {
  try {
    const { data } = await instance.get(`/api/members`);
    return data;
  } catch (error) {
    throw error;
  }
};

export { login, logout, getUserData };
