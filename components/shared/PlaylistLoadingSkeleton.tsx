import React from "react";
import { Skeleton } from "../ui/skeleton";

interface Props {
    length: number;
    className?: string;
}

export default function PlaylistLoadingSkeleton({ length }: Props) {
    return (
        <div className="flex flex-col gap-4">
            {Array.from({ length }).map((_, i) => {
                return <SongSkeleton key={i} />;
            })}
        </div>
    );
}

function SongSkeleton() {
    return (
        <div className="flex items-center justify-between">
            <div className="flex gap-2 items-center">
                <Skeleton className="size-[55px]" />
                <div>
                    <Skeleton className="h-3 w-20" />
                    <Skeleton className="h-3 w-30 mt-2" />
                </div>
            </div>
            <Skeleton className="h-5 w-10 ml-auto mr-5" />
            <Skeleton className="size-5.5" />
        </div>
    );
}
