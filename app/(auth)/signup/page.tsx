import { SignUpForm } from "@/components/shared";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import React from "react";

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations()
    return {
        title: `${t("SignupPage.pageTitle")} - Melodify`,
    };
}
export default function SignupPage() {
    return (
        <div className="max-w-[600px] w-full rounded-lg bg-card h-fit">
            <SignUpForm />
        </div>
    );
}
