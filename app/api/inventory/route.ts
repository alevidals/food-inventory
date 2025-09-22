import { NextResponse } from "next/server";
import { getInventoryItems } from "@/app/features/inventory/queries";

export async function GET() {
  const items = await getInventoryItems();

  return NextResponse.json(items);
}
