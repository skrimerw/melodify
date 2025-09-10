"use client";

import { likeSong, unlikeSong } from "@/actions/song-likes";
import { usePlayerStore } from "@/store/use-player-store";
import { useSession } from "next-auth/react";
import React from "react";
import { IoHeart, IoHeartOutline } from "react-icons/io5";

export default function ActiveSong() {
    const { currentSong: song, setSong, setSongs, songs } = usePlayerStore();
    const { data } = useSession();
    function getIsLiked() {
        return song?.usersLiked !== undefined && song.usersLiked.length > 0;
    }

    function handleToggleFavourite() {
        const isLiked = getIsLiked();

        if (!song) return;

        if (isLiked) {
            unlikeSong(song.id);
            setSong({ ...song, usersLiked: [] });
            setSongs(
                songs.map((songItem) => {
                    if (songItem.id === song.id) {
                        return {
                            ...songItem,
                            usersLiked: [],
                        };
                    }

                    return songItem;
                })
            );
        } else {
            likeSong(song.id);
            setSong({
                ...song,
                usersLiked: [
                    {
                        songId: song.id,
                        userId: 1,
                        id: -1,
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    },
                ],
            });
            setSongs(
                songs.map((songItem) => {
                    if (songItem.id === song.id) {
                        return {
                            ...songItem,
                            usersLiked: [
                                {
                                    songId: song.id,
                                    userId: 1,
                                    id: -1,
                                    createdAt: new Date(),
                                    updatedAt: new Date(),
                                },
                            ],
                        };
                    }

                    return songItem;
                })
            );
        }
    }

    return (
        <div className="group flex items-center gap-3 text-sm cursor-default">
            <div className="relative h-[50px] w-[50px] rounded-md overflow-hidden flex-none">
                <img
                    src={song?.imageUrl}
                    alt="Album cover"
                    className="object-cover select-none"
                />
            </div>
            <div className="flex flex-col gap-1">
                <h2>{song?.title}</h2>
                <p className="font-normal text-typography-gray">
                    By {song?.authorName}
                </p>
            </div>
            {data?.user && (
                <button
                    className="text-xl cursor-pointer"
                    onClick={handleToggleFavourite}
                >
                    {getIsLiked() ? (
                        <IoHeart className="text-btn-primary" />
                    ) : (
                        <IoHeartOutline />
                    )}
                </button>
            )}
        </div>
    );
}
