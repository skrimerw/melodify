"use client";

import React from "react";
import { FaPlay } from "react-icons/fa6";
import { motion } from "framer-motion";

interface Props {
    songTitle: string;
    authorName: string;
    albumCoverUrl: string;
}

export default function LibraryItem({
    albumCoverUrl,
    authorName,
    songTitle,
}: Props) {
    return (
        <div className="group flex items-center gap-3 text-sm cursor-pointer">
            <div className="relative h-[50px] w-[50px] rounded-md overflow-hidden flex-none">
                <img
                    src={albumCoverUrl}
                    alt="Album cover"
                    className="object-cover select-none"
                />
                <div className="transition-all duration-200 group-hover:opacity-100 opacity-0 absolute h-full w-full top-1/2 left-1/2 -translate-1/2 z-10 flex items-center justify-center bg-black/35">
                    <motion.div
                        whileTap={{
                            scale: 0.99,
                        }}
                        whileHover={{
                            scale: 1.05,
                        }}
                        className="transition-[top] duration-200 group-hover:top-1/2 absolute top-[calc(50%+8px)] left-1/2 -translate-y-1/2 -translate-x-1/2 h-8 w-8 rounded-full bg-btn-primary text-background flex items-center justify-center text-base"
                    >
                        <FaPlay className="ml-[2px]" />
                    </motion.div>
                </div>
            </div>
            <div className="flex flex-col gap-1">
                <h2>{songTitle}</h2>
                <p className="font-normal text-typography-gray">
                    By {authorName}
                </p>
            </div>
        </div>
    );
}
