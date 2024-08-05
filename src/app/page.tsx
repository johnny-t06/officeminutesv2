"use client";
import { useUserSession } from "@context/UserSessionContext";

export default function Home() {
  const { onSignIn, onSignOut, user } = useUserSession();
  console.log("user", user);
  return (
    <div>
      <button onClick={() => onSignIn()}> Sign in! </button>
      <button
        onClick={() => {
          onSignOut();
        }}
      >
        Sign Out{" "}
      </button>
      <div> Logged In: {user?.name}</div>
    </div>
  );
}
