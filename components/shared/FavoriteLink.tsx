import { HeartIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";

interface Props {
    className?: string;
}

export default function FavoriteLink({ className }: Props) {
    const t = useTranslations("FavoriteLink");

    return (
        <div className={className}>
            <h2 className="overlayed-heading text-3xl font-semibold mb-5">
                {t("title")}
            </h2>
            <Link
                href="/favorite"
                className="flex rounded-sm items-center gap-5 overflow-hidden bg-typography-gray/20 max-w-[300px]"
            >
                <div className="flex items-center justify-center bg-gradient-to-br from-20% to-100%  from-[#4100f4] to-[#c1ecd8] size-[65px]">
                    <HeartIcon fill="white" size={28} />
                </div>
                <span className="font-medium text-base mb-0.5">
                    {t("description")}</span>
            </Link>
        </div>
    );
}
