"use client";
import { signIn, signOut, useSession } from "next-auth/react";
export default function SignInButton() {
  return (
    <button
      onClick={() => {
        signIn();
      }}
    >
      Sign in
    </button>
  );
}
