"use client";

import { useAudioPlayer } from "@/store/use-audio-player";
import { useLibraryStore } from "@/store/use-library-store";
import { useLikedSongsStore } from "@/store/use-liked-songs-store";
import React, { useEffect } from "react";

interface Props {
    userId: number | undefined;
    children: React.ReactNode;
}

export default function StoreProvider({ userId, children }: Props) {
    const fetchSongs = useLikedSongsStore((state) => state.fetchSongs);
    const destroyAudioPlayer = useAudioPlayer(
        (state) => state.destroyAudioPlayer
    );

    const fetchLibrary = useLibraryStore((state) => state.fetchLibrary);

    useEffect(() => {
        if (userId) {
            fetchSongs(userId);
            fetchLibrary(userId);
        }

        return () => {
            destroyAudioPlayer();
        };
    }, []);

    return <div>{children}</div>;
}
