import { Geist } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${geistSans.variable} antialiased dark grid`}>
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
            </body>
        </html>
    );
}
