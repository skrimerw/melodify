import React from "react";
import { Skeleton } from "../ui/skeleton";

export default function AlbumCardSkeleton() {
  return (
    <div className="flex flex-col gap-2 p-2">
      <Skeleton className="rounded-sm aspect-square w-full" />
      <div className="flex flex-col gap-2">
        <Skeleton className="h-3 w-40" />
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-3 w-10" />
      </div>
    </div>
  );
}
