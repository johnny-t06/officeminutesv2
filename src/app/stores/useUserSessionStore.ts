import { create } from "zustand";
import { IdentifiableUser } from "@interfaces/type";
import {
  browserLocalPersistence,
  GoogleAuthProvider,
  onAuthStateChanged,
  setPersistence,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "@project/firebase";
import { addUser, getUser } from "@services/client/user";

interface Session {
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

interface UserSessionState {
  user: IdentifiableUser | null;
  session: Session;
  onSignIn: () => Promise<void>;
  onSignOut: () => Promise<void>;
  setUser: (user: IdentifiableUser | null) => void;
  setSession: (session: Session) => void;
}

export const useUserSessionStore = create<UserSessionState>((set, get) => ({
  user: null,
  session: {
    isAuthenticated: false,
    isLoading: true,
    error: null,
  },
  setUser: (user) => set({ user }),
  setSession: (session) => set({ session }),
  onSignIn: async () => {
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

      set((state) => ({
        session: {
          ...state.session,
          isLoading: true,
        },
      }));

      window.location.href = "/private/course";
    } catch (e: any) {
      set({
        session: {
          isAuthenticated: false,
          isLoading: false,
          error: e.message,
        },
      });
    }
  },
  onSignOut: async () => {
    try {
      set((state) => ({
        session: { ...state.session, isLoading: true },
      }));
      await signOut(auth);
      set({
        user: null,
        session: {
          isAuthenticated: false,
          isLoading: false,
          error: null,
        },
      });

      window.location.href = "/";
    } catch (e: any) {
      set({
        session: {
          isAuthenticated: false,
          isLoading: false,
          error: e.message,
        },
      });
    }
  },
}));

// Initialize auth state listener
if (typeof window !== "undefined") {
  onAuthStateChanged(auth, async (firebaseUser) => {
    if (firebaseUser) {
      const currUser = await getUser(firebaseUser?.uid);
      useUserSessionStore.getState().setUser(currUser);
      useUserSessionStore.getState().setSession({
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } else {
      useUserSessionStore.getState().setUser(null);
      useUserSessionStore.getState().setSession({
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
    }
  });
}
