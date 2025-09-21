import { cn } from "@/lib/utils";
import { SearchIcon } from "lucide-react";
import React from "react";

interface Props {
    className?: string;
}

export default function SearchNothingFound({ className }: Props) {
    return (
        <div
            className={cn(
                "h-full text-typography-gray flex flex-col items-center justify-center",
                className
            )}
        >
            <SearchIcon
                className="text-typography-gray opacity-40"
                size={100}
                strokeWidth={1.5}
            />
            <p className="opacity-50 text-xl">Nothing found</p>
        </div>
    );
}
