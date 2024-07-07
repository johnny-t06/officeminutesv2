import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  User,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { auth, db } from "../../../firebase";
import { doc, setDoc } from "firebase/firestore";

const useAuth = () => {
  const router = useRouter();
  const [currUser, setCurrUser] = useState<User | null>(null);
  const onSignIn = useCallback(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/course");
      } else {
        signInWithGoogle();
      }
    });
    return () => unsub();
  }, [router]);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        name: user.displayName,
        role: "user",
      });
      setCurrUser(user);
      console.log("User signed in with Google", user.uid);
    } catch (e) {
      console.error("Error signing in with Google: ", e);
    }
  };
  return { currUser, onSignIn };
};

export default useAuth;
