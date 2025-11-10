"use client";

import { useSession } from "next-auth/react";
import React from "react";
import LikeBtn from "../LikeBtn";
import { useAudioPlayer } from "@/store/use-audio-player";
import { Song } from "@prisma/client";
import Link from "next/link";
import { CgArrowsExpandRight } from "react-icons/cg";
import { useFullScreenPlayer } from "@/store/use-fullscreen-player";

export default function ActiveSong() {
  const song = useAudioPlayer((state) => state.currentSong);
  const setIsVisible = useFullScreenPlayer((state) => state.setIsOpen);
  const setIsExpanded = useFullScreenPlayer((state) => state.setIsExpanded);
  const { data } = useSession();

  function handleOpenModal() {
    setIsVisible(true);
    setIsExpanded(false);
  }

  return (
    <div className="group flex items-center gap-3 text-sm cursor-default max-w-[300px] h-full">
      <div className="group/fullscreen relative h-full aspect-square rounded-md overflow-hidden flex-none">
        <img
          src={song?.album.imageUrl}
          alt="Album cover"
          className="object-cover select-none"
        />
        <div className="absolute inset-0 opacity-0 flex items-center justify-center group-hover/fullscreen:opacity-100 duration-[400ms] bg-black/40">
          <button
            onClick={handleOpenModal}
            className="flex items-center justify-center cursor-pointer rounded-full p-2.5 bg-[rgba(26,26,26,.9)] hover:bg-[rgba(51,51,51,.9)] hover:scale-110 duration-[300ms]"
          >
            <CgArrowsExpandRight size={23} />
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <Link
          title={song?.title}
          href={`/album/${song?.albumId}`}
          className="hover:underline cursor-pointer text-ellipsis max-w-[200px] w-full whitespace-nowrap overflow-hidden"
        >
          {song?.title}
        </Link>
        <Link
          href={`/artist/${song?.artistId}`}
          className="font-normal text-white/60 transition-all hover:text-primary w-fit"
        >
          {song?.artist.name}
        </Link>
      </div>
      {data?.user && <LikeBtn song={song as Song} />}
    </div>
  );
}
