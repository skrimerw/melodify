"use client";

import React from "react";
import { FaPause, FaPlay } from "react-icons/fa6";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Song, useAudioPlayer } from "@/context/useAudioPlayer";

interface Props {
    onPlayClick: () => void;
    song: Song;
}

export function SongCard({ song, onPlayClick }: Props) {
    const { pause, play, isPaused, currentSong } = useAudioPlayer();
    const { id, imageUrl, title, authorName } = song;

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
        <div className="group flex flex-col items-stretch gap-3 text-sm cursor-default bg-card-accent rounded-sm p-2 pb-4 w-full h-full">
            <div className="relative aspect-square rounded-sm overflow-hidden flex-none w-full bg-typography-gray/5">
                {!isPaused && currentSong?.id === id && (
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
                            "cursor-pointer transition-[top] duration-200 group-hover:top-1/2 absolute top-[calc(50%+8px)] left-1/2 -translate-y-1/2 -translate-x-1/2 h-12 w-12 rounded-full bg-btn-primary text-background flex items-center justify-center text-base",
                            isPaused && currentSong?.id === id && "top-1/2"
                        )}
                    >
                        {!isPaused && currentSong?.id === id ? (
                            <FaPause size={20} />
                        ) : (
                            <FaPlay className="ml-0.5" size={20} />
                        )}
                    </motion.div>
                </div>
            </div>
            <div className="flex flex-col gap-1 text-base flex-1">
                <h2 className="h-full">{title}</h2>
                <p className="font-normal text-typography-gray">
                    By {authorName}
                </p>
            </div>
        </div>
    );
}

export default React.memo(SongCard);
