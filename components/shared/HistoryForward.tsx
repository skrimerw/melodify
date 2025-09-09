'use client'

import React from "react";
import { Button } from "../ui/button";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function HistoryForward() {
    const router = useRouter();

    return (
        <Button variant="secondary" className="text-3xl bg-background size-7.5" onClick={router.forward} >
            <ChevronRight className="!size-5.5 ml-0.5" />
        </Button>
    );
}
