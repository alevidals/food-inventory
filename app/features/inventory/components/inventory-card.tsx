"use client";

import { useQueryClient } from "@tanstack/react-query";
import { MoreVertical } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { deleteItemFromInventoryAction } from "@/app/features/inventory/actions";
import type { InventoryItem } from "@/app/features/inventory/types";
import { ResponsiveDeleteDialog } from "@/app/shared/components/responsive-delete-dialog";
import { Badge } from "@/app/shared/components/ui/badge";
import { Button } from "@/app/shared/components/ui/button";
import { Card, CardContent } from "@/app/shared/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/shared/components/ui/dropdown-menu";
import { cn } from "@/app/shared/lib/utils";

type Props = InventoryItem & { index?: number };

export function InventoryCard({
  id,
  name,
  quantity,
  threshold,
  unityType,
  index = 0,
}: Props) {
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const queryClient = useQueryClient();

  const isLowStock = quantity <= threshold;
  const cardClassName = cn(
    "border shadow-sm transition-colors transition-shadow duration-200 hover:shadow-md",
    isLowStock
      ? "border-destructive/70 bg-destructive/5 hover:border-destructive"
      : "border-primary/60 bg-primary/5 hover:border-primary hover:bg-primary/10"
  );

  const delay = 0.05 * index;

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
                isLowStock && "text-destructive"
              )}
            >
              {name}
            </h3>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="size-8 opacity-70 hover:opacity-100"
                  aria-label="Acciones"
                >
                  <MoreVertical className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" sideOffset={8}>
                <DropdownMenuItem onSelect={() => alert("editar")}>
                  Editar
                </DropdownMenuItem>
                <DropdownMenuItem
                  variant="destructive"
                  onSelect={() => setIsOpenDelete(true)}
                >
                  Eliminar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex items-center gap-4 mt-1">
            <span className="text-lg font-bold text-foreground">
              {quantity} {unityType}
            </span>
            {isLowStock ? (
              <Badge variant="destructive" className="text-xs">
                Stock bajo
              </Badge>
            ) : null}
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Alerta cuando queden menos de {threshold} {unityType}
          </p>
        </CardContent>
      </Card>
      <ResponsiveDeleteDialog
        isOpen={isOpenDelete}
        setIsOpen={setIsOpenDelete}
        description="Esta acción no se puede deshacer. Esto eliminará permanentemente el ítem"
        itemId={id}
        itemName={`${name} - ${quantity} ${unityType}`}
        itemFormName="id"
        action={deleteItemFromInventoryAction}
        onSuccess={() =>
          queryClient.invalidateQueries({ queryKey: ["inventory-items"] })
        }
      />
    </motion.div>
  );
}
