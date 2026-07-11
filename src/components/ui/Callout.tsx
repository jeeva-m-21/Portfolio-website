import { Info } from 'lucide-react';
import { cn } from '@/lib/utils';

type CalloutVariant = 'info';

interface CalloutProps {
  children: React.ReactNode;
  variant?: CalloutVariant;
  className?: string;
}

const variantConfig: Record<CalloutVariant, { icon: typeof Info; border: string; bg: string }> = {
  info: {
    icon: Info,
    border: 'border-l-accent',
    bg: 'bg-accent-subtle/20',
  },
};

export function Callout({ children, variant = 'info', className }: CalloutProps) {
  const config = variantConfig[variant];
  const Icon = config.icon;

  return (
    <div className={cn('rounded-r-md border-l-2 p-4', config.border, config.bg, className)}>
      <div className="flex items-start gap-3">
        <Icon size={18} className="mt-0.5 shrink-0 text-accent" />
        <div className="text-sm text-text-secondary">{children}</div>
      </div>
    </div>
  );
}
