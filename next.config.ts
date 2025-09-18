import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    outputFileTracingIncludes: {
        "/**/*": ["./email-templates/**"],
    },
    experimental: {
        serverComponentsHmrCache: true,
    },
};

export default nextConfig;
