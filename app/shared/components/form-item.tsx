import type { ComponentProps } from "react";
import { Input } from "@/app/shared/components/ui/input";
import { Label } from "@/app/shared/components/ui/label";

type Props = ComponentProps<"input"> & {
  label: string;
  error?: string;
};

export function FormItem({ label, error, ...rest }: Props) {
  return (
    <div className="grid w-full items-center gap-3">
      <Label htmlFor={rest.id}>{label}</Label>
      <Input {...rest} />
      {error && <p className="text-red-500 text-sm font-bold">{error}</p>}
    </div>
  );
}
