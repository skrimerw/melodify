"use client";

import React from "react";
import { Button } from "../ui/button";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function HistoryBack() {
    const router = useRouter();

    return (
        <Button
            variant="secondary"
            className="text-3xl bg-background size-7.5"
            onClick={router.back}
            
        >
            <ChevronLeft className="!size-5.5 mr-0.5" />
        </Button>
    );
}
