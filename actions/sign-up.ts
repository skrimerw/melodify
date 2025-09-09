"use server";

import { prisma } from "@/prisma/prisma-client";
import { Prisma } from "@prisma/client";
import z, { ZodError } from "zod";
import bcrypt from "bcrypt";
import { signIn } from "@/auth";
import createVerificationCode from "./create-verification-code";

const SignUpSchema = z.object({
    email: z
        .string()
        .trim()
        .nonempty("Please fill in your email")
        .email("Please enter a valid email (e.g. example@test.com)"),
    username: z.string().trim().nonempty("Please fill in your username"),
    password: z.string().nonempty("Please fill in your password"),
});

export default async function signUp(body: Prisma.UserCreateInput) {
    try {
        const result = SignUpSchema.safeParse(body);

        if (!result.success) {
            throw new ZodError(result.error.issues);
        }

        const findUser = await prisma.user.findFirst({
            where: {
                email: body.email,
            },
        });

        if (findUser) {
            throw new Error("User with this email already exists");
        }

        const createUser = await prisma.user.create({
            data: {
                email: body.email,
                username: body.username,
                password: bcrypt.hashSync(body.password, 10),
            },
        });

        await createVerificationCode(createUser.id, createUser.email);

        await signIn("credentials", {
            email: body.email,
            password: body.password,
            redirect: false,
        });
    } catch (e) {
        console.log("Error [SIGNUP]");

        throw e;
    }
}
