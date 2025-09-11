"use client";

import { useActionState } from "react";
import { signUpAction } from "@/app/features/auth/actions/sign-up-actions";
import { Button } from "@/app/shared/components/ui/button";
import { Input } from "@/app/shared/components/ui/input";
import { Label } from "@/app/shared/components/ui/label";

export function SignUpForm() {
  const [state, formAction, isPending] = useActionState(signUpAction, null);

  // TODO: Handle errors and display them to the user
  return (
    <form className="flex flex-col gap-4" action={formAction}>
      <div className="grid w-full max-w-sm items-center gap-3">
        <Label htmlFor="username">Nombre de Usuario</Label>
        <Input
          type="text"
          id="username"
          placeholder="Nombre de Usuario"
          name="username"
          defaultValue={state?.data?.username}
        />
      </div>
      <div className="grid w-full max-w-sm items-center gap-3">
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          id="email"
          placeholder="Email"
          name="email"
          defaultValue={state?.data?.email}
        />
      </div>
      <div className="grid w-full max-w-sm items-center gap-3">
        <Label htmlFor="password">Contraseña</Label>
        <Input
          type="password"
          id="password"
          placeholder="Contraseña"
          name="password"
          defaultValue={state?.data?.password}
        />
      </div>
      <div className="grid w-full max-w-sm items-center gap-3">
        <Label htmlFor="confirm-password">Confirmar Contraseña</Label>
        <Input
          type="password"
          id="confirm-password"
          placeholder="Confirmar Contraseña"
          name="confirmPassword"
          defaultValue={state?.data?.confirmPassword}
        />
      </div>
      <Button type="submit" className="bg-violet-500" disabled={isPending}>
        Registrarse
      </Button>
    </form>
  );
}
