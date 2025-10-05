import { Logo } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import { useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
    title: "Not Found - Melodify",
};

export default function NotFound() {
    const t = useTranslations();

    return (
        <div className="flex items-center justify-center min-h-dvh">
            <div className="text-center">
                <Logo className="fill-green-500 w-20 mx-auto mb-10" />
                <h1 className="text-5xl mb-5">{t("NotFoundPage.title")}</h1>
                <p className="text-typography-gray">
                    {t("NotFoundPage.description")}
                    
                </p>
                <Button className="text-lg h-12 px-10 mt-8" asChild>
                    <Link href={"/"}>{t("HomePage.pageTitle")}</Link>
                </Button>
            </div>
        </div>
    );
}
