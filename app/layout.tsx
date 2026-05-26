
import type { Metadata } from "next";
import './globals.css'; 
import { ThemeProvider } from "@/lib/components/ui/Tema/theme-provider";
import { cn } from "@/lib/utils";
import LayoutApp from "./LayoutApp";

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

        <div className="flex flex-row h-screen w-screen overflow-hidden bg-background">
  
          <LayoutApp>
            {children}
              
          </LayoutApp>
          
        
        </div>
        </ThemeProvider>
      </body >
    </html >
  );
}