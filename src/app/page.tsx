"use client";
import { signInWithGoogle } from "../../auth";

export default function Home() {
  return (
    <button
      onClick={() => {
        signInWithGoogle();
      }}
    >
      {" "}
      Sign In{" "}
    </button>
  );
}
