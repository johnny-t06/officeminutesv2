"use client";

import { createContext, useContext, useRef } from "react";
import { createUserSessionStore } from "@stores/userSessionStore";
import { type StoreApi, useStore } from "zustand";
import type { IdentifiableUser } from "@interfaces/type";

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

const UserSessionContext = createContext<StoreApi<UserSessionState> | null>(
  null
);

export interface UserSessionProviderProps {
  children: React.ReactNode;
}

export const UserSessionProvider = ({ children }: UserSessionProviderProps) => {
  const storeRef = useRef<StoreApi<UserSessionState>>();
  if (!storeRef.current) {
    storeRef.current = createUserSessionStore();
  }

  return (
    <UserSessionContext.Provider value={storeRef.current}>
      {children}
    </UserSessionContext.Provider>
  );
};

export const useUserSessionStore = <T,>(
  selector: (state: UserSessionState) => T
): T => {
  const store = useContext(UserSessionContext);
  if (!store) {
    throw new Error("Missing UserSessionContext.Provider in the tree");
  }
  return useStore(store, selector);
};
