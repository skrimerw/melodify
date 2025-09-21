import { SearchResult } from "@/types";
import React from "react";
import { AlbumCard } from "./AlbumCard";
import { cn } from "@/lib/utils";
import AlbumCardSkeleton from "./AlbumCardSkeleton";
import SearchNothingFound from "./SearchNothingFound";

interface Props {
    loading: boolean;
    albums: SearchResult["albums"];
    className?: string;
}

export default function AlbumsTab({ albums, loading, className }: Props) {
    return (
        <>
            {albums?.length === 0 ? (
                <SearchNothingFound />
            ) : (
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
            )}
        </>
    );
}
