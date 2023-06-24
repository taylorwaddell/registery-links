"use client";

import ExternalLink from "@/public/icons/ExternalLink";
import { FormEvent } from "react";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <main className="flex-grow mx-auto mt-6 mb-12 w-10/12 sm:w-5/6 lg:w-3/4 xl:w-1/2">
        <div className=" mb-8">
          <h1 className="text-2xl">Welcome to Wedding Info!</h1>
        </div>
        <div className="flex flex-col gap-2">
          <p className="flex">
            <Link
              className="flex font-semibold underline hover:underline-offset-2"
              href="#"
              target="_blank"
            >
              Sign Up
            </Link>
            &nbsp;or&nbsp;
            <Link
              className="flex font-semibold underline hover:underline-offset-2"
              href="/login"
              target="_blank"
            >
              Sign In
            </Link>
            &nbsp;to create a Wedding Info page.
          </p>
          <Link
            className="flex font-semibold underline hover:underline-offset-2"
            target="_blank"
            href="/i/6b72fa05-e22f-4cba-b494-34b334e74159"
          >
            See an example.
            <ExternalLink className="ml-1" />
          </Link>
        </div>
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
