import { SearchResult, SongWithAlbumAndArtist } from "@/types";
import React from "react";
import PlaylistContext from "./PlaylistContext";
import { nanoid } from "nanoid";

interface Props {
  loading: boolean;
  songs: SearchResult["songs"];
  className?: string;
}

export default function TracksTab({ songs, loading, className }: Props) {
  return (
    <>
      <PlaylistContext
        className={className}
        songs={songs as SongWithAlbumAndArtist[]}
        loading={loading}
        queueId={`search.${nanoid()}`}
      />
    </>
  );
}
