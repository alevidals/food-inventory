"use client";

import { motion } from "motion/react";
import { InventoryCardDropdown } from "@/app/features/inventory/components/inventory-card-dropdown";
import type { InventoryItem } from "@/app/features/inventory/types";
import { formatUnit } from "@/app/features/inventory/utils";
import { Badge } from "@/app/shared/components/ui/badge";
import { Card, CardContent } from "@/app/shared/components/ui/card";
import { cn } from "@/app/shared/lib/utils";

type Props = { item: InventoryItem; index?: number };

export function InventoryCard({ item, index = 0 }: Props) {
  const { name, quantity, unityType, threshold } = item;

  const isLowStock = quantity <= threshold;
  const cardClassName = cn(
    "border shadow-sm transition-colors transition-shadow duration-200 hover:shadow-md",
    isLowStock
      ? "border-destructive/70 bg-destructive/5 hover:border-destructive"
      : "border-primary/60 bg-primary/5 hover:border-primary hover:bg-primary/10",
  );

  const delay = 0.05 * index;
  const unityTypeLabel = formatUnit({ unityType });

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 8 }}
      exit={{ opacity: 0, scale: 0.95, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut", delay }}
    >
      <Card className={cardClassName}>
        <CardContent>
          <div className="flex justify-between items-start">
            <h3
              className={cn(
                "font-semibold text-lg",
                !isLowStock && "text-primary",
                isLowStock && "text-destructive",
              )}
            >
              {name}
            </h3>
            <InventoryCardDropdown item={item} />
          </div>
          <div className="flex items-center gap-4 mt-1">
            <span className="text-lg font-bold text-foreground">
              {quantity} {unityTypeLabel}
            </span>
            {isLowStock ? (
              <Badge variant="destructive" className="text-xs">
                Stock bajo
              </Badge>
            ) : null}
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Alerta cuando queden menos de {threshold} {unityTypeLabel}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
