"use client";

import React from "react";
import { FaPause, FaPlay } from "react-icons/fa6";
import { cn } from "@/lib/utils";
import { useAudioPlayer } from "@/store/use-audio-player";
import Link from "next/link";
import { motion } from "framer-motion";
import { SongWithAlbumAndArtist } from "@/types";
import { Artist } from "@prisma/client";

interface Props {
    artist: Artist & { songs: SongWithAlbumAndArtist[] };
    className?: string;
}

export function ArtistCard({
    artist: { id, name, heroImageUrl, songs },
    className,
}: Props) {
    const isPaused = useAudioPlayer((state) => state.isPaused);
    const play = useAudioPlayer((state) => state.play);
    const pause = useAudioPlayer((state) => state.pause);
    const setQueue = useAudioPlayer((state) => state.setQueue);
    const setQueueId = useAudioPlayer((state) => state.setQueueId);
    const currentQueueId = useAudioPlayer((state) => state.queueId);
    const queueId = `${name.toLowerCase()}.popular`;

    const handleClick = () => {
        if (queueId !== currentQueueId) {
            play(songs[0]);
            setQueue(songs);
            setQueueId(queueId);
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
                "group flex flex-col items-center gap-2 text-sm transition-all hover:bg-white/3 rounded-sm p-2 w-full h-fit cursor-pointer",
                className
            )}
        >
            <div className="relative aspect-square rounded-full flex-none w-full bg-typography-gray/5">
                {!isPaused && currentQueueId === queueId && (
                    <motion.div
                        animate={{ scale: [1, 1.8, 1] }}
                        transition={{
                            duration: 0.8,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="absolute top-1/2 left-1/2 -translate-1/2 size-6 rounded-full bg-btn-primary group-hover:hidden"
                    ></motion.div>
                )}
                <img
                    src={heroImageUrl}
                    alt="Album cover"
                    className="object-cover select-none h-full w-full transition-opacity rounded-full"
                />
                <div
                    className={cn(
                        "transition-all duration-200 group-hover:opacity-100 opacity-0 absolute h-[calc(100%)] w-[calc(100%)] top-1/2 left-1/2 -translate-1/2 flex items-center justify-center bg-black/35 rounded-full",
                        isPaused && currentQueueId === queueId && "opacity-100"
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
                            "cursor-pointer transition-[bottom] duration-200 group-hover:bottom-2 absolute bottom-0 right-2 h-12 w-12 rounded-full bg-btn-primary text-background flex items-center justify-center text-base",
                            isPaused && currentQueueId === queueId && "bottom-2"
                        )}
                    >
                        {!isPaused && currentQueueId === queueId ? (
                            <FaPause size={20} />
                        ) : (
                            <FaPlay className="ml-0.5" size={20} />
                        )}
                    </motion.div>
                </div>
            </div>
            <Link
                href={`/artist/${id}`}
                scroll={false}
                className="text-sm transition-all hover:underline underline-offset-2 w-fit"
            >
                {name}
            </Link>
        </div>
    );
}

export default React.memo(ArtistCard);
