"use server";

import { z } from "zod";
import { insertMeal } from "@/app/features/meals/queries";
import { insertMealSchema } from "@/app/features/meals/schema";
import type { InsertMeal } from "@/app/features/meals/types";
import type { ActionResponse } from "@/app/shared/types/action-response";

export async function insertMealAction(
  _: unknown,
  formData: FormData,
): Promise<ActionResponse<InsertMeal>> {
  const data = Object.fromEntries(formData.entries()) as InsertMeal;

  const result = insertMealSchema.safeParse(data);

  if (!result.success) {
    const flattened = z.flattenError(result.error);

    const errors = Object.fromEntries(
      Object.entries(flattened.fieldErrors).map(([key, value]) => [
        key,
        value?.[0],
      ]),
    );

    return {
      success: false,
      error: "Error de validación",
      errors,
      data,
    };
  }

  const insertedMeal = await insertMeal({ meal: result.data });

  if (!insertedMeal) {
    return {
      success: false,
      error: "Error al agregar la comida",
      data: result.data,
    };
  }

  return {
    success: true,
  };
}
