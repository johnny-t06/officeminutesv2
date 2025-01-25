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
import React from "react";
import { auth } from "@project/firebase";
import { addUser, getUser } from "@services/client/user";
import { useRouter } from "next/navigation";
import Spinner from "@components/Spinner";
import { Box } from "@mui/material";
import { setSessionCookie } from "@api/auth/route.client";

const PROD_ENV = process.env.NEXT_PUBLIC_APP_ENV === "production";
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

export const UserSessionContext = React.createContext<IUserSessionContext>(
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
      }
    });
    return () => unsub();
  }, []);

  const onSignIn = async () => {
    try {
      await setPersistence(auth, browserLocalPersistence);
      const provider = new GoogleAuthProvider();
      if (PROD_ENV) {
        provider.setCustomParameters({
          hd: "tufts.edu",
        });
      }
      const result = await signInWithPopup(auth, provider);
      const resUser = result.user;
      const idToken = await resUser.getIdToken();
      await setSessionCookie(idToken);

      const maybeUser = await getUser(resUser.uid);
      if (maybeUser === null) {
        setUser(
          await addUser({
            id: resUser.uid,
            name: resUser.displayName ?? "",
            tufts_username: "",
            email: resUser.email ?? "",
            role: "user",
            courses: [],
          })
        );
      } else {
        setUser(maybeUser);
      }
      setSession({ isLoading: false, isAuthenticated: true, error: null });
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
      setSession({
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
      router.push("/login");
      router.refresh();
    } catch (e: any) {
      setSession({
        isAuthenticated: false,
        isLoading: false,
        error: e.message,
      });
      console.error(e);
    }
  };

  return session.isLoading ? (
    <Box className="flex h-screen w-screen flex-col items-center justify-center">
      <Spinner />
    </Box>
  ) : (
    <UserSessionContext.Provider
      value={{ user, session, onSignIn, onSignOut, setUser }}
    >
      {children}
    </UserSessionContext.Provider>
  );
};

export const useUserSession = () => React.useContext(UserSessionContext);
