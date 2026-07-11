import { cn } from '@/lib/utils';

interface HeroProps {
  title: string;
  description: string;
  subtitle?: string;
  className?: string;
}

export function Hero({ title, description, subtitle, className }: HeroProps) {
  return (
    <div className={cn('max-w-reading', className)}>
      {subtitle && (
        <p className="mb-4 text-sm text-text-tertiary">{subtitle}</p>
      )}
      <h1 className="text-5xl font-semibold tracking-tight text-text-primary">
        {title}
      </h1>
      <p className="mt-6 text-lg text-text-secondary text-balance">
        {description}
      </p>
    </div>
  );
}
