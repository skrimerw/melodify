"use server";

import { auth, unstable_update } from "@/auth";
import { prisma } from "@/prisma/prisma-client";
import { Prisma } from "@prisma/client";
import bcrypt from "bcrypt";

export default async function updateUserInfo(body: Prisma.UserUpdateInput) {
    try {
        const session = await auth();

        const findUser = await prisma.user.findFirst({
            where: {
                id: session?.user.id,
            },
        });

        const isVerified =
            body.email === findUser?.email ? findUser?.isVerified : false;

        await prisma.user.update({
            where: {
                id: session?.user.id,
            },
            data: {
                email: body.email,
                username: body.username,
                isVerified,
                password: body.password
                    ? bcrypt.hashSync(body.password as string, 10)
                    : findUser?.password,
            },
        });

        await unstable_update({
            user: {
                email: body.email as string,
                username: body.username as string,
                isVerified,
            },
        });
    } catch (e) {
        console.log("Error [UPDATE_USER]");

        throw e;
    }
}
