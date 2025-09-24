import { redirect } from "next/navigation";
import { Main } from "@/app/shared/components/main";
import { Navbar } from "@/app/shared/components/navbar";
import { getSession } from "@/app/shared/lib/auth";

export default async function Home() {
  const session = await getSession();

  if (!session) redirect("/auth/sign-in");

  return (
    <div className="h-dvh flex flex-col">
      <header className="flex items-center h-16 bg-primary/70 border-b border-b-primary px-12 shrink-0">
        <div className="container mx-auto">
          <h1>Gestión de dieta</h1>
        </div>
      </header>
      <div className="flex-1 overflow-y-auto">
        <Main />
      </div>
      <Navbar />
    </div>
  );
}
