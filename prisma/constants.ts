import { getSongDuration } from "../lib/utils";
import { Prisma } from "@prisma/client";
import path from "path";

export const artists: Prisma.ArtistCreateManyInput[] = [
    {
        name: "Михаил Круг",
        heroImageUrl: "./images/artist-hero/krug.jpg",
    },
    {
        name: "ДДТ",
        heroImageUrl: "./images/artist-hero/ddt.jpg",
    },
    {
        name: "Radiohead",
        heroImageUrl: "./images/artist-hero/radiohead.png",
    },
    {
        name: "Paul McCartney",
        heroImageUrl: "./images/artist-hero/paul-mccartney.webp",
    },
];

export const albums: Prisma.AlbumCreateManyInput[] = [
    {
        title: "Жиган Лимон",
        imageUrl: "./images/album-covers/limon.jpg",
        releaseYear: 1994,
        artistId: 1,
    },
    {
        title: "Актриса весна",
        imageUrl: "./images/album-covers/actrisa-vesna.webp",
        releaseYear: 1992,
        artistId: 2,
    },
    {
        title: "OK Computer",
        imageUrl: "./images/album-covers/ok-computer.jpg",
        releaseYear: 1997,
        artistId: 3,
    },
    {
        title: "Pure McCartney",
        imageUrl: "./images/album-covers/pure-mccartney.jpg",
        releaseYear: 2016,
        artistId: 4,
    },
];

const songsInitial: Omit<Prisma.SongCreateManyInput, "duration">[] = [
    {
        title: "Фраер",
        audioUrl: "./audio/frayer.mp3",
        albumId: 1,
        artistId: 1,
    },
    {
        title: "Последняя осень",
        audioUrl: "./audio/poslednyaya-osen.mp3",
        albumId: 2,
        artistId: 2,
    },
    {
        title: "Karma Police",
        audioUrl: "./audio/karma-police.mp3",
        albumId: 3,
        artistId: 3,
    },
    {
        title: "No More Lonely Nights",
        audioUrl: "./audio/no-more-lonely-nights.mp3",
        albumId: 4,
        artistId: 4,
    },
    {
        title: "My Love",
        audioUrl: "./audio/my-love.mp3",
        albumId: 4,
        artistId: 4,
    },
];

export const songs = songsInitial.map(async (song) => ({
    ...song,
    duration: await getSongDuration(path.join("./public", song.audioUrl)),
}));
