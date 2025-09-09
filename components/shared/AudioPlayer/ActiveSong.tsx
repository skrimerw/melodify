"use client";

import { usePlayerStore } from "@/store/use-player-store";
import React, { useState } from "react";
import { IoHeart, IoHeartOutline } from "react-icons/io5";

export default function ActiveSong() {
    const [isFavorite, setIsFavorite] = useState(false);
    const song = usePlayerStore((state) => state.currentSong);

    function handleToggleFavourite() {
        setIsFavorite((prev) => !prev);
    }

    return (
        <div className="group flex items-center gap-3 text-sm cursor-default">
            <div className="relative h-[50px] w-[50px] rounded-md overflow-hidden flex-none">
                <img
                    src={song?.imageUrl}
                    alt="Album cover"
                    className="object-cover select-none"
                />
            </div>
            <div className="flex flex-col gap-1">
                <h2>{song?.title}</h2>
                <p className="font-normal text-typography-gray">By {song?.authorName}</p>
            </div>
            <button
                className="text-xl cursor-pointer"
                onClick={handleToggleFavourite}
            >
                {isFavorite ? (
                    <IoHeart className="text-btn-primary" />
                ) : (
                    <IoHeartOutline />
                )}
            </button>
        </div>
    );
}
