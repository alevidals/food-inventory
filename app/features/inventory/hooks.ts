"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import type { InventoryItem } from "@/app/features/inventory/types";

async function fetchInventoryItems() {
  try {
    const response = await fetch("/api/inventory");

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const items: InventoryItem[] = await response.json();

    return items;
  } catch (error) {
    console.error("Error fetching inventory items:", error);
    return [];
  }
}

export function useInventoryItems() {
  return useSuspenseQuery({
    queryKey: ["inventory-items"],
    queryFn: fetchInventoryItems,
  });
}
