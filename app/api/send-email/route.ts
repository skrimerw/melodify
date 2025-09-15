import sendEmail from "@/lib/send-email";
import fs from "fs";
import { NextResponse } from "next/server";
import Handlebars from "handlebars";
import path from "path";
import { formatToMinutes, getSongDuration } from "@/lib/utils";

/* export async function POST() {
    const htmlTemplate = fs.readFileSync(
        path.join(process.cwd(), "email-templates/verification.hbs"),
        "utf8"
    );

    const template = Handlebars.compile(htmlTemplate);

    const resultHtml = template({ code: "123456" });

     sendEmail(
        "skrimerw@gmail.com",
        `123456 - Your Melodify email verification code`,
        resultHtml
    );

    return NextResponse.json({});
} */

export async function GET() {
    const dur = formatToMinutes(await getSongDuration("./public/audio/my-love.mp3"));

    return NextResponse.json({dur})
}
