import { cn } from '@/lib/utils';
import type { ADREntry } from '@/types';

interface DecisionCardProps {
  decision: ADREntry;
  className?: string;
}

export function DecisionCard({ decision, className }: DecisionCardProps) {
  return (
    <article
      className={cn(
        'group relative rounded-lg border border-border-secondary bg-bg-secondary p-6 transition-all duration-medium',
        'hover:border-accent-subtle/50 hover:shadow-[inset_2px_0_0_var(--color-accent)]',
        className,
      )}
    >
      <div className="mb-5">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[11px] text-text-tertiary">
            {decision.project} &middot; {decision.date}
          </span>
        </div>
        <h3 className="mt-2 text-lg font-semibold text-text-primary transition-colors duration-micro group-hover:text-accent">
          {decision.title}
        </h3>
      </div>

      <div className="space-y-5">
        <div>
          <h4 className="mb-1.5 text-[10px] font-medium uppercase tracking-wider text-text-tertiary">Context</h4>
          <p className="text-sm leading-relaxed text-text-secondary">{decision.context}</p>
        </div>

        <div>
          <h4 className="mb-1.5 text-[10px] font-medium uppercase tracking-wider text-text-tertiary">What I considered</h4>
          <ul className="space-y-1.5 text-sm text-text-secondary">
            {decision.alternatives.map((alt, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-text-tertiary" />
                <span>{alt}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-1.5 text-[10px] font-medium uppercase tracking-wider text-text-tertiary">What I chose</h4>
          <p className="text-sm leading-relaxed text-text-primary">{decision.decision}</p>
        </div>

        <div>
          <h4 className="mb-1.5 text-[10px] font-medium uppercase tracking-wider text-text-tertiary">Trade-offs</h4>
          <ul className="space-y-1.5 text-sm">
            {decision.consequences.positive.map((c, i) => (
              <li key={i} className="flex items-start gap-2 text-accent">
                <span className="mt-0.5 shrink-0 font-mono text-xs">+</span>
                <span>{c}</span>
              </li>
            ))}
            {decision.consequences.negative.map((c, i) => (
              <li key={i} className="flex items-start gap-2 text-text-secondary">
                <span className="mt-0.5 shrink-0 font-mono text-xs">&minus;</span>
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </div>

        {decision.reflection && (
          <div className="rounded-md border border-border-secondary/50 bg-bg-tertiary/50 p-4">
            <h4 className="mb-1.5 text-[10px] font-medium uppercase tracking-wider text-text-tertiary">What I would do differently</h4>
            <p className="text-sm leading-relaxed text-text-secondary">{decision.reflection}</p>
          </div>
        )}
      </div>
    </article>
  );
}
