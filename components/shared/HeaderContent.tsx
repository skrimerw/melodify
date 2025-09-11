"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { FaUser } from "react-icons/fa";
import LogoutBtn from "./LogoutBtn";
import HistoryBack from "./HistoryBack";
import HistoryForward from "./HistoryForward";
import { Session } from "next-auth";

interface Props {
    className?: string;
    session: Session | null;
}

export default function HeaderContent({ className, session }: Props) {
    const [isBlury, setIsBlury] = useState(false);

    function onScroll(e: any) {
        if (e.target.scrollTop >= 20) {
            setIsBlury(true);
        } else {
            setIsBlury(false);
        }
    }

    useEffect(() => {
        document
            .querySelector(".main-container")
            ?.addEventListener("scroll", onScroll);
    }, []);

    return (
        <div className={cn("flex justify-between items-center px-6 pb-3 pt-3", className)}>
            <div className={cn("absolute -z-1 inset-0 backdrop-blur-xs bg-card/10 transition-opacity duration-300 opacity-0", isBlury && "opacity-100")}></div>
            <div className="flex gap-2">
                <HistoryBack />
                <HistoryForward />
            </div>
            {session?.user ? (
                <div>
                    <LogoutBtn />
                    <Button asChild>
                        <Link href={`/profile`} className="px-7 ml-4">
                            <FaUser />
                        </Link>
                    </Button>
                </div>
            ) : (
                <div>
                    <Button asChild variant="link" className="hover:opacity-85">
                        <Link href="/signup" className="mr-2">
                            Sign up
                        </Link>
                    </Button>
                    <Button asChild>
                        <Link href="/login" className="px-7">
                            Log in
                        </Link>
                    </Button>
                </div>
            )}
        </div>
    );
}
