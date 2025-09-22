import { createSchemaFactory } from "drizzle-zod";
import { ingredientsSchema } from "@/app/shared/db/schema";

const { createInsertSchema } = createSchemaFactory({
  coerce: {
    number: true,
  },
});

export const insertInventorySchema = createInsertSchema(ingredientsSchema, {
  userId: (schema) => schema.optional(),
});
