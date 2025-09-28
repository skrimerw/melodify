import { create } from "zustand";
import { Api } from "@/lib/api-client";
import { LibraryResult } from "@/types";

type State = {
    library: LibraryResult | null;
    loading: boolean;
    setLibrary: (songs: LibraryResult) => void;
    fetchLibrary: (userId: number) => Promise<void>;
};

export const useLibraryStore = create<State>((set) => ({
    library: null,
    loading: true,
    setLibrary: (library) => {
        set({ library });
    },
    fetchLibrary: async (userId) => {
        try {
            set({ loading: true });
            const { data } = await Api.library.getUserLibrary(userId);

            set({ library: data });
        } catch (e) {
            console.error(e);
        } finally {
            set({ loading: false });
        }
    },
}));
