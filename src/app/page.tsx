"use client";

import { useUserSessionStore } from "@stores/useUserSessionStore";

export default function Home() {
  const { onSignIn, onSignOut, user } = useUserSessionStore();

  return (
    <div>
      <button onClick={onSignIn}> Sign in! </button>
      <button onClick={onSignOut}>Sign Out</button>
      <div> Logged In: {user?.name}</div>
    </div>
  );
}
