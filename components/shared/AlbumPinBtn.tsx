"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { RiPushpinFill, RiPushpinLine } from "react-icons/ri";
import { pinAlbum, unpinAlbum } from "@/actions/album-pin";
import toast from "react-hot-toast";
import { useLibraryStore } from "@/store/use-library-store";
import { Album, Prisma } from "@prisma/client";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

interface Props {
    album: Prisma.AlbumGetPayload<{
        include: {
            artist: true;
            songs: true;
        };
    }>;
    isInitiallyPinned: boolean;
    className?: string;
}

export default function AlbumPinBtn({
    album,
    isInitiallyPinned,
    className,
}: Props) {
    const [isPinned, setIsPinned] = useState(isInitiallyPinned);
    const [loading, setLoading] = useState(false);

    const library = useLibraryStore((state) => state.library);
    const setLibrary = useLibraryStore((state) => state.setLibrary);
    const t = useTranslations("common.toasts");

    const { id, title } = album;

    useEffect(() => {
        const inLibrary = !!library?.pinnedAlbums?.find(
            (a) => a.id === album.id
        );

        setIsPinned(inLibrary);
    }, [library]);

    async function handleClick() {
        setLoading(true);
        try {
            if (!isPinned) {
                await pinAlbum(id);
                setIsPinned(true);
                setLibrary({
                    ...library,
                    pinnedAlbums: [...(library?.pinnedAlbums || []), album],
                });
                toast.success(t("albumPin", { title }));
            } else {
                await unpinAlbum(id);
                setIsPinned(false);
                setLibrary({
                    ...library,
                    pinnedAlbums: library?.pinnedAlbums?.filter(
                        (album) => album.id !== id
                    ),
                });
                toast.success(t("albumUnpin", { title }));
            }
        } catch (e) {
            toast.error(t("error"));
        }
        setLoading(false);
    }

    return (
        <Button
            onClick={handleClick}
            className={cn("!p-0 size-10", className)}
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
