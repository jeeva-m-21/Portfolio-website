'use client';

import { useEffect, useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { on, Events } from '@/lib/events';

interface ToastData {
  id: string;
  message: string;
  type?: 'info';
}

export function showToast(toast: Omit<ToastData, 'id'>) {
  /* Dispatch via event bus — no module-level mutable state */
  window.dispatchEvent(
    new CustomEvent(Events.TOAST_SHOW, { detail: toast }),
  );
}

export function ToastContainer() {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const addToast = useCallback((toast: Omit<ToastData, 'id'>) => {
    const id = Math.random().toString(36).slice(2, 8);
    setToasts((prev) => [...prev, { ...toast, id }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail as Omit<ToastData, 'id'>;
      addToast(detail);
    };
    window.addEventListener(Events.TOAST_SHOW, handler);
    return () => window.removeEventListener(Events.TOAST_SHOW, handler);
  }, [addToast]);

  const dismiss = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const typeStyles: Record<string, string> = {
    
    
    info: 'border-border-primary bg-bg-tertiary',
  };

  return (
    <div className="fixed bottom-4 right-4 z-[200] flex flex-col gap-2">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              'flex items-center gap-3 rounded-lg border px-4 py-3 shadow-lg backdrop-blur-xl',
              typeStyles[toast.type || 'info'],
            )}
          >
            <p className="text-sm text-text-primary">{toast.message}</p>
            <button
              onClick={() => dismiss(toast.id)}
              className="shrink-0 text-text-tertiary transition-colors duration-micro hover:text-text-secondary"
              aria-label="Dismiss"
            >
              <X size={14} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
