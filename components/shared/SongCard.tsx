"use client";

import React from "react";
import { FaPause, FaPlay } from "react-icons/fa6";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useAudioPlayer } from "@/store/use-audio-player";
import { SongWithAlbumAndArtist } from "@/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import LikeBtn from "./LikeBtn";

interface Props {
    onPlayClick: () => void;
    song: SongWithAlbumAndArtist;
}

export function SongCard({ song, onPlayClick }: Props) {
    const isPaused = useAudioPlayer((state) => state.isPaused);
    const currentSong = useAudioPlayer((state) => state.currentSong);
    const play = useAudioPlayer((state) => state.play);
    const pause = useAudioPlayer((state) => state.pause);

    const {
        id,
        album: { id: albumId, imageUrl },
        title,
        artist: { id: artistId, name },
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
        <div className="group flex flex-col items-stretch gap-1 text-sm cursor-default transition-all hover:bg-white/3 rounded-sm p-2 w-full h-fit">
            <div className="relative aspect-square rounded-sm overflow-hidden flex-none w-full bg-typography-gray/5 group-hover:shadow-lg">
                {!isPaused && currentSong?.id === id && (
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
                    src={imageUrl}
                    alt="Album cover"
                    className="object-cover select-none h-full w-full transition-opacity"
                />
                <div
                    className={cn(
                        "transition-all duration-200 group-hover:opacity-100 opacity-0 absolute h-[calc(100%+10px)] w-[calc(100%+10px)] top-1/2 left-1/2 -translate-1/2 flex items-center justify-center bg-black/35",
                        isPaused && currentSong?.id === id && "opacity-100"
                    )}
                >
                    <LikeBtn
                        className="[&>.heart-outline]:text-primary [&>.heart-filled]:text-white [&>.heart-filled]:hover:opacity-100  flex items-center justify-center rounded-full transition-[translate,opacity] duration-[400ms] opacity-0 group-hover:-translate-y-10 group-hover:opacity-100 absolute ease-out -bottom-[calc(22px)] left-4 size-10 bg-[rgba(26,26,26,.9)] hover:bg-[rgba(51,51,51,.9)]"
                        song={song}
                    />
                    <motion.div
                        onClick={handleClick}
                        whileTap={{
                            scale: 0.99,
                        }}
                        whileHover={{
                            scale: 1.05,
                        }}
                        className={cn(
                            "cursor-pointer transition-[translate,opacity] duration-[400ms] opacity-0 group-hover:-translate-y-10 group-hover:opacity-100 absolute ease-out -bottom-[calc(22px)] right-4 h-12 w-12 rounded-full bg-btn-primary text-background flex items-center justify-center text-base",
                            isPaused &&
                                currentSong?.id === id &&
                                "-translate-y-10 opacity-100"
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
            <div className="flex flex-col gap-0.5 text-base flex-1">
                <Link
                    href={`/album/${albumId}`}
                    className="h-full hover:underline w-fit cursor-pointer"
                >
                    {title}
                </Link>
                <Link
                    href={`/artist/${artistId}`}
                    className="text-typography-gray text-sm transition-all hover:text-primary w-fit"
                >
                    {name}
                </Link>
            </div>
        </div>
    );
}

export default React.memo(SongCard);
