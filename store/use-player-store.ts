import { Song } from "@prisma/client";
import { create } from "zustand";

interface PlayerState {
    currentSong: Song | null;
    songs: Song[];
    isPaused: boolean;
    ended: boolean;
    setEnded: (val: boolean) => void;
    setIsPaused: (val: boolean) => void;
    setSong: (song: Song) => void;
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
    next: () =>
        set((state) => {
            if (state.currentSong) {
                const index = state.songs.findIndex(
                    (song) => song.id === state.currentSong?.id
                );

                return { currentSong: state.songs.at(index + 1) };
            }

            return {};
        }),
    prev: () =>
        set((state) => {
            if (state.currentSong) {
                const index = state.songs.findIndex(
                    (song) => song.id === state.currentSong?.id
                );

                return { currentSong: state.songs.at(index - 1) };
            }

            return {};
        }),
}));
