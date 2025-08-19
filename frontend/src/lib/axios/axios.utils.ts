// axios.ts
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    const isAuthRequest = originalRequest?.url?.includes("/user/login/") ||
                          originalRequest?.url?.includes("/user/register/");

    if (error.response?.status === 401 && !originalRequest._retry && !isAuthRequest) {
      originalRequest._retry = true;

      try {
        await axiosInstance.post("/token/refresh/");
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token expired, logging out...",refreshError);
        window.location.href = "/auth/login";
      }
    }

    return Promise.reject(error);
  }
);
