"use server";

import { eq } from "drizzle-orm";
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
      orderBy: (ingredientsSchema, { desc }) => [
        desc(ingredientsSchema.createdAt),
      ],
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

type DeleteItemFromInventoryParams = {
  id: InventoryItem["id"];
};

export async function deleteItemFromInventory({
  id,
}: DeleteItemFromInventoryParams) {
  const session = await getSession();

  if (!session) redirect("/auth/sign-in");

  try {
    const itemBelongsToUser = await belongsItemToUser({
      id,
      userId: session.user.id,
    });

    if (!itemBelongsToUser) {
      throw new Error("Item does not belong to the user");
    }

    await db.delete(ingredientsSchema).where(eq(ingredientsSchema.id, id));

    return true;
  } catch (error) {
    console.error("Error deleting item from inventory:", error);
    return false;
  }
}

type BelongsItemToUserParams = {
  id: number;
  userId: string;
};

export async function belongsItemToUser({
  id,
  userId,
}: BelongsItemToUserParams) {
  try {
    const item = await db.query.ingredientsSchema.findFirst({
      where: (ingredientsSchema, { eq, and }) =>
        and(eq(ingredientsSchema.id, id), eq(ingredientsSchema.userId, userId)),
      columns: {
        id: true,
      },
    });

    return !!item;
  } catch (error) {
    console.error("Error checking item ownership:", error);
    return false;
  }
}
