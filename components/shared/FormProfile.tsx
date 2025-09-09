"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import z from "zod";
import FormInput from "./form/FormInput";
import { Button } from "../ui/button";
import { Session } from "next-auth";
import updateUserInfo from "@/actions/update-user-info";
import toast from "react-hot-toast";
import VerificationDialog from "./VerificationDialog";
import { BiSolidCheckCircle, BiSolidLock } from "react-icons/bi";
import { RiErrorWarningFill } from "react-icons/ri";
import { useRouter } from "next/navigation";

const UpdateProfileSchema = z.object({
    email: z
        .string()
        .trim()
        .nonempty("Please fill in your email")
        .email("Please enter a valid email"),
    username: z.string().trim().nonempty("Please fill in your username"),
    password: z.string(),
});

type UpdateProfile = z.infer<typeof UpdateProfileSchema>;

interface Props {
    data: Session["user"];
}

export default function FormProfile({ data }: Props) {
    const form = useForm({
        resolver: zodResolver(UpdateProfileSchema),
        defaultValues: {
            email: data.email,
            username: data.username,
        },
    });
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const onSubmit: SubmitHandler<UpdateProfile> = async (
        data: UpdateProfile
    ) => {
        try {
            setLoading(true);

            await updateUserInfo(data);

            toast.success("Data successfully updated");

            router.push("/profile");
        } catch (e) {
            console.error(e);
            toast.success("Couldn't update data");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <h1 className="text-4xl font-bold mb-6 mt-2">Profile Info</h1>
            <FormProvider {...form}>
                <form
                    className="max-w-[400px] flex flex-col gap-3"
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    {!data.isVerified && <VerificationDialog />}
                    <div className="relative">
                        {data.isVerified && (
                            <div className="flex gap-1.5 items-center absolute right-0 text-typography-gray text-sm">
                                <BiSolidCheckCircle
                                    size={18}
                                    className="text-green-400"
                                />
                                <span className="inline-block mb-1 font-normal">
                                    your email is verified
                                    {/* <span className="border-b border-dashed border-typography-gray font-normal cursor-pointer hover:text-foreground hover:border-foreground"></span> */}
                                </span>
                            </div>
                        )}
                        <FormInput
                            label="Email"
                            name="email"
                            placeholder="Enter your email"
                            type="email"
                            autoComplete="email"
                        />
                    </div>
                    <FormInput
                        label="Username"
                        name="username"
                        placeholder="Enter your username"
                        autoComplete="username"
                    />
                    <div className="relative">
                        {!data.isVerified && (
                            <div className="flex gap-1.5 items-center absolute right-0 text-typography-gray text-sm">
                                <RiErrorWarningFill
                                    size={18}
                                    className="text-yellow-400"
                                />
                                <span className="inline-block mb-1 font-normal">
                                    verify your email to change password
                                    {/* <span className="border-b border-dashed border-typography-gray font-normal cursor-pointer hover:text-foreground hover:border-foreground"></span> */}
                                </span>
                            </div>
                        )}
                        <FormInput
                            label="Password"
                            name="password"
                            placeholder="Enter your new password"
                            type="password"
                            autoComplete="new-password"
                            disabled={!data.isVerified}
                        />
                        {!data.isVerified && (
                            <BiSolidLock className="absolute right-2 top-[42px] text-typography-gray size-5 opacity-50" />
                        )}
                    </div>
                    <Button
                        disabled={loading}
                        className="w-full bg-btn-primary hover:bg-btn-primary/85"
                    >
                        Update Info
                    </Button>
                </form>
            </FormProvider>
        </>
    );
}
