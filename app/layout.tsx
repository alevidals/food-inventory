import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ActiveTabProvider } from "@/app/shared/providers/active-tab-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Inventario de comidas",
  description: "Gestiona fácilmente tu inventario de comidas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* TODO: move this provider to a separate layout component to only load this if user is signed-in */}
        <ActiveTabProvider>{children}</ActiveTabProvider>
      </body>
    </html>
  );
}
