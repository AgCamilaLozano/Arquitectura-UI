"use client";

import React from "react";

interface SectionLayoutProps {
  id: string;
  title: string;
  description?: string;
  children: React.ReactNode;
}

export function SectionLayout({ id, title, description, children }: SectionLayoutProps) {
  return (
    <section id={id} className="scroll-mt-24 space-y-6">
      <div className="space-y-1">
        <h2 className="text-xl font-semibold text-text-primary">{title}</h2>
        {description && (
          <p className="text-sm text-text-secondary">{description}</p>
        )}
      </div>
      <div className="space-y-8">{children}</div>
    </section>
  );
}
