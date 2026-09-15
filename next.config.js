/** @type {import('next').NextConfig} */
const nextConfig = {
  // No longer a static export. Every page's content now lives in Postgres
  // and is edited from /admin, so the site needs a live Node server to
  // render fresh data and run the admin API routes — `output: "export"`
  // (which produced a build-time-only /out folder) is incompatible with
  // that and has been removed. Deploy to Vercel or any Node-capable host
  // instead of a static host. See README.md.
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    loader: "custom",
    loaderFile: "./lib/imageLoader.js",
  },
};

module.exports = nextConfig;
