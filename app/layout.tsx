
import type { Metadata } from "next";
import './globals.css'; // Los estilos de la app de pruebas (donde está @import "tailwindcss")
import '../lib/styles/globals.css'; // Los estilos globales propios de tu librería
import '../lib/styles/fonts.css';
import { Lato, Geist } from "next/font/google";
import localFont from "next/font/local";
import { ThemeProvider } from "@/lib/components/ui/Tema/theme-provider";
import { Toaster } from "@/lib/components/ui/Compuesto/Toaster";
import { CircleCheck, CircleAlert, TriangleAlert, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/lib/components/ui/Tema/ThemeToggle";


export const metadata: Metadata = {
  title: "Arquitectura-UI",
  description: "Arquitectura de diseño.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="es" className={cn("h-full")} suppressHydrationWarning data-scroll-behavior="smooth">
      <body className={`bg-background h-full overflow-x-hidden scrollbar-soft`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <header className="w-full h-[70px] border-b border-border-sidebar flex items-center justify-between px-4 md:px-8">
            <div></div>
            <ThemeToggle />
          </header>
          <Toaster />
          {children}
        </ThemeProvider>
      </body >
    </html >
  );
}