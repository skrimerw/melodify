import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { parseFile } from "music-metadata";
import { AlbumWithSongs } from "@/types";
import { TranslationValues, useTranslations } from "next-intl";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats seconds into mm:ss format
 * @param seconds
 * @returns
 */
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
/**
 * Returns song duration in seconds
 * @param pathToSong
 * @returns
 */
export async function getSongDuration(pathToSong: string) {
  let duration = 0;

  const metadata = await parseFile(pathToSong);

  duration = metadata.format.duration || 0;

  return duration;
}
/**
 * Returns total album duration in mm min ss sec format
 * @param album
 * @returns
 */
export function getAlbumTotalFomattedTime(album: AlbumWithSongs, t: any) {
  let timeSum = 0;
  const songs = album.songs;

  for (let i = 0; i < songs.length; i++) {
    timeSum += songs[i].duration;
  }

  const roundedSeconds = Math.round(timeSum);
  let minutes = Math.floor(roundedSeconds / 60);
  let seconds = roundedSeconds % 60;

  return `${minutes} ${t("minutes")} ${seconds} ${t("seconds")}`;
}
