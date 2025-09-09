import { FavoriteLink, SongCard } from "@/components/shared";
import { prisma } from "@/prisma/prisma-client";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Home - Melodify",
};

export default async function Page() {
    const songs = await prisma.song.findMany();

    return (
        <div>
            <FavoriteLink />
            <div className="mt-8">
                <h2 className="text-xl mb-5">Newest Songs</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {songs.map(
                        ({ id, audioUrl, authorName, title, imageUrl }, i) => {
                            return (
                                <SongCard
                                    key={id}
                                    song={songs[i]}
                                    songTitle={title}
                                    authorName={authorName}
                                    albumCoverUrl={imageUrl}
                                />
                            );
                        }
                    )}
                </div>
            </div>
        </div>
    );
}
