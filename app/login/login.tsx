"use client";

import type { Database } from "@/types/supabase";
import { StandardClasses } from "@/public/Utilities/Classes.enum";
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
          <form>
            <div className="flex justify-between mb-4">
              <label htmlFor="email" className="sr-only">
                email
              </label>
              <input
                name="email"
                type="email"
                placeholder="email"
                className={StandardClasses.inputPrimary}
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <div className="flex justify-between mb-4">
              <label htmlFor="password" className="sr-only">
                password
              </label>
              <input
                type="password"
                name="password"
                placeholder="password"
                className={StandardClasses.inputPrimary}
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
            <div className="flex gap-4">
              <button
                className={StandardClasses.buttonPrimary}
                onClick={handleSignUp}
              >
                Sign up
              </button>
              <button
                className={StandardClasses.buttonPrimary}
                onClick={handleSignIn}
              >
                Sign in
              </button>
              <button
                className={StandardClasses.buttonPrimary}
                onClick={handleSignOut}
              >
                Sign out
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
