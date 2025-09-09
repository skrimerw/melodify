"use client";

import React, { useEffect, useState } from "react";
import { FaVolumeHigh } from "react-icons/fa6";
import { VolumeSlider } from ".";
import { GenIcon } from "react-icons";
import { cn } from "@/lib/utils";

interface Props {
    audioRef: HTMLAudioElement | null;
    className?: string;
}

export default function VolumeControl({ audioRef, className }: Props) {
    const [volume, setVolume] = useState([0.5]);

    useEffect(() => {
        if (audioRef) {
            audioRef.volume = volume[0];
        }
    }, []);

    function onVolumeChange(value: number[]) {
        if (audioRef) {
            audioRef.volume = value[0];
            setVolume(value);
        }
    }

    function FaVolumeMedium(props: any) {
        return GenIcon({
            tag: "svg",
            attr: { viewBox: "0 0 640 512" },
            child: [
                {
                    tag: "path",
                    attr: {
                        d: "M473.1 107c43.2 35.2 70.9 88.9 70.9 149s-27.7 113.8-70.9 149c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C475.3 341.3 496 301.1 496 256s-20.7-85.3-53.2-111.8c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zm-60.5 74.5C434.1 199.1 448 225.9 448 256s-13.9 56.9-35.4 74.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C393.1 284.4 400 271 400 256s-6.9-28.4-17.7-37.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zM301.1 34.8C312.6 40 320 51.4 320 64l0 384c0 12.6-7.4 24-18.9 29.2s-25 3.1-34.4-5.3L131.8 352 64 352c-35.3 0-64-28.7-64-64l0-64c0-35.3 28.7-64 64-64l67.8 0L266.7 40.1c9.4-8.4 22.9-10.4 34.4-5.3z",
                    },
                    child: [],
                },
            ],
        })(props);
    }

    function FaVolumeLow(props: any) {
        return GenIcon({
            tag: "svg",
            attr: { viewBox: "0 0 640 512" },
            child: [
                {
                    tag: "path",
                    attr: {
                        d: "M301.1 34.8C312.6 40 320 51.4 320 64l0 384c0 12.6-7.4 24-18.9 29.2s-25 3.1-34.4-5.3L131.8 352 64 352c-35.3 0-64-28.7-64-64l0-64c0-35.3 28.7-64 64-64l67.8 0L266.7 40.1c9.4-8.4 22.9-10.4 34.4-5.3zM412.6 181.5C434.1 199.1 448 225.9 448 256s-13.9 56.9-35.4 74.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C393.1 284.4 400 271 400 256s-6.9-28.4-17.7-37.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5z",
                    },
                    child: [],
                },
            ],
        })(props);
    }

    function FaVolumeXmark(props: any) {
        return GenIcon({
            tag: "svg",
            attr: { viewBox: "0 0 640 512" },
            child: [
                {
                    tag: "path",
                    attr: {
                        d: "M301.1 34.8C312.6 40 320 51.4 320 64l0 384c0 12.6-7.4 24-18.9 29.2s-25 3.1-34.4-5.3L131.8 352 64 352c-35.3 0-64-28.7-64-64l0-64c0-35.3 28.7-64 64-64l67.8 0L266.7 40.1c9.4-8.4 22.9-10.4 34.4-5.3zM425 167l55 55 55-55c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-55 55 55 55c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-55-55-55 55c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l55-55-55-55c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0z",
                    },
                    child: [],
                },
            ],
        })(props);
    }

    function getVolumeIcon() {
        const volumeVal = volume[0];

        if (volumeVal >= 0.66) {
            return <FaVolumeHigh />;
        } else if (volumeVal >= 0.33) {
            return <FaVolumeMedium />;
        } else if (volumeVal > 0) {
            return <FaVolumeLow />;
        } else {
            return <FaVolumeXmark />;
        }
    }

    return (
        <div className={cn("relative group gap-2", className)}>
            <div className="absolute bottom-7.5 -right-1 rounded-full p-3 border border-input bg-card invisible opacity-0 transition-all duration-300 delay-150 group-hover:visible group-hover:opacity-100">
                <VolumeSlider
                    onValueChange={(value) => onVolumeChange(value)}
                    defaultValue={volume}
                    max={1}
                    step={0.01}
                    orientation="vertical"
                    className={cn("w-10 !h-[50px]")}
                />
            </div>
            <div className="relative text-[27px] h-5.5 text-typography-gray cursor-pointer group-hover:text-primary mb-1">{getVolumeIcon()}</div>
        </div>
    );
}
