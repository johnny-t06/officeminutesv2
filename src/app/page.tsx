"use client";

import { useUserSessionStore } from "@providers/UserSessionProvider";

export default function Home() {
  const user = useUserSessionStore((state) => state.user);
  const onSignIn = useUserSessionStore((state) => state.onSignIn);
  const onSignOut = useUserSessionStore((state) => state.onSignOut);

  return (
    <div>
      <button onClick={onSignIn}> Sign in! </button>
      <button onClick={onSignOut}>Sign Out</button>
      <div> Logged In: {user?.name}</div>
    </div>
  );
}
