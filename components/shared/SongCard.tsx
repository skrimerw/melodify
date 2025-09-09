"use client";

import React from "react";
import { FaPause, FaPlay } from "react-icons/fa6";
import { motion } from "framer-motion";
import { usePlayerStore } from "@/store/use-player-store";
import { Song } from "@prisma/client";
import { cn } from "@/lib/utils";

interface Props {
    song: Song;
    songTitle: string;
    authorName: string;
    albumCoverUrl: string;
}

export default function SongCard({
    song,
    albumCoverUrl,
    authorName,
    songTitle,
}: Props) {
    const { isPaused, setSong, currentSong, setIsPaused, setEnded } = usePlayerStore();

    return (
        <div className="group flex flex-col items-stretch gap-3 text-sm cursor-default bg-card-accent rounded-sm p-2 pb-4 w-full h-full">
            <div className="relative aspect-square rounded-sm overflow-hidden flex-none w-full bg-typography-gray/5">
                {!isPaused && currentSong?.id === song.id && (
                    <motion.div
                        animate={{ scale: [1, 1.8, 1] }}
                        transition={{
                            duration: 0.8,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="absolute top-1/2 left-1/2 -translate-1/2 size-6 rounded-full bg-btn-primary"
                    ></motion.div>
                )}
                <img
                    src={albumCoverUrl}
                    alt="Album cover"
                    className="object-cover select-none h-full w-full"
                />
                <div
                    className={cn(
                        "transition-all duration-200 group-hover:opacity-100 opacity-0 absolute h-full w-full top-1/2 left-1/2 -translate-1/2 z-10 flex items-center justify-center bg-black/35",
                        isPaused && currentSong?.id === song.id && "opacity-100"
                    )}
                >
                    <motion.div
                        onClick={() => {
                            if (currentSong?.id !== song.id) {
                                setSong(song);
                            } else {
                                setIsPaused(!isPaused);
                                setEnded(false)
                            }
                        }}
                        whileTap={{
                            scale: 0.99,
                        }}
                        whileHover={{
                            scale: 1.05,
                        }}
                        className={cn(
                            "cursor-pointer transition-[top] duration-200 group-hover:top-1/2 absolute top-[calc(50%+8px)] left-1/2 -translate-y-1/2 -translate-x-1/2 h-12 w-12 rounded-full bg-btn-primary text-background flex items-center justify-center text-base",
                            isPaused && currentSong?.id === song.id && "top-1/2"
                        )}
                    >
                        {!isPaused && currentSong?.id === song.id ? (
                            <FaPause size={20} />
                        ) : (
                            <FaPlay className="ml-0.5" size={20} />
                        )}
                    </motion.div>
                </div>
            </div>
            <div className="flex flex-col gap-1 text-base flex-1">
                <h2 className="h-full">{songTitle}</h2>
                <p className="font-normal text-typography-gray">
                    By {authorName}
                </p>
            </div>
        </div>
    );
}
