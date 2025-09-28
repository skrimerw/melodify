import { Search } from "@/components/shared";
import { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import React from "react";

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations()
    return {
        title: `${t("SearchPage.pageTitle")} - Melodify`,
    };
}

export default function SearchPage() {
    const t = useTranslations("SearchPage")
    return (
        <div className="flex flex-col h-full">
            <h1 className="overlayed-heading text-3xl font-semibold mb-5">{t("title")}</h1>
            <Search className="h-full" />
        </div>
    );
}
