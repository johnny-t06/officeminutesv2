"use client";

import React from "react";
import Sidebar from "@components/Sidebar";

interface SidebarContextState {
  isOpen: boolean;
}

interface SidebarContextActions {
  openSidebar: () => void;
  closeSidebar: () => void;
}

interface SidebarContextProps {
  children: React.ReactNode;
}

const SidebarStateContext = React.createContext<SidebarContextState>({
  isOpen: false,
});

const SidebarActionsContext = React.createContext<SidebarContextActions>({
  openSidebar: () => {},
  closeSidebar: () => {},
});

export const SidebarProvider: React.FC<SidebarContextProps> = (
  props: SidebarContextProps
) => {
  const { children } = props;
  const [isSidebarOpen, setIsSidebarOpen] = React.useState<boolean>(false);

  const openSidebar = React.useCallback(() => setIsSidebarOpen(true), []);
  const closeSidebar = React.useCallback(() => setIsSidebarOpen(false), []);

  return (
    <SidebarStateContext.Provider value={{ isOpen: isSidebarOpen }}>
      <SidebarActionsContext.Provider value={{ openSidebar, closeSidebar }}>
        <Sidebar />
        {children}
      </SidebarActionsContext.Provider>
    </SidebarStateContext.Provider>
  );
};

export const useSidebarStateContext = () =>
  React.useContext(SidebarStateContext);

export const useSidebarActionsContext = () =>
  React.useContext(SidebarActionsContext);
