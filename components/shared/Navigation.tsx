import React from "react";
import NavLink from "./NavLink";
import { HiHome } from "react-icons/hi";
import { IoSearch } from "react-icons/io5";
import BoxWrapper from "./BoxWrapper";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

interface Props {
    className?: string;
}

export default function Navigation({ className }: Props) {
    const t = useTranslations("Navigation");

    return (
        <BoxWrapper className={cn("px-2", className)}>
            <nav className="flex flex-col gap-1">
                <NavLink href="/">
                    <HiHome size={24} />
                    {t("home")}
                </NavLink>
                <NavLink href="/search">
                    <IoSearch size={24} />
                    {t("search")}
                </NavLink>
            </nav>
        </BoxWrapper>
    );
}
