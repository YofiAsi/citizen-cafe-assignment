import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // TypeScript 7 (native `tsgo` line, pinned per plan 2a) does not expose the
    // legacy compiler API Next.js uses for its default type-check. This flag
    // makes Next run the TypeScript CLI instead, which supports TS 7.
    useTypeScriptCli: true,
  },
};

export default nextConfig;
