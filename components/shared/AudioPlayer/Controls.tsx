"use client";

import React from "react";
import { FaPause, FaPlay } from "react-icons/fa6";
import { IoPlaySkipBackSharp, IoPlaySkipForwardSharp } from "react-icons/io5";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useAudioPlayer } from "@/context/useAudioPlayer";

interface Props {
    className?: string;
}

export default function Controls({ className }: Props) {
    const {
        currentSong: song,
        isPaused,
        pause,
        play,
        next,
        prev,
    } = useAudioPlayer();

    function handlePause() {
        if (isPaused) {
            play()
        } else {
            pause()
        }
    }

    return (
        <div className={cn("flex gap-5 items-center text-3xl", className)}>
            <motion.button
                onClick={prev}
                disabled={song === null ? true : false}
                whileTap={{
                    scale: 1.1,
                }}
                className="text-typography-gray cursor-pointer disabled:text-typography-gray/30 disabled:cursor-default transition-colors hover:text-primary"
            >
                <IoPlaySkipBackSharp className="text-2xl" />
            </motion.button>
            <motion.button
                disabled={song === null ? true : false}
                whileTap={{
                    scale: 1.05,
                }}
                whileHover={{
                    opacity: 0.8,
                }}
                onClick={handlePause}
                className="flex items-center justify-center bg-primary h-10 w-10 text-xl rounded-full p-2 text-background cursor-pointer disabled:bg-typography-gray/30 disabled:cursor-default"
            >
                {!isPaused ? <FaPause /> : <FaPlay className="ml-0.5" />}
            </motion.button>
            <motion.button
                onClick={next}
                disabled={song === null ? true : false}
                whileTap={{
                    scale: 1.1,
                }}
                className="text-typography-gray cursor-pointer disabled:text-typography-gray/30 cursor disabled:cursor-default transition-colors hover:text-primary"
            >
                <IoPlaySkipForwardSharp className="text-2xl" />
            </motion.button>
        </div>
    );
}
