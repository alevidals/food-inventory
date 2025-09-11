import { auth } from "@/app/shared/lib/auth";

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
    const data = await auth.api.signUpEmail({
      body: {
        name: username,
        email,
        password,
      },
    });

    return data;
  } catch (error) {
    console.error("Error during sign-up:", error);

    return null;
  }
}
