"use client";
import { IdentifiableUser } from "@interfaces/type";
import {
  browserLocalPersistence,
  GoogleAuthProvider,
  onAuthStateChanged,
  setPersistence,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import React, { useRef } from "react";
import { auth } from "@project/firebase";
import { addUser, getUser } from "@services/client/user";
import { useRouter } from "next/navigation";

interface Session {
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

interface IUserSessionContext {
  user: IdentifiableUser | null;
  setUser: React.Dispatch<React.SetStateAction<IdentifiableUser | null>>;
  session: Session;
  onSignIn: () => void;
  onSignOut: () => Promise<void>;
}

const UserSessionContext = React.createContext<IUserSessionContext>(
  {} as IUserSessionContext
);

export const UserSessionContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = React.useState<IdentifiableUser | null>(null);
  const [session, setSession] = React.useState<Session>({
    isAuthenticated: false,
    isLoading: true,
    error: null,
  });
  const router = useRouter();

  // const isInitiated = useRef(false);
  React.useEffect(() => {
    // TODO: on password change, add additional check
    if (user !== null) {
      return;
    }
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const currUser = await getUser(firebaseUser?.uid);
        setUser(currUser);
        setSession({ isAuthenticated: true, isLoading: false, error: null });
      } else {
        setUser(null);
        setSession({ isAuthenticated: false, isLoading: false, error: null });

        router.push("/");
      }
    });
    return () => unsub();
  }, []);
  const onSignIn = async () => {
    try {
      await setPersistence(auth, browserLocalPersistence);
      const provider = new GoogleAuthProvider();

      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      if ((await getUser(user.uid)) == null) {
        await addUser({
          id: user.uid,
          name: user.displayName ?? "",
          tufts_username: "",
          email: user.email ?? "",
          role: "user",
          courses: [],
        });
      }
      setSession((prev) => ({
        ...prev,
        isLoading: true,
      }));
      router.push("/private/course");
    } catch (e: any) {
      setSession({
        isAuthenticated: false,
        isLoading: false,
        error: e.message,
      });
    }
  };

  const onSignOut = async () => {
    try {
      setSession((prev) => ({ ...prev, isLoading: true }));
      await signOut(auth);
      setUser(null);
      setSession({ isAuthenticated: false, isLoading: false, error: null });
      router.push("/");
    } catch (e: any) {
      setSession({
        isAuthenticated: false,
        isLoading: false,
        error: e.message,
      });
      console.error(e);
    }
  };
  return (
    <UserSessionContext.Provider
      value={{ user, session, onSignIn, onSignOut, setUser }}
    >
      {children}
    </UserSessionContext.Provider>
  );
};

export const useUserSession = () => React.useContext(UserSessionContext);
