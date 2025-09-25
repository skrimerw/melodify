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
import { useTranslations } from "next-intl";

export default function SignUpForm() {
  const t = useTranslations();

  const SignUpSchema = z.object({
    email: z
      .string()
      .trim()
      .nonempty(t("common.inputs.email.errorMessages.nonempty"))
      .email(t("common.inputs.email.errorMessages.email")),
    username: z
      .string()
      .trim()
      .nonempty(t("common.inputs.username.errorMessages.nonempty")),
    password: z
      .string()
      .nonempty(t("common.inputs.password.errorMessages.nonempty")),
  });

  type SignUpForm = z.infer<typeof SignUpSchema>;

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
        {t("SignupPage.title")}
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
            label={t("common.inputs.email.label")}
            placeholder={t("common.inputs.email.placeholder")}
            name="email"
            type="email"
            autoComplete="email"
          />
          <FormInput
            label={t("common.inputs.username.label")}
            placeholder={t("common.inputs.username.placeholder")}
            name="username"
            autoComplete="username"
          />
          <FormInput
            label={t("common.inputs.password.label")}
            placeholder={t("common.inputs.password.placeholder")}
            name="password"
            type="password"
            autoComplete="new-password"
          />
          <Button
            disabled={loading}
            className="bg-btn-primary hover:bg-btn-primary/80"
          >
            {t("common.Signup")}
          </Button>
        </form>
      </FormProvider>
      <div className="relative my-4 flex items-center h-10">
        <span className="absolute top-1.5 -translate-x-1/2 left-1/2 text-typography-gray mb-1 bg-card px-2 inline-block">
          {t("common.names.or")}
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
          {t("common.SigninWith", { provider: "Github" })}
        </Button>
      </div>

      <div className="max-w-[300px] mx-auto text-typography-gray font-medium text-center mt-6">
        {t("SignupPage.proposition")}{" "}
        <Link className="hover:text-foreground underline" href="/login">
          {t("common.Login")}
        </Link>
      </div>
    </>
  );
}
