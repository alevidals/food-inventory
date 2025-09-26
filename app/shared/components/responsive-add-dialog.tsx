"use client";

import type { Dispatch, ReactNode, SetStateAction } from "react";
import { Button } from "@/app/shared/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/shared/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/app/shared/components/ui/drawer";
import { ScrollArea } from "@/app/shared/components/ui/scroll-area";
import { useMediaQuery } from "@/app/shared/hooks/use-media-query";

type Props = {
  title?: string;
  description?: string;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
  trigger?: ReactNode;
  type: "add" | "edit";
};

export function ResponsiveAddDialog({
  title,
  description,
  children,
  trigger,
  type,
  isOpen,
  setIsOpen,
}: Props) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const finalTitle = title
    ? title
    : type === "edit"
      ? "Editar ítem"
      : "Añadir ítem";

  const finalDescription = description
    ? description
    : type === "edit"
      ? "Aquí puedes editar un ítem de tu inventario."
      : "Aquí puedes añadir un nuevo ítem a tu inventario.";

  if (isDesktop) {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{finalTitle}</DialogTitle>
            <DialogDescription>{finalDescription}</DialogDescription>
          </DialogHeader>
          {children}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent>
        <ScrollArea className="overflow-y-auto">
          <DrawerHeader className="text-left">
            <DrawerTitle>{finalTitle}</DrawerTitle>
            <DrawerDescription>{finalDescription}</DrawerDescription>
          </DrawerHeader>
          <div className="px-4">{children}</div>
          <DrawerFooter className="pt-2">
            <DrawerClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DrawerClose>
          </DrawerFooter>
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  );
}
