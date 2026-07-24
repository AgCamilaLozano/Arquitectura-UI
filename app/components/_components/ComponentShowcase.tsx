"use client";

import { Card, CardBody, CardHeader } from "@agustin/ui";
import type { ReactNode } from "react";

interface ComponentShowcaseProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export function ComponentShowcase({
  title,
  description,
  children,
}: ComponentShowcaseProps) {
  return (
    <Card variant="outlined" className="w-full">
      <CardHeader
        title={title}
        subtitle={description}
        as="h4"
        withDivider
      />
      <CardBody className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          {children}
        </div>
      </CardBody>
    </Card>
  );
}
