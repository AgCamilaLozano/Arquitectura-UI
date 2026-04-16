
import type { Metadata } from "next";
import "./globals.css";
import { Lato, Geist } from "next/font/google";
import localFont from "next/font/local";
import { ThemeProvider } from "@/components/ui/Tema/theme-provider";
import { Toaster } from "@/components/ui/Compuesto/Toaster";
import { CircleCheck, CircleAlert, TriangleAlert, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ui/Tema/ThemeToggle";

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

const neueMontreal = localFont({
  src: [
    {
      path: "../public/Fonts/NeueMontreal-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/Fonts/NeueMontreal-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/Fonts/NeueMontreal-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/Fonts/NeueMontreal-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/Fonts/NeueMontreal-Italic.woff2",
      weight: "900",
      style: "normal",
    },
    {
      path: "../public/Fonts/NeueMontreal-LightItalic.woff2",
      weight: "300",
      style: "italic",
    },
    {
      path: "../public/Fonts/NeueMontreal-MediumItalic.woff2",
      weight: "500",
      style: "italic",
    },
    {
      path: "../public/Fonts/NeueMontreal-BoldItalic.woff2",
      weight: "700",
      style: "italic",
    }
  ],
  variable: "--font-heading",
  display: "swap",
});


const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

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
    <html lang="es" className={cn("h-full", neueMontreal.variable, "font-sans", geist.variable)} suppressHydrationWarning data-scroll-behavior="smooth">
      <body className={` ${lato} bg-background h-full overflow-x-hidden scrollbar-soft`}>
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