import { cn } from '@/lib/utils';

interface SplitProps {
  children: React.ReactNode;
  aside: React.ReactNode;
  className?: string;
}

export function Split({ children, aside, className }: SplitProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-8 lg:flex-row lg:gap-12',
        className,
      )}
    >
      <div className="min-w-0 flex-1">{children}</div>
      <aside className="lg:w-80 lg:shrink-0">{aside}</aside>
    </div>
  );
}
