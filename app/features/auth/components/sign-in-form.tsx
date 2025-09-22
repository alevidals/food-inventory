"use client";

import { useActionState } from "react";
import { signInAction } from "@/app/features/auth/actions";
import { FormItem } from "@/app/shared/components/form-item";
import { LoadingButton } from "@/app/shared/components/loading-button";
import { Button } from "@/app/shared/components/ui/button";

export function SignInForm() {
  const [state, formAction, isPending] = useActionState(signInAction, null);

  return (
    <form className="flex flex-col gap-4" action={formAction}>
      {state?.error ? (
        <p className="text-red-500 text-sm font-bold text-center">
          {state.error}
        </p>
      ) : null}
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
      <LoadingButton type="submit" isLoading={isPending}>
        Iniciar Sesión
      </LoadingButton>
    </form>
  );
}
