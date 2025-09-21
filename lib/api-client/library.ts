import { axiosInstance } from "./axiosInstance";
import { LibraryResult } from "@/types";

export const getUserLibrary = async (userId: number) => {
    return await axiosInstance.get<LibraryResult>(`/library/${userId}`);
};
