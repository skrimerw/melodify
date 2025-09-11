"use client";

import { Prisma } from "@prisma/client";
import { usePathname } from "next/navigation";
import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";

export type Song = Prisma.SongGetPayload<{
    include: {
        usersLiked: true;
    };
}>;

type AudioPlayerState = {
    isPaused: boolean;
    isEnded: boolean;
    volume: number;
    currentSong: Song | null;
    queue: Song[];
    duration: number;
    currentTime: number;
};

interface AudioPlayerContext extends AudioPlayerState {
    play: (song?: Song) => void;
    pause: () => void;
    next: () => void;
    prev: () => void;
    setVolume: (val: number) => void;
    setCurrentSong: (song: Song) => void;
    setQueue: (songs: Song[]) => void;
    seekTo: (val: number) => void;
}

const AudioPlayerContext = createContext<AudioPlayerContext | null>(null);

export function AudioPlayerProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [state, setState] = useState<AudioPlayerState>({
        currentSong: null,
        isEnded: false,
        isPaused: false,
        queue: [],
        volume: 0.5,
        currentTime: 0,
        duration: 0,
    });
    const audioRef = useRef<HTMLAudioElement | null>(null);

    function onTimeUpdate() {
        if (!audioRef.current) return;

        const audio = audioRef.current;

        setState((prev) => ({
            ...prev,
            currentTime: audio.currentTime,
            duration: audio.duration,
        }));
    }

    function onEnded() {
        setState((prev) => ({ ...prev, isEnded: true, isPaused: true }));
        next();
    }

    function onPlay() {
        setState((prev) => ({ ...prev, isPaused: false, isEnded: false }));
    }

    function onPause() {
        pause();
    }

    useEffect(() => {
        if (!audioRef.current) {
            audioRef.current = new Audio();
        }

        return () => {
            setState((prev) => ({
                currentSong: null,
                isEnded: false,
                isPaused: false,
                queue: [],
                volume: 0.5,
                currentTime: 0,
                duration: 0,
            }));

            audioRef?.current?.pause();
        };
    }, []);

    useEffect(() => {
        if (!audioRef.current) return;

        const audio = audioRef.current;

        audio.addEventListener("play", onPlay);
        audio.addEventListener("pause", onPause);
        audio.addEventListener("timeupdate", onTimeUpdate);
        audio.addEventListener("ended", onEnded);

        return () => {
            audio.removeEventListener("play", onPlay);
            audio.removeEventListener("pause", onPause);
            audio.removeEventListener("timeupdate", onTimeUpdate);
            audio.removeEventListener("ended", onEnded);
        };
    }, [state.queue, state.currentSong]);

    const play = useCallback((song?: Song) => {
        const audio = audioRef.current;

        if (!audio) return;

        const songForMetadata = song || state.currentSong;

        if (song) {
            setState((prev) => ({
                ...prev,
                isPaused: false,
                isEnded: false,
                currentSong: song,
            }));

            audio.src = song.audioUrl;
        }

        if ("mediaSession" in navigator) {
            navigator.mediaSession.metadata = new MediaMetadata({
                title: songForMetadata?.title,
                artist: songForMetadata?.authorName,
                artwork: [
                    {
                        src: songForMetadata?.imageUrl || "",
                        sizes: "512x512",
                        type: "image/jpeg",
                    },
                ],
            });
        }

        audio.play();
    }, []);

    const pause = useCallback(() => {
        const audio = audioRef.current;

        if (!audio) return;

        audio.pause();

        setState((prev) => ({ ...prev, isPaused: true }));
    }, []);

    const next = () => {
        const audio = audioRef.current;

        if (!audio) return;

        let newIndex =
            state.queue.findIndex((s) => s.id === state.currentSong?.id) + 1;

        if (newIndex === state.queue.length) {
            newIndex = 0;
        }

        play(state.queue[newIndex]);
    };

    const prev = () => {
        const audio = audioRef.current;

        if (!audio) return;

        let newIndex =
            state.queue.findIndex((s) => s.id === state.currentSong?.id) - 1;

        if (newIndex === -1) {
            newIndex = state.queue.length - 1;
        }

        play(state.queue[newIndex]);
    };

    const setVolume = useCallback((val: number) => {
        const audio = audioRef.current;

        if (!audio) return;

        audio.volume = val;

        setState((prev) => ({ ...prev, volume: val }));
    }, []);

    const setQueue = useCallback((songs: Song[]) => {
        setState((prev) => ({ ...prev, queue: songs }));
    }, []);

    const seekTo = useCallback((val: number) => {
        const audio = audioRef.current;

        if (!audio) return;

        if (val > audio.duration) val = audio.duration;

        audio.currentTime = val;

        setState((prev) => ({ ...prev, currentTime: val }));
    }, []);

    const setCurrentSong = (song: Song) => {
        setState((prev) => ({ ...prev, currentSong: song }));
    };

    return (
        <AudioPlayerContext
            value={{
                ...state,
                next,
                pause,
                play,
                prev,
                setVolume,
                setQueue,
                seekTo,
                setCurrentSong,
            }}
        >
            {children}
        </AudioPlayerContext>
    );
}

export function useAudioPlayer() {
    const context = useContext(AudioPlayerContext);

    if (!context) {
        throw new Error(
            "useAudioPlayer must be used within an AudioPlayerProvider"
        );
    }

    return context;
}
