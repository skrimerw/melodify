import { prisma } from "@/prisma/prisma-client";
import { SearchResult, TabName } from "@/types";
import { NextRequest, NextResponse } from "next/server";

const TabNames = ["all", "artists", "tracks", "albums"];

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const searchVal = searchParams.get("text");
    const tabVal = (searchParams.get("tab") || "all") as TabName;

    if (searchVal === null) {
        return NextResponse.json(
            {
                message: "Request url must contain 'text' query param",
            },
            { status: 400 }
        );
    }

    if (!TabNames.includes(tabVal)) {
        return NextResponse.json(
            {
                message: "Invalid tab",
            },
            { status: 400 }
        );
    }

    let searchResult: SearchResult = {};

    if (tabVal === "all") {
        const songs = await prisma.song.findMany({
            where: {
                OR: [
                    {
                        title: {
                            contains: searchVal.toLowerCase(),
                            mode: "insensitive",
                        },
                    },
                    {
                        artist: {
                            name: {
                                contains: searchVal.toLowerCase(),
                                mode: "insensitive",
                            },
                        },
                    },
                ],
            },
            include: {
                album: true,
                artist: true,
            },
            take: 10,
        });

        const artists = await prisma.artist.findMany({
            where: {
                name: {
                    contains: searchVal.toLowerCase(),
                    mode: "insensitive",
                },
            },
            include: {
                songs: {
                    include: {
                        album: true,
                        artist: true,
                    },
                },
            },
            take: 10,
        });

        const albums = await prisma.album.findMany({
            where: {
                OR: [
                    {
                        title: {
                            contains: searchVal.toLowerCase(),
                            mode: "insensitive",
                        },
                    },
                    {
                        artist: {
                            name: {
                                contains: searchVal.toLowerCase(),
                                mode: "insensitive",
                            },
                        },
                    },
                ],
            },
            include: {
                artist: true,
                songs: {
                    include: {
                        album: true,
                        artist: true,
                    },
                },
            },
            take: 10,
        });

        searchResult = {
            songs,
            artists,
            albums,
        };
    } else if (tabVal === "albums") {
        const albums = await prisma.album.findMany({
            where: {
                OR: [
                    {
                        title: {
                            contains: searchVal.toLowerCase(),
                            mode: "insensitive",
                        },
                    },
                    {
                        artist: {
                            name: {
                                contains: searchVal.toLowerCase(),
                                mode: "insensitive",
                            },
                        },
                    },
                ],
            },
            include: {
                artist: true,
                songs: {
                    include: {
                        album: true,
                        artist: true,
                    },
                },
            },
        });

        searchResult = {
            albums,
        };
    } else if (tabVal === "artists") {
        const artists = await prisma.artist.findMany({
            where: {
                name: {
                    contains: searchVal.toLowerCase(),
                    mode: "insensitive",
                },
            },
            include: {
                songs: {
                    include: {
                        album: true,
                        artist: true,
                    },
                },
            },
        });

        searchResult = {
            artists,
        };
    } else if (tabVal === "tracks") {
        const songs = await prisma.song.findMany({
            where: {
                OR: [
                    {
                        title: {
                            contains: searchVal.toLowerCase(),
                            mode: "insensitive",
                        },
                    },
                    {
                        artist: {
                            name: {
                                contains: searchVal.toLowerCase(),
                                mode: "insensitive",
                            },
                        },
                    },
                ],
            },
            include: {
                album: true,
                artist: true,
            },
        });

        searchResult = {
            songs,
        };
    }

    return NextResponse.json(searchResult);
}
