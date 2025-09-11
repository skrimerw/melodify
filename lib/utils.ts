import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatToMinutes(seconds: number) {
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
