import { SITE_NAME } from "@/lib/site";

// Served automatically at /manifest.webmanifest via Next.js's file
// convention — no explicit <link rel="manifest"> needed in layout.js.
export default function manifest() {
  return {
    name: `${SITE_NAME} | Western Steakhouse & Wine Bar`,
    short_name: SITE_NAME,
    description:
      "Mr Bob Bar and Grill serves hand-cut steaks, pork ribs, and tomahawk chops alongside a curated wine list, with live music every Monday, Wednesday, and Saturday.",
    start_url: "/",
    display: "standalone",
    background_color: "#0A0A0A",
    theme_color: "#0A0A0A",
    // No icons array here — app/icon.png (Next.js's file convention) already
    // covers the browser-tab favicon; a manifest icons array is for PWA
    // "Add to Home Screen" and expects specific pre-sized square PNGs
    // (typically 192x192 and 512x512), which the current logo asset isn't.
  };
}
