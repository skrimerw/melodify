import { auth } from "@/auth";
import { FormProfile } from "@/components/shared";
import ScrollTop from "@/components/shared/ScrollTop";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";
import React from "react";

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations();
    return {
        title: `${t("ProfilePage.pageTitle")} - Melodify`,
    };
}
export default async function ProfilePage() {
    const session = await auth();

    if (!session?.user) {
        redirect("/");
    }

    return (
        <div>
            <ScrollTop />
            <FormProfile data={session.user} />
        </div>
    );
}
