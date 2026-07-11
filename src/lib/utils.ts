import { type ClassValue, clsx } from 'clsx';

/**
 * Merge Tailwind CSS classes with conflict resolution.
 * Simplified cn() — no tailwind-merge dependency to keep bundle small.
 * For this project, clsx alone is sufficient since we control all class names.
 */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}
