import { auth } from "@/auth";
import { FavoriteLink, NewestSongsContainer } from "@/components/shared";
import { prisma } from "@/prisma/prisma-client";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Home - Melodify",
};

export default async function Page() {
    const session = await auth();

    const songs = await prisma.song.findMany({
        include: {
            album: true,
            artist: true,
        },
    });

    const likedSongs = await prisma.likedSong.findFirst({
        where: {
            userId: session?.user.id,
        },
    });

    return (
        <div>
            {session?.user && likedSongs && <FavoriteLink className="mb-8" />}
            <div>
                <h2 className="text-xl mb-5">Newest Songs</h2>
                <NewestSongsContainer songs={songs} />
            </div>
        </div>
    );
}
