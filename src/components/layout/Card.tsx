"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/src/utils/utils";

export type CardVariant = "default" | "outlined" | "elevated" | "accent" | "ghost";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  clickable?: boolean;
  fullWidth?: boolean;
  asChild?: boolean;
}

/* CORREGIDO: Acoplamiento puro a las variables HSL de app/globals.css */
const variantClasses: Record<CardVariant, string> = {
  default: "bg-background border border-border hover:border-accent/40",
  outlined: "bg-background border border-accent/40",
  elevated: "bg-background border border-border shadow-card hover:shadow-floating",
  accent: "bg-background border border-border border-l-4 border-l-accent shadow-raised",
  ghost: "bg-surface border border-border/50 shadow-none",
};

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "default", clickable = false, fullWidth = false, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";
    
    return (
      <Comp
        ref={ref}
        className={cn(
          "rounded-md overflow-hidden bg-background text-text-primary transition-all duration-200 flex flex-col w-fit h-auto font-sans border border-transparent",
          variantClasses[variant],
          fullWidth && "w-full",
          clickable && [
            "cursor-pointer outline-none",
            "focus-visible:outline-none focus-visible:border-accent focus-visible:ring-4 focus-visible:ring-border-strong/20 focus-visible:ring-offset-0",
            "hover:-translate-y-0.5 active:scale-[0.99]"
          ],
          className
        )}
        {...props}
      />
    );
  }
);
Card.displayName = "Card";

// ─── Subcomponente: CardHeader ───────────────────────────────────────────────

export interface CardHeaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  action?: React.ReactNode;
  withDivider?: boolean;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

export function CardHeader({
  title,
  subtitle,
  action,
  withDivider = false,
  as: HeadingTag = "h4", // Por defecto h4 acorde a la escala visual de cards corporativas
  className,
  ...props
}: CardHeaderProps) {
  return (
    <div className={cn("p-5 pb-3 flex flex-col relative", className)} {...props}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <HeadingTag className="font-heading font-semibold text-lg leading-snug text-text-primary tracking-tight truncate">
            {title}
          </HeadingTag>
          {subtitle && (
            <p className="mt-1 text-sm text-text-secondary font-sans truncate">{subtitle}</p>
          )}
        </div>
        {action && <div className="shrink-0 flex items-center">{action}</div>}
      </div>
      {withDivider && <hr className="w-full rule-holo mt-3 absolute bottom-0 left-0" />}
    </div>
  );
}
CardHeader.displayName = "CardHeader";

// ─── Subcomponente: CardBody ─────────────────────────────────────────────────

export interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> {}

export function CardBody({ className, children, ...props }: CardBodyProps) {
  return (
    <div 
      className={cn("px-5 py-3 text-sm text-text-primary font-sans flex-1 leading-relaxed", className)} 
      {...props}
    >
      {children}
    </div>
  );
}
CardBody.displayName = "CardBody";

// ─── Subcomponente: CardFooter ───────────────────────────────────────────────

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: "left" | "center" | "right" | "between";
  withDivider?: boolean;
}

const footerAlignClasses: Record<NonNullable<CardFooterProps["align"]>, string> = {
  left: "justify-start",
  center: "justify-center",
  right: "justify-end",
  between: "justify-between",
};

export function CardFooter({
  align = "right",
  withDivider = false,
  className,
  children,
  ...props
}: CardFooterProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 px-5 py-4 mt-auto border-t border-transparent relative font-sans",
        footerAlignClasses[align],
        className
      )}
      {...props}
    >
      {withDivider && <div className="w-full rule-holo absolute top-0 left-0" />}
      {children}
    </div>
  );
}
CardFooter.displayName = "CardFooter";

// ─── Subcomponente: CardImage ────────────────────────────────────────────────

export interface CardImageProps extends React.HTMLAttributes<HTMLDivElement> {
  src: string;
  alt: string;
  height?: string;
  imgClassName?: string;
}

export function CardImage({
  src,
  alt,
  height = "200px",
  className,
  imgClassName,
  ...props
}: CardImageProps) {
  return (
    <div
      className={cn("w-full overflow-hidden bg-muted shrink-0 relative", className)}
      style={{ height }}
      {...props}
    >
      <img
        src={src}
        alt={alt}
        className={cn("w-full h-full object-cover transition-transform duration-300 hover:scale-105", imgClassName)}
        loading="lazy"
      />
    </div>
  );
}
CardImage.displayName = "CardImage";