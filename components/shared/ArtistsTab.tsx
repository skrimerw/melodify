import { SearchResult } from "@/types";
import React from "react";
import ArtistCard from "./ArtistCard";
import { cn } from "@/lib/utils";
import ArtistCardSkeleton from "./ArtistCardSkeleton";

interface Props {
  loading: boolean;
  artists: SearchResult["artists"];
  className?: string;
}

export default function ArtistsTab({ loading, artists, className }: Props) {
  return (
    <div className={cn("grid grid-cols-6 gap-5", className)}>
      {loading
        ? Array.from({ length: 10 }).map((_, i) => {
            return <ArtistCardSkeleton key={i} />;
          })
        : artists?.map((artist) => {
            return <ArtistCard key={artist.id} artist={artist} />;
          })}
    </div>
  );
}
