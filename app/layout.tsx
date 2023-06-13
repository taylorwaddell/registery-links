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
        <footer className="flex justify-center border-t border-zinc-700 w-full text-center p-4 text-zinc-500 dark:text-zinc-500 text-sm md:text-base">
          <p>
            made with ♥ by{" "}
            <Link
              className="hover:underline"
              href="https://twadd.dev"
              target="_blank"
            >
              twadd
            </Link>
          </p>
          <span className="px-5">|</span>
          <Countdown targetDate="2023-11-10" />
        </footer>
      </body>
    </html>
  );
}
