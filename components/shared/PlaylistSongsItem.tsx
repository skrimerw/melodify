'use client'

import { cn } from "@/lib/utils";
import { SongFull, usePlayerStore } from "@/store/use-player-store";
import React, { useCallback } from "react";
import LikeBtn from "./LikeBtn";
import { useShallow } from "zustand/react/shallow";
import { motion } from "framer-motion";
import { FaPause, FaPlay } from "react-icons/fa6";

interface Props {
  song: SongFull;
  className?: string;
}

export default function PlaylistSongsItem({ song, className }: Props) {
  const [isPaused, currentSong, setSong, setIsPaused, setEnded] =
    usePlayerStore(
      useShallow((state) => [
        state.isPaused,
        state.currentSong,
        state.setSong,
        state.setIsPaused,
        state.setEnded,
      ])
    );
  const { id, title, imageUrl, authorName } = song;

  const handleClick = useCallback(() => {
    if (currentSong?.id !== id) {
      setSong(song);
      ///onPlayClick();
    } else {
      setIsPaused(!isPaused);
      setEnded(false);
    }
  }, [
    id,
    currentSong,
    setSong,
    song,
    //onPlayClick,
    setIsPaused,
    isPaused,
    setEnded,
  ]);

  return (
    <div className={cn("group flex justify-between", className)}>
      <div className="flex gap-2 items-center">
        <div className="relative !size-[55px] rounded-sm overflow-hidden flex-none w-full bg-typography-gray/5">
          {!isPaused && currentSong?.id === id && (
            <motion.div
              animate={{ scale: [1, 1.8, 1] }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute top-1/2 left-1/2 -translate-1/2 size-4 rounded-full bg-btn-primary"
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
                "cursor-pointer transition-[top] duration-200 group-hover:top-1/2 absolute top-[calc(50%+8px)] left-1/2 -translate-y-1/2 -translate-x-1/2 size-8 rounded-full bg-btn-primary text-background flex items-center justify-center text-base",
                isPaused && currentSong?.id === id && "top-1/2"
              )}
            >
              {!isPaused && currentSong?.id === id ? (
                <FaPause size={16} />
              ) : (
                <FaPlay className="ml-0.5" size={16} />
              )}
            </motion.div>
          </div>
        </div>
        <div className="text-[15px]">
          <h3>{title}</h3>
          <p className="text-typography-gray">By {authorName}</p>
        </div>
      </div>
      <LikeBtn songId={id} initiallyLiked={true} />
    </div>
  );
}
