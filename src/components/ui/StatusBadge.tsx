import { cn } from '@/lib/utils';
import type { ProjectStatus } from '@/types';

interface StatusBadgeProps {
  status: ProjectStatus;
  className?: string;
}

const statusConfig: Record<ProjectStatus, { label: string; style: string }> = {
  prototype: {
    label: 'Prototype',
    style: 'bg-bg-secondary text-text-tertiary',
  },
  'in-development': {
    label: 'In Development',
    style: 'bg-accent-subtle text-accent',
  },
  beta: {
    label: 'Beta',
    style: 'bg-accent-subtle text-accent',
  },
  production: {
    label: 'Production',
    style: 'bg-accent-subtle text-accent',
  },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-sm px-2 py-0.5 font-mono text-xs',
        config.style,
        className,
      )}
      aria-label={`Project status: ${config.label}`}
    >
      {config.label}
    </span>
  );
}
