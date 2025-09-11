import { Prisma, Song } from "@prisma/client";
import { create } from "zustand";

export type SongFull = Prisma.SongGetPayload<{
    include: {
        usersLiked: true;
    };
}>;

interface PlayerState {
    currentSong: SongFull | null;
    songs: SongFull[];
    isPaused: boolean;
    ended: boolean;
    setEnded: (val: boolean) => void;
    setIsPaused: (val: boolean) => void;
    setSong: (song: SongFull) => void;
    setSongs: (songs: SongFull[]) => void;
    next: () => void;
    prev: () => void;
}

export const usePlayerStore = create<PlayerState>()((set) => ({
    currentSong: null,
    songs: [],
    isPaused: false,
    ended: false,
    setEnded: (val) => set(() => ({ ended: val })),
    setIsPaused: (val) => set(() => ({ isPaused: val })),
    setSong: (song) =>
        set(() => {
            return {
                currentSong: song,
            };
        }),
    setSongs: (songs) => set(() => ({ songs })),
    next: () =>
        set((state) => {
            if (state.currentSong) {
                const index = state.songs.findIndex(
                    (song) => song.id === state.currentSong?.id
                );

                return {
                    currentSong: state.songs.at(index + 1) || state.songs.at(0),
                    ended:false,
                    isPaused: false
                };
            }

            return {};
        }),
    prev: () =>
        set((state) => {
            if (state.currentSong) {
                const index = state.songs.findIndex(
                    (song) => song.id === state.currentSong?.id
                );

                return {
                    currentSong:
                        state.songs.at(index - 1) || state.songs.at(-1),
                };
            }

            return {};
        }),
}));
