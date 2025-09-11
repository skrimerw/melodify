import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    _req: NextRequest,
    ctx: RouteContext<"/api/liked-songs/[userId]">
) {
    const { userId } = await ctx.params;

    const numUserId = Number(userId);

    if (isNaN(numUserId)) {
        return NextResponse.json(
            { message: "userId should be a number" },
            { status: 400 }
        );
    }

    const likedSongs = await prisma.likedSong.findMany({
        where: {
            userId: numUserId,
        },
        include: {
            song: true,
        },
    });

    const resLikedSongs = likedSongs.map((song) => song.song);

    return NextResponse.json(resLikedSongs);
}
