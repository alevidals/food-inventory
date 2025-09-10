"use client";

import {
  createContext,
  type PropsWithChildren,
  useContext,
  useState,
} from "react";
import type { ActiveTab } from "@/app/shared/types/active-tab";

type ActiveTabContextType = {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
};

export const ActiveTabContext = createContext<ActiveTabContextType | null>(
  null,
);

export function useActiveTab() {
  const context = useContext(ActiveTabContext);

  if (!context) {
    throw new Error(
      "useActiveTabContext must be used within an ActiveTabProvider",
    );
  }

  return context;
}

export function ActiveTabProvider({ children }: PropsWithChildren) {
  const [activeTab, setActiveTab] = useState<ActiveTab>("dashboard");

  const value: ActiveTabContextType = {
    activeTab,
    setActiveTab,
  };

  return (
    <ActiveTabContext.Provider value={value}>
      {children}
    </ActiveTabContext.Provider>
  );
}
