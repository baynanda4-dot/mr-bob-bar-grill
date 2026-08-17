import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Cloudflare Workers has no built-in equivalent of Vercel's image
    // optimization API — unoptimized serves the original file as-is, which
    // works on every Cloudflare plan with zero extra config. Can be swapped
    // for a Cloudflare Images loader later if resizing/format conversion
    // becomes worth the setup.
    unoptimized: true,
  },
};

// Lets `next dev` resolve Cloudflare bindings (env vars, KV, etc. if added
// later) the same way they'd resolve under `wrangler dev`/production, so
// local dev and the deployed Worker don't diverge.
initOpenNextCloudflareForDev();

export default nextConfig;
