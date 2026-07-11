import { cn } from '@/lib/utils';

interface FilterOption {
  id: string;
  label: string;
}

interface FilterBarProps {
  options: FilterOption[];
  active: string;
  onChange: (id: string) => void;
  className?: string;
}

export function FilterBar({
  options,
  active,
  onChange,
  className,
}: FilterBarProps) {
  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {options.map((option) => (
        <button
          key={option.id}
          onClick={() => onChange(option.id)}
          className={cn(
            'rounded-md px-3 py-1.5 text-sm transition-colors duration-micro',
            active === option.id
              ? 'bg-accent-subtle text-accent'
              : 'bg-bg-secondary text-text-secondary hover:bg-bg-tertiary hover:text-text-primary',
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
