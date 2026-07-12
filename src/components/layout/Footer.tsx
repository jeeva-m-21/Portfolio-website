import Link from 'next/link';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border-secondary">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/10 to-transparent" />
      <div className="mx-auto flex max-w-wide flex-col gap-6 px-8 py-12 sm:flex-row sm:items-start sm:justify-between sm:px-16 lg:px-24">
        <div>
          <p className="text-sm font-semibold tracking-tight text-text-primary">Portfolio</p>
          <p className="mt-1 font-mono text-[11px] text-text-disabled">v1.0.0</p>
          <p className="mt-4 text-xs text-text-tertiary">&copy; {year}</p>
        </div>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 sm:gap-8">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-text-disabled">Navigate</p>
            <div className="mt-3 space-y-2">
              <Link href="/projects" className="block text-sm text-text-tertiary transition-colors duration-micro hover:text-text-secondary">Work</Link>
              <Link href="/about" className="block text-sm text-text-tertiary transition-colors duration-micro hover:text-text-secondary">About</Link>
              <Link href="/contact" className="block text-sm text-text-tertiary transition-colors duration-micro hover:text-text-secondary">Contact</Link>
            </div>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-text-disabled">Platform</p>
            <div className="mt-3 space-y-2">
              <Link href="/state" className="block text-sm text-text-tertiary transition-colors duration-micro hover:text-text-secondary">State</Link>
              <a href="https://github.com/jeeva-m-21" target="_blank" rel="noopener noreferrer" className="block text-sm text-text-tertiary transition-colors duration-micro hover:text-text-secondary">GitHub</a>
            </div>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-text-disabled">Projects</p>
            <div className="mt-3 space-y-2">
              <Link href="/projects/researchos" className="block text-sm text-text-tertiary transition-colors duration-micro hover:text-text-secondary">ResearchOS</Link>
              <Link href="/projects/ai-incident-os" className="block text-sm text-text-tertiary transition-colors duration-micro hover:text-text-secondary">AI Incident OS</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
