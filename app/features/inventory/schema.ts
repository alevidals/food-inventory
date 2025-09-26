import { createSchemaFactory } from "drizzle-zod";
import { z } from "zod";
import { ingredientsSchema } from "@/app/shared/db/schema";

const { createInsertSchema } = createSchemaFactory({
  coerce: {
    number: true,
  },
});

export const insertInventorySchema = createInsertSchema(ingredientsSchema, {
  userId: (schema) => schema.optional(),
});

export const updateInventorySchema = createInsertSchema(ingredientsSchema, {
  userId: (schema) => schema.optional(),
  name: (schema) => schema.optional(),
  quantity: (schema) => schema.optional(),
  threshold: (schema) => schema.optional(),
  unityType: (schema) => schema.optional(),
}).extend({
  id: z.coerce.number().positive(),
});

export const deleteInventorySchema = createInsertSchema(ingredientsSchema, {
  id: (schema) => schema,
  createdAt: (schema) => schema.optional(),
  name: (schema) => schema.optional(),
  quantity: (schema) => schema.optional(),
  threshold: (schema) => schema.optional(),
  unityType: (schema) => schema.optional(),
  userId: (schema) => schema.optional(),
});
