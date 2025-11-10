"use client";

import { useLikedSongsStore } from "@/store/use-liked-songs-store";
import { HeartIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";
import { cn } from "@/lib/utils";
import { FaPause, FaPlay } from "react-icons/fa6";
import { motion } from "framer-motion";
import { useAudioPlayer } from "@/store/use-audio-player";
import { useSession } from "next-auth/react";
import { FaVolumeHigh } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { SongWithAlbumAndArtist } from "@/types";

interface Props {
  isEmpty: boolean;
  songs: SongWithAlbumAndArtist[]
  className?: string;
}

export default function FavoriteLink({ isEmpty, songs, className }: Props) {
  const t = useTranslations("FavoriteLink");
  const likedSongs = useLikedSongsStore((state) => state.likedSongs);
  const loading = useLikedSongsStore((state) => state.loading);
  const [empty, setEmpty] = useState(isEmpty);
  const session = useSession();
  const isPaused = useAudioPlayer((state) => state.isPaused);
  const play = useAudioPlayer((state) => state.play);
  const pause = useAudioPlayer((state) => state.pause);
  const setQueue = useAudioPlayer((state) => state.setQueue);
  const setQueueId = useAudioPlayer((state) => state.setQueueId);
  const currentQueueId = useAudioPlayer((state) => state.queueId);
  const queueId = `${session.data?.user.id}.favorite`;
  const router = useRouter();

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

  useEffect(() => {
    if (!loading) {
      setEmpty(likedSongs.length === 0);
    }
  }, [loading, likedSongs]);

  return (
    <div className={className}>
      {likedSongs.length > 0 && (
        <div
          onClick={() => router.push("/favorite")}
          className="relative group flex rounded-sm items-center gap-5 overflow-hidden bg-typography-gray/20 max-w-[300px] pr-3"
        >
          <div className="flex items-center justify-center bg-gradient-to-br from-20% to-100%  from-[#4100f4] to-[#c1ecd8] size-[65px] shadow-[6px_0px_3px_5px_rgba(34, 60, 80, 0.2)]">
            <HeartIcon fill="white" size={28} />
          </div>
          <span className="font-medium text-base mb-0.5 cursor-default">
            {t("description")}
          </span>

          <motion.div
            onClick={(e) => {
              e.stopPropagation();
              handleClick();
            }}
            whileTap={{
              scale: 0.99,
            }}
            whileHover={{
              scale: 1.05,
            }}
            className={cn(
              "absolute top-1/2  right-3 ml-auto cursor-pointer transition-[translate,opacity] duration-[200ms] opacity-0 translate-y-4 group-hover:shadow-2xl group-hover:-translate-y-1/2 group-hover:opacity-100 ease-out size-11 rounded-full bg-btn-primary text-background flex items-center justify-center text-base shadow-lg",
              isPaused &&
                currentQueueId === queueId &&
                "-translate-y-1/2 opacity-100"
            )}
          >
            {!isPaused && currentQueueId === queueId ? (
              <FaPause size={20} />
            ) : (
              <FaPlay className="ml-0.5" size={18} />
            )}
          </motion.div>
          {!isPaused && currentQueueId === queueId && <FaVolumeHigh className="ml-auto mr-3.5 fill-btn-primary" size={20} />}
        </div>
      )}
      {!empty && loading && (
        <>
          <Skeleton className={"h-[65px] w-[300px]"}>
            <Skeleton className="size-[65px] rounded-r-none shadow-[6px_0px_3px_5px_rgba(34, 60, 80, 0.2)]" />
          </Skeleton>
        </>
      )}
    </div>
  );
}
