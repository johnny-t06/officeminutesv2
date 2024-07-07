"use client";
import { getAuth, onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth } from "../../firebase";
import { useAuth } from "./hooks";

export default function Home() {
  const { currUser, onSignIn } = useAuth();
  return (
    <div>
      <button onClick={() => onSignIn()}> Sign in! </button>
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
