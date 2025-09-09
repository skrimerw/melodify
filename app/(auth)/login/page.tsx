import { Metadata } from "next";
import React from "react";
import SignInForm from "@/components/shared/SignInForm";

export const metadata: Metadata = {
    title: "Log in - Melodify",
};

export default function LoginPage() {
    return (
        <div className="max-w-[600px] w-full rounded-lg bg-card h-fit">
            <SignInForm />
        </div>
    );
}
