"use client";

import React from "react";
import { PropsTable, type PropRow } from "./PropsTable";
import { CodeBlock } from "./CodeBlock";

interface ComponentDemoProps {
  name: string;
  description?: string;
  children: React.ReactNode;
  props?: PropRow[];
  code?: string;
}

export function ComponentDemo({ name, description, children, props, code }: ComponentDemoProps) {
  return (
    <div className="space-y-4 rounded-xl border border-border p-5">
      <div className="space-y-1">
        <h3 className="text-base font-semibold text-text-primary">{name}</h3>
        {description && (
          <p className="text-xs text-text-muted">{description}</p>
        )}
      </div>

      <div className="rounded-lg border border-border bg-background p-4">
        {children}
      </div>

      {props && props.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-medium text-text-muted uppercase tracking-wide">Props</p>
          <PropsTable props={props} />
        </div>
      )}

      {code && (
        <div className="space-y-2">
          <p className="text-xs font-medium text-text-muted uppercase tracking-wide">Uso</p>
          <CodeBlock code={code} />
        </div>
      )}
    </div>
  );
}
