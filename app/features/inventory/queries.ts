"use server";

import { redirect } from "next/navigation";
import type {
  InsertInventoryItem,
  InventoryItem,
} from "@/app/features/inventory/types";
import { db } from "@/app/shared/db/drizzle";
import { ingredientsSchema } from "@/app/shared/db/schema";
import { getSession } from "@/app/shared/lib/auth";

export async function getInventoryItems(): Promise<InventoryItem[]> {
  const session = await getSession();

  if (!session) redirect("/auth/sign-in");

  try {
    const items = await db.query.ingredientsSchema.findMany({
      columns: {
        id: true,
        name: true,
        quantity: true,
        threshold: true,
        unityType: true,
      },
      where: (ingredientsSchema, { eq }) =>
        eq(ingredientsSchema.userId, session.user.id),
    });

    return items;
  } catch (error) {
    console.error("Error fetching inventory items:", error);
    return [];
  }
}

type InsertItemToInventoryParams = {
  item: InsertInventoryItem;
};

export async function insertItemToInventory({
  item,
}: InsertItemToInventoryParams) {
  const session = await getSession();

  if (!session) redirect("/auth/sign-in");

  try {
    return await db
      .insert(ingredientsSchema)
      .values({
        ...item,
        userId: session.user.id,
      })
      .returning()
      .get();
  } catch (error) {
    console.error("Error adding item to inventory:", error);
  }
}
