"use client";

import { type Dispatch, type SetStateAction, useActionState } from "react";
import { toast } from "sonner";
import { LoadingButton } from "@/app/shared/components/loading-button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/app/shared/components/ui/alert-dialog";
import { Button } from "@/app/shared/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/app/shared/components/ui/drawer";
import { useMediaQuery } from "@/app/shared/hooks/use-media-query";
import type { ActionResponse } from "@/app/shared/types/action-response";

type Props<T> = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  title?: string;
  description: string;
  itemId: string | number;
  itemName: string;
  itemFormName: string;
  action: (_: unknown, formData: FormData) => Promise<ActionResponse<T>>;
  onSuccess?: () => Promise<void>;
};

export function ResponsiveDeleteDialog<T>({
  isOpen,
  setIsOpen,
  title,
  description,
  itemId,
  itemName,
  itemFormName,
  action,
  onSuccess,
}: Props<T>) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const [_, formAction, isPending] = useActionState(
    async (_: unknown, formData: FormData) => {
      const response = await action(_, formData);

      if (response.success) {
        setIsOpen(false);
        toast.success(response.message);
        if (onSuccess) {
          await onSuccess();
        }
        return null;
      }

      toast.error(response.error);
      return null;
    },
    null
  );

  if (isDesktop) {
    return (
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {title ?? "¿Estás seguro de que deseas continuar?"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {description}{" "}
              <strong className="text-destructive">{itemName}</strong>.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <form action={formAction}>
              <input type="hidden" name={itemFormName} value={String(itemId)} />
              <AlertDialogAction asChild>
                <LoadingButton
                  isLoading={isPending}
                  type="submit"
                  className="w-full md:w-fit"
                >
                  Continuar
                </LoadingButton>
              </AlertDialogAction>
            </form>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>{title}</DrawerTitle>
          <DrawerDescription>
            {description}{" "}
            <strong className="text-destructive">{itemName}</strong>.
          </DrawerDescription>
        </DrawerHeader>
        <form action={formAction} className="px-4">
          {/* Hidden field to ensure the id is always included in FormData */}
          <input type="hidden" name={itemFormName} value={String(itemId)} />
          <LoadingButton
            isLoading={isPending}
            name={itemFormName}
            value={itemId}
            type="submit"
            className="w-full md:w-fit"
          >
            Continue
          </LoadingButton>
        </form>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
