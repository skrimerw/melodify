"use server";

import { auth } from "@/auth";
import { prisma } from "@/prisma/prisma-client";

export async function pinAlbum(albumId: number) {
    const session = await auth();

    if (!session?.user) return;

    try {
        await prisma.album.update({
            where: {
                id: albumId,
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
        console.log("Error [PIN_ALBUM]");

        throw e;
    }
}

export async function unpinAlbum(albumId: number) {
    const session = await auth();

    if (!session?.user) return;

    try {
        await prisma.album.update({
            where: {
                id: albumId,
            },
            data: {
                pinnedBy: {
                    delete: {
                        albumId_userId: {
                            albumId,
                            userId: session.user.id
                        }
                    },
                },
            },
        });
    } catch (e) {
        console.log("Error [UNPIN_ALBUM]");

        throw e;
    }
}
