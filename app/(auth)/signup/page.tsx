import { SignUpForm } from "@/components/shared";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Sign up - Melodify",
};

export default function SignupPage() {
    return (
        <div className="max-w-[600px] w-full rounded-lg bg-card h-fit">
            <SignUpForm />
        </div>
    );
}
