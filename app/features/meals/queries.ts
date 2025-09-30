import { redirect } from "next/navigation";
import type { InsertMeal } from "@/app/features/meals/types";
import { db } from "@/app/shared/db/drizzle";
import { mealsSchema } from "@/app/shared/db/schema";
import { getSession } from "@/app/shared/lib/auth";

export async function getMeals() {
  const session = await getSession();

  if (!session) redirect("/auth/sign-in");

  try {
    const items = await db.query.mealsSchema.findMany({
      columns: {
        id: true,
        name: true,
        type: true,
        quantity: true,
      },
      with: {
        ingredient: {
          columns: {
            id: true,
            name: true,
            unityType: true,
          },
        },
      },
    });

    const parsedItems = Object.groupBy(items, (item) => item.name);

    return parsedItems;
  } catch (error) {
    console.error("Error fetching meals:", error);
    return [];
  }
}

type InsertMealParams = {
  meal: InsertMeal;
};

export async function insertMeal({ meal }: InsertMealParams) {
  const session = await getSession();

  if (!session) redirect("/auth/sign-in");

  const meals = Object.entries(meal)
    .filter(([key]) => key.startsWith("ingredients."))
    .map(([key, value]) => {
      const id = key.split(".")[1];
      return {
        name: meal.name,
        quantity: Number(value),
        ingredientId: Number(id),
        type: meal.type,
        userId: session.user.id,
      };
    });

  try {
    return await db.insert(mealsSchema).values(meals).returning().get();
  } catch (error) {
    console.error("Error inserting meal:", error);

    return null;
  }
}
