import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "../..");

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  outputFileTracingRoot: repoRoot,
  typedRoutes: true,
  experimental: {
    devtoolSegmentExplorer: false
  }
};

export default nextConfig;
