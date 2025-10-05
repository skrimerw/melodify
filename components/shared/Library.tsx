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
import { Button } from "../ui/button";
import Link from "next/link";
import LanguagePopover from "./LanguagePopover";
import { useTranslations } from "next-intl";

interface Props {
    isLogged: boolean;
    className?: string;
}

export default function Library({ isLogged, className }: Props) {
    const t = useTranslations("Library");
    const tCommon = useTranslations("common");
    const loading = useLibraryStore((state) => state.loading);
    const library = useLibraryStore((state) => state.library);

    return (
        <BoxWrapper className={cn("relative [&>div]:flex [&>div]:flex-col h-full p-0", className)}>
            <header className="sticky top-0 z-20 bg-card flex items-center justify-between text-typography-gray px-6 py-5 border-b border-accent/60 mb-2">
                <h3 className="flex gap-3 items-centery font-ys">
                    <TbPlaylist size={24} />
                    {t("title")}
                </h3>
            </header>
            {isLogged ? (
                <div className="flex flex-col gap-4 px-6 pb-5 pt-0.5 mt-1 h-full">
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
                                <div className="text-typography-gray flex flex-col items-center my-auto pb-[20%]">
                                    <Music
                                        className="text-typography-gray opacity-40"
                                        size={100}
                                        strokeWidth={1.2}
                                    />
                                    <p className="opacity-50">{t("empty")}</p>
                                </div>
                            ) : (
                                <>
                                    {library?.pinnedAlbums?.map((album) => {
                                        return (
                                            <LibraryAlbumItem
                                                key={album.id}
                                                album={album}
                                                songs={album.songs.map(
                                                    (song) => ({
                                                        ...song,
                                                        album,
                                                        artist: album.artist,
                                                    })
                                                )}
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
                                                songs={artist.songs.map(
                                                    (song) => ({
                                                        ...song,
                                                        album: song.album,
                                                        artist,
                                                    })
                                                )}
                                            />
                                        );
                                    })}
                                </>
                            )}
                        </>
                    )}
                </div>
            ) : (
                <div className="p-2 h-full flex flex-col">
                    <div className="rounded-md bg-accent p-4 w-full my-auto">
                        <h2 className="font-ys font-bold mb-1">
                            {t("PlaylistNotification.title")}
                        </h2>
                        <p className="text-sm font-normal mb-4">
                            {t("PlaylistNotification.description")}
                        </p>
                        <Button className="h-7.5 text-sm">
                            <Link href={"/login"}>{tCommon("Login")}</Link>
                        </Button>
                    </div>
                </div>
            )}
            <div className="p-2 h-fit mt-auto flex flex-col sticky bottom-0">
                <LanguagePopover />
            </div>
        </BoxWrapper>
    );
}
