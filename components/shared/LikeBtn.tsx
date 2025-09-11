"use client";

import { addLike, removeLike } from "@/actions/song-likes";
import { useLikedSongsStore } from "@/store/use-liked-songs-store";
import { Song } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { IoHeart, IoHeartOutline } from "react-icons/io5";

interface Props {
    song: Song;
}

export default function LikeBtn({ song }: Props) {
    const initiallyLiked = useLikedSongsStore(
        (state) => state.likedSongs.find((s) => s.id === song.id) !== undefined
    );
    const setLikedSongs = useLikedSongsStore((state) => state.setLikedSongs);
    const likedSongs = useLikedSongsStore((state) => state.likedSongs);

    const [liked, setLiked] = useState(initiallyLiked);

    useEffect(() => {
        setLiked(initiallyLiked)
    }, [initiallyLiked])

    function handleToggleFavourite() {
        if (liked) {
            removeLike(song.id);
            setLiked(false);
            setLikedSongs(likedSongs.filter((s) => s.id !== song.id));
        } else {
            addLike(song.id);
            setLiked(true);
            setLikedSongs([...likedSongs, song]);
        }
    }

    return (
        <button
            className="text-xl cursor-pointer"
            onClick={handleToggleFavourite}
        >
            {liked ? (
                <IoHeart className="text-btn-primary" />
            ) : (
                <IoHeartOutline />
            )}
        </button>
    );
}
