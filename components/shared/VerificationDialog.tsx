"use client";

import { cn } from "@/lib/utils";
import React from "react";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { RiErrorWarningFill } from "react-icons/ri";
import { ChevronRight } from "lucide-react";
import VerificationCode from "./VerificationCode";
import createVerificationCode from "@/actions/create-verification-code";
import { useSession } from "next-auth/react";

interface Props {
    className?: string;
}

export default function VerificationDialog({ className }: Props) {
    const { data } = useSession();

    async function handleConfirm() {
        if (!data?.user) return;

        try {
            await createVerificationCode(data?.user.id, data?.user.email);
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    type="button"
                    variant={"secondary"}
                    className={cn("w-full font-medium mb-3", className)}
                    onClick={handleConfirm}
                >
                    <RiErrorWarningFill className="!size-5 text-yellow-400" />
                    Verify your email
                    <ChevronRight className="ml-auto !size-4.5" />
                </Button>
            </DialogTrigger>
            <DialogContent className="bg-card">
                <DialogTitle />
                <VerificationCode className="mt-5" pushOnSuccessUrl="/profile" />
                {/* <Button variant={"outline"} className="w-fit mx-auto text-sm h-7 px-3">Send new code</Button> */}
            </DialogContent>
        </Dialog>
    );
}
