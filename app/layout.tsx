import "./globals.css";

import { Inter } from "next/font/google";

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
        <footer className="border-t border-zinc-700 w-full text-center p-4 text-zinc-500 dark:text-zinc-500">
          <p>
            made with ♥ by <a className="hover:underline" href="https://twadd.dev" target="_blank">twadd</a>
          </p>
        </footer>
      </body>
    </html>
  );
}
