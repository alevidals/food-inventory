"use client";

import type { JSX } from "react";
import { Dashboard } from "@/app/features/dashboard/components/dashboard";
import { History } from "@/app/features/history/components/history";
import { Inventory } from "@/app/features/inventory/components/inventory";
import { Meals } from "@/app/features/meals/components/meals";
import { Navbar } from "@/app/shared/components/navbar";
import { useActiveTab } from "@/app/shared/providers/active-tab-provider";

type ActiveTab = "dashboard" | "inventory" | "meals" | "history";

export default function Home() {
  const { activeTab } = useActiveTab();

  const CONTENT_MAPPER: Record<ActiveTab, JSX.Element> = {
    dashboard: <Dashboard />,
    inventory: <Inventory />,
    history: <History />,
    meals: <Meals />,
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex items-center h-16 bg-violet-400 border-b border-b-violet-500 px-12">
        <div className="container mx-auto">
          <h1>Gestión de dieta</h1>
        </div>
      </header>
      <main className="flex-1 container mx-auto px-12 pt-4">
        {CONTENT_MAPPER[activeTab]}
      </main>
      <Navbar />
    </div>
  );
}
