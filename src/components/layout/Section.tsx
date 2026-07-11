import { cn } from '@/lib/utils';

type SectionSpacing = 'default' | 'large' | 'xl' | 'hero';

interface SectionProps {
  children: React.ReactNode;
  spacing?: SectionSpacing;
  className?: string;
  as?: 'section' | 'div' | 'article';
}

const spacingStyles: Record<SectionSpacing, string> = {
  default: 'py-9',
  large: 'py-11',
  xl: 'py-12',
  hero: 'pt-14 pb-12',
};

export function Section({
  children,
  spacing = 'default',
  className,
  as: Component = 'section',
}: SectionProps) {
  return (
    <Component className={cn(spacingStyles[spacing], className)}>
      {children}
    </Component>
  );
}
