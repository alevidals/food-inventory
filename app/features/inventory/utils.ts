import type { InventoryItem } from "@/app/features/inventory/types";

type FormatUnitParams = {
  unityType: InventoryItem["unityType"];
};

export function formatUnit({ unityType }: FormatUnitParams) {
  const UNITY_TYPES: Record<InventoryItem["unityType"], string> = {
    unit: "unidad(es)",
    gr: "gramo(s)",
    ml: "mililitro(s)",
    kg: "kilogramo(s)",
    l: "litro(s)",
  };

  return UNITY_TYPES[unityType];
}
