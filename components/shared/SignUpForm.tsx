"use client";

import Link from "next/link";
import React, { useState } from "react";
import { FaGithub } from "react-icons/fa6";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import Logo from "./Logo";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "./form/FormInput";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { CircleAlert } from "lucide-react";
import signUp from "@/actions/sign-up";

const SignUpSchema = z.object({
    email: z
        .string()
        .trim()
        .nonempty("Please fill in your email")
        .email("Please enter a valid email (e.g. example@test.com)"),
    username: z.string().trim().nonempty("Please fill in your username"),
    password: z.string().nonempty("Please fill in your password"),
});

type SignUpForm = z.infer<typeof SignUpSchema>;

export default function SignUpForm() {
    const form = useForm<SignUpForm>({
        resolver: zodResolver(SignUpSchema),
    });
    const [loading, setLoading] = useState(false);
    const [signupError, setSignupError] = useState("");
    const router = useRouter();

    const onSubmit: SubmitHandler<SignUpForm> = async (data) => {
        setLoading(true);

        try {
            await signUp(data);

            setSignupError("");

            router.push("/verify-email");
        } catch (e) {
            if (e instanceof Error) {
                console.log(e.message);
                setSignupError(e.message);
            }

            setLoading(false);
            //console.error(e);
        }
    };

    async function loginWithGithub() {
        setLoading(true);

        await signIn("github", {
            redirectTo: "/",
        });
    }

    return (
        <>
            <h1 className="text-center text-[34px] font-bold mb-10">
                Sign up to Melodify
            </h1>
            <FormProvider {...form}>
                <form
                    className="flex flex-col gap-5 max-w-[300px] mx-auto"
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    {signupError && (
                        <p className="flex gap-4 items-center bg-red-500 px-4 py-3 rounded-sm">
                            <CircleAlert />
                            {signupError}
                        </p>
                    )}
                    <FormInput
                        label="Email"
                        placeholder="Enter your email"
                        name="email"
                        type="email"
                        autoComplete="email"
                    />
                    <FormInput
                        label="Username"
                        placeholder="Enter your username"
                        name="username"
                        autoComplete="username"
                    />
                    <FormInput
                        label="Password"
                        placeholder="Enter your password"
                        name="password"
                        type="password"
                        autoComplete="new-password"
                    />
                    <Button
                        disabled={loading}
                        className="bg-btn-primary hover:bg-btn-primary/80"
                    >
                        Sign up
                    </Button>
                </form>
            </FormProvider>
            <div className="relative my-4 flex items-center h-10">
                <span className="absolute top-1.5 -translate-x-1/2 left-1/2 text-typography-gray mb-1 bg-card px-2 inline-block">
                    or
                </span>
                <Separator />
            </div>
            <div className="max-w-[300px] mx-auto">
                <Button
                    disabled={loading}
                    variant={"outline"}
                    className="!bg-card w-full h-fit hover:!border-foreground"
                    onClick={loginWithGithub}
                >
                    <FaGithub className="!size-6" />
                    Sign up with Github
                </Button>
            </div>

            <div className="max-w-[300px] mx-auto text-typography-gray font-medium text-center mt-6">
                Already have an accout?{" "}
                <Link className="hover:text-foreground underline" href="/login">
                    Log in
                </Link>
            </div>
        </>
    );
}
