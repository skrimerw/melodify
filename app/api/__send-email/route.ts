import sendEmail from "@/lib/send-email";
import fs from "fs";
import { NextResponse } from "next/server";
import Handlebars from "handlebars";
import path from "path";

export async function POST() {
    const htmlTemplate = fs.readFileSync(
        path.join(process.cwd(), "/email-templates/verification.handlebars"),
        "utf8"
    );

    const template = Handlebars.compile(htmlTemplate);

    const resultHtml = template({ code: "123456" });

    /*  sendEmail(
        "skrimerw@gmail.com",
        `123456 - Your Melodify email verification code`,
        resultHtml
    ); */

    return NextResponse.json({});
}
