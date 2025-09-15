import { getSongDuration } from "../lib/utils";
import { Prisma } from "@prisma/client";
import path from "path";

const songsInitial: Omit<Prisma.SongCreateInput, "duration">[] = [
    {
        title: "Фраер",
        authorName: "Михаил Круг",
        audioUrl: "./audio/frayer.mp3",
        imageUrl: "./images/limon.jpg",
    },
    {
        title: "Последняя осень",
        authorName: "ДДТ",
        audioUrl: "./audio/poslednyaya-osen.mp3",
        imageUrl: "./images/actrisa-vesna.webp",
    },
    {
        title: "Karma Police",
        authorName: "Radiohead",
        audioUrl: "./audio/karma-police.mp3",
        imageUrl: "./images/ok-computer.jpg",
    },
    {
        title: "No More Lonely Nights",
        authorName: "Paul McCartney",
        audioUrl: "./audio/no-more-lonely-nights.mp3",
        imageUrl: "./images/pure-mccartney.jpg",
    },
    {
        title: "My Love",
        authorName: "Paul McCartney",
        audioUrl: "./audio/my-love.mp3",
        imageUrl: "./images/pure-mccartney.jpg",
    },
];

export const songs = songsInitial.map(async (song) => ({
    ...song,
    duration: await getSongDuration(path.join("./public", song.audioUrl)),
}));
