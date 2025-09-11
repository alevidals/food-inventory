import Link from "next/link";
import { SignInForm } from "@/app/features/auth/components/sign-in-form";

export default async function SignInPage() {
  return (
    <main>
      <h1 className="text-xl font-bold mb-4 text-violet-500 text-center">
        ¡Bienvenido al gestor de comidas!
      </h1>
      <SignInForm />
      <p className="mt-4 text-sm">
        ¿No tienes una cuenta?{" "}
        <Link href="/auth/sign-up" className="text-violet-500 hover:underline">
          Regístrate aquí
        </Link>
      </p>
    </main>
  );
}
