import { Metadata } from "next";
import React from "react";
import SignInForm from "@/components/shared/SignInForm";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations()
    return {
        title: `${t("LoginPage.pageTitle")} - Melodify`,
    };
}

export default function LoginPage() {
    return (
        <div className="max-w-[600px] w-full rounded-lg bg-card h-fit">
            <SignInForm />
        </div>
    );
}
