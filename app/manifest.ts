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
        src: "favicon.ico",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "favicon.ico",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
