import { auth } from "@/auth";
import { PlaylistContext } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Prisma } from "@prisma/client";
import { HeartIcon } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
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

    return (
        <div>
            <div className="flex items-center gap-6 mt-6">
                <div className="flex items-center justify-center bg-gradient-to-br from-[#3b1fa9] to-[#707b7f] size-[150px] max-[90rem]:size-[200px]">
                    <HeartIcon fill="white" size={56} />
                </div>
                <div>
                    <h2 className="font-semibold text-lg mb-1">Playlist</h2>
                    <h1 className="font-bold text-4xl">Liked Songs</h1>
                </div>
            </div>
            <div className="mt-20 h-full">
                {session?.user ? (
                    <PlaylistContext />
                ) : (
                    <>
                        <div className="flex flex-col justify-center h-full items-center text-typography-gray opacity-40">
                            <FaUserSlash
                                className="opacity-50"
                                size={130}
                                strokeWidth={1.1}
                            />
                            <p className="text-xl">
                                Please log in to create playlists
                            </p>
                        </div>
                        <Button asChild className="block w-fit px-8 mx-auto mt-4">
                            <Link href={"/login"}>Log In</Link>
                        </Button>
                    </>
                )}
            </div>
        </div>
    );
}
