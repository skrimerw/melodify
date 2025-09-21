import { SearchResult, SongWithAlbumAndArtist } from "@/types";
import React from "react";
import PlaylistContext from "./PlaylistContext";
import { nanoid } from "nanoid";
import SearchNothingFound from "./SearchNothingFound";

interface Props {
    loading: boolean;
    songs: SearchResult["songs"];
    className?: string;
}

export default function TracksTab({ songs, loading, className }: Props) {
    return (
        <>
            {songs?.length === 0 ? (
                <SearchNothingFound />
            ) : (
                <PlaylistContext
                    className={className}
                    songs={songs as SongWithAlbumAndArtist[]}
                    loading={loading}
                    queueId={`search.${nanoid()}`}
                />
            )}
        </>
    );
}
