"use client";

import { useLikedSongsStore } from "@/store/use-liked-songs-store";
import { HeartIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";

interface Props {
  isEmpty: boolean;
  className?: string;
}

export default function FavoriteLink({ isEmpty, className }: Props) {
  const t = useTranslations("FavoriteLink");
  const likedSongs = useLikedSongsStore((state) => state.likedSongs);
  const loading = useLikedSongsStore((state) => state.loading);
  const [empty, setEmpty] = useState(isEmpty);

  useEffect(() => {
    if (!loading) {
      setEmpty(likedSongs.length === 0);
    }
  }, [loading, likedSongs]);

  return (
    <div className={className}>
      {likedSongs.length > 0 && (
        <Link
          href="/favorite"
          className="flex rounded-sm items-center gap-5 overflow-hidden bg-typography-gray/20 max-w-[300px]"
        >
          <div className="flex items-center justify-center bg-gradient-to-br from-20% to-100%  from-[#4100f4] to-[#c1ecd8] size-[65px] shadow-[6px_0px_3px_5px_rgba(34, 60, 80, 0.2)]">
            <HeartIcon fill="white" size={28} />
          </div>
          <span className="font-medium text-base mb-0.5">
            {t("description")}
          </span>
        </Link>
      )}
      {!empty && loading && (
        <>
          <Skeleton className={"h-[65px] w-[300px]"}>
            <Skeleton className="size-[65px] rounded-r-none shadow-[6px_0px_3px_5px_rgba(34, 60, 80, 0.2)]" />
          </Skeleton>
        </>
      )}
    </div>
  );
}
