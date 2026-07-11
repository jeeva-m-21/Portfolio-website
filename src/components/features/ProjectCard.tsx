import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Tag } from '@/components/ui/Tag';
import type { ProjectMeta } from '@/types';

interface ProjectCardProps {
  project: ProjectMeta;
  variant?: 'default' | 'featured';
  className?: string;
}

export function ProjectCard({
  project,
  variant = 'default',
  className,
}: ProjectCardProps) {
  const isFeatured = variant === 'featured';

  return (
    <Link
      href={`/projects/${project.slug}`}
      className={cn(
        'group relative block rounded-xl border p-6 transition-all duration-medium',
        isFeatured && 'animate-[subtleFloat_6s_ease-in-out_infinite]',
        'border-border-secondary bg-bg-secondary',
        'hover:border-accent-subtle hover:bg-bg-tertiary hover:-translate-y-0.5',
        'hover:shadow-[0_0_0_1px_var(--color-accent-subtle),0_4px_16px_rgba(0,0,0,0.3)]',
        isFeatured && 'border-accent-subtle/50',
        className,
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-3">
            <h3
              className={cn(
                'font-semibold text-text-primary transition-colors duration-micro group-hover:text-accent',
                isFeatured ? 'text-2xl' : 'text-xl',
              )}
            >
              {project.title}
            </h3>
            <StatusBadge status={project.status} />
          </div>
          <p className="mt-2 text-sm text-text-secondary text-balance">
            {project.description}
          </p>
        </div>
        <ArrowUpRight
          size={18}
          className="mt-1 shrink-0 text-text-tertiary opacity-0 transition-all duration-micro group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </div>

      {project.technologies.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 5).map((tech) => (
            <Tag key={tech}>{tech}</Tag>
          ))}
        </div>
      )}
    </Link>
  );
}
