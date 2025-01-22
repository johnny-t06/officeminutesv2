"use client";
import { IdentifiableUser } from "@interfaces/type";
import {
  browserLocalPersistence,
  getRedirectResult,
  GoogleAuthProvider,
  onAuthStateChanged,
  setPersistence,
  signInWithRedirect,
  signOut,
} from "firebase/auth";
import React from "react";
import { auth } from "@project/firebase";
import { addUser, getUser } from "@services/client/user";
import { useRouter } from "next/navigation";
import Spinner from "@components/Spinner";
import { Box } from "@mui/material";
import { setSessionCookie } from "@api/auth/route.client";

const PROD_ENV = process.env.NODE_ENV === "production";
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

  const handleError = (message: string) => {
    setSession({
      isAuthenticated: false,
      isLoading: false,
      error: message,
    });
  };

  React.useEffect(() => {
    // TODO: on password change, add additional check
    if (user !== null || session.isLoading || !session.isAuthenticated) {
      return;
    }
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      const currUser = await getUser(firebaseUser?.uid ?? "");
      if (firebaseUser && currUser !== null) {
        setUser(currUser);
        setSession({ isAuthenticated: true, isLoading: false, error: null });
      } else {
        setUser(null);
        setSession({ isAuthenticated: false, isLoading: false, error: null });
      }
    });
    return () => unsub();
  }, []);

  React.useEffect(() => {
    const handleRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);

        if (!result) {
          handleError("No result from redirect");
          return;
        }

        const { user } = result;

        if (!user.email?.endsWith("@tufts.edu") && PROD_ENV) {
          handleError("No result from redirect");
          await onSignOut();
          return;
        }

        const idToken = await user.getIdToken();
        await setSessionCookie(idToken);

        const userData = await fetchOrCreateUser(user);
        setUser(userData);

        setSession({ isLoading: false, isAuthenticated: true, error: null });
        router.push("/private/course");
      } catch (error: any) {
        handleError("Error signing in");
      }
    };

    const fetchOrCreateUser = async (user: any) => {
      const maybeUser = await getUser(user.uid);
      if (maybeUser) return maybeUser;

      return await addUser({
        id: user.uid,
        name: user.displayName ?? "",
        tufts_username: "",
        email: user.email ?? "",
        role: "user",
        courses: [],
      });
    };

    handleRedirectResult();
  }, []);

  const onSignIn = async () => {
    try {
      await setPersistence(auth, browserLocalPersistence);
      const provider = new GoogleAuthProvider();
      await signInWithRedirect(auth, provider);
      setSession({ isAuthenticated: false, isLoading: true, error: null });
    } catch (error: any) {
      handleError("Failed to start sign-in process");
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
      handleError("Failed to sign out");
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
