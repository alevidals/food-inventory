import type { ingredientsSchema } from "@/app/shared/db/schema";

export type InventoryItem = Omit<
  typeof ingredientsSchema.$inferSelect,
  "userId"
>;

export type InsertInventoryItem = Omit<
  typeof ingredientsSchema.$inferInsert,
  "userId"
>;
