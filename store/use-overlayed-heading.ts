import { create } from "zustand";

type State = {
    overlayedHeading: string;
    setOverlayedHeading: (songs: string) => void;
};

export const useOverlayedHeadingStore = create<State>((set) => ({
    overlayedHeading: "",
    setOverlayedHeading: (overlayedHeading) => {
        set({ overlayedHeading });
    },
}));
