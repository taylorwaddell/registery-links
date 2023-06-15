"use client";

import type { Database } from "@/types/supabase";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();

  const handleSignUp = async () => {
    await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });
    router.refresh();
  };

  const handleSignIn = async () => {
    await supabase.auth.signInWithPassword({
      email,
      password,
    });
    router.refresh();
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <div className="w-full flex justify-center my-5">
      <div className="w-25">
        <div className="flex justify-between mb-4">
          <label htmlFor="email">email</label>
          <input
            name="email"
            className="rounded py-1 px-2 text-zinc-900"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className="flex justify-between mb-4">
          <label htmlFor="password">password</label>
          <input
            type="password"
            name="password"
            className="rounded py-1 px-2 text-zinc-900"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <div className="flex gap-4">
          <button
            className="rounded-md border shadow-sm px-4 py-2 dark:text-zinc-900 text-zinc-200 hover:text-zinc-200 bg-zinc-700 dark:bg-zinc-200 hover:bg-zinc-800 sm:mt-0 sm:w-auto sm:text-sm"
            onClick={handleSignUp}
          >
            Sign up
          </button>
          <button
            className="rounded-md border shadow-sm px-4 py-2 dark:text-zinc-900 text-zinc-200 hover:text-zinc-200 bg-zinc-700 dark:bg-zinc-200 hover:bg-zinc-800 sm:mt-0 sm:w-auto sm:text-sm"
            onClick={handleSignIn}
          >
            Sign in
          </button>
          <button
            className="rounded-md border shadow-sm px-4 py-2 dark:text-zinc-900 text-zinc-200 hover:text-zinc-200 bg-zinc-700 dark:bg-zinc-200 hover:bg-zinc-800 sm:mt-0 sm:w-auto sm:text-sm"
            onClick={handleSignOut}
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}
