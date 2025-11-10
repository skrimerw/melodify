"use client";

import React from "react";
import { useAudioPlayer } from "@/store/use-audio-player";
import { useSession } from "next-auth/react";
import { cn } from "@/lib/utils";
import { FaPause, FaPlay } from "react-icons/fa6";
import { SongWithAlbumAndArtist } from "@/types";
import { Button } from "../ui/button";
import { useTranslations } from "next-intl";

interface Props {
  songs: SongWithAlbumAndArtist[];
  className?: string;
}

export default function FavoritePagePlay({ songs, className }: Props) {
  const session = useSession();
  const isPaused = useAudioPlayer((state) => state.isPaused);
  const play = useAudioPlayer((state) => state.play);
  const pause = useAudioPlayer((state) => state.pause);
  const setQueue = useAudioPlayer((state) => state.setQueue);
  const setQueueId = useAudioPlayer((state) => state.setQueueId);
  const currentQueueId = useAudioPlayer((state) => state.queueId);
  const queueId = `${session.data?.user.id}.favorite`;
  const t = useTranslations("common.names");

  function handlePause() {

    console.log(songs)
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
  }

  function getPlayedCondition() {
    return queueId === currentQueueId ? isPaused : true;
  }

  return (
    <Button
      onClick={handlePause}
      className={cn(
        "bg-btn-primary hover:bg-btn-primary/80 gap-1.5 h-10 w-fit !px-6",
        className
      )}
    >
      {getPlayedCondition() ? (
        <FaPlay className="!size-3.5" />
      ) : (
        <FaPause className="!size-3.5" />
      )}
      {t("listen")}
    </Button>
  );
}
