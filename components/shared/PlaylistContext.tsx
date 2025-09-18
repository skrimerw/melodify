"use client";

import React from "react";
import PlaylistSongsItem from "./PlaylistSongsItem";
import { cn } from "@/lib/utils";
import PlaylistLoadingSkeleton from "./PlaylistLoadingSkeleton";
import { useAudioPlayer } from "@/store/use-audio-player";
import { SongWithAlbumAndArtist } from "@/types";

interface Props {
  songs: SongWithAlbumAndArtist[];
  queueId: string;
  loading?: boolean;
  className?: string;
}

export default function PlaylistContext({
  songs,
  loading,
  queueId,
  className,
}: Props) {
  const setQueue = useAudioPlayer((state) => state.setQueue);
  const setQueueId = useAudioPlayer((state) => state.setQueueId);
  const onPlayClick = () => {
    setQueue(songs);
    setQueueId(queueId);
  };

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {loading && <PlaylistLoadingSkeleton length={5} />}
      {!loading &&
        songs?.map((song) => {
          return (
            <PlaylistSongsItem
              key={song.id}
              song={song}
              onPlayClick={onPlayClick}
            />
          );
        })}
    </div>
  );
}
