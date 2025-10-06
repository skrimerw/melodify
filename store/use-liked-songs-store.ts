import { Song } from "@prisma/client";
import { create } from "zustand";
import { axiosInstance } from "@/lib/api-client/axiosInstance";

type State = {
  likedSongs: Song[];
  loading: boolean;
  setLikedSongs: (songs: Song[]) => void;
  fetchSongs: (userId: number) => Promise<void>;
};

export const useLikedSongsStore = create<State>((set) => ({
  likedSongs: [],
  loading: true,
  setLikedSongs: (songs) => {
    set({ likedSongs: songs });
  },
  fetchSongs: async (userId) => {
    set({ loading: true });
    try {
      const { data } = await axiosInstance.get<Song[]>(
        `/liked-songs/${userId}`
      );

      set({ likedSongs: data });
    } catch (e) {
      console.error(e);
    } finally {
      set({ loading: false });
    }
  },
}));
