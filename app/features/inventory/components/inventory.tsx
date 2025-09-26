"use client";

import { useState } from "react";
import { AddItemForm } from "@/app/features/inventory/components/add-item-form";
import { InventoryCard } from "@/app/features/inventory/components/inventory-card";
import { useInventoryItems } from "@/app/features/inventory/hooks";
import { ResponsiveAddDialog } from "@/app/shared/components/responsive-add-dialog";
import { Button } from "@/app/shared/components/ui/button";

export function Inventory() {
  const { data } = useInventoryItems();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Mi inventario</h2>
        <ResponsiveAddDialog
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          type="add"
          trigger={
            <Button type="button" size="lg">
              Añadir ítem
            </Button>
          }
        >
          <AddItemForm
            onSave={() => {
              setIsOpen(false);
            }}
          />
        </ResponsiveAddDialog>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {data.map((item, i) => (
          <InventoryCard key={item.id} index={i} item={item} />
        ))}
      </div>
    </div>
  );
}
