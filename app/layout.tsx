import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SavedHabitsProvider } from "@/lib/context/SavedHabitsContext";
import { Analytics } from "@vercel/analytics/react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Routine - Habit Tracker",
  description: "Improve quality of life by building good habits",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Routine - Habit Tracker",
    description: "Improve quality of life by building good habits",
    url: "https://routinehabits.vercel.app",
    siteName: "Routine",
    images: [
      {
        url: "https://routinehabits.vercel.app/og-image.jpg",
        alt: "Routine Habit Tracker",
      },
    ],
    type: "website",
  },
  twitter: {
    title: "Routine - Habit Tracker",
    description: "Improve quality of life by building good habits",
    images: ["https://routinehabits.vercel.app/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <SavedHabitsProvider>
            <div className="mx-auto sm:mx-16 md:mx-32 lg:mx-48 xl:mx-96">
              {children}
            </div>
          </SavedHabitsProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
