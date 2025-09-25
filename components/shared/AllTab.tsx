import { SearchResult, SongWithAlbumAndArtist } from "@/types";
import React from "react";
import { AlbumCard } from "./AlbumCard";
import { cn } from "@/lib/utils";
import AlbumCardSkeleton from "./AlbumCardSkeleton";
import ArtistCardSkeleton from "./ArtistCardSkeleton";
import ArtistCard from "./ArtistCard";
import PlaylistContext from "./PlaylistContext";
import { nanoid } from "nanoid";
import { Skeleton } from "../ui/skeleton";
import SearchNothingFound from "./SearchNothingFound";
import { useTranslations } from "next-intl";

interface Props {
  loading: boolean;
  searchResult: SearchResult;
  className?: string;
}

export default function AllTab({
  searchResult: { artists, songs, albums },
  loading,
  className,
}: Props) {
  const t = useTranslations("common.names");
  return (
    <div className="flex flex-col gap-7 h-full">
      {songs?.length === 0 && artists?.length === 0 && albums?.length === 0 ? (
        <SearchNothingFound />
      ) : (
        <>
          {loading ? (
            <section>
              {loading ? (
                <Skeleton className="h-7 w-[150px] mb-4" />
              ) : (
                <h2 className="text-2xl mb-4"> {t("track", { count: 10 })}</h2>
              )}
              <PlaylistContext
                className={className}
                songs={songs as SongWithAlbumAndArtist[]}
                loading={loading}
                queueId={`search.${nanoid()}`}
              />
            </section>
          ) : (
            songs &&
            songs?.length > 0 && (
              <section>
                {loading ? (
                  <Skeleton className="h-7 w-[150px] mb-4" />
                ) : (
                  <h2 className="text-2xl mb-4">{t("track", { count: 10 })}</h2>
                )}
                <PlaylistContext
                  className={className}
                  songs={songs as SongWithAlbumAndArtist[]}
                  loading={loading}
                  queueId={`search.${nanoid()}`}
                />
              </section>
            )
          )}
          {loading ? (
            <></>
          ) : (
            artists &&
            artists?.length > 0 && (
              <section>
                {loading ? (
                  <Skeleton className="h-7 w-[150px] mb-4" />
                ) : (
                  <h2 className="text-2xl mb-1">
                    {t("artist", { count: 10 })}
                  </h2>
                )}
                <div className={cn("grid grid-cols-6 gap-5", className)}>
                  {loading
                    ? Array.from({ length: 10 }).map((_, i) => {
                        return <ArtistCardSkeleton key={i} />;
                      })
                    : artists?.map((artist) => {
                        return <ArtistCard key={artist.id} artist={artist} />;
                      })}
                </div>
              </section>
            )
          )}
          {loading ? (
            <></>
          ) : (
            albums &&
            albums?.length > 0 && (
              <section>
                {loading ? (
                  <Skeleton className="h-7 w-[150px] mb-4" />
                ) : (
                  <h2 className="text-2xl mb-1">{t("album", { count: 10 })}</h2>
                )}

                <div className={cn("grid grid-cols-6 gap-5", className)}>
                  {loading
                    ? Array.from({ length: 10 }).map((_, i) => {
                        return <AlbumCardSkeleton key={i} />;
                      })
                    : albums?.map((album) => {
                        return (
                          <AlbumCard
                            key={album.id}
                            album={album}
                            artist={album.artist}
                            songs={album.songs}
                          />
                        );
                      })}
                </div>
              </section>
            )
          )}
        </>
      )}
    </div>
  );
}
