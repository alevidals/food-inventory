"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { existsUserQuery, signInQuery, signUpQuery } from "@/app/features/auth/queries";
import { signInSchema, signUpSchema } from "@/app/features/auth/schemas";
import type { SignInType, SignUpType } from "@/app/features/auth/types";
import type { ActionResponse } from "@/app/shared/types/action-response";

export async function signUpAction(
  _: unknown,
  formData: FormData,
): Promise<ActionResponse<SignUpType>> {
  const data = Object.fromEntries(formData.entries()) as SignUpType;

  const result = signUpSchema.safeParse(data);

  if (!result.success) {
    const flattened = z.flattenError(result.error);

    return {
      success: false,
      error: "Error de validación",
      errors: {
        username: flattened.fieldErrors.username?.[0],
        email: flattened.fieldErrors.email?.[0],
        password: flattened.fieldErrors.password?.[0],
        confirmPassword: flattened.fieldErrors.confirmPassword?.[0],
      },
      data,
    };
  }

  const existsUser = await existsUserQuery({ email: result.data.email });

  if (existsUser) {
    return {
      success: false,
      error: "Ya existe una cuenta con este correo electrónico.",
      data,
    };
  }

  const signUpData = await signUpQuery({
    email: result.data.email,
    username: result.data.username,
    password: result.data.password,
  });

  if (!signUpData) {
    return {
      success: false,
      error: "Error del servidor. Inténtalo de nuevo más tarde.",
      data,
    };
  }

  redirect("/");
}

export async function signInAction(
  _: unknown,
  formData: FormData,
): Promise<ActionResponse<SignInType>> {
  const data = Object.fromEntries(formData.entries()) as SignInType;

  const result = signInSchema.safeParse(data);

  if (!result.success) {
    const flattened = z.flattenError(result.error);

    return {
      success: false,
      error: "Error de validación",
      errors: {
        email: flattened.fieldErrors.email?.[0],
        password: flattened.fieldErrors.password?.[0],
      },
      data,
    };
  }

  const existsUser = await existsUserQuery({ email: result.data.email });

  if (!existsUser) {
    return {
      success: false,
      error: "No existe una cuenta con este correo electrónico.",
      data,
    };
  }

  const signInData = await signInQuery({
    email: result.data.email,
    password: result.data.password,
  });

  if (!signInData) {
    return {
      success: false,
      error: "Error del servidor. Inténtalo de nuevo más tarde.",
      data,
    };
  }

  redirect("/");
}