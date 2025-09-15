"use client";

import React from "react";
import SongCard from "./SongCard";
import { cn } from "@/lib/utils";
import { useAudioPlayer } from "@/store/use-audio-player";
import { SongWithAlbumAndArtist } from "@/types";

interface Props {
    songs: SongWithAlbumAndArtist[];
    className?: string;
}

export default function NewestSongsContainer({ songs, className }: Props) {
    const setQueue = useAudioPlayer((state) => state.setQueue);
    const onPlayClick = () => setQueue(songs);

    return (
        <div
            className={cn(
                "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 min-[90rem]:grid-cols-6 -mx-3",
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
