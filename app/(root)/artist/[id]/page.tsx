import { ArtistListenBtn, PlaylistContext } from "@/components/shared";
import { AlbumCard } from "@/components/shared/AlbumCard";
import { prisma } from "@/prisma/prisma-client";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import React from "react";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  const artist = await prisma.artist.findFirst({
    where: {
      id: Number(id),
    },
    select: {
      name: true,
    },
  });

  return {
    title: `${artist?.name} - Melodify`,
  };
}

export default async function ArtistPage({ params }: Props) {
  const { id } = await params;

  const artist = await prisma.artist.findFirst({
    where: {
      id: Number(id),
    },
    include: {
      songs: {
        include: {
          album: true,
          artist: true,
        },
      },
      albums: {
        include: {
          songs: {
            include: {
              album: true,
              artist: true,
            },
          },
        },
      },
    },
  });

  if (!artist) {
    notFound();
  }

  const { heroImageUrl, name, songs, albums } = artist;

  return (
    <section>
      <div className="flex gap-7 items-center">
        <div className="size-52">
          <img
            className="size-full rounded-full object-cover"
            src={heroImageUrl}
            alt={name}
          />
        </div>
        <div className="flex flex-col">
          <p className="text-sm text-typography-gray">Artist</p>
          <h1 className="text-5xl font-bold">{name}</h1>
          <ArtistListenBtn songs={songs} artist={artist} />
        </div>
      </div>
      <div className="mt-8 max-w-[720px]">
        <h2 className="text-2xl font-bold">Popular Songs</h2>
        <PlaylistContext
          className="mt-5"
          songs={songs}
          queueId={`${artist.name.toLowerCase()}.popular`}
        />
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold">Albums</h2>
        <div className="grid grid-cols-5 gap-3 mt-2.5">
          {albums.map((album) => {
            return (
              <AlbumCard
                key={album.id}
                songs={album.songs}
                album={album}
                artist={artist}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
