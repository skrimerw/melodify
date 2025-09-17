"use client";

import React from "react";
import { Button } from "../ui/button";
import { FaPause, FaPlay } from "react-icons/fa6";
import { useAudioPlayer } from "@/store/use-audio-player";
import { cn } from "@/lib/utils";
import { SongWithAlbumAndArtist } from "@/types";

interface Props {
  songs: SongWithAlbumAndArtist[];
  className?: string;
}

export default function AlbumListenBtn({ songs, className }: Props) {
  const setQueue = useAudioPlayer((state) => state.setQueue);
  const setQueueId = useAudioPlayer((state) => state.setQueueId);
  const play = useAudioPlayer((state) => state.play);
  const pause = useAudioPlayer((state) => state.pause);
  const isPaused = useAudioPlayer((state) => state.isPaused);
  const currentQueueId = useAudioPlayer((state) => state.queueId);
  const queueId = `${songs[0].artist.name.toLowerCase()}.album.${songs[0].album.title.toLowerCase()}`;

  function handlePause() {
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
        "bg-btn-primary hover:bg-btn-primary/80 mt-8 gap-1.5 h-10 w-fit !px-6",
        className
      )}
    >
      {getPlayedCondition() ? (
        <FaPlay className="!size-3.5" />
      ) : (
        <FaPause className="!size-3.5" />
      )}
      Listen
    </Button>
  );
}
