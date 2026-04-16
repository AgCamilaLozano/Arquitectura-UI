import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// lib/utils.ts
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export { cn };
