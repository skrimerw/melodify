import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin({
    requestConfig: "./i18n/request.ts",
    experimental: {
        createMessagesDeclaration: "./i18n/messages/en.json",
    },
});

const nextConfig: NextConfig = {
    /* config options here */
    outputFileTracingIncludes: {
        "/**/*": ["./email-templates/**"],
    },
    experimental: {
        serverComponentsHmrCache: true,
    },
};

export default withNextIntl(nextConfig);
