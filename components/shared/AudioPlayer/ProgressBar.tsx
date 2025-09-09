"use client";

import React, { useEffect, useRef, useState } from "react";
import { VolumeSlider } from ".";
import { cn } from "@/lib/utils";
import { usePlayerStore } from "@/store/use-player-store";

interface Props {
    audioRef: HTMLAudioElement | null;
    className?: string;
}

export default function ProgressBar({ audioRef, className }: Props) {
    const [currentTiming, setCurrentTiming] = useState(0);
    const isChanging = useRef(false);
    const { setIsPaused, setEnded, ended } = usePlayerStore();

    useEffect(() => {
        audioRef?.addEventListener("timeupdate", onTimeUpdate);
        audioRef?.addEventListener("ended", onEnded);

        return () => {
            audioRef?.removeEventListener("timeupdate", onTimeUpdate);
            audioRef?.addEventListener("ended", onEnded);
        };
    }, []);

    function onTimeUpdate() {
        if (!isChanging.current) {
            setCurrentTiming(audioRef?.currentTime || 0);
        }
    }

    function onEnded() {
        setEnded(true);
        setIsPaused(true);
    }

    function formatToMinutes(seconds: number) {
        const roundedSeconds = Math.round(seconds);
        let minutes = String(Math.floor(roundedSeconds / 60));
        let secondsStr = String(roundedSeconds % 60);

        if (secondsStr.length === 1) {
            secondsStr = "0" + secondsStr;
        }

        if (minutes.length === 1) {
            minutes = "0" + minutes;
        }

        return `${minutes}:${secondsStr}`;
    }

    function onValueChange(val: number[]) {
        isChanging.current = true;
        if (audioRef) {
            setCurrentTiming(val[0]);
        }
    }

    return (
        <div className={cn(className)}>
            <div className="flex justify-between text-sm">
                <span className="h-5">
                    {!isNaN(audioRef?.duration as number) &&
                        formatToMinutes(currentTiming)}
                </span>
                <span className="h-5">
                    {!isNaN(audioRef?.duration as number) &&
                        formatToMinutes(audioRef?.duration as number)}
                </span>
            </div>
            <VolumeSlider
                value={[currentTiming]}
                onValueChange={(val) => onValueChange(val)}
                onValueCommit={(val) => {
                    if (audioRef) {
                        isChanging.current = false;
                        audioRef.currentTime = val[0];

                        if (ended) {
                            setEnded(false);
                            setIsPaused(false);
                        }
                    }
                }}
                step={0.001}
                max={audioRef?.duration}
            />
        </div>
    );
}
