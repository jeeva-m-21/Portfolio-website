/**
 * Simple typed event bus for cross-component communication.
 * Replaces fragile module-level mutable state and fake KeyboardEvent dispatch.
 */

type Listener = (...args: any[]) => void;

const listeners = new Map<string, Set<Listener>>();

export function on(event: string, fn: Listener): () => void {
  if (!listeners.has(event)) listeners.set(event, new Set());
  listeners.get(event)!.add(fn);
  return () => listeners.get(event)?.delete(fn);
}

export function emit(event: string, ...args: any[]): void {
  listeners.get(event)?.forEach((fn) => fn(...args));
}

/* Known events */
export const Events = {
  COMMAND_PALETTE_OPEN: 'command-palette:open',
  COMMAND_PALETTE_CLOSE: 'command-palette:close',
  TOAST_SHOW: 'toast:show',
} as const;
