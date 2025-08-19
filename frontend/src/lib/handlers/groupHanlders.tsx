import { createGroupType } from "@/schema/groupSchema";
import { axiosInstance } from "../axios/axios.utils";

export const getGroups = async () => {
  try {
    const res = await axiosInstance.get("/group/");
    return res.data;
  } catch (err: any) {
    throw new Error(
      err?.response?.data?.message || err.message || "Failed to fetch groups"
    );
  }
};

export const createGroup = async (data: createGroupType) => {
  try {
    const res = await axiosInstance.post("/group/", data);
    console.log("Group created with:", data);
    return res.data;
  } catch (err: any) {
    throw new Error(err?.response?.data?.message || "Failed to create group");
  }
};

export const editGroup = async (groupId: string, data: createGroupType) => {
  try {
    const res = await axiosInstance.patch(`/group/${groupId}/`, data);
    console.log("Group updated with:", data);
    return res.data
  } catch (err: any) {
    throw new Error(err?.response?.data?.message || "Failed to update group");
  }
};

export const getGroupById = async (groupId: string) => {
  try {
    const res = await axiosInstance.get(`/group/${groupId}/`);
    console.log("Group by Id",res.data)
    return res.data;
  } catch (err: any) {
    throw new Error(err?.response?.data?.message || "Failed to fetch group");
  }
};
