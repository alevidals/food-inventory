import type { z } from "zod";
import type { insertMealSchema } from "@/app/features/meals/schema";
import type { mealsSchema } from "@/app/shared/db/schema";

export type Meal = Omit<
  typeof mealsSchema.$inferSelect,
  "ingredientId" | "createdAt"
>;

export type InsertMeal = z.infer<typeof insertMealSchema>;
