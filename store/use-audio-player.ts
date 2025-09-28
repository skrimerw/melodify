"use client";

import { SongWithAlbumAndArtist } from "@/types";
import { create } from "zustand";

type AudioPlayerState = {
    queueId: string | null;
    currentSong: SongWithAlbumAndArtist | null;
    queue: SongWithAlbumAndArtist[];
    isPaused: boolean;
    isEnded: boolean;
    volume: number;
    currentTime: number;
    duration: number;

    play: (song?: SongWithAlbumAndArtist) => void;
    pause: () => void;
    next: () => void;
    prev: () => void;
    setVolume: (val: number) => void;
    setQueue: (songs: SongWithAlbumAndArtist[]) => void;
    seekTo: (val: number) => void;
    setQueueId: (val: string) => void;
    destroyAudioPlayer: () => void;
};

export const useAudioPlayer = create<AudioPlayerState>((set, get) => {
    const audio = typeof Audio !== "undefined" ? new Audio() : null;

    if (audio) {
        audio.volume = 0.5;

        audio.addEventListener("timeupdate", () => {
            set({
                currentTime: audio.currentTime,
                duration: audio.duration || 0,
            });
        });

        audio.addEventListener("ended", () => {
            set({ isEnded: true, isPaused: true });
            get().next();
        });

        audio.addEventListener("play", () => {
            set({ isPaused: false, isEnded: false });
        });

        audio.addEventListener("pause", () => {
            set({ isPaused: true });
        });
    }

    return {
        currentSong: null,
        queue: [],
        isPaused: true,
        isEnded: false,
        volume: 0.5,
        currentTime: 0,
        duration: 0,
        queueId: null,

        play: (song?: SongWithAlbumAndArtist) => {
            if (!audio) return;

            const { currentSong, queue } = get();
            const songForMetadata = song || currentSong;

            if (song) {
                set({ currentSong: song, isPaused: false, isEnded: false });

                if (!queue.find((s) => s.id === song.id)) {
                    set({ queue: [...queue, song] });
                }

                audio.src = song.audioUrl;
            }

            if ("mediaSession" in navigator && songForMetadata) {
                navigator.mediaSession.metadata = new MediaMetadata({
                    title: songForMetadata.title,
                    artist: songForMetadata.artist.name,
                    artwork: [
                        {
                            src: songForMetadata.album.imageUrl || "",
                            sizes: "512x512",
                            type: "image/jpeg",
                        },
                    ],
                });
            }

            audio.play();
        },

        pause: () => {
            if (!audio) return;
            audio.pause();
        },

        next: () => {
            if (!audio) return;

            const { queue, currentSong } = get();
            if (queue.length === 0 || !currentSong) return;

            let newIndex = queue.findIndex((s) => s.id === currentSong.id) + 1;
            if (newIndex === queue.length) newIndex = 0;

            get().play(queue[newIndex]);
        },

        prev: () => {
            if (!audio) return;

            const { queue, currentSong } = get();
            if (queue.length === 0 || !currentSong) return;

            let newIndex = queue.findIndex((s) => s.id === currentSong.id) - 1;
            if (newIndex < 0) newIndex = queue.length - 1;

            get().play(queue[newIndex]);
        },

        setVolume: (val: number) => {
            if (!audio) return;
            audio.volume = val;
            set({ volume: val });
        },

        setQueue: (songs: SongWithAlbumAndArtist[]) => {
            set({ queue: songs });
        },

        seekTo: (val: number) => {
            if (!audio) return;
            if (val > audio.duration) val = audio.duration;
            audio.currentTime = val;
            set({ currentTime: val });
        },

        setQueueId: (val) => {
            set({ queueId: val });
        },

        destroyAudioPlayer: () => {
            set({
                currentSong: null,
                queue: [],
                isPaused: true,
                isEnded: false,
                volume: 0.5,
                currentTime: 0,
                duration: 0,
                queueId: null,
            });

            audio?.pause();
        },
    };
});
