
import type { Metadata } from "next";
import "../lib/styles/globals.css";
import { Lato, Geist } from "next/font/google";
import localFont from "next/font/local";
import { ThemeProvider } from "@/components/ui/Tema/theme-provider";
import { Toaster } from "@/components/ui/Compuesto/Toaster";
import { CircleCheck, CircleAlert, TriangleAlert, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ui/Tema/ThemeToggle";


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