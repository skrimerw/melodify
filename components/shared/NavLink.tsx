'use client'

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface Props {
    href: string;
    children: React.ReactNode;
    className?: string;
}

export default function NavLink({ href, children, className }: Props) {
    const pathname = usePathname()

    return (
        <Link
            href={href}
            className={cn(
                "flex items-center gap-4 py-2 px-4 rounded-md text-typography-gray font-medium transition-all hover:text-primary hover:bg-white/5",
                href === pathname && "text-primary",
                className
            )}
        >
            {children}
        </Link>
    );
}
