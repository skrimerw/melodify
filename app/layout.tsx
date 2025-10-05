import "./globals.css";
import "overlayscrollbars/overlayscrollbars.css";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import localFont from "next/font/local";
import { NextIntlClientProvider } from "next-intl";
import { getLocale } from "next-intl/server";

const YSFont = localFont({
    src: "./fonts/text-variable-full.woff2",
    variable: "--font-ys",
});

const YSHeadlineFont = localFont({
    src: "./fonts/YSMusic-HeadlineBold.woff2",
    variable: "--font-ys-headline",
    weight: "700",
});

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const locale = await getLocale();

    return (
        <html lang={locale}>
            <body
                className={`${YSFont.variable} ${YSHeadlineFont.variable} antialiased dark grid`}
            >
                <NextIntlClientProvider>
                    <SessionProvider>
                        <Toaster
                            toastOptions={{
                                style: {
                                    backgroundColor: "var(--card)",
                                    color: "var(--foreground)",
                                },
                                iconTheme: {
                                    primary: "",
                                    secondary: "var(--card)",
                                },
                                duration: 2000,
                            }}
                        />
                        {children}
                    </SessionProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
