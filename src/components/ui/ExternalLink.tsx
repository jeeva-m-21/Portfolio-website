import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ExternalLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export function ExternalLink({
  href,
  children,
  className,
}: ExternalLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'inline-flex items-center gap-1 text-accent transition-colors duration-micro hover:text-accent-hover',
        className,
      )}
    >
      {children}
      <ArrowUpRight size={14} className="shrink-0" />
    </a>
  );
}
