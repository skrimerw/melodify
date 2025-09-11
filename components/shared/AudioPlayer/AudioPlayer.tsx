"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import ActiveSong from "./ActiveSong";
import Controls from "./Controls";
import VolumeControl from "./VolumeControl";
import ProgressBar from "./ProgressBar";
import { motion, AnimatePresence } from "framer-motion";
import BoxWrapper from "../BoxWrapper";
import { FastAverageColor } from "fast-average-color";
import { useAudioPlayer } from "@/context/useAudioPlayer";

interface Props {
    className?: string;
}

export default function AudioPlayer({ className }: Props) {
    const { currentSong: song } = useAudioPlayer();
    const [avgColor, setAvgColor] = useState("");

    async function getAvgColor() {
        const fac = new FastAverageColor();

        if (song) {
            const { hex } = await fac.getColorAsync(song?.imageUrl);

            setAvgColor(hex);
        }
    }

    useEffect(() => {
        getAvgColor();
    }, [song?.id]);

    return (
        <>
            <AnimatePresence initial={false}>
                {song && (
                    <motion.div
                        initial={{
                            height: 0,
                        }}
                        animate={{
                            height: "auto",
                        }}
                        exit={{
                            height: 0,
                        }}
                        className={cn(
                            "relative flex flex-col gap-1",
                            className
                        )}
                    >
                        <ProgressBar />
                        <BoxWrapper
                            className={cn("p-2 pr-6 transition-colors")}
                            style={{
                                backgroundColor: avgColor + "40",
                            }}
                        >
                            <div className="flex justify-between items-center">
                                <ActiveSong />
                                <Controls className="absolute left-1/2 -translate-x-1/2" />
                                <VolumeControl />
                            </div>
                        </BoxWrapper>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
