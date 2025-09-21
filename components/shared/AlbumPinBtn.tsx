"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { RiPushpinFill, RiPushpinLine } from "react-icons/ri";
import { pinAlbum, unpinAlbum } from "@/actions/album-pin";
import toast from "react-hot-toast";
import { useLibraryStore } from "@/store/use-library-store";
import { Album, Prisma } from "@prisma/client";

interface Props {
    album: Prisma.AlbumGetPayload<{
        include: {
            artist: true;
            songs: true;
        };
    }>;
    isInitiallyPinned: boolean;
}

export default function AlbumPinBtn({ album, isInitiallyPinned }: Props) {
    const [isPinned, setIsPinned] = useState(isInitiallyPinned);
    const [loading, setLoading] = useState(false);

    const library = useLibraryStore((state) => state.library);
    const setLibrary = useLibraryStore((state) => state.setLibrary);

    const { id, title } = album;

    async function handleClick() {
        setLoading(true);
        if (!isPinned) {
            await pinAlbum(id);
            setIsPinned(true);
            setLibrary({
                ...library,
                pinnedAlbums: [...(library?.pinnedAlbums || []), album],
            });
            toast.success(`Album "${title}" was added to your library`);
        } else {
            await unpinAlbum(id);
            setIsPinned(false);
            setLibrary({
                ...library,
                pinnedAlbums: library?.pinnedAlbums?.filter(
                    (album) => album.id !== id
                ),
            });
            toast.success(`Album "${title}" was removed from your library`);
        }
        setLoading(false);
    }

    return (
        <Button
            onClick={handleClick}
            className="!p-0 size-10"
            variant="secondary"
            disabled={loading}
        >
            {isPinned ? (
                <RiPushpinFill className="size-5" />
            ) : (
                <RiPushpinLine className="opacity-70 size-5" />
            )}
        </Button>
    );
}
