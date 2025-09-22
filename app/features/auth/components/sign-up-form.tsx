"use client";

import { useActionState } from "react";
import { signUpAction } from "@/app/features/auth/actions";
import { FormItem } from "@/app/shared/components/form-item";
import { LoadingButton } from "@/app/shared/components/loading-button";
import { Button } from "@/app/shared/components/ui/button";

export function SignUpForm() {
  const [state, formAction, isPending] = useActionState(signUpAction, null);

  return (
    <form className="flex flex-col gap-4" action={formAction}>
      {state?.error ? (
        <p className="text-red-500 text-sm font-bold text-center">
          {state.error}
        </p>
      ) : null}
      <FormItem
        type="text"
        label="Nombre de Usuario"
        id="username"
        placeholder="Nombre de Usuario"
        name="username"
        defaultValue={state?.data?.username}
        error={state?.errors?.username}
      />
      <FormItem
        type="email"
        label="Email"
        id="email"
        placeholder="Email"
        name="email"
        defaultValue={state?.data?.email}
        error={state?.errors?.email}
      />
      <FormItem
        type="password"
        label="Contraseña"
        id="password"
        placeholder="Contraseña"
        name="password"
        defaultValue={state?.data?.password}
        error={state?.errors?.password}
      />
      <FormItem
        type="password"
        label="Confirmar Contraseña"
        id="confirm-password"
        placeholder="Confirmar Contraseña"
        name="confirmPassword"
        defaultValue={state?.data?.confirmPassword}
        error={state?.errors?.confirmPassword}
      />
      <LoadingButton type="submit" isLoading={isPending}>
        Registrarse
      </LoadingButton>
    </form>
  );
}
