import { db } from "@/app/shared/db/drizzle";
import { auth } from "@/app/shared/lib/auth";

type ExistsUserParams = {
  email: string;
};

export async function existsUserQuery({ email }: ExistsUserParams) {
  try {
    const data = await db.query.usersSchema.findFirst({
      where: (usersSchema, { eq }) => eq(usersSchema.email, email),
    });

    return !!data;
  } catch (error) {
    console.error("Error checking if user exists:", error);

    throw new Error("Error checking if user exists");
  }
}

type SignUpQueryParams = {
  username: string;
  email: string;
  password: string;
};

export async function signUpQuery({
  username,
  email,
  password,
}: SignUpQueryParams) {
  try {
    return await auth.api.signUpEmail({
      body: {
        name: username,
        email,
        password,
      },
    });
  } catch (error) {
    console.error("Error during sign-up:", error);
    return null;
  }
}

type SignInQueryParams = {
  email: string;
  password: string;
};

export async function signInQuery({ email, password }: SignInQueryParams) {
  try {
    return await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });
  } catch (error) {
    console.error("Error during sign-in:", error);
    return null;
  }
}
