"use client";

import React from "react";
import PlaylistSongsItem from "./PlaylistSongsItem";
import { cn } from "@/lib/utils";
import { useAudioPlayer } from "@/store/use-audio-player";
import { SongWithAlbumAndArtist } from "@/types";
import AlbumSongsItem from "./AlbumSongItem";

interface Props {
  songs: SongWithAlbumAndArtist[];
  queueId: string;
  loading?: boolean;
  className?: string;
}

export default function AlbumContext({ songs, queueId, className }: Props) {
  const setQueue = useAudioPlayer((state) => state.setQueue);
  const setQueueId = useAudioPlayer((state) => state.setQueueId);
  const onPlayClick = () => {
    setQueue(songs);
    setQueueId(queueId);
  };

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {songs.map((song, i) => {
        return (
          <AlbumSongsItem
            key={song.id}
            index={i + 1}
            song={song}
            onPlayClick={onPlayClick}
          />
        );
      })}
    </div>
  );
}
