import { Geist } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import localFont from "next/font/local";

const YSFont = localFont({
  src: "./fonts/text-variable-full.woff2",
  variable: "--font-ys",
});

const YSHeadlineFont = localFont({
  src: "./fonts/YSMusic-HeadlineBold.woff2",
  variable: "--font-ys-headline",
  weight: "700",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${YSFont.variable} ${YSHeadlineFont.variable} antialiased dark grid`}
      >
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
