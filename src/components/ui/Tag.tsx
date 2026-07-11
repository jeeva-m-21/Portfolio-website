import { cn } from '@/lib/utils';

interface TagProps {
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

export function Tag({ children, active, onClick, className }: TagProps) {
  const Component = onClick ? 'button' : 'span';

  return (
    <Component
      onClick={onClick}
      className={cn(
        'inline-flex items-center rounded-sm px-2 py-0.5 text-xs transition-colors duration-micro',
        active
          ? 'bg-accent-subtle text-accent'
          : 'bg-bg-secondary text-text-tertiary',
        onClick && 'cursor-pointer hover:bg-bg-tertiary',
        className,
      )}
    >
      {children}
    </Component>
  );
}
