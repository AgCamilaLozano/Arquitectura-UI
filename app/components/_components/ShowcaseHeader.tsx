"use client";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

const categories = [
  { id: "action", label: "Action" },
  { id: "form", label: "Form" },
  { id: "layout", label: "Layout" },
  { id: "navigation", label: "Navigation" },
  { id: "feedback", label: "Feedback" },
  { id: "data", label: "Data Display" },
  { id: "charts", label: "Charts" },
  { id: "date", label: "Date/Time" },
  { id: "tenant", label: "Tenant" },
];

export function ShowcaseHeader() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  function scrollTo(id: string) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
        <span className="text-sm font-bold font-heading text-text-primary tracking-tight">
          @agustin/ui
        </span>

        <nav className="hidden items-center gap-1 lg:flex">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => scrollTo(cat.id)}
              className="rounded-sm px-3 py-1.5 text-xs font-medium text-text-secondary transition-colors hover:bg-accent-soft hover:text-text-primary"
            >
              {cat.label}
            </button>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="flex h-9 w-9 items-center justify-center rounded-sm border border-border bg-surface text-text-primary transition-colors hover:bg-accent-soft hover:border-border-strong"
        >
          {mounted && theme === "dark" ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="5" />
              <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
            </svg>
          )}
        </button>
      </div>
    </header>
  );
}
