import Link from 'next/link';
import { cn } from '@/lib/utils';

interface EmptyStateProps {
  title: string;
  description: string;
  action?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  variant?: 'preview' | 'empty';
  className?: string;
}

export function EmptyState({
  title,
  description,
  action,
  variant = 'empty',
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center py-16 text-center',
        variant === 'preview' &&
          'rounded-lg border border-dashed border-border-primary bg-bg-secondary/50',
        className,
      )}
    >
      {variant === 'preview' && (
        <p className="mb-3 font-mono text-[10px] uppercase tracking-wider text-text-tertiary">
          Coming in V2
        </p>
      )}
      <h3 className="text-lg font-medium text-text-primary">{title}</h3>
      <p className="mt-2 max-w-md text-sm text-text-secondary text-balance">
        {description}
      </p>
      {action && (
        <div className="mt-6">
          {action.href ? (
            <Link
              href={action.href}
              className="inline-flex items-center gap-1 text-sm text-accent transition-colors duration-micro hover:text-accent-hover"
            >
              {action.label} &rarr;
            </Link>
          ) : (
            <button
              onClick={action.onClick}
              className="inline-flex items-center gap-1 text-sm text-accent transition-colors duration-micro hover:text-accent-hover"
            >
              {action.label} &rarr;
            </button>
          )}
        </div>
      )}
    </div>
  );
}
