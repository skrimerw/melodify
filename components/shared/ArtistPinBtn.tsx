"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { RiPushpinFill, RiPushpinLine } from "react-icons/ri";
import toast from "react-hot-toast";
import { followArtist, unfollowArtist } from "@/actions/artist-follow";
import { useLibraryStore } from "@/store/use-library-store";
import { Prisma } from "@prisma/client";

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
}

export default function ArtistPinBtn({ artist, isInitiallyPinned }: Props) {
    const [isPinned, setIsPinned] = useState(isInitiallyPinned);
    const [loading, setLoading] = useState(false);
    
    const library = useLibraryStore((state) => state.library);
    const setLibrary = useLibraryStore((state) => state.setLibrary);

    const { id, name } = artist;

    async function handleClick() {
        setLoading(true);
        if (!isPinned) {
            await followArtist(id);
            setIsPinned(true);
            setLibrary({
                ...library,
                pinnedArtists: [...(library?.pinnedArtists || []), artist],
            });
            toast.success(`Artist "${name}" was added to your library`);
        } else {
            await unfollowArtist(id);
            setIsPinned(false);
            toast.success(`Artist "${name}" was removed from your library`);
            setLibrary({
                ...library,
                pinnedArtists: library?.pinnedArtists?.filter(
                    (artist) => artist.id !== id
                ),
            });
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
