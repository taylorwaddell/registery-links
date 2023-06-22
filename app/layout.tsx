import "./globals.css";

import Countdown from "@/public/Components/Countdown";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "TALY",
  description: "A forever bond.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`min-h-screen flex flex-col ${inter.className} bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-200`}
      >
        {children}
      </body>
    </html>
  );
}
