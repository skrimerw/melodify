import { axiosInstance } from "./axiosInstance";
import { SearchResult, SongWithAlbumAndArtist, TabName } from "@/types";

export const search = async (searchVal: string, tab?: TabName) => {
  return await axiosInstance.get<SearchResult>("/songs/search", {
    params: {
      text: searchVal,
      tab,
    },
  });
};
