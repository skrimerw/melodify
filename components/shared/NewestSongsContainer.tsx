"use client";

import React from "react";
import SongCard from "./SongCard";
import { cn } from "@/lib/utils";
import { Song, useAudioPlayer } from "@/context/useAudioPlayer";

interface Props {
    songs: Song[];
    className?: string;
}

export default function NewestSongsContainer({ songs, className }: Props) {
    const { setQueue } = useAudioPlayer();
    const onPlayClick = () => setQueue(songs);

    return (
        <div
            className={cn(
                "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 min-[90rem]:grid-cols-6 gap-4",
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
