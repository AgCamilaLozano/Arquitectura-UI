"use client";

import React from "react";
import { SectionLayout } from "../SectionLayout";
import { ComponentDemo } from "../ComponentDemo";
import { Avatar, AvatarImage, AvatarFallback } from "@/lib/components/ui/avatar";

export function AvatarSection() {
  return (
    <SectionLayout id="avatar" title="Avatar" description="Avatar con imagen o fallback, en 3 tamaños.">
      <ComponentDemo
        name="Avatar"
        description="Avatar con imagen y fallback automático"
        props={[
          { name: "size", type: '"sm" | "default" | "lg"', default: '"default"' },
        ]}
        code={`import { Avatar, AvatarImage, AvatarFallback } from "@agustin/ui/components";

<Avatar>
  <AvatarImage src="/avatar.jpg" alt="Usuario" />
  <AvatarFallback>AG</AvatarFallback>
</Avatar>`}
      >
        <div className="flex items-end gap-4">
          <div className="text-center space-y-2">
            <Avatar size="sm">
              <AvatarFallback>SM</AvatarFallback>
            </Avatar>
            <p className="text-xs text-text-muted">sm (24px)</p>
          </div>
          <div className="text-center space-y-2">
            <Avatar>
              <AvatarFallback>DF</AvatarFallback>
            </Avatar>
            <p className="text-xs text-text-muted">default (32px)</p>
          </div>
          <div className="text-center space-y-2">
            <Avatar size="lg">
              <AvatarFallback>LG</AvatarFallback>
            </Avatar>
            <p className="text-xs text-text-muted">lg (40px)</p>
          </div>
        </div>
      </ComponentDemo>
    </SectionLayout>
  );
}
