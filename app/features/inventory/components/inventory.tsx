"use client";

import { AddItemForm } from "@/app/features/inventory/components/add-item-form";
import { InventoryCard } from "@/app/features/inventory/components/inventory-card";
import { useInventoryItems } from "@/app/features/inventory/hooks";

export function Inventory() {
  const { data } = useInventoryItems();

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Mi inventario</h2>
        <AddItemForm />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {data.map((item, i) => (
          <InventoryCard key={item.id} index={i} {...item} />
        ))}
      </div>
    </div>
  );
}
