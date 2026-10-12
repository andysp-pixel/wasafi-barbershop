/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/+$/, ""),
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};
export default nextConfig;
