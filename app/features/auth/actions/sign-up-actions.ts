"use server";

import { redirect } from "next/navigation";
import z from "zod";
import { signUpQuery } from "@/app/features/auth/queries/sign-up-queries";
import { signUpSchema } from "@/app/features/auth/schemas/sign-up-schema";
import type { SignUpType } from "@/app/features/auth/types/sign-up-type";
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
