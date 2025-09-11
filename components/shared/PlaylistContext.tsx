'use client'

import React from "react";
import PlaylistSongsItem from "./PlaylistSongsItem";
import { cn } from "@/lib/utils";
import { Song, useAudioPlayer } from "@/context/useAudioPlayer";

interface Props {
    songs: Song[];
    className?: string;
}

export default function PlaylistContext({ songs, className }: Props) {
    const { setQueue } = useAudioPlayer();
    const onPlayClick = () => setQueue(songs);

    return (
        <div className={cn("flex flex-col gap-4", className)}>
            {songs.map((song) => {
                return <PlaylistSongsItem key={song.id} song={song} onPlayClick={onPlayClick} />;
            })}
        </div>
    );
}
