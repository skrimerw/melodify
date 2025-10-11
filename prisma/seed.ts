import { albums, artists, songs } from "./constants";
import { prisma } from "./prisma-client";
import bcrypt from "bcrypt";
import { crawledMusic } from "./crawled-music";
import path from "path";

async function insertCrawledMusic() {
    crawledMusic.forEach(async (music) => {
        const beatles = await prisma.artist.create({
            data: {
                name: music.name,
                heroImageUrl: music.imageUrl,
            },
        });

        const albums = await prisma.album.createManyAndReturn({
            data: music.albums.map((album) => ({
                imageUrl: album.imageUrl,
                releaseYear: Number(album.year),
                title: album.title,
                artistId: beatles.id,
            })),
        });

        albums.forEach((album, i) => {
            music.albums[i].tracks.forEach(async (track) => {
                await prisma.song.create({
                    data: {
                        audioUrl: track.audioUrl,
                        duration: Number(track.duration),
                        title: track.title,
                        albumId: album.id,
                        artistId: beatles.id,
                    },
                });
            });
        });
    });
}

async function up() {
    await prisma.user.createMany({
        data: [
            {
                username: "user",
                email: "user@test.ru",
                password: bcrypt.hashSync("111111", 10),
            },
        ],
    });

    await prisma.artist.createMany({
        data: artists,
    });

    await prisma.album.createMany({
        data: albums,
    });

    songs.forEach(async (song) => {
        await prisma.song.create({
            data: await song,
        });
    });
}

async function down() {
    await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "VerificationCode" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Song" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "LikedSong" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Artist" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Album" RESTART IDENTITY CASCADE`;
}

async function main() {
    try {
        await down();
        await up();
        await insertCrawledMusic();
    } catch (e) {
        console.error(e);
    }
}

main();
