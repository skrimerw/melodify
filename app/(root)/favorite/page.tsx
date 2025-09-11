import { auth } from "@/auth";
import { PlaylistContext, PlaylistSongsItem } from "@/components/shared";
import { prisma } from "@/prisma/prisma-client";
import { Prisma } from "@prisma/client";
import { HeartIcon, Music } from "lucide-react";
import { Metadata } from "next";
import React from "react";
import { FaUserSlash } from "react-icons/fa6";

export const metadata: Metadata = {
    title: "Favorite - Melodify",
};

export type LikedSongFull = Prisma.LikedSongGetPayload<{
    include: {
        song: {
            include: {
                usersLiked: true;
            };
        };
    };
}>;

export default async function FavoritePage() {
    const session = await auth();
    let favSongs: LikedSongFull[] = [];

    if (session?.user) {
        favSongs = await prisma.likedSong.findMany({
            where: {
                userId: session.user.id,
            },
            include: {
                song: {
                    include: {
                        usersLiked: true,
                    },
                },
            },
        });
    }

    return (
        <div>
            <div className="flex items-center gap-6 mt-6 max-[90rem]:mt-14">
                <div className="flex items-center justify-center bg-gradient-to-br from-[#3b1fa9] to-[#707b7f] size-[150px] max-[90rem]:size-[200px]">
                    <HeartIcon fill="white" size={56} />
                </div>
                <div>
                    <h2 className="font-semibold text-xl mb-4">Playlist</h2>
                    <h1 className="font-bold text-5xl">Liked Songs</h1>
                </div>
            </div>
            <div className="mt-5 max-[90rem]:mt-10 h-full">
                {session?.user ? (
                    favSongs?.length > 0 ? (
                        <PlaylistContext songs={favSongs.map(song => song.song)} />
                    ) : (
                        <div className="flex flex-col justify-center h-full items-center text-typography-gray opacity-40">
                            <Music
                                className="opacity-50"
                                size={150}
                                strokeWidth={1.1}
                            />
                            <p className="text-xl">No songs in the playlist</p>
                        </div>
                    )
                ) : (
                    <div className="flex flex-col justify-center h-full items-center text-typography-gray opacity-40">
                        <FaUserSlash
                            className="opacity-50"
                            size={150}
                            strokeWidth={1.1}
                        />
                        <p className="text-xl">
                            Please sign in to create playlists
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
