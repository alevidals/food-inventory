"use client";

import type { JSX } from "react";
import { Dashboard } from "@/app/features/dashboard/components/dashboard";
import { History } from "@/app/features/history/components/history";
import { Inventory } from "@/app/features/inventory/components/inventory";
import { Meals } from "@/app/features/meals/components/meals";
import { useActiveTab } from "@/app/shared/providers/active-tab-provider";
import type { ActiveTab } from "@/app/shared/types/active-tab";

export function Main() {
  const { activeTab } = useActiveTab();

  const CONTENT_MAPPER: Record<ActiveTab, JSX.Element> = {
    dashboard: <Dashboard />,
    inventory: <Inventory />,
    history: <History />,
    meals: <Meals />,
  };

  return (
    <main className="flex-1 container mx-auto px-12 pt-4">
      {CONTENT_MAPPER[activeTab]}
    </main>
  );
}
