import { auth } from "@/auth";
import { FormProfile } from "@/components/shared";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import React from "react";

export const metadata: Metadata = {
    title: "Profile - Melodify",
};

export default async function ProfilePage() {
    const session = await auth();

    if (!session?.user) {
        redirect("/");
    }

    return (
        <div>
            <FormProfile data={session.user} />
        </div>
    );
}
