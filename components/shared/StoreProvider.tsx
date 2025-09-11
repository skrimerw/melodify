"use client";

import { useLikedSongsStore } from "@/store/use-liked-songs-store";
import React, { useEffect } from "react";

interface Props {
    userId: number | undefined;
    children: React.ReactNode;
}

export default function StoreProvider({ userId, children }: Props) {
    const fetchSongs = useLikedSongsStore((state) => state.fetchSongs);

    useEffect(() => {
        if (userId) {
            fetchSongs(userId);
        }
    }, []);

    return <div>{children}</div>;
}
