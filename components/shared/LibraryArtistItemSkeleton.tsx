import React from "react";
import { Skeleton } from "../ui/skeleton";

export default function LibraryArtistItemSkeleton() {
    return (
        <div className="group flex items-center gap-3 text-sm cursor-default">
            <div className="relative h-[50px] w-[50px] rounded-full overflow-hidden flex-none">
                <Skeleton className="size-full" />
            </div>
            <div className="flex flex-col gap-2 w-full">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
            </div>
        </div>
    );
}
