import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="max-w-md text-center">
        <p className="font-mono text-sm tracking-widest text-accent">404</p>
        <h1 className="mt-6 text-4xl font-semibold tracking-tight text-text-primary">
          Command not found
        </h1>
        <p className="mt-4 leading-relaxed text-text-secondary">
          The page you are looking for does not exist or has moved.
        </p>
        <div className="mt-8 rounded-lg border border-border-secondary bg-bg-secondary p-4 text-left font-mono text-sm">
          <p className="text-text-tertiary">
            <span className="text-accent">$</span> cd /requested-path
          </p>
          <p className="mt-1 text-error">
            bash: cd: /requested-path: No such file or directory
          </p>
          <p className="mt-3 text-text-tertiary">
            <span className="text-accent">$</span>{' '}
            <kbd className="rounded border border-border-primary px-1.5 py-0.5 text-xs">Cmd+K</kbd>
            {' '}search
          </p>
        </div>
        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-text-primary px-6 py-3 text-sm font-medium text-bg-primary transition-all duration-medium hover:bg-text-secondary active:scale-[0.98]"
          >
            cd /home &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
