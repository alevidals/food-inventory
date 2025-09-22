import type { z } from "zod";
import type { signInSchema, signUpSchema } from "@/app/features/auth/schemas";

export type SignUpType = z.infer<typeof signUpSchema>;

export type SignInType = z.infer<typeof signInSchema>;
