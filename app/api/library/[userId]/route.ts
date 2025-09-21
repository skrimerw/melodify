import { prisma } from "@/prisma/prisma-client";
import { LibraryResult } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    _req: NextRequest,
    ctx: RouteContext<"/api/library/[userId]">
) {
    const { userId } = await ctx.params;

    const numUserId = Number(userId);

    if (isNaN(numUserId)) {
        return NextResponse.json(
            { message: "userId should be a number" },
            { status: 400 }
        );
    }

    let libraryResult: LibraryResult = {};

    const pinnedAlbums = await prisma.albumsPinned.findMany({
        where: {
            userId: numUserId,
        },
        include: {
            album: {
                include: {
                    artist: true,
                    songs: true,
                },
            },
        },
    });

    libraryResult.pinnedAlbums = pinnedAlbums.map((album) => album.album);

    const pinnedArtists = await prisma.artistsPinned.findMany({
        where: {
            userId: numUserId,
        },
        include: {
            artist: {
                include: {
                    songs: {
                        include: {
                            album: true,
                        },
                    },
                },
            },
        },
    });

    libraryResult.pinnedArtists = pinnedArtists.map((artist) => artist.artist);

    return NextResponse.json(libraryResult);
}
