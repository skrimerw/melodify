import { SearchResult, SongWithAlbumAndArtist } from "@/types";
import React from "react";
import { nanoid } from "nanoid";
import SearchNothingFound from "./SearchNothingFound";
import VirtualizedPlaylistContext from "./VirtualizedPlaylistContext";

interface Props {
    loading: boolean;
    songs: SearchResult["songs"];
    className?: string;
}

const TracksTab = React.memo(({ songs, loading, className }: Props) => {
    return (
        <>
            {songs?.length === 0 ? (
                <SearchNothingFound />
            ) : (
                <VirtualizedPlaylistContext
                    className={className}
                    songs={songs as SongWithAlbumAndArtist[]}
                    loading={loading}
                    queueId={`search.${nanoid()}`}
                />
            )}
        </>
    );
});

export default TracksTab;
