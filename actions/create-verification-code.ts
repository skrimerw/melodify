"use server";

import sendEmail from "@/lib/send-email";
import { prisma } from "@/prisma/prisma-client";
import fs from "fs";
import Handlebars from "handlebars";
import path from "path";

function generateVerificationCode(codeLength: number = 6) {
    let code = "";

    for (let i = 0; i < codeLength; i++) {
        const randInt = Math.floor(Math.random() * 10);

        code += randInt;
    }

    return code;
}

export default async function createVerificationCode(
    userId: number,
    userEmail: string
) {
    await prisma.verificationCode.deleteMany({
        where: {
            userId,
        },
    });
    
    const createCode = await prisma.verificationCode.create({
        data: {
            code: generateVerificationCode(),
            user: {
                connect: { id: userId },
            },
        },
    });

    const htmlTemplate = fs.readFileSync(
        path.join(process.cwd(), "email-templates/verification.hbs"),
        "utf8"
    );

    const template = Handlebars.compile(htmlTemplate);

    const resultHtml = template({ code: createCode.code });

    sendEmail(
        userEmail,
        `${createCode.code} - Your Melodify email verification code`,
        resultHtml
    );
}
