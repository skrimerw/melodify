import React from "react";
import BoxWrapper from "./BoxWrapper";
import { TbPlaylist } from "react-icons/tb";
import { Plus } from "lucide-react";
import LibraryItem from "./LibraryItem";
import { cn } from "@/lib/utils";

interface Props {
    className?: string;
}

export default function Library({ className }: Props) {
    return (
        <BoxWrapper className={cn("h-full p-0", className)}>
            <header className="sticky top-0 z-20 bg-card flex items-center justify-between text-typography-gray px-6 py-5 library-header-shadow">
                <h3 className="flex gap-3 items-centery">
                    <TbPlaylist size={24} />
                    Your Library
                </h3>
                <button className="cursor-pointer transition-all hover:scale-[1.2]">
                    <Plus size={20} />
                </button>
            </header>
            <div className="flex flex-col gap-6 px-6 pb-5 pt-0.5">
                <LibraryItem
                    songTitle="Estatic"
                    authorName="Corinne"
                    albumCoverUrl="./assets/album-cover.webp"
                />
                <LibraryItem
                    songTitle="Estatic"
                    authorName="Corinne"
                    albumCoverUrl="./assets/album-cover.webp"
                />
                <LibraryItem
                    songTitle="Estatic"
                    authorName="Corinne"
                    albumCoverUrl="./assets/album-cover.webp"
                />
                <LibraryItem
                    songTitle="Estatic"
                    authorName="Corinne"
                    albumCoverUrl="./assets/album-cover.webp"
                />
                <LibraryItem
                    songTitle="Estatic"
                    authorName="Corinne"
                    albumCoverUrl="./assets/album-cover.webp"
                />
                <LibraryItem
                    songTitle="Estatic"
                    authorName="Corinne"
                    albumCoverUrl="./assets/album-cover.webp"
                />
                <LibraryItem
                    songTitle="Estatic"
                    authorName="Corinne"
                    albumCoverUrl="./assets/album-cover.webp"
                />
                
            </div>
        </BoxWrapper>
    );
}
