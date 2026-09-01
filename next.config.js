/** @type {import('next').NextConfig} */
const nextConfig = {
  // 100% static site — no admin panel, no CMS, no database, no server-side
  // routes. `next build` emits plain HTML/CSS/JS into /out, deployable to
  // any static host (Vercel, Netlify, S3, Cloudflare Pages, GitHub Pages).
  output: "export",
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    loader: "custom",
    loaderFile: "./lib/imageLoader.js",
  },
};

module.exports = nextConfig;
