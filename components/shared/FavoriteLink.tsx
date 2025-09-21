import { HeartIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

interface Props {
    className?: string;
}

export default function FavoriteLink({ className }: Props) {
    return (
        <div className={className}>
            <h2 className="text-3xl font-semibold mb-5">Welcome Back</h2>
            <Link
                href="/favorite"
                className="flex rounded-sm items-center gap-5 overflow-hidden bg-typography-gray/20 max-w-[300px]"
            >
                <div className="flex items-center justify-center bg-gradient-to-br from-20% to-100%  from-[#4100f4] to-[#c1ecd8] size-[65px]">
                    <HeartIcon fill="white" size={28} />
                </div>
                <span className="font-medium text-base mb-0.5">
                    Liked Songs
                </span>
            </Link>
        </div>
    );
}
