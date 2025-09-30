import { useQueryClient } from "@tanstack/react-query";
import { useActionState, useRef, useState } from "react";
import { useInventoryItems } from "@/app/features/inventory/hooks";
import type { InventoryItem } from "@/app/features/inventory/types";
import { formatUnit } from "@/app/features/inventory/utils";
import { insertMealAction } from "@/app/features/meals/actions";
import type { Meal } from "@/app/features/meals/types";
import { FormItem } from "@/app/shared/components/form-item";
import { LoadingButton } from "@/app/shared/components/loading-button";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/app/shared/components/ui/command";
import { Label } from "@/app/shared/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/shared/components/ui/select";
import { cn } from "@/app/shared/lib/utils";

type Props = {
  meal?: Meal;
  onSave?: () => Promise<void> | void;
};

export function AddMealForm({ meal, onSave }: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const { data: inventoryItems } = useInventoryItems();
  const queryClient = useQueryClient();
  const [selectedIngredients, setSelectedIngredients] = useState<
    InventoryItem[]
  >([]);

  const [state, formAction, isPending] = useActionState(
    async (_: unknown, formData: FormData) => {
      // const action = item
      //   ? updateInventoryItemAction
      //   : insertItemToInventoryAction;

      const action = insertMealAction;

      const response = await action(_, formData);

      if (response.success) {
        queryClient.invalidateQueries({ queryKey: ["meals"] });
        formRef.current?.reset();
        if (onSave) {
          await onSave();
        }
      }

      return response;
    },
    null,
  );

  function handleSelectIngredient(id: string) {
    const ingredient = inventoryItems.find((ing) => ing.id === Number(id));
    if (ingredient) {
      setSelectedIngredients((prev) =>
        prev.includes(ingredient)
          ? prev.filter((ing) => ing !== ingredient)
          : [...prev, ingredient],
      );
    }
  }

  return (
    <form className="flex flex-col gap-4" action={formAction} ref={formRef}>
      <FormItem
        label="Nombre de la comida"
        name="name"
        id="name"
        required
        defaultValue={state?.data?.name}
        error={state?.errors?.name}
      />

      <div className="grid w-full items-center gap-3">
        <Label htmlFor="unityType">Unidad</Label>
        <Select key={state?.success ? "reset" : "stable"} name="type" required>
          <SelectTrigger
            id="unityType"
            className="w-full"
            aria-invalid={Boolean(state?.errors?.unityType) || undefined}
          >
            <SelectValue placeholder="Selecciona unidad" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="breakfast">Desayuno</SelectItem>
            <SelectItem value="lunch">Almuerzo</SelectItem>
            <SelectItem value="dinner">Cena</SelectItem>
            <SelectItem value="snack">Snack</SelectItem>
          </SelectContent>
        </Select>
        {!state?.success && state?.errors?.unityType ? (
          <p className="text-red-500 text-sm font-bold">
            {state.errors.unityType}
          </p>
        ) : null}
      </div>

      <Command shouldFilter>
        <CommandInput placeholder="Buscar ingredientes..." />
        <CommandList className="max-h-40 mt-4 overflow-y-auto">
          <CommandEmpty>No se encontraron ingredientes.</CommandEmpty>
          {inventoryItems.map((ingredient) => {
            const isSelected = selectedIngredients.includes(ingredient);

            return (
              <CommandItem
                key={ingredient.id}
                className={cn(
                  "flex-1 data-[selected=true]:bg-primary/30",
                  isSelected && "bg-primary/30",
                )}
                value={String(ingredient.name)}
                onSelect={() => handleSelectIngredient(String(ingredient.id))}
              >
                {ingredient.name}
              </CommandItem>
            );
          })}
        </CommandList>
      </Command>

      <div className="flex flex-wrap gap-2">
        {selectedIngredients.map((ingredient) => (
          <FormItem
            key={ingredient.id}
            label={ingredient.name}
            name={`ingredients.${ingredient.id}`}
            id={`ingredients.${ingredient.id}`}
            required
            type="number"
            defaultValue={state?.data?.[`ingredients.${ingredient.id}`]}
            error={state?.errors?.[`ingredients.${ingredient.id}`]}
            placeholder={`Cantidad en ${formatUnit({ unityType: ingredient.unityType })}`}
          />
        ))}
      </div>

      <LoadingButton type="submit" size="lg" isLoading={isPending}>
        Añadir
      </LoadingButton>
    </form>
  );
}
