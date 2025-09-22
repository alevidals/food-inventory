import { Toaster } from "@/app/shared/components/ui/sonner";
import { ActiveTabProvider } from "@/app/shared/providers/active-tab-provider";
import { TanstackQueryProvider } from "@/app/shared/providers/tanstack-query-provider";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ActiveTabProvider>
      <TanstackQueryProvider>{children}</TanstackQueryProvider>
      <Toaster />
    </ActiveTabProvider>
  );
}
