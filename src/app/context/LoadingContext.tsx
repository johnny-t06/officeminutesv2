"use client";

import React, { ReactNode } from "react";

interface LoadingContext {
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

interface LoadingProviderProps {
  children: ReactNode;
}

const LoadingContext = React.createContext({} as LoadingContext);

export const LoadingProvider = ({ children }: LoadingProviderProps) => {
  const [loading, setLoading] = React.useState(false);

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => React.useContext(LoadingContext);
