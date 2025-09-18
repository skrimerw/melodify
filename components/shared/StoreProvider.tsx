"use client";

import { useAudioPlayer } from "@/store/use-audio-player";
import { useLikedSongsStore } from "@/store/use-liked-songs-store";
import React, { useEffect } from "react";

interface Props {
    userId: number | undefined;
    children: React.ReactNode;
}

export default function StoreProvider({ userId, children }: Props) {
    const fetchSongs = useLikedSongsStore((state) => state.fetchSongs);
    const destroyAudioPlayer = useAudioPlayer(state => state.destroyAudioPlayer)

    useEffect(() => {
        if (userId) {
            fetchSongs(userId);
        }

        return () => {
            destroyAudioPlayer()
        }
    }, []);

    return <div>{children}</div>;
}
