"use client";

import React from "react";
import { FaPause, FaPlay } from "react-icons/fa6";
import { cn } from "@/lib/utils";
import { useAudioPlayer } from "@/store/use-audio-player";
import { Album, Artist } from "@prisma/client";
import Link from "next/link";
import { SongWithAlbumAndArtist } from "@/types";
import { motion } from "framer-motion";

interface Props {
    songs: SongWithAlbumAndArtist[];
    album: Album;
    artist: Artist;
    className?: string
}

export function AlbumCard({ songs, album, artist, className }: Props) {
    const isPaused = useAudioPlayer((state) => state.isPaused);
    const play = useAudioPlayer((state) => state.play);
    const pause = useAudioPlayer((state) => state.pause);
    const setQueue = useAudioPlayer((state) => state.setQueue);
    const setQueueId = useAudioPlayer((state) => state.setQueueId);
    const currentQueueId = useAudioPlayer((state) => state.queueId);
    const queueId = `${artist.name.toLowerCase()}.album.${album.title.toLowerCase()}`;

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
        <div className={cn("group flex flex-col items-stretch gap-1 text-sm transition-all hover:bg-white/3 rounded-sm p-2 w-full h-fit cursor-pointer", className)}>
            <div className="relative aspect-square rounded-sm overflow-hidden flex-none w-full bg-typography-gray/5">
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
                    src={album.imageUrl}
                    alt="Album cover"
                    className="object-cover select-none h-full w-full transition-opacity"
                />
                <div
                    className={cn(
                        "transition-all duration-200 group-hover:opacity-100 opacity-0 absolute h-[calc(100%+10px)] w-[calc(100%+10px)] top-1/2 left-1/2 -translate-1/2 flex items-center justify-center bg-black/35",
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
                            "cursor-pointer transition-[bottom] duration-200 group-hover:bottom-4 absolute bottom-[calc(12px)] right-4 h-12 w-12 rounded-full bg-btn-primary text-background flex items-center justify-center text-base",
                            isPaused && currentQueueId === queueId && "bottom-4"
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
            <div className="flex flex-col gap-0.5 text-base flex-1">
                <Link
                    href={`/album/${album.id}`}
                    className="h-full text-sm hover:underline w-fit cursor-pointer"
                >
                    {album.title}
                </Link>
                <Link
                    href={`/artist/${artist.id}`}
                    className="text-typography-gray text-sm transition-all hover:text-primary w-fit"
                >
                    {artist.name}
                </Link>
                <p className="text-typography-gray text-sm">
                    {album.releaseYear}
                </p>
            </div>
        </div>
    );
}

export default React.memo(AlbumCard);
