// Custom next/image loader — required because this site is fully static
// (output: "export" in next.config.js has no Node server to run Next's
// built-in Image Optimization API). All photography is served straight
// from Unsplash's own CDN, which already supports on-the-fly resizing,
// quality, and automatic modern-format (WebP/AVIF) negotiation via query
// params — so this loader just asks Unsplash for the exact width/quality
// next/image wants for each breakpoint, giving us real responsive,
// next-gen-format images without needing a server. Local/static assets
// are returned untouched since they're already pre-sized.
//
// Plain .js (not .ts) on purpose: next.config.js's `images.loaderFile`
// is documented and most broadly supported as a plain JS file, since it
// gets bundled into both the server and client output.
module.exports = function imageLoader({ src, width, quality }) {
  if (!src.startsWith("http")) {
    return src;
  }
  try {
    const url = new URL(src);
    url.searchParams.set("w", String(width));
    url.searchParams.set("q", String(quality || 75));
    if (!url.searchParams.has("auto")) url.searchParams.set("auto", "format");
    if (!url.searchParams.has("fit")) url.searchParams.set("fit", "crop");
    return url.toString();
  } catch (e) {
    return src;
  }
};
