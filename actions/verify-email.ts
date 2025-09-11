"use server";

import { prisma } from "@/prisma/prisma-client";

export default async function verifyEmail(code: string) {
    try {
        const findCode = await prisma.verificationCode.findFirst({
            where: {
                code,
            },
        });

        if (!findCode) {
            throw new Error("Wrong code");
        }

        //if (!findCode.createdAt) {}

        const updateUser = await prisma.user.update({
            where: {
                id: findCode.userId,
            },
            data: {
                isVerified: true,
            },
        });

        await prisma.verificationCode.deleteMany({
            where: {
                userId: updateUser.id,
            },
        });
    } catch (e) {
        console.log("Error [VERIFY_EMAIL]");

        throw e;
    }
}
