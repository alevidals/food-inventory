import type { ComponentProps } from "react";
import { Input } from "@/app/shared/components/ui/input";
import { Label } from "@/app/shared/components/ui/label";

type Props = ComponentProps<"input"> & {
  label: string;
  description?: string;
  error?: string;
};

export function FormItem({ label, description, error, ...rest }: Props) {
  return (
    <div className="grid w-full items-center gap-3">
      <Label htmlFor={rest.id ?? rest.name}>{label}</Label>
      <Input {...rest} id={rest.id ?? rest.name} />
      {description ? (
        <p className="text-sm text-muted-foreground">{description}</p>
      ) : null}
      {error && <p className="text-red-500 text-sm font-bold">{error}</p>}
    </div>
  );
}
