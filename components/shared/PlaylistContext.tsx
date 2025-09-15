"use client";

import React from "react";
import PlaylistSongsItem from "./PlaylistSongsItem";
import { cn } from "@/lib/utils";
import { Song } from "@prisma/client";
import PlaylistLoadingSkeleton from "./PlaylistLoadingSkeleton";
import { useAudioPlayer } from "@/store/use-audio-player";

interface Props {
    songs: Song[];
    loading?: boolean;
    className?: string;
}

export default function PlaylistContext({ songs, loading, className }: Props) {
    const setQueue = useAudioPlayer((state) => state.setQueue);
    const onPlayClick = () => setQueue(songs);

    return (
        <div className={cn("flex flex-col gap-4", className)}>
            {loading && <PlaylistLoadingSkeleton length={5} />}
            {songs.map((song) => {
                return (
                    <PlaylistSongsItem
                        key={song.id}
                        song={song}
                        onPlayClick={onPlayClick}
                    />
                );
            })}
        </div>
    );
}
