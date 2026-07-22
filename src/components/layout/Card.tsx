"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/src/utils/utils";

/* ==========================================================================
   TIPOS & VARIANTES VISUALES
   ========================================================================== */

export type CardVariant =
  | "default"
  | "outlined"
  | "elevated"
  | "accent"
  | "ghost";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  clickable?: boolean;
  fullWidth?: boolean;
  asChild?: boolean;
}

/* Mapeo estricto a tokens de globals.css (Manual v2.0) */
const variantClasses: Record<CardVariant, string> = {
  default:
    "bg-background border border-border hover:border-border-strong/40",
  outlined: "bg-background border border-accent/40",
  elevated:
    "bg-background border border-border shadow-card hover:shadow-md",
  accent:
    "bg-background border border-border border-l-4 border-l-accent shadow-xs",
  ghost: "bg-surface border border-border/60 shadow-none",
};

/* ==========================================================================
   COMPONENTE RAÍZ: CARD
   ========================================================================== */

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant = "default",
      clickable = false,
      fullWidth = false,
      asChild = false,
      tabIndex,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "div";

    return (
      <Comp
        ref={ref}
        tabIndex={clickable && !asChild ? tabIndex ?? 0 : tabIndex}
        className={cn(
          "rounded-sm overflow-visible bg-background text-text-primary transition-all duration-200 flex flex-col font-sans",
          fullWidth ? "w-full" : "w-fit",
          variantClasses[variant],
          clickable && [
            "cursor-pointer outline-none select-none",
            /* Física de enfoque unificada (Glow Effect) de AGUSTIN */
            "focus-visible:outline-none focus-visible:border-border-strong focus-visible:ring-4 focus-visible:ring-border-strong/20 focus-visible:ring-offset-0",
            "hover:-translate-y-0.5 active:scale-[0.99]",
          ],
          className
        )}
        {...props}
      />
    );
  }
);
Card.displayName = "Card";

/* ==========================================================================
   SUBCOMPONENTE: CARD HEADER
   ========================================================================== */

export interface CardHeaderProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
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
  as: HeadingTag = "h4",
  className,
  ...props
}: CardHeaderProps) {
  return (
    <div
      className={cn(
        "p-5 pb-3 flex flex-col relative",
        withDivider && "border-b border-border pb-4",
        className
      )}
      {...props}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <HeadingTag className="font-heading font-semibold text-body-base leading-snug text-text-primary tracking-tight truncate">
            {title}
          </HeadingTag>
          {subtitle && (
            <p className="mt-1 text-caption text-text-secondary font-sans truncate leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
        {action && <div className="shrink-0 flex items-center">{action}</div>}
      </div>
    </div>
  );
}
CardHeader.displayName = "CardHeader";

/* ==========================================================================
   SUBCOMPONENTE: CARD BODY
   ========================================================================== */

export interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> {}

export function CardBody({ className, children, ...props }: CardBodyProps) {
  return (
    <div
      className={cn(
        "px-5 py-3 text-body-dense text-text-primary font-sans flex-1 leading-relaxed",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
CardBody.displayName = "CardBody";

/* ==========================================================================
   SUBCOMPONENTE: CARD FOOTER
   ========================================================================== */

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: "left" | "center" | "right" | "between";
  withDivider?: boolean;
}

const footerAlignClasses: Record<
  NonNullable<CardFooterProps["align"]>,
  string
> = {
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
        "flex items-center gap-2 px-5 py-4 mt-auto font-sans text-body-dense",
        withDivider && "border-t border-border",
        footerAlignClasses[align],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
CardFooter.displayName = "CardFooter";

/* ==========================================================================
   SUBCOMPONENTE: CARD IMAGE
   ========================================================================== */

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
      className={cn(
        "w-full overflow-hidden bg-surface shrink-0 relative border-b border-border/40",
        className
      )}
      style={{ height }}
      {...props}
    >
      <img
        src={src}
        alt={alt}
        className={cn(
          "w-full h-full object-cover transition-transform duration-300 hover:scale-105",
          imgClassName
        )}
        loading="lazy"
      />
    </div>
  );
}
CardImage.displayName = "CardImage";