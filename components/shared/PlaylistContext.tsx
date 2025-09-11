"use client";

import React from "react";
import PlaylistSongsItem from "./PlaylistSongsItem";
import { cn } from "@/lib/utils";
import { Song, useAudioPlayer } from "@/context/useAudioPlayer";
import { useLikedSongsStore } from "@/store/use-liked-songs-store";
import { Music } from "lucide-react";

interface Props {
    className?: string;
}

export default function PlaylistContext({ className }: Props) {
    const songs = useLikedSongsStore((state) => state.likedSongs);
    const { setQueue } = useAudioPlayer();
    const onPlayClick = () => setQueue(songs as any);

    return (
        <div className={cn("flex flex-col gap-4", className)}>
            <div className="text-typography-gray flex flex-col items-center my-auto">
                <Music
                    className="text-typography-gray opacity-40"
                    size={150}
                    strokeWidth={1.2}
                />
                <p className="opacity-50 text-xl">No songs yet</p>
            </div>
            {songs.map((song) => {
                return (
                    <PlaylistSongsItem
                        key={song.id}
                        song={song as any}
                        onPlayClick={onPlayClick}
                    />
                );
            })}
        </div>
    );
}
