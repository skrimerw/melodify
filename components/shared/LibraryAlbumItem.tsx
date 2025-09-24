"use client";

import React from "react";
import { FaPause, FaPlay } from "react-icons/fa6";
import { motion } from "framer-motion";
import Link from "next/link";
import SeparationDot from "./SeparationDot";
import { Album } from "@prisma/client";
import { useAudioPlayer } from "@/store/use-audio-player";
import { cn } from "@/lib/utils";
import { SongWithAlbumAndArtist } from "@/types";
import { useTranslations } from "next-intl";

interface Props {
    album: Album;
    songs: SongWithAlbumAndArtist[];
    authorName: string;
    authorId: number;
}

export default function LibraryAlbumItem({
    album: { id, imageUrl, title },
    authorName,
    authorId,
    songs,
}: Props) {
    const t = useTranslations("common.names");
    const isPaused = useAudioPlayer((state) => state.isPaused);
    const play = useAudioPlayer((state) => state.play);
    const pause = useAudioPlayer((state) => state.pause);
    const setQueue = useAudioPlayer((state) => state.setQueue);
    const setQueueId = useAudioPlayer((state) => state.setQueueId);
    const currentQueueId = useAudioPlayer((state) => state.queueId);
    const queueId = `${authorName.toLowerCase()}.album.${title.toLowerCase()}`;

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
        <div className="group flex items-center gap-3 text-sm cursor-pointer">
            <div className="relative h-[50px] w-[50px] rounded-sm overflow-hidden flex-none">
                {!isPaused && currentQueueId === queueId && (
                    <motion.div
                        animate={{ scale: [1, 1.8, 1] }}
                        transition={{
                            duration: 0.8,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="absolute top-1/2 left-1/2 -translate-1/2 size-3 rounded-full bg-btn-primary group-hover:hidden"
                    ></motion.div>
                )}
                <img
                    src={imageUrl}
                    alt="Album cover"
                    className="object-cover select-none size-full"
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
                            "transition-[top] duration-200 group-hover:top-1/2 absolute top-[calc(50%+8px)] left-1/2 -translate-y-1/2 -translate-x-1/2 h-8 w-8 rounded-full bg-btn-primary text-background flex items-center justify-center text-base",
                            isPaused && currentQueueId === queueId && "top-1/2"
                        )}
                    >
                        {!isPaused && currentQueueId === queueId ? (
                            <FaPause />
                        ) : (
                            <FaPlay className="ml-0.5" />
                        )}
                    </motion.div>
                </div>
            </div>
            <div className="flex flex-col gap-1">
                <Link href={`/album/${id}`} className="font-ys hover:underline">
                    {title}
                </Link>
                <p className="text-typography-gray">
                    {t("album")}
                    <SeparationDot />
                    <Link
                        href={`/artist/${authorId}`}
                        className="transition-colors hover:text-primary"
                    >
                        {authorName}
                    </Link>
                </p>
            </div>
        </div>
    );
}
