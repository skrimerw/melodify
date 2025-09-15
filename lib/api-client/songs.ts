import { Song } from "@prisma/client";
import { axiosInstance } from "./axiosInstance";
import { SongWithAlbumAndArtist } from "@/types";

export const search = async (searchVal: string) => {
    return await axiosInstance.get<SongWithAlbumAndArtist[]>(
        "/api/songs/search",
        {
            params: {
                search: searchVal,
            },
        }
    );
};
