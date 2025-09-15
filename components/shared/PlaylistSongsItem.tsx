"use client";

import { cn, formatToMinutes } from "@/lib/utils";
import React from "react";
import LikeBtn from "./LikeBtn";
import { motion } from "framer-motion";
import { FaPause, FaPlay } from "react-icons/fa6";
import { useAudioPlayer } from "@/store/use-audio-player";
import { SongWithAlbumAndArtist } from "@/types";
import Link from "next/link";

interface Props {
    onPlayClick: () => void;
    song: SongWithAlbumAndArtist;
    className?: string;
}

export default function PlaylistSongsItem({
    song,
    className,
    onPlayClick,
}: Props) {
    const isPaused = useAudioPlayer((state) => state.isPaused);
    const currentSong = useAudioPlayer((state) => state.currentSong);
    const play = useAudioPlayer((state) => state.play);
    const pause = useAudioPlayer((state) => state.pause);
    const {
        id,
        title,
        artist: { id: artistId, name: authorName },
        album: { imageUrl },
        duration,
    } = song;

    const handleClick = () => {
        if (currentSong?.id !== id) {
            play(song);
            onPlayClick();
        } else {
            if (isPaused) {
                play();
            } else {
                pause();
            }
        }
    };

    return (
        <div
            className={cn(
                "group flex justify-between items-center cursor-pointer w-full hover:bg-typography-gray/10 p-2 pr-4 -my-2 rounded-sm",
                className
            )}
        >
            <div className="flex gap-2 items-center">
                <div className="relative !size-[55px] rounded-sm overflow-hidden flex-none w-full bg-typography-gray/5">
                    {!isPaused && currentSong?.id === id && (
                        <motion.div
                            animate={{ scale: [1, 1.8, 1] }}
                            transition={{
                                duration: 0.8,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className="absolute top-1/2 left-1/2 -translate-1/2 size-4 rounded-full bg-btn-primary"
                        ></motion.div>
                    )}
                    <img
                        src={imageUrl}
                        alt="Album cover"
                        className="object-cover select-none h-full w-full"
                    />
                    <div
                        className={cn(
                            "transition-all duration-200 group-hover:opacity-100 opacity-0 absolute h-full w-full top-1/2 left-1/2 -translate-1/2 flex items-center justify-center bg-black/35",
                            isPaused && currentSong?.id === id && "opacity-100"
                        )}
                    >
                        <motion.div
                            onClick={handleClick}
                            whileTap={{
                                scale: 0.99,
                            }}
                            whileHover={{
                                scale: 1.05,
                            }}
                            className={cn(
                                "cursor-pointer transition-[top] duration-200 group-hover:top-1/2 absolute top-[calc(50%+8px)] left-1/2 -translate-y-1/2 -translate-x-1/2 size-8 rounded-full bg-btn-primary text-background flex items-center justify-center text-base",
                                isPaused && currentSong?.id === id && "top-1/2"
                            )}
                        >
                            {!isPaused && currentSong?.id === id ? (
                                <FaPause size={16} />
                            ) : (
                                <FaPlay className="ml-0.5" size={16} />
                            )}
                        </motion.div>
                    </div>
                </div>
                <div className="text-[15px]">
                    <h3 className="transition-all hover:underline">{title}</h3>
                    <Link
                        href={`/artist/${artistId}`}
                        className="text-typography-gray transition-all hover:text-primary"
                    >
                        {authorName}
                    </Link>
                </div>
            </div>
            <span className="ml-auto tabular-nums font-medium text-sm text-primary/60 mr-5">
                {formatToMinutes(duration)}
            </span>
            <LikeBtn song={song} />
        </div>
    );
}
