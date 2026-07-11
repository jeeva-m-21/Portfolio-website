'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Command } from 'lucide-react';
import { cn } from '@/lib/utils';
import { emit, Events } from '@/lib/events';

const navItems = [
  { label: 'Work', href: '/projects' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 32);
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? window.scrollY / h : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    pathname === href || (href !== '/' && pathname.startsWith(href + '/'));

  const openCommandPalette = () => emit(Events.COMMAND_PALETTE_OPEN);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-medium',
        scrolled
          ? 'bg-bg-primary/80 backdrop-blur-xl'
          : 'bg-transparent',
      )}
    >
      {/* Progress integrated into border */}
      <div
        className="absolute inset-x-0 bottom-0 h-px bg-border-secondary/80 transition-opacity duration-medium"
        style={{ opacity: scrolled ? 1 : 0 }}
      >
        <div
          className="h-full bg-accent transition-all duration-100"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      <nav
        className="mx-auto flex h-14 max-w-wide items-center justify-between px-4 sm:px-6 lg:px-8"
        aria-label="Primary navigation"
      >
        <Link
          href="/"
          className="relative text-sm font-semibold tracking-tight text-text-primary transition-colors duration-micro hover:text-text-secondary"
        >
          Portfolio
          <span className="ml-2 rounded-sm bg-bg-secondary px-1.5 py-0.5 font-mono text-[11px] font-normal text-text-tertiary">
            v1.0
          </span>
        </Link>

        <div className="hidden items-center md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'relative px-3 py-1.5 text-sm transition-colors duration-micro',
                isActive(item.href)
                  ? 'text-text-primary'
                  : 'text-text-secondary hover:text-text-primary',
              )}
              aria-current={isActive(item.href) ? 'page' : undefined}
            >
              {item.label}
              {isActive(item.href) && (
                <span className="absolute bottom-0 left-1/2 h-0.5 w-3 -translate-x-1/2 rounded-full bg-accent" />
              )}
            </Link>
          ))}

          <button
            onClick={openCommandPalette}
            className="ml-4 flex items-center gap-1.5 rounded-lg border border-border-primary/60 bg-bg-secondary/50 px-2.5 py-1.5 text-xs text-text-tertiary transition-all duration-micro hover:border-border-primary hover:bg-bg-tertiary hover:text-text-secondary"
            aria-label="Open command palette (Cmd+K)"
          >
            <Command size={14} />
            <span className="font-mono text-[11px]">⌘K</span>
          </button>
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <button
            onClick={openCommandPalette}
            className="rounded-lg border border-border-primary/60 bg-bg-secondary/50 p-1.5 text-text-tertiary"
            aria-label="Open command palette"
          >
            <Command size={16} />
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-lg p-1.5 text-text-secondary"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            <Menu size={20} />
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="border-b border-border-secondary bg-bg-primary/95 backdrop-blur-xl md:hidden">
          <div className="space-y-1 px-4 pb-5 pt-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'block rounded-lg px-3 py-2.5 text-sm transition-colors duration-micro',
                  isActive(item.href)
                    ? 'bg-accent-subtle text-text-primary'
                    : 'text-text-secondary hover:bg-bg-secondary hover:text-text-primary',
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
