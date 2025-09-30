import { NextResponse } from "next/server";
import { getMeals } from "@/app/features/meals/queries";

export async function GET() {
  const items = await getMeals();

  return NextResponse.json(items);
}
