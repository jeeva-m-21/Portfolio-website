import { cn } from '@/lib/utils';

type GridColumns = 1 | 2 | 3;

interface GridProps {
  children: React.ReactNode;
  cols?: GridColumns;
  gap?: 'default' | 'large';
  className?: string;
}

const colStyles: Record<GridColumns, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 md:grid-cols-2',
  3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
};

const gapStyles: Record<string, string> = {
  default: 'gap-6',
  large: 'gap-8',
};

export function Grid({
  children,
  cols = 2,
  gap = 'default',
  className,
}: GridProps) {
  return (
    <div className={cn('grid', colStyles[cols], gapStyles[gap], className)}>
      {children}
    </div>
  );
}
