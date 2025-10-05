"use client";

import { useSession } from "next-auth/react";
import React from "react";
import LikeBtn from "../LikeBtn";
import { useAudioPlayer } from "@/store/use-audio-player";
import { Song } from "@prisma/client";
import Link from "next/link";

export default function ActiveSong() {
    const song = useAudioPlayer((state) => state.currentSong);

    const { data } = useSession();

    return (
        <div className="group flex items-center gap-3 text-sm cursor-default max-w-[300px]">
            <div className="relative h-[50px] w-[50px] rounded-md overflow-hidden flex-none">
                <img
                    src={song?.album.imageUrl}
                    alt="Album cover"
                    className="object-cover select-none"
                />
            </div>
            <div className="flex flex-col gap-1">
                <Link
                    title={song?.title}
                    href={`/album/${song?.albumId}`}
                    className="hover:underline cursor-pointer text-ellipsis max-w-[200px] w-full whitespace-nowrap overflow-hidden"
                >
                    {song?.title}
                </Link>
                <Link
                    href={`/artist/${song?.artistId}`}
                    className="font-normal text-white/60 transition-all hover:text-primary w-fit"
                >
                    {song?.artist.name}
                </Link>
            </div>
            {data?.user && <LikeBtn song={song as Song} />}
        </div>
    );
}
