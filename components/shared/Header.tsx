import React from "react";
import HeaderContent from "./HeaderContent";
import { auth } from "@/auth";

export default async function Header() {
    const session = await auth();

    return (
        <header className="sticky top-0 z-1">
            <HeaderContent session={session} />
        </header>
    );
}
