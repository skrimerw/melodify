import React from "react";
import NavLink from "./NavLink";
import { HiHome } from "react-icons/hi";
import { IoSearch } from "react-icons/io5";
import BoxWrapper from "./BoxWrapper";
import { cn } from "@/lib/utils";

interface Props {
    className?: string;
}

export default function Navigation({ className }: Props) {
    return (
        <BoxWrapper className={cn("px-2", className)}>
            <nav className="flex flex-col gap-1">
                <NavLink href="/">
                    <HiHome size={24} />
                    Home
                </NavLink>
                <NavLink href="/search">
                    <IoSearch size={24} />
                    Search
                </NavLink>
            </nav>
        </BoxWrapper>
    );
}
