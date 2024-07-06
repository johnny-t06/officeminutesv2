"use client";
import { getAuth, onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth } from "../../firebase";
import { signInWithGoogle } from "../../auth";
import { useState } from "react";

export default function Home() {
  const [currUser, setCurrUser] = useState<User | null>();
  onAuthStateChanged(getAuth(), async (user) => {
    // console.log("user", user);
    setCurrUser(user);
  });

  return (
    <div>
      <button onClick={() => signInWithGoogle()}> Sign in! </button>
      <button
        onClick={() => {
          if (currUser) {
            signOut(auth);
          }
        }}
      >
        Sign Out{" "}
      </button>
      <div> Logged In: {currUser?.displayName}</div>
    </div>
  );
}
