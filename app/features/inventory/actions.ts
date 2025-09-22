"use server";

import z from "zod";
import {
  deleteItemFromInventory,
  insertItemToInventory,
} from "@/app/features/inventory/queries";
import {
  deleteInventorySchema,
  insertInventorySchema,
} from "@/app/features/inventory/schema";
import type {
  DeleteInventoryItem,
  InsertInventoryItem,
} from "@/app/features/inventory/types";
import type { ActionResponse } from "@/app/shared/types/action-response";

export async function insertItemToInventoryAction(
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
  };
}

export async function deleteItemFromInventoryAction(
  _: unknown,
  formData: FormData,
): Promise<ActionResponse<DeleteInventoryItem>> {
  const data = Object.fromEntries(
    formData.entries(),
  ) as unknown as DeleteInventoryItem;

  const result = deleteInventorySchema.safeParse(data);

  if (!result.success) {
    return {
      success: false,
      error: "Error al eliminar el elemento del inventario",
    };
  }

  const deletedItem = await deleteItemFromInventory({ id: result.data.id });

  if (!deletedItem) {
    return {
      success: false,
      error: "Error al eliminar el elemento del inventario",
      data: result.data,
    };
  }

  return {
    success: true,
    message: "Elemento eliminado correctamente",
  };
}
