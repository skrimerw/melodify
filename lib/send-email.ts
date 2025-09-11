import nodemailer, { SendMailOptions } from "nodemailer";

export default function sendEmail(to: string, subject: string, html: string) {
    const transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "skrimerw@gmail.com",
            pass: process.env.EMAIL_APP_PASSWORD || "",
        },
    });

    const mailOptions: SendMailOptions = {
        from: '"Melodify Support" ',
        to,
        subject,
        html,
    };

    transport.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log("Error [SEND_MAIL]: " + err.message);
        } else {
            console.log("Success [SEND_MAIL]: " + info.messageId);
        }
    });
}
