"use client";

import { ChartColumn } from "lucide-react";
import type { ButtonHTMLAttributes } from "react";
import { Button } from "@/app/shared/components/ui/button";
import { cn } from "@/app/shared/lib/utils";
import { useActiveTab } from "@/app/shared/providers/active-tab-provider";

export function Navbar() {
  const { activeTab, setActiveTab } = useActiveTab();

  return (
    <nav className="h-24 bg-primary/10 border-t border-t-primary/30 flex items-center justify-center gap-8">
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
        "flex gap-2 h-auto p-4 w-fit rounded-xl select-none",
        !isActive && "hover:bg-primary/20",
        isActive && "bg-primary hover:bg-primary"
      )}
      size="lg"
    />
  );
}
