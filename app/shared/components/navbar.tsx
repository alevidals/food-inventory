"use client";

import { ChartColumn } from "lucide-react";
import type { ButtonHTMLAttributes } from "react";
import { Button } from "@/app/shared/components/ui/button";
import { cn } from "@/app/shared/lib/utils";
import { useActiveTab } from "@/app/shared/providers/active-tab-provider";

export function Navbar() {
  const { activeTab, setActiveTab } = useActiveTab();

  return (
    <nav className="bg-primary/10 flex items-center justify-center gap-8 w-fit mx-auto p-2 rounded-xl mb-4 border border-primary">
      <NavButton
        isActive={activeTab === "dashboard"}
        onClick={() => setActiveTab("dashboard")}
      >
        <ChartColumn />
        Dashboard
      </NavButton>
      <NavButton
        isActive={activeTab === "inventory"}
        onClick={() => setActiveTab("inventory")}
      >
        <ChartColumn />
        Inventario
      </NavButton>
      <NavButton
        isActive={activeTab === "meals"}
        onClick={() => setActiveTab("meals")}
      >
        <ChartColumn />
        Comidas
      </NavButton>
      <NavButton
        isActive={activeTab === "history"}
        onClick={() => setActiveTab("history")}
      >
        <ChartColumn />
        Historial
      </NavButton>
    </nav>
  );
}

function NavButton({
  isActive,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  isActive: boolean;
}) {
  return (
    <Button
      {...rest}
      variant={isActive ? "default" : "ghost"}
      className={cn(
        "flex flex-col h-full",
        !isActive && "hover:bg-primary/20",
        isActive && "bg-primary hover:bg-primary",
      )}
    />
  );
}
