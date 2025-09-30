import { z } from "zod";

export const insertMealSchema = z
  .object({
    name: z.string().min(1, "El nombre es obligatorio"),
    type: z.enum(["breakfast", "lunch", "dinner", "snack"], {
      message: "El tipo es obligatorio",
    }),
  })
  .catchall(z.string().min(1, "La cantidad es obligatoria"));
