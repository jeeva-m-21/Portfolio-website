import { cn } from '@/lib/utils';

interface TimelineEntry {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  description?: string;
  details?: string[];
}

interface TimelineProps {
  entries: TimelineEntry[];
  className?: string;
}

export function Timeline({ entries, className }: TimelineProps) {
  return (
    <div className={cn('relative', className)}>
      {/* Vertical line */}
      <div className="absolute bottom-0 left-[7px] top-2 w-px bg-border-primary" />

      <div className="space-y-8">
        {entries.map((entry) => (
          <div key={entry.id} className="relative flex gap-4">
            {/* Dot */}
            <div className="relative mt-1.5 h-3.5 w-3.5 shrink-0 rounded-full border-2 border-border-primary bg-bg-primary" />

            {/* Content */}
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="text-base font-medium text-text-primary">
                  {entry.title}
                </h3>
                <span className="shrink-0 font-mono text-xs text-text-tertiary">
                  {entry.date}
                </span>
              </div>
              <p className="mt-0.5 text-sm text-text-secondary">
                {entry.subtitle}
              </p>
              {entry.description && (
                <p className="mt-2 text-sm text-text-secondary">
                  {entry.description}
                </p>
              )}
              {entry.details && entry.details.length > 0 && (
                <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-text-secondary">
                  {entry.details.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
