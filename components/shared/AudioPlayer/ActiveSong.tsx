"use client";

import { useSession } from "next-auth/react";
import React from "react";
import LikeBtn from "../LikeBtn";
import { useAudioPlayer } from "@/context/useAudioPlayer";
import { Song } from "@prisma/client";

export default function ActiveSong() {
    const { currentSong: song } = useAudioPlayer();
    const { data } = useSession();

    return (
        <div className="group flex items-center gap-3 text-sm cursor-default">
            <div className="relative h-[50px] w-[50px] rounded-md overflow-hidden flex-none">
                <img
                    src={song?.imageUrl}
                    alt="Album cover"
                    className="object-cover select-none"
                />
            </div>
            <div className="flex flex-col gap-1">
                <h2>{song?.title}</h2>
                <p className="font-normal text-typography-gray">
                    By {song?.authorName}
                </p>
            </div>
            {data?.user && <LikeBtn song={song as Song} />}
        </div>
    );
}
