import type { z } from "zod";
import type { signUpSchema } from "@/app/features/auth/schemas/sign-up-schema";

export type SignUpType = z.infer<typeof signUpSchema>;
