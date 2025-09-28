"use client";

import React, { useState } from "react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { Button } from "../ui/button";
import verifyEmail from "@/actions/verify-email";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { CircleAlert } from "lucide-react";
import { useTranslations } from "next-intl";

interface Props {
    pushOnSuccessUrl?: string;
    className?: string;
}

export default function VerificationCode({
    pushOnSuccessUrl = "/",
    className,
}: Props) {
    const [code, setCode] = useState("");
    const [verificationError, setVerificationError] = useState("");
    const router = useRouter();
    const t = useTranslations();

    async function handleConfirm() {
        try {
            await verifyEmail(code);

            setVerificationError("");
            toast.success("Email verified!");

            router.push(pushOnSuccessUrl);
        } catch (e) {
            if (e instanceof Error) {
                setVerificationError(e.message);
            }

            //console.error(e);
        }
    }

    return (
        <div className={className}>
            <div className="mb-10 text-center">
                <h1 className="text-[34px] font-bold leading-tight mb-3">
                    {t("VerificationCode.title")}
                </h1>
                <p className="text-typography-gray font-normal">
                    {t("VerificationCode.description")}
                </p>
            </div>
            <form className="flex flex-col gap-5 max-w-[300px] mx-auto">
                {verificationError && (
                    <p className="flex gap-4 items-center bg-red-500 px-4 py-3 rounded-sm">
                        <CircleAlert />
                        {verificationError}
                    </p>
                )}
                <InputOTP
                    maxLength={6}
                    pattern={REGEXP_ONLY_DIGITS}
                    inputMode="numeric"
                    onChange={(e) => setCode(e)}
                >
                    <InputOTPGroup className="mx-auto justify-between w-full">
                        <InputOTPSlot index={0} className="!bg-card" />
                        <InputOTPSlot index={1} className="!bg-card" />
                        <InputOTPSlot index={2} className="!bg-card" />
                        <InputOTPSlot index={3} className="!bg-card" />
                        <InputOTPSlot index={4} className="!bg-card" />
                        <InputOTPSlot index={5} className="!bg-card" />
                    </InputOTPGroup>
                </InputOTP>
                <Button
                    disabled={code.length !== 6}
                    className="bg-btn-primary hover:bg-btn-primary/85 mt-3"
                    onClick={(e) => {
                        e.preventDefault();
                        handleConfirm();
                    }}
                >
                    {t("common.Confirm")}
                </Button>
            </form>
        </div>
    );
}
