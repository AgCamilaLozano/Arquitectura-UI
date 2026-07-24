import type { ReactNode } from "react";

interface CategorySectionProps {
  id: string;
  title: string;
  description: string;
  children: ReactNode;
}

export function CategorySection({
  id,
  title,
  description,
  children,
}: CategorySectionProps) {
  return (
    <section id={id} className="scroll-mt-20 space-y-6">
      <div>
        <h2 className="text-2xl font-bold font-heading text-text-primary tracking-tight">
          {title}
        </h2>
        <p className="mt-1 text-sm text-text-secondary">
          {description}
        </p>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        {children}
      </div>
    </section>
  );
}
