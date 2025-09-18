import { cn } from "@/lib/utils";
import { Artist } from "@prisma/client";
import Link from "next/link";
import React from "react";

interface Props {
  artist: Artist;
  className?: string;
}

export default function ArtistCard({
  artist: { id, heroImageUrl, name },
  className,
}: Props) {
  return (
    <Link href={`/artist/${id}`}>
      <div className={cn("flex flex-col gap-4 items-center", className)}>
        <div className="rounded-full aspect-square w-full overflow-hidden">
          <img
            className="size-full object-cover"
            src={heroImageUrl}
            alt={name}
          />
        </div>
        <p className="hover:underline">{name}</p>
      </div>
    </Link>
  );
}
