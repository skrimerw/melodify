import { auth } from "@/auth";
import { PlaylistContext } from "@/components/shared";
import FavoritePagePlay from "@/components/shared/FavoritePagePlay";
import ScrollTop from "@/components/shared/ScrollTop";
import { Button } from "@/components/ui/button";
import { prisma } from "@/prisma/prisma-client";
import { SongWithAlbumAndArtist } from "@/types";
import { Prisma } from "@prisma/client";
import { HeartIcon, Music } from "lucide-react";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import React from "react";
import { FaUserSlash } from "react-icons/fa6";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  return {
    title: `${t("FavoritePage.pageTitle")} - Melodify`,
  };
}
export type LikedSongFull = Prisma.LikedSongGetPayload<{
  include: {
    song: {
      include: {
        album: true;
        artist: true;
      };
    };
  };
}>;

export default async function FavoritePage() {
  const t = await getTranslations();
  const session = await auth();
  let songs: LikedSongFull[] = [];

  songs = await prisma.likedSong.findMany({
    where: {
      userId: session?.user.id,
    },
    include: {
      song: {
        include: {
          album: true,
          artist: true,
        },
      },
    },
  });

  return (
    <div>
      <ScrollTop />
      <div className="flex items-center gap-6">
        <div className="flex items-center justify-center bg-gradient-to-br from-20% to-100% from-[#4100f4] to-[#c1ecd8] size-52 rounded-sm">
          <HeartIcon fill="white" size={56} />
        </div>
        <div>
          <p className="text-sm text-typography-gray">
            {t("common.names.playlist", { count: 1 })}
          </p>
          <h1 className="overlayed-heading text-5xl font-bold">
            {t("FavoritePage.pageTitle")}
          </h1>
        <FavoritePagePlay
        className="mt-5"
          songs={songs.map(song => song.song)}
        />
        </div>
      </div>
      <div className="mt-5 h-full">
        {session?.user ? (
          songs.length > 0 ? (
            <PlaylistContext
              queueId={`${session.user.id}.favorite`}
              songs={songs.map((song) => song.song)}
            />
          ) : (
            <div className="text-typography-gray flex flex-col items-center my-auto">
              <Music
                className="text-typography-gray opacity-40"
                size={150}
                strokeWidth={1.2}
              />
              <p className="opacity-50 text-xl">No songs yet</p>
            </div>
          )
        ) : (
          <>
            <div className="flex flex-col justify-center h-full items-center text-typography-gray opacity-40">
              <FaUserSlash
                className="opacity-50"
                size={130}
                strokeWidth={1.1}
              />
              <p className="text-xl">Please log in to create playlists</p>
            </div>
            <Button asChild className="block w-fit px-8 mx-auto mt-4">
              <Link href={"/login"}>Log In</Link>
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
