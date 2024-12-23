import { createStore } from "zustand";
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
  initializeListener: () => () => void;
}

export const createUserSessionStore = () =>
  createStore<UserSessionState>((set) => ({
    user: null,
    session: {
      isAuthenticated: false,
      isLoading: false,
      error: null,
    },
    initializeListener: () => {
      const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
        if (firebaseUser) {
          const currUser = await getUser(firebaseUser?.uid);
          set({
            user: currUser,
            session: {
              isAuthenticated: true,
              isLoading: false,
              error: null,
            },
          });
        } else {
          set({
            user: null,
            session: {
              isAuthenticated: false,
              isLoading: false,
              error: null,
            },
          });
        }
      });

      return () => {
        unsubscribe();
      };
    },
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
