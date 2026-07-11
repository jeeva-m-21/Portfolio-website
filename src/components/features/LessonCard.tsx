import { Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LessonCardProps {
  title: string;
  content: string;
  className?: string;
}

export function LessonCard({ title, content, className }: LessonCardProps) {
  return (
    <div
      className={cn(
        'flex gap-4 rounded-lg border border-border-secondary bg-bg-secondary p-5',
        className,
      )}
    >
      <Lightbulb
        size={18}
        className="mt-0.5 shrink-0 text-accent"
      />
      <div>
        <h3 className="text-sm font-medium text-text-primary">{title}</h3>
        <p className="mt-1 text-sm text-text-secondary leading-relaxed">
          {content}
        </p>
      </div>
    </div>
  );
}
