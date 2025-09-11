"use server";

import { auth } from "@/auth";
import { prisma } from "@/prisma/prisma-client";

export async function addLike(songId: number) {
    const session = await auth();

    if (!session?.user) return;

    try {
        await prisma.song.update({
            where: {
                id: songId,
            },
            data: {
                usersLiked: {
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
        console.log("Error [LIKE_SONG]");

        throw e;
    }
}

export async function removeLike(songId: number) {
    const session = await auth();

    if (!session?.user) return;

    try {
        await prisma.song.update({
            where: {
                id: songId,
            },
            data: {
                usersLiked: {
                    delete: {
                        songId_userId: {
                            songId,
                            userId: session.user.id,
                        },
                    },
                },
            },
        });
    } catch (e) {
        console.log("Error [LIKE_SONG]");

        throw e;
    }
}
