"use client";

import { useSession } from "next-auth/react";
import React from "react";
import LikeBtn from "../LikeBtn";
import { useAudioPlayer } from "@/context/useAudioPlayer";

export default function ActiveSong() {
    const { currentSong: song, setCurrentSong, play, setQueue, queue } = useAudioPlayer();
    const { data } = useSession();

    function getIsLiked() {
        return song?.usersLiked !== undefined && song.usersLiked.length > 0;
    }

    console.log(song?.title, getIsLiked())

    function onLikeRemove() {
        const isLiked = getIsLiked();

        if (!song) return;

        if (isLiked) {
            play();
            setQueue(
                queue.map((songItem) => {
                    if (songItem.id === song.id) {
                        return {
                            ...songItem,
                            usersLiked: [],
                        };
                    }

                    return songItem;
                })
            );
        }
    }

    function onLikeAdd() {
        if (!song) return;

        setCurrentSong({
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
        setQueue(
            queue.map((songItem) => {
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
                <LikeBtn
                    initiallyLiked={getIsLiked()}
                    songId={song?.id || 0}
                    onLikeRemove={onLikeRemove}
                    onLikeAdd={onLikeAdd}
                />
            )}
        </div>
    );
}
