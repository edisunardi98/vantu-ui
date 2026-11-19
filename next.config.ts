import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // A package-lock.json in the home directory would otherwise be picked as the root.
  turbopack: { root: __dirname },
  // Example sources are read from disk at build time to show their code.
  outputFileTracingIncludes: { "/**": ["./src/examples/**/*", "./src/components/**/*"] },
};

export default nextConfig;
