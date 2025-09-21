"use client";

import React from "react";
import BoxWrapper from "./BoxWrapper";
import { TbPlaylist } from "react-icons/tb";
import { cn } from "@/lib/utils";
import LibraryAlbumItem from "./LibraryAlbumItem";
import { useLibraryStore } from "@/store/use-library-store";
import LibraryArtistItem from "./LibraryArtistItem";
import { Music } from "lucide-react";
import LibraryAlbumItemSkeleton from "./LibraryAlbumItemSkeleton";
import LibraryArtistItemSkeleton from "./LibraryArtistItemSkeleton";

interface Props {
    className?: string;
}

export default function Library({ className }: Props) {
    const loading = useLibraryStore((state) => state.loading);
    const library = useLibraryStore((state) => state.library);

    return (
        <BoxWrapper className={cn("flex flex-col h-full p-0", className)}>
            <header className="sticky top-0 z-20 bg-card flex items-center justify-between text-typography-gray px-6 py-5 library-header-shadow">
                <h3 className="flex gap-3 items-centery font-ys">
                    <TbPlaylist size={24} />
                    Your Library
                </h3>
            </header>
            <div className="flex flex-col gap-4 px-6 pb-5 pt-0.5 h-full mt-1">
                {loading ? (
                    <>
                        {Array.from({ length: 3 }).map((_, i) => {
                            return <LibraryAlbumItemSkeleton key={i} />;
                        })}
                        {Array.from({ length: 3 }).map((_, i) => {
                            return <LibraryArtistItemSkeleton key={i} />;
                        })}
                    </>
                ) : (
                    <>
                        {library?.pinnedAlbums?.length === 0 &&
                        library?.pinnedArtists?.length === 0 ? (
                            <div className="text-typography-gray flex flex-col items-center my-auto">
                                <Music
                                    className="text-typography-gray opacity-40"
                                    size={100}
                                    strokeWidth={1.2}
                                />
                                <p className="opacity-50">Empty library</p>
                            </div>
                        ) : (
                            <>
                                {library?.pinnedAlbums?.map((album) => {
                                    return (
                                        <LibraryAlbumItem
                                            key={album.id}
                                            album={album}
                                            songs={album.songs.map((song) => ({
                                                ...song,
                                                album,
                                                artist: album.artist,
                                            }))}
                                            authorName={album.artist.name}
                                            authorId={album.artistId}
                                        />
                                    );
                                })}
                                {library?.pinnedArtists?.map((artist) => {
                                    return (
                                        <LibraryArtistItem
                                            key={artist.id}
                                            artist={artist}
                                            songs={artist.songs.map((song) => ({
                                                ...song,
                                                album: song.album,
                                                artist,
                                            }))}
                                        />
                                    );
                                })}
                            </>
                        )}
                    </>
                )}
            </div>
        </BoxWrapper>
    );
}
