import { cn } from '@/lib/utils';

type ContainerVariant = 'wide' | 'reading' | 'narrow';

interface ContainerProps {
  children: React.ReactNode;
  variant?: ContainerVariant;
  className?: string;
}

const variantStyles: Record<ContainerVariant, string> = {
  wide: 'max-w-wide',
  reading: 'max-w-reading',
  narrow: 'max-w-narrow',
};

export function Container({
  children,
  variant = 'reading',
  className,
}: ContainerProps) {
  return (
    <div
      className={cn(
        'mx-auto w-full px-4 sm:px-6 lg:px-8',
        variantStyles[variant],
        className,
      )}
    >
      {children}
    </div>
  );
}
