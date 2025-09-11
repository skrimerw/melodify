"use client";

import { addLike, removeLike } from "@/actions/song-likes";
import React, { useEffect, useState } from "react";
import { IoHeart, IoHeartOutline } from "react-icons/io5";

interface Props {
    songId: number;
    initiallyLiked: boolean;
    onLikeAdd?: () => void;
    onLikeRemove?: () => void;
}

export default function LikeBtn({
    onLikeAdd,
    onLikeRemove,
    songId,
    initiallyLiked,
}: Props) {
    const [liked, setLiked] = useState(initiallyLiked);

    useEffect(() => {
        setLiked(initiallyLiked);
    }, [initiallyLiked]);

    

    function handleToggleFavourite() {
        if (liked) {
            removeLike(songId);
            setLiked(false);
            onLikeRemove?.();
        } else {
            addLike(songId);
            setLiked(true);
            onLikeAdd?.();
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
