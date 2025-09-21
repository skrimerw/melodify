"use server";

import { auth } from "@/auth";
import { prisma } from "@/prisma/prisma-client";

export async function followArtist(artistId: number) {
    const session = await auth();

    if (!session?.user) return;

    try {
        await prisma.artist.update({
            where: {
                id: artistId,
            },
            data: {
                pinnedBy: {
                    create: {
                        user: {
                            connect: {
                                id: session.user.id,
                            },
                        },
                    },
                },
            },
        });
    } catch (e) {
        console.log("Error [FOLLOW_ARTIST]");

        throw e;
    }
}

export async function unfollowArtist(artistId: number) {
    const session = await auth();

    if (!session?.user) return;

    try {
        await prisma.artist.update({
            where: {
                id: artistId,
            },
            data: {
                pinnedBy: {
                    delete: {
                        artistId_userId: {
                            artistId,
                            userId: session.user.id,
                        },
                    },
                },
            },
        });
    } catch (e) {
        console.log("Error [UNFOLLOW_ARTIST]");

        throw e;
    }
}
