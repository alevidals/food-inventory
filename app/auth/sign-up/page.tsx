import Link from "next/link";
import { SignUpForm } from "@/app/features/auth/components/sign-up-form";

export default async function SignUp() {
  return (
    <main>
      <h1 className="text-xl font-bold mb-4 text-violet-500 text-center">
        ¡Bienvenido al gestor de comidas!
      </h1>
      <SignUpForm />
      <p className="mt-4 text-sm">
        ¿Ya tienes una cuenta?{" "}
        <Link href="/auth/sign-in" className="text-violet-500 hover:underline">
          Inicia sesión aquí
        </Link>
      </p>
    </main>
  );
}
