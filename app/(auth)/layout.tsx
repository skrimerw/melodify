import { Logo } from "@/components/shared";
import Link from "next/link";
import React from "react";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className="min-h-screen bg-black">
            <div className="flex justify-center py-10 bg-gradient-to-b from-white/20 to-black bg-fixed h-full">
                <div className="max-w-[600px] w-full rounded-lg bg-card p-8 h-fit">
                    <div className="max-w-[500px] mx-auto">
                        <Link href="/">
                            <Logo className="fill-foreground w-10 h-10 mx-auto mb-3" />
                        </Link>

                        {children}
                    </div>
                </div>
            </div>
        </main>
    );
}
