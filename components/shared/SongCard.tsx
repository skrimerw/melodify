"use client";

import React from "react";
import { FaPause, FaPlay } from "react-icons/fa6";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useAudioPlayer } from "@/store/use-audio-player";
import { SongWithAlbumAndArtist } from "@/types";
import Link from "next/link";
import { useRouter } from "next/navigation";

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
    <div
      className="group flex flex-col items-stretch gap-1 text-sm cursor-default transition-all hover:bg-card-accent rounded-sm p-2 w-full h-fit"
    >
      <div className="relative aspect-square rounded-sm overflow-hidden flex-none w-full bg-typography-gray/5">
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
              isPaused && currentSong?.id === id && "bottom-4"
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
