"use client";
import {
  editProfileType,
  loginFormType,
  signupFormType,
} from "@/schema/formSchema";
import { redirect } from "next/navigation";
import axios from "axios";
import { axiosInstance } from "../axios/axios.utils";
import { toast } from "sonner";

export const onRegisterSubmit = async (data: signupFormType) => {
  try {
    const res = await axiosInstance.post(`/user/register/`, data);
    toast.success("Registration successful");
    return { success: true, data: res.data };
  } catch (err: any) {
    console.error("Server registration error:", err);

    let errorMessage = "Registration failed.";
    if (axios.isAxiosError(err)) {
      errorMessage =
        err.response?.data?.detail ||
        err.response?.data?.message ||
        JSON.stringify(err.response?.data) ||
        err.message;
    }

    toast.error(errorMessage);
    return { success: false, error: errorMessage };
  }
};

export const onLoginSubmit = async (data: loginFormType) => {
  try {
    const res = await axiosInstance.post(`/user/login/`, data);
    toast.success("Login successful");
    redirect("/dashboard");
    return { success: true, data: res.data };
  } catch (err: any) {
    console.error("Server login error:", err);

    let errorMessage = "Login failed.";
    if (axios.isAxiosError(err)) {
      errorMessage =
        err.response?.data?.detail ||
        err.response?.data?.message ||
        JSON.stringify(err.response?.data) ||
        err.message;
    }

    toast.error(errorMessage);
    return { success: false, error: errorMessage };
  }
};

export const onUpdateProfile = async (id: string, data: editProfileType) => {
  try {
    const payload = { ...data, phone_no: data.phone };

    if (!payload.password) delete payload.password;
    if (!payload.confirmPassword) delete payload.confirmPassword;

    const res = await axiosInstance.patch(`/user/${id}/`, payload);
    toast.success("Profile updated successfully.");
    redirect("/dashboard/profile/");
    return { success: true, data: res.data };
  } catch (err: any) {
    console.error("Server update profile error:", err);

    let errorMessage = "Profile update failed.";
    if (axios.isAxiosError(err)) {
      errorMessage =
        err.response?.data?.detail ||
        err.response?.data?.message ||
        JSON.stringify(err.response?.data) ||
        err.message;
    }

    toast.error(errorMessage);
    return { success: false, error: errorMessage };
  }
};


export const onDeleteProfile = async (id: string) => {
  try {
    
    const res = await axiosInstance.delete(`/user/${id}/`);
    toast.success('User deleted successfully');
    redirect('/dashboard/profile/');
    return { success: true, res };
  } catch (err: any) {
    console.error("Server delete error:", err);

    let errorMessage = "Unexpected error";

    if (axios.isAxiosError(err)) {
      if (err.response) {
        errorMessage =
          (err.response.data && err.response.data.message) ||
          `Server returned status ${err.response.status}`;
      } else {
        errorMessage = err.message;
      }
    }

    toast.error(errorMessage);
    return { success: false, error: errorMessage };
  }
};
