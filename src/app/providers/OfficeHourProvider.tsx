"use client";

import { createContext, useContext, useRef } from "react";
import { createOfficeHourStore } from "@stores/officeHourStore";
import { type StoreApi, useStore } from "zustand";
import type {
  IdentifiableCourse,
  IdentifiableQuestions,
} from "@interfaces/type";

interface OfficeHourState {
  course: IdentifiableCourse | null;
  questions: IdentifiableQuestions;
  initializeListeners: (courseId: string) => () => void;
}

const OfficeHourContext = createContext<StoreApi<OfficeHourState> | null>(null);

export interface OfficeHourProviderProps {
  children: React.ReactNode;
}

export const OfficeHourProvider = ({ children }: OfficeHourProviderProps) => {
  const storeRef = useRef<StoreApi<OfficeHourState>>();
  if (!storeRef.current) {
    storeRef.current = createOfficeHourStore();
  }
  return (
    <OfficeHourContext.Provider value={storeRef.current}>
      {children}
    </OfficeHourContext.Provider>
  );
};

export const useOfficeHourStore = <T,>(
  selector: (state: OfficeHourState) => T
): T => {
  const store = useContext(OfficeHourContext);
  if (!store) {
    throw new Error("Missing OfficeHourContext.Provider in the tree");
  }
  return useStore(store, selector);
};
