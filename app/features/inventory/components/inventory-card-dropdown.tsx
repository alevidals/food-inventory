import { useQueryClient } from "@tanstack/react-query";
import { MoreVertical } from "lucide-react";
import { useState } from "react";
import { deleteItemFromInventoryAction } from "@/app/features/inventory/actions";
import type { InventoryItem } from "@/app/features/inventory/types";
import { formatUnit } from "@/app/features/inventory/utils";
import { ResponsiveDeleteDialog } from "@/app/shared/components/responsive-delete-dialog";
import { Button } from "@/app/shared/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/shared/components/ui/dropdown-menu";

type Props = {
  item: InventoryItem;
};

export function InventoryCardDropdown({ item }: Props) {
  const { id, name, quantity, unityType } = item;

  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const queryClient = useQueryClient();

  const unityTypeLabel = formatUnit({ unityType });

  return (
    <>
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
      <ResponsiveDeleteDialog
        isOpen={isOpenDelete}
        setIsOpen={setIsOpenDelete}
        description="Esta acción no se puede deshacer. Esto eliminará permanentemente el ítem"
        itemId={id}
        itemName={`${name} (${quantity} ${unityTypeLabel})`}
        itemFormName="id"
        action={deleteItemFromInventoryAction}
        onSuccess={() =>
          queryClient.invalidateQueries({ queryKey: ["inventory-items"] })
        }
      />
    </>
  );
}
