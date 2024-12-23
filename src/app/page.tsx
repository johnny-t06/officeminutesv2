"use client";

import { useUserSessionStore } from "@providers/UserSessionProvider";

export default function Home() {
  const { onSignIn, onSignOut, user } = useUserSessionStore((state) => ({
    user: state.user,
    onSignIn: state.onSignIn,
    onSignOut: state.onSignOut,
  }));

  return (
    <div>
      <button onClick={onSignIn}> Sign in! </button>
      <button onClick={onSignOut}>Sign Out</button>
      <div> Logged In: {user?.name}</div>
    </div>
  );
}
