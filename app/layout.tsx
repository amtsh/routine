import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SavedHabitsProvider } from "@/lib/context/SavedHabitsContext";

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
      </body>
    </html>
  );
}
