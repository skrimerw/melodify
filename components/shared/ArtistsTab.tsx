import { SearchResult } from "@/types";
import React from "react";
import ArtistCard from "./ArtistCard";
import { cn } from "@/lib/utils";
import ArtistCardSkeleton from "./ArtistCardSkeleton";
import SearchNothingFound from "./SearchNothingFound";

interface Props {
    loading: boolean;
    artists: SearchResult["artists"];
    className?: string;
}

const ArtistsTab = React.memo(({ loading, artists, className }: Props) => {
    return (
        <>
            {artists?.length === 0 ? (
                <SearchNothingFound />
            ) : (
                <div className={cn("grid grid-cols-6 gap-5", className)}>
                    {loading
                        ? Array.from({ length: 10 }).map((_, i) => {
                              return <ArtistCardSkeleton key={i} />;
                          })
                        : artists?.map((artist) => {
                              return (
                                  <ArtistCard key={artist.id} artist={artist} />
                              );
                          })}
                </div>
            )}
        </>
    );
});

export default ArtistsTab;
