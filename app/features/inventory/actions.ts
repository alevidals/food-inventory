"use server";

import z from "zod";
import { insertItemToInventory } from "@/app/features/inventory/queries";
import { insertInventorySchema } from "@/app/features/inventory/schema";
import type { InsertInventoryItem } from "@/app/features/inventory/types";
import type { ActionResponse } from "@/app/shared/types/action-response";

export async function insertItemToIventoryAction(
  _: unknown,
  formData: FormData,
): Promise<ActionResponse<InsertInventoryItem>> {
  const data = Object.fromEntries(
    formData.entries(),
  ) as unknown as InsertInventoryItem;

  const result = insertInventorySchema.safeParse(data);

  if (!result.success) {
    const flattened = z.flattenError(result.error);

    return {
      success: false,
      error: "Error de validación",
      errors: {
        name: flattened.fieldErrors.name?.[0],
        quantity: flattened.fieldErrors.quantity?.[0],
        threshold: flattened.fieldErrors.threshold?.[0],
        unityType: flattened.fieldErrors.unityType?.[0],
      },
      data,
    };
  }

  const insertedItem = await insertItemToInventory({ item: result.data });

  if (!insertedItem) {
    return {
      success: false,
      error: "Error al agregar el elemento al inventario",
      data: result.data,
    };
  }

  return {
    success: true,
    data: insertedItem,
  };
}
