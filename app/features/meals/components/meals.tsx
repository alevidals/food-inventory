import { useState } from "react";
import { AddMealForm } from "@/app/features/meals/components/add-meal-form";
import { useMeals } from "@/app/features/meals/hooks";
import { ResponsiveAddDialog } from "@/app/shared/components/responsive-add-dialog";
import { Button } from "@/app/shared/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/shared/components/ui/tabs";

const TABS = [
  { value: "breakfast", label: "Desayuno" },
  { value: "lunch", label: "Almuerzo" },
  { value: "dinner", label: "Cena" },
  { value: "snack", label: "Snack" },
] as const;

export function Meals() {
  const [isOpen, setIsOpen] = useState(false);
  const { data } = useMeals();

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Mis comidas</h2>
        <ResponsiveAddDialog
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          type="add"
          title="Añadir comida"
          description="Añade una nueva comida a tu plan diario"
          trigger={
            <Button type="button" size="lg">
              Añadir comida
            </Button>
          }
        >
          <AddMealForm
            onSave={() => {
              setIsOpen(false);
            }}
          />
        </ResponsiveAddDialog>
      </div>
      <Tabs defaultValue="breakfast">
        <TabsList className="w-full bg-muted/60 dark:bg-muted/40 backdrop-blur supports-[backdrop-filter]:bg-muted/40">
          {TABS.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="
                data-[state=active]:bg-primary data-[state=active]:text-primary-foreground
                data-[state=active]:shadow-sm data-[state=active]:border-border
                hover:text-primary focus-visible:text-primary dark:hover:text-primary-foreground/90
                transition-colors
              "
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="breakfast" className="mt-4">
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </TabsContent>
        <TabsContent value="lunch" className="mt-4">
          2
        </TabsContent>
        <TabsContent value="dinner" className="mt-4">
          3
        </TabsContent>
        <TabsContent value="snack" className="mt-4">
          4
        </TabsContent>
      </Tabs>
    </div>
  );
}
