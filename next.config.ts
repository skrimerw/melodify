import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    outputFileTracingIncludes: {
        "/email-templates": ["./**/*"],
    },
};

export default nextConfig;
