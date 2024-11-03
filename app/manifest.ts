// Source: https://nextjs.org/docs/app/building-your-application/configuring/progressive-web-apps

import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Routine - Habit Tracker",
    short_name: "Routine",
    description: "Improve quality of life by building good habits",
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#000000",
    icons: [
      {
        src: "icons/icon-92.png",
        sizes: "92x92",
        type: "image/png",
      },
      {
        src: "icons/icon-192-maskable.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "icons/icon-196.png",
        sizes: "196x196",
        type: "image/png",
      },
      {
        src: "icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "icons/icon-512-maskable.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "icons/icon-1024.png",
        sizes: "1024x1024",
        type: "image/png",
      },
    ],
  };
}
