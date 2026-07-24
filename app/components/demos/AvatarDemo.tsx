"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@agustin/ui";
import { ComponentShowcase } from "../_components/ComponentShowcase";

export function AvatarDemo() {
  const [initials, setInitials] = useState("AG");

  return (
    <ComponentShowcase title="Avatar" description="Representacion visual de usuario o entidad">
      <div className="flex items-center gap-4">
        <Avatar className="h-10 w-10">
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <Avatar className="h-12 w-12">
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <Avatar className="h-16 w-16">
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
      </div>

      <div className="flex flex-wrap gap-4 text-xs">
        <div className="space-y-1">
          <label className="text-text-secondary font-medium">initials</label>
          <input value={initials} onChange={(e) => setInitials(e.target.value)} className="block rounded-sm border border-border bg-background px-2 py-1 text-xs text-text-primary w-20" />
        </div>
      </div>
    </ComponentShowcase>
  );
}
