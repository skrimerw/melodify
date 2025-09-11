"use client";

import React, { useEffect, useRef, useState } from "react";
import { VolumeSlider } from ".";
import { cn, formatToMinutes } from "@/lib/utils";
import { useAudioPlayer } from "@/context/useAudioPlayer";

interface Props {
    className?: string;
}

export default function ProgressBar({ className }: Props) {
    const { duration, currentTime, seekTo } = useAudioPlayer();
    const [currentTiming, setCurrentTiming] = useState(currentTime);
    //const [buffered, setBuffered] = useState(0);
    const isChanging = useRef(false);

    useEffect(() => {
        if (!isChanging.current) {
            setCurrentTiming(currentTime);
        }
    }, [currentTime]);

    function onValueChange(val: number[]) {
        isChanging.current = true;
        setCurrentTiming(val[0]);
    }

    return (
        <div className={cn(className)}>
            <div className="flex justify-between text-sm">
                <span className="h-5">
                    {!isNaN(duration) && formatToMinutes(currentTiming)}
                </span>
                <span className="h-5">
                    {!isNaN(duration) && formatToMinutes(duration)}
                </span>
            </div>
            <div className="relative">
                <VolumeSlider
                    value={[currentTiming]}
                    onValueChange={(val) => onValueChange(val)}
                    onValueCommit={(val) => {
                        isChanging.current = false;
                        seekTo(val[0]);
                    }}
                    step={0.001}
                    max={duration}
                />
                {/* <div className="absolute top-1 left-0 right-0 w-full z-0 pointer-events-none">
                    <span
                        className={`block h-1 rounded-full bg-white/20`}
                        style={{
                            width: buffered * 100 + "%",
                        }}
                    ></span>
                </div> */}
            </div>
        </div>
    );
}
