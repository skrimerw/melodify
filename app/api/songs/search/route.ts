import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const searchVal = searchParams.get("search");

    if (searchVal === null)
        return NextResponse.json(
            {
                message: "Request url must contain 'search' query param",
            },
            { status: 400 }
        );

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

    return NextResponse.json(songs);
}
