"use client";

import Countdown from "@/public/Components/Countdown";
import { FormEvent } from "react";
import Link from "next/link";

export default function Home() {
  function getThing(e: FormEvent): void {
    e.preventDefault();
    return;
  }

  return (
    <>
      <main className="flex-grow mx-auto mt-6 mb-12 w-10/12 sm:w-5/6 lg:w-3/4 xl:w-1/2">
        Welcome to Wedding Info!
        <form
          className="flex gap-1"
          action="submit"
          method="get"
          onSubmit={(e) => getThing(e)}
        >
          <input
            className="rounded-md border shadow-sm px-4 py-1 dark:text-zinc-900 text-zinc-200 bg-zinc-700 dark:bg-zinc-200 sm:mt-0 sm:w-auto sm:text-sm"
            type="text"
            placeholder="Search for a wedding..."
          />
          <button
            className="rounded-md border shadow-sm px-4 py-1 dark:text-zinc-900 text-zinc-200 hover:text-zinc-200 bg-zinc-700 dark:bg-zinc-200 hover:bg-zinc-800 sm:mt-0 sm:w-auto sm:text-sm"
            type="submit"
          >
            Search
          </button>
        </form>
      </main>
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
      </footer>
    </>
  );
}
