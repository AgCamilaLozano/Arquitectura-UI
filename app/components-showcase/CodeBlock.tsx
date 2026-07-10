"use client";

import React, { useState } from "react";
import { Copy, Check } from "lucide-react";

interface CodeBlockProps {
  code: string;
  language?: string;
}

export function CodeBlock({ code, language = "tsx" }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group rounded-lg border border-border overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-surface border-b border-border">
        <span className="text-xs font-medium text-text-muted uppercase">{language}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs text-text-muted hover:text-text-primary transition-colors"
        >
          {copied ? (
            <>
              <Check className="size-3.5" />
              Copiado
            </>
          ) : (
            <>
              <Copy className="size-3.5" />
              Copiar
            </>
          )}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto bg-background text-sm leading-relaxed">
        <code className="text-text-secondary font-mono">{code}</code>
      </pre>
    </div>
  );
}
