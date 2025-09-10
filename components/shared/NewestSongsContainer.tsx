"use client";

import React, { useCallback } from "react";
import SongCard from "./SongCard";
import { cn } from "@/lib/utils";
import { SongFull, usePlayerStore } from "@/store/use-player-store";

interface Props {
    songs: SongFull[];
    className?: string;
}

export default function NewestSongsContainer({ songs, className }: Props) {
    const setSongs = usePlayerStore(({ setSongs }) => setSongs);
    const onPlayClick = useCallback(() => setSongs(songs), [setSongs, songs]);

    return (
        <div
            className={cn(
                "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4",
                className
            )}
        >
            {songs.map((song) => {
                return (
                    <SongCard
                        key={song.id}
                        song={song}
                        onPlayClick={onPlayClick}
                    />
                );
            })}
        </div>
    );
}
