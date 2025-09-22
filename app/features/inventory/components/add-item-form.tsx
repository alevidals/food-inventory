import { useQueryClient } from "@tanstack/react-query";
import { useActionState, useRef, useState } from "react";
import { insertItemToIventoryAction } from "@/app/features/inventory/actions";
import type { InventoryItem } from "@/app/features/inventory/types";
import { FormItem } from "@/app/shared/components/form-item";
import { Button } from "@/app/shared/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/shared/components/ui/dialog";
import { Label } from "@/app/shared/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/shared/components/ui/select";

export function AddItemForm() {
  const [isOpen, setIsOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const queryClient = useQueryClient();

  const [state, formAction, isPending] = useActionState(
    async (_: unknown, formData: FormData) => {
      const response = await insertItemToIventoryAction(_, formData);

      if (response.success) {
        if (response.data) {
          queryClient.setQueryData(
            ["inventory-items"],
            (oldData: InventoryItem[] | undefined) => {
              return [...(oldData ?? []), response.data as InventoryItem];
            },
          );
        }
        formRef.current?.reset();
        setIsOpen(false);
      }

      return response;
    },
    null,
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          className="bg-violet-500 hover:bg-violet-700"
          size="lg"
        >
          Añadir ítem
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Añadir ítem</DialogTitle>
          <DialogDescription>
            Aquí puedes añadir un nuevo ítem a tu inventario.
          </DialogDescription>
        </DialogHeader>
        <form ref={formRef} action={formAction} className="flex flex-col gap-4">
          {state?.error ? (
            <p className="text-red-500 text-sm font-bold text-center">
              {state.error}
            </p>
          ) : null}
          <FormItem
            label="Nombre del alimento"
            name="name"
            id="name"
            defaultValue={
              state?.success
                ? undefined
                : (state?.data?.name as string | undefined)
            }
            error={state?.success ? undefined : state?.errors?.name}
          />
          <FormItem
            label="Cantidad"
            name="quantity"
            id="quantity"
            type="number"
            defaultValue={
              state?.success
                ? undefined
                : (state?.data?.quantity as number | undefined)
            }
            error={state?.errors?.quantity}
          />
          <div className="grid w-full items-center gap-3">
            <Label htmlFor="unityType">Unidad</Label>
            <Select
              name="unityType"
              defaultValue={
                state?.success
                  ? undefined
                  : (state?.data?.unityType as string | undefined)
              }
            >
              <SelectTrigger
                id="unityType"
                className="w-full"
                aria-invalid={Boolean(state?.errors?.unityType) || undefined}
              >
                <SelectValue placeholder="Selecciona unidad" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gr">Gramos (gr)</SelectItem>
                <SelectItem value="ml">Mililitros (ml)</SelectItem>
                <SelectItem value="unit">Unidades</SelectItem>
              </SelectContent>
            </Select>
            {!state?.success && state?.errors?.unityType ? (
              <p className="text-red-500 text-sm font-bold">
                {state.errors.unityType}
              </p>
            ) : null}
          </div>
          <FormItem
            label="Umbral de stock bajo"
            name="threshold"
            type="number"
            defaultValue={state?.success ? 20 : (state?.data?.threshold ?? 20)}
            min={0}
            max={100}
            description="Cuando quede menos de este porcentaje se te avisará"
            error={state?.success ? undefined : state?.errors?.threshold}
          />
          <Button
            type="submit"
            className="bg-violet-500 hover:bg-violet-700"
            size="lg"
            disabled={isPending}
          >
            Añadir
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
