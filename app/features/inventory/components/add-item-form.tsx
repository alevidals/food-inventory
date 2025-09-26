import { useQueryClient } from "@tanstack/react-query";
import { useActionState, useRef } from "react";
import {
  insertItemToInventoryAction,
  updateInventoryItemAction,
} from "@/app/features/inventory/actions";
import type { InventoryItem } from "@/app/features/inventory/types";
import { FormItem } from "@/app/shared/components/form-item";
import { LoadingButton } from "@/app/shared/components/loading-button";
import { Label } from "@/app/shared/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/shared/components/ui/select";

type Props = {
  item?: InventoryItem;
  onSave?: () => Promise<void> | void;
};

export function AddItemForm({ item, onSave }: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const queryClient = useQueryClient();

  const [state, formAction, isPending] = useActionState(
    async (_: unknown, formData: FormData) => {
      const action = item
        ? updateInventoryItemAction
        : insertItemToInventoryAction;

      const response = await action(_, formData);

      if (response.success) {
        queryClient.invalidateQueries({ queryKey: ["inventory-items"] });
        formRef.current?.reset();
        if (onSave) {
          await onSave();
        }
      }

      return response;
    },
    null,
  );

  function getDefaultValue(field: keyof InventoryItem) {
    if (state?.data) {
      return String(state.data[field]);
    }

    if (item) {
      return String(item[field]);
    }

    return undefined;
  }

  return (
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
        required
        defaultValue={getDefaultValue("name")}
        error={state?.success ? undefined : state?.errors?.name}
      />
      <FormItem
        label="Cantidad"
        name="quantity"
        id="quantity"
        type="number"
        required
        defaultValue={getDefaultValue("quantity")}
        error={state?.errors?.quantity}
      />
      <div className="grid w-full items-center gap-3">
        <Label htmlFor="unityType">Unidad</Label>
        <Select
          key={state?.success ? "reset" : "stable"}
          name="unityType"
          defaultValue={getDefaultValue("unityType") ?? "gr"}
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
        defaultValue={getDefaultValue("threshold") ?? 20}
        min={0}
        max={100}
        description="Cuando quede menos de este porcentaje se te avisará"
        error={state?.errors?.threshold}
      />
      {item ? <input type="hidden" name="id" value={item.id} /> : null}
      <LoadingButton type="submit" size="lg" isLoading={isPending}>
        Añadir
      </LoadingButton>
    </form>
  );
}
