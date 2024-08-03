"use client";
import { IdentifiableUser } from "@interfaces/type";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import React from "react";
import { auth } from "../../../firebase";
import { addUser, getUser } from "@services/client/user";

interface Session {
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

interface IUserSessionContext {
  user: IdentifiableUser | null;
  session: Session;
  onSignIn: () => Promise<void>;
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

  React.useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const currUser = await getUser(firebaseUser?.uid);
        setUser(currUser);
        setSession({ isAuthenticated: true, isLoading: false, error: null });
      } else {
        setUser(null);
        setSession({ isAuthenticated: false, isLoading: false, error: null });
      }
    });

    return () => unsub();
  }, []);

  const onSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      if (getUser(user.uid) === null) {
        await addUser({
          id: user.uid,
          name: user.displayName ?? "",
          tufts_username: "",
          email: user.email ?? "",
          role: "user",
          currentQuestions: {},
        });
      }

      setSession((prev) => ({ ...prev, isLoading: true }));
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
      signOut(auth);
      setSession({ isAuthenticated: false, isLoading: false, error: null });
    } catch (e: any) {
      setSession({
        isAuthenticated: false,
        isLoading: false,
        error: e.message,
      });
    }
  };
  return (
    <UserSessionContext.Provider value={{ user, session, onSignIn, onSignOut }}>
      {children}
    </UserSessionContext.Provider>
  );
};

export const useUserSession = () => {
  React.useContext(UserSessionContext);
};
