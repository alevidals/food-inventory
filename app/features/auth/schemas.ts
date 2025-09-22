import { z } from "zod";

export const signUpSchema = z
  .object({
    username: z
      .string()
      .min(3, "El nombre de usuario debe tener al menos 3 caracteres"),
    email: z.email("El email no es válido"),
    password: z
      .string()
      .min(6, "La contraseña debe tener al menos 6 caracteres")
      .max(100, "La contraseña no puede tener más de 100 caracteres"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

export const signInSchema = z.object({
  email: z.email("El email no es válido"),
  password: z.string(),
});
