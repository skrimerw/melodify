"use client";

import React from "react";
import PlaylistSongsItem from "./PlaylistSongsItem";
import PlaylistLoadingSkeleton from "./PlaylistLoadingSkeleton";
import { useAudioPlayer } from "@/store/use-audio-player";
import { SongWithAlbumAndArtist } from "@/types";
import { Virtuoso } from "react-virtuoso";

interface Props {
    songs: SongWithAlbumAndArtist[];
    queueId: string;
    loading?: boolean;
    className?: string;
}

export default function VirtualizedPlaylistContext({
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
        <>
            {loading && <PlaylistLoadingSkeleton length={5} />}
            {!loading && songs?.length && (
                <>
                    <Virtuoso
                        totalCount={songs.length}
                        customScrollParent={
                            document.getElementById("scroll-container") ||
                            undefined
                        }
                        increaseViewportBy={{ top: 0, bottom: 0 }}
                        itemContent={(index) => (
                            <PlaylistSongsItem
                                song={songs[index]}
                                onPlayClick={onPlayClick}
                            />
                        )}
                    />
                </>
            )}
        </>
    );
}
