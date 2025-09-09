import createVerificationCode from "@/actions/create-verification-code";
import { auth } from "@/auth";
import { VerificationCode } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

export const metadata: Metadata = {
    title: "Email Verification - Melodify",
};

export default async function VerifyEmailPage() {
    const session = await auth();

    if (!session?.user || session.user.isVerified) {
        redirect("/");
    }

    try {
        await createVerificationCode(session.user.id, session.user.email);
    } catch (e) {
        console.error(e);
    }

    return (
        <>
            <VerificationCode />
            <Button
                variant={"link"}
                className="block text-typography-gray font-medium hover:text-foreground w-fit mx-auto"
            >
                <Link href={"/"}>Confirm later</Link>
            </Button>
        </>
    );
}
