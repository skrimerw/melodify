"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { RiPushpinFill, RiPushpinLine } from "react-icons/ri";
import toast from "react-hot-toast";
import { followArtist, unfollowArtist } from "@/actions/artist-follow";
import { useLibraryStore } from "@/store/use-library-store";
import { Prisma } from "@prisma/client";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

interface Props {
    artist: Prisma.ArtistGetPayload<{
        include: {
            songs: {
                include: {
                    album: true;
                    artist: true;
                };
            };
            albums: {
                include: {
                    songs: {
                        include: {
                            album: true;
                            artist: true;
                        };
                    };
                };
            };
        };
    }>;
    isInitiallyPinned: boolean;
    className?: string;
}

export default function ArtistPinBtn({
    artist,
    isInitiallyPinned,
    className,
}: Props) {
    const [isPinned, setIsPinned] = useState(isInitiallyPinned);
    const [loading, setLoading] = useState(false);

    const library = useLibraryStore((state) => state.library);
    const setLibrary = useLibraryStore((state) => state.setLibrary);

    const t = useTranslations("common.toasts");

    const { id, name } = artist;

    useEffect(() => {
        const inLibrary = !!library?.pinnedArtists?.find(
            (a) => a.id === artist.id
        );

        setIsPinned(inLibrary);
    }, [library]);

    async function handleClick() {
        setLoading(true);
        try {
            if (!isPinned) {
                await followArtist(id);
                setIsPinned(true);
                setLibrary({
                    ...library,
                    pinnedArtists: [...(library?.pinnedArtists || []), artist],
                });
                toast.success(t("artistPin", { name }));
            } else {
                await unfollowArtist(id);
                setIsPinned(false);
                toast.success(t("artistUnpin", { name }));
                setLibrary({
                    ...library,
                    pinnedArtists: library?.pinnedArtists?.filter(
                        (artist) => artist.id !== id
                    ),
                });
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
