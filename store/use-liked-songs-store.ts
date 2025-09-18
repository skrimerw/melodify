import { Song } from "@prisma/client";
import { create } from "zustand";
import { axiosInstance } from "@/lib/api-client/axiosInstance";

type State = {
    likedSongs: Song[];
    setLikedSongs: (songs: Song[]) => void;
    fetchSongs: (userId: number) => Promise<void>;
};

export const useLikedSongsStore = create<State>((set) => ({
    likedSongs: [],
    setLikedSongs: (songs) => {
        set({ likedSongs: songs });
    },
    fetchSongs: async (userId) => {
        try {
            const { data } = await axiosInstance.get<Song[]>(
                `/liked-songs/${userId}`
            );

            set({ likedSongs: data });
        } catch (e) {
            console.error(e);
        }
    },
}));
