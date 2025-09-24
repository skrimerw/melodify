import { auth } from "@/auth";
import {
    AlbumContext,
    AlbumListenBtn,
    AlbumPinBtn,
    AverageBgColorSetter,
    SeparationDot,
} from "@/components/shared";
import { getAlbumTotalFomattedTime } from "@/lib/utils";
import { prisma } from "@/prisma/prisma-client";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import { Vibrant } from "node-vibrant/node";
import path from "path";
interface Props {
    params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;

    const album = await prisma.album.findFirst({
        where: {
            id: Number(id),
        },
        select: {
            title: true,
        },
    });

    return {
        title: `${album?.title} - Melodify`,
    };
}

export default async function AlbumPage({ params }: Props) {
    const { id } = await params;

    if (isNaN(Number(id))) {
        notFound();
    }

    const album = await prisma.album.findFirst({
        where: {
            id: Number(id),
        },
        include: {
            artist: true,
            songs: true,
        },
    });

    if (!album) {
        notFound();
    }

    const session = await auth();

    const isPinned = await prisma.albumsPinned.findFirst({
        where: {
            AND: {
                albumId: Number(id),
                userId: session?.user.id,
            },
        },
    });

    const songs = await prisma.song.findMany({
        where: {
            albumId: Number(id),
        },
        include: {
            album: true,
            artist: true,
        },
    });

    const { imageUrl, title, artist } = album;

    /* let color =
        (await Vibrant.from(path.join("public", imageUrl)).getPalette())
            .LightVibrant?.hex || ""; */

    return (
        <section>
            {/* <AverageBgColorSetter color={color} /> */}

            <div className="flex gap-7 items-center">
                <div className="size-52 rounded-sm overflow-hidden bg-white/3">
                    <img
                        className="size-full object-cover"
                        src={imageUrl}
                        alt={title}
                    />
                </div>
                <div className="flex flex-col">
                    <p className="text-sm text-typography-gray">Album</p>
                    <h1 className="text-5xl font-bold">{title}</h1>
                    <p className="text-sm text-typography-gray mt-3.5">
                        <Link
                            href={`/artist/${songs[0].artistId}`}
                            className="transition-all hover:text-primary"
                        >
                            {artist.name}
                        </Link>
                        <SeparationDot />
                        {album.releaseYear}
                        <SeparationDot />

                        {getAlbumTotalFomattedTime({
                            ...album,
                            songs,
                        })}
                    </p>
                    <div className="flex gap-3 items-center mt-8">
                        <AlbumListenBtn songs={songs} />
                        <AlbumPinBtn
                            album={album}
                            isInitiallyPinned={!!isPinned}
                        />
                    </div>
                </div>
            </div>
            <div className="mt-8 max-w-[720px]">
                <AlbumContext
                    className="mt-5"
                    songs={songs}
                    queueId={`${songs[0].artist.name.toLowerCase()}.album.${album.title.toLowerCase()}`}
                />
            </div>
        </section>
    );
}
