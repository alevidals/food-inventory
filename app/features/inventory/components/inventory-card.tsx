import { motion } from "motion/react";
import type { InventoryItem } from "@/app/features/inventory/types";
import { Badge } from "@/app/shared/components/ui/badge";
import { Card, CardContent } from "@/app/shared/components/ui/card";
import { cn } from "@/app/shared/lib/utils";

type Props = InventoryItem & { index?: number };

export function InventoryCard({
  name,
  quantity,
  threshold,
  unityType,
  index = 0,
}: Props) {
  const isLowStock = quantity <= threshold;
  const cardClassName = cn(
    "border-2",
    isLowStock && "border border-destructive",
  );

  const delay = 0.05 * index;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut", delay }}
    >
      <Card className={cardClassName}>
        <CardContent>
          <h3 className="font-semibold text-lg">{name}</h3>
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
    </motion.div>
  );
}
