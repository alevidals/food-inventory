import { useSuspenseQuery } from "@tanstack/react-query";

async function fetchMeals() {
  try {
    const response = await fetch("/api/meals");

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const items = await response.json();

    return items;
  } catch (error) {
    console.error("Error fetching meals:", error);
    return [];
  }
}

export function useMeals() {
  return useSuspenseQuery({
    queryKey: ["meals"],
    queryFn: fetchMeals,
  });
}
