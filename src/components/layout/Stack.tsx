import { cn } from '@/lib/utils';

type StackDirection = 'vertical' | 'horizontal';
type StackGap = 'sm' | 'md' | 'lg';

interface StackProps {
  children: React.ReactNode;
  direction?: StackDirection;
  gap?: StackGap;
  className?: string;
}

const directionStyles: Record<StackDirection, string> = {
  vertical: 'flex-col',
  horizontal: 'flex-row items-center',
};

const gapStyles: Record<StackGap, string> = {
  sm: 'gap-2',
  md: 'gap-4',
  lg: 'gap-6',
};

export function Stack({
  children,
  direction = 'vertical',
  gap = 'md',
  className,
}: StackProps) {
  return (
    <div
      className={cn('flex', directionStyles[direction], gapStyles[gap], className)}
    >
      {children}
    </div>
  );
}
