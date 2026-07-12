'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'motion/react';
import {
  Search,
  ArrowRight,
  FileText,
  Folder,
  Zap,
  ExternalLink,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { on, Events } from '@/lib/events';
import {
  searchIndex,
  search,
  groupResults,
  categoryLabels,
} from '@/lib/search-index';
import type { SearchItem } from '@/types';

/* Extracted outside component — not recreated on every render */
const categoryIcons: Record<string, LucideIcon> = {
  page: FileText,
  project: Folder,
  action: Zap,
  external: ExternalLink,
};

export function CommandPalette() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => search(query), [query]);
  const grouped = useMemo(() => groupResults(results), [results]);

  /* Precompute flat results with indices to avoid O(n²) indexOf in render */
  const flatResults = useMemo(
    () => results.map((item, index) => ({ item, index })),
    [results],
  );

  const open = useCallback(() => {
    setIsOpen(true);
    setQuery('');
    setSelectedIndex(0);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setQuery('');
  }, []);

  /* Listen to event bus for external open triggers */
  useEffect(() => {
    return on(Events.COMMAND_PALETTE_OPEN, () => {
      if (!isOpen) open();
    });
  }, [isOpen, open]);

  /* Keyboard shortcut */
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) close();
        else open();
      }
      if (e.key === 'Escape' && isOpen) close();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, open, close]);

  /* Auto-focus input on open */
  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [isOpen]);

  /* Reset selection when results change */
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const navigateTo = useCallback(
    (item: SearchItem) => {
      close();
      if (item.href) {
        router.push(item.href);
      } else if (item.action === 'resume') {
        window.open('/resume.pdf', '_blank');
      } else if (item.action === 'email') {
        navigator.clipboard.writeText('jeeva4772@gmail.com').catch(() => {});
      } else if (item.action === 'github') {
        window.open('https://github.com/jeeva-m-21', '_blank');
      } else if (item.action === 'linkedin') {
        window.open('https://www.linkedin.com/in/jeeva4772/', '_blank');
      } else if (item.action === 'theme') {
        document.documentElement.classList.toggle('light');
      }
    },
    [close, router],
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < flatResults.length - 1 ? prev + 1 : 0,
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev > 0 ? prev - 1 : flatResults.length - 1,
      );
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const entry = flatResults[selectedIndex];
      if (entry) navigateTo(entry.item);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100]">
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={close}
          />

          <div className="absolute inset-x-0 top-[20%] mx-auto max-w-[640px] px-4">
            <motion.div
              className="overflow-hidden rounded-lg border border-border-primary bg-bg-tertiary shadow-lg"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.15 }}
              role="dialog"
              aria-label="Command palette"
              aria-modal="true"
            >
              <div className="flex items-center gap-3 border-b border-border-secondary px-4">
                <Search size={16} className="shrink-0 text-text-tertiary" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Search projects, pages, actions..."
                  className="flex-1 bg-transparent py-3.5 font-mono text-sm text-text-primary placeholder:text-text-disabled outline-none"
                  aria-label="Search"
                />
                <kbd className="hidden rounded border border-border-primary px-1.5 py-0.5 font-mono text-[10px] text-text-tertiary sm:inline-block">
                  esc
                </kbd>
              </div>

              <div className="max-h-80 overflow-y-auto p-2" role="listbox">
                {grouped.length === 0 && query ? (
                  <div className="px-4 py-8 text-center">
                    <p className="text-sm text-text-tertiary">
                      No results for &ldquo;{query}&rdquo;
                    </p>
                    <p className="mt-1 text-xs text-text-disabled">Try a different query.</p>
                    <div className="mt-3 flex flex-wrap justify-center gap-1.5">
                      {["architecture", "decisions", "research", "resume", "github"].map((s) => (
                        <button key={s} onClick={() => { setQuery(s); }} className="rounded border border-border-primary px-2 py-0.5 font-mono text-[10px] text-text-tertiary transition-colors duration-micro hover:border-accent-subtle hover:text-accent">{s}</button>
                      ))}
                    </div>
                  </div>
                ) : grouped.length === 0 ? (
                  <div className="px-4 py-8 text-center">
                    <p className="text-sm text-text-tertiary">
                      Query the system. Try: researchos architecture, hexagonal ddd, hybrid search, resume
                    </p>
                  </div>
                ) : (
                  grouped.map(([category, items]) => {
                    const Icon = categoryIcons[category] || Search;
                    return (
                      <div key={category} className="mb-1">
                        <div className="px-3 py-1.5 text-[10px] font-medium uppercase tracking-wider text-text-disabled">
                          {categoryLabels[category] || category}
                        </div>
                        {items.map((item) => {
                          const idx = flatResults.findIndex(
                            (f) => f.item.id === item.id,
                          );
                          const isSelected = idx === selectedIndex;
                          return (
                            <button
                              key={item.id}
                              onClick={() => navigateTo(item)}
                              onMouseEnter={() => setSelectedIndex(idx)}
                              style={{ animation: flatResults.length > 0 ? `fadeUp 0.3s ${idx * 20}ms both` : 'none' }}
                              className={cn(
                                'flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left transition-colors duration-micro',
                                isSelected
                                  ? 'bg-accent-subtle text-text-primary'
                                  : 'text-text-secondary',
                              )}
                              role="option"
                              aria-selected={isSelected}
                            >
                              <span className="shrink-0 text-text-tertiary">
                                <Icon size={14} />
                              </span>
                              <span className="flex-1 truncate text-sm">
                                {item.label}
                              </span>
                              {item.description && (
                                <span className="hidden truncate text-xs text-text-tertiary sm:inline">
                                  {item.description}
                                </span>
                              )}
                              {isSelected && (
                                <ArrowRight
                                  size={14}
                                  className="shrink-0 text-text-tertiary"
                                />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    );
                  })
                )}
              </div>

              <div className="flex items-center gap-4 border-t border-border-secondary px-4 py-2">
                <span className="font-mono text-[10px] text-text-disabled">
                  <kbd className="rounded border border-border-primary px-1 py-0.5">
                    ↑↓
                  </kbd>{' '}
                  Navigate
                </span>
                <span className="font-mono text-[10px] text-text-disabled">
                  <kbd className="rounded border border-border-primary px-1 py-0.5">
                    ↵
                  </kbd>{' '}
                  Select
                </span>
                <span className="font-mono text-[10px] text-text-disabled">
                  <kbd className="rounded border border-border-primary px-1 py-0.5">
                    esc
                  </kbd>{' '}
                  Close
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
