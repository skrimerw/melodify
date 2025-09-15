import { Song } from "@prisma/client";
import { axiosInstance } from "./axiosInstance";

export const search = async (searchVal: string) => {
    return await axiosInstance.get<Song[]>("/api/songs/search", {
        params: {
            search: searchVal,
        },
    });
};
