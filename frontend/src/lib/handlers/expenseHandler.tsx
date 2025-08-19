'use client';
import { toast } from "sonner";
import { axiosInstance } from "../axios/axios.utils";

const getErrorMessage = (err: any, fallback = "An error occurred") => {
  if (!err) return fallback;

  if (err.response?.data?.detail) return err.response.data.detail;

  if (err.response?.data?.non_field_errors) {
    return err.response.data.non_field_errors.join(", ");
  }

  if (err.response?.data && typeof err.response.data === "object") {
    return Object.entries(err.response.data)
      .map(([key, val]: [string, any]) => `${key}: ${Array.isArray(val) ? val.join(", ") : val}`)
      .join("\n");
  }

  return err.message || fallback;
};

export const getExpense = async (groupId: string) => {
  if (!groupId) throw new Error("Group ID is required");

  try {
    const response = await axiosInstance.get(`/expense/`, {
      params: { group_id: groupId },
    });
    return response.data;
  } catch (err: any) {
    const message = getErrorMessage(err, "Failed to fetch expenses.");
    toast.error(message);
    throw new Error(message);
  }
};

export const createExpense = async (expenseData: any) => {
  try {
    const response = await axiosInstance.post("/expense/", expenseData);
    return response.data;
  } catch (err: any) {
    const message = getErrorMessage(err, "Failed to create expense.");
    toast.error(message);
    throw new Error(message);
  }
};

export const editExpense = async (expenseId: string, groupId: string, expenseData: any) => {
  try {
    const response = await axiosInstance.put(
      `/expense/${expenseId}/`,
      expenseData,
      { params: { group_id: groupId } }
    );
    return response.data;
  } catch (err: any) {
    const message = getErrorMessage(err, "Failed to update expense.");
    toast.error(message);
    throw new Error(message);
  }
};

export const getExpenseById = async (expenseId: string, groupId: string) => {
  try {
    const response = await axiosInstance.get(
      `/expense/${expenseId}/`,
      { params: { group_id: groupId } }
    );
    return response.data;
  } catch (err: any) {
    const message = getErrorMessage(err, "Failed to fetch expense by ID.");
    toast.error(message);
    throw new Error(message);
  }
};

export const deleteExpense = async (expenseId: string, groupId?: string) => {
  try {
    const response = await axiosInstance.delete(`/expense/${expenseId}/`, {
      params: groupId ? { group_id: groupId } : undefined,
    });
    return response.data;
  } catch (err: any) {
    const message = getErrorMessage(err, "Failed to delete expense.");
    toast.error(message);
    throw new Error(message);
  }
};
