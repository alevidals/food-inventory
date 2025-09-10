import { Button } from "@/app/shared/components/ui/button";
import { Input } from "@/app/shared/components/ui/input";
import { Label } from "@/app/shared/components/ui/label";

export function SignUpForm() {
  return (
    <form className="flex flex-col gap-4">
      <div className="grid w-full max-w-sm items-center gap-3">
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" placeholder="Email" />
      </div>
      <div className="grid w-full max-w-sm items-center gap-3">
        <Label htmlFor="password">Contraseña</Label>
        <Input type="password" id="password" placeholder="Contraseña" />
      </div>
      <div className="grid w-full max-w-sm items-center gap-3">
        <Label htmlFor="confirm-password">Confirmar Contraseña</Label>
        <Input
          type="password"
          id="confirm-password"
          placeholder="Confirmar Contraseña"
        />
      </div>
      <Button type="submit">Registrarse</Button>
    </form>
  );
}
