import { notFound } from 'next/navigation';
import Link from 'next/link';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Tag } from '@/components/ui/Tag';
import { EmptyState } from '@/components/ui/EmptyState';
import { ExternalLink } from '@/components/ui/ExternalLink';
import { DecisionCard } from '@/components/features/DecisionCard';
import { LessonCard } from '@/components/features/LessonCard';
import { ArchitectureDiagram } from '@/components/features/ArchitectureDiagram';
import { projects, decisions } from '@/lib/projects';

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) notFound();

  const projectDecisions = decisions.filter((d) => d.project === project.title);
  const otherProjects = projects.filter((p) => p.slug !== project.slug);

  return (
    <div className="min-h-screen">
      <div className="sticky top-14 z-30 border-b border-border-secondary bg-bg-primary/90 backdrop-blur-xl lg:hidden">
        <div className="flex items-center gap-4 overflow-x-auto px-4 py-2.5 sm:px-6">
          <Link href="/projects" className="shrink-0 font-mono text-[10px] uppercase tracking-widest text-text-tertiary">&larr; Projects</Link>
          {['overview', 'architecture', 'thinking', 'evolution'].map((id) => (
            <a key={id} href={`#${id}`} className="shrink-0 font-mono text-[10px] uppercase tracking-widest text-text-tertiary transition-colors duration-micro hover:text-text-secondary">{id}</a>
          ))}
        </div>
      </div>

      <div className="lg:flex">
        <aside className="hidden lg:sticky lg:top-14 lg:block lg:h-[calc(100vh-3.5rem)] lg:w-56 lg:shrink-0 lg:overflow-y-auto lg:border-r lg:border-border-secondary lg:bg-bg-secondary/30">
          <div className="p-6">
            <Link href="/projects" className="font-mono text-[10px] uppercase tracking-widest text-text-tertiary transition-colors duration-micro hover:text-text-secondary">&larr; All Projects</Link>
            <nav className="mt-8 space-y-0.5" aria-label="Project sections">
              {[{ id: 'overview', label: 'Overview' },{ id: 'architecture', label: 'Architecture' },{ id: 'thinking', label: 'How It Works' },{ id: 'evolution', label: 'Evolution' }].map((item) => (
                <a key={item.id} href={`#${item.id}`} className="block rounded-md px-3 py-1.5 text-sm text-text-secondary transition-colors duration-micro hover:bg-bg-tertiary hover:text-text-primary">{item.label}</a>
              ))}
            </nav>
            <div className="mt-8">
              <p className="font-mono text-[10px] uppercase tracking-widest text-text-disabled">Other Projects</p>
              <div className="mt-3 space-y-0.5">
                {otherProjects.map((p) => (
                  <Link key={p!.slug} href={`/projects/${p!.slug}`} className="block rounded-md px-3 py-1.5 text-sm text-text-tertiary transition-colors duration-micro hover:bg-bg-tertiary hover:text-text-secondary">{p!.title}</Link>
                ))}
              </div>
            </div>
          </div>
        </aside>

        <main className="min-w-0 flex-1">
          {/* Overview */}
          <section id="overview" className="px-6 pb-12 pt-20 sm:px-12 lg:px-16 lg:pb-16 lg:pt-24">
            <div className="flex items-center gap-3">
              <StatusBadge status={project.status} />
              <span className="font-mono text-xs text-text-tertiary">Started {project.startedAt} &middot; Updated {project.updatedAt}</span>
            </div>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-text-primary sm:text-5xl lg:text-6xl">{project.title}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-text-secondary">{project.description}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              {project.links?.github && <ExternalLink href={project.links.github}>View on GitHub</ExternalLink>}
              {project.links?.demo && <ExternalLink href={project.links.demo}>Live Demo</ExternalLink>}
            </div>
          </section>

          {/* Architecture — the star of the page */}
          <section id="architecture" className="border-t border-border-secondary/50 px-6 py-12 sm:px-12 lg:px-16 lg:py-16">
            <p className="font-mono text-xs tracking-widest text-text-tertiary">ARCHITECTURE</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-text-primary">System Design</h2>
            <p className="mt-4 max-w-3xl leading-relaxed text-text-secondary">
              {project.title} is built as a modular system — each component has a clear responsibility,
              communicates through defined interfaces, and can evolve independently.
            </p>
            <div className="mt-8">
              {project.slug === 'researchos' ? (
                <ArchitectureDiagram />
              ) : (
                <EmptyState variant="preview" title="Interactive Architecture Explorer" description="Zoomable system diagrams with clickable components coming in V2." />
              )}
            </div>
          </section>

          {/* How It Works — decisions as supporting evidence */}
          <section id="thinking" className="border-t border-border-secondary/50 px-6 py-12 sm:px-12 lg:px-16 lg:py-16">
            <p className="font-mono text-xs tracking-widest text-text-tertiary">HOW IT WORKS</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-text-primary">The thinking behind the system</h2>
            <p className="mt-4 max-w-3xl leading-relaxed text-text-secondary">
              Every architectural choice was made with intention. Below are the key decisions
              that shaped how this system works — what was chosen, what was rejected, and why.
            </p>
            <div className="mt-8 max-w-3xl space-y-6">
              {projectDecisions.length > 0 ? (
                projectDecisions.map((decision) => (
                  <DecisionCard key={decision!.id} decision={decision!} />
                ))
              ) : (
                <EmptyState variant="preview" title="Design rationale coming soon" description="Detailed explanations of architectural choices will be published as the system stabilizes." />
              )}
            </div>
          </section>

          {/* Evolution — lessons learned */}
          <section id="evolution" className="border-t border-border-secondary/50 px-6 py-12 sm:px-12 lg:px-16 lg:py-16">
            <p className="font-mono text-xs tracking-widest text-text-tertiary">EVOLUTION</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-text-primary">How this system grew</h2>
            <p className="mt-4 max-w-3xl leading-relaxed text-text-secondary">
              Building {project.title} taught me lessons that shape how I approach every subsequent system.
            </p>
            <div className="mt-8 max-w-3xl space-y-4">
              <LessonCard title="Architecture decisions compound" content="The choices made in the first weeks determine a project's trajectory for years." />
              <LessonCard title="Interfaces matter more than implementations" content="Well-defined interfaces enable independent evolution, testing, and replacement." />
              <LessonCard title="Document decisions as you make them" content="Writing rationale in real-time captures context lost within weeks." />
            </div>
          </section>
        </main>

        {/* Inspector — system metrics, not ADR counts */}
        <aside className="border-t border-border-secondary/50 bg-bg-secondary/20 px-6 py-12 sm:px-12 lg:sticky lg:top-14 lg:h-[calc(100vh-3.5rem)] lg:w-72 lg:shrink-0 lg:overflow-y-auto lg:border-l lg:border-t-0 lg:px-6 lg:py-8">
          <p className="font-mono text-[10px] uppercase tracking-widest text-text-disabled">System Info</p>

          <div className="mt-8 space-y-8">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-text-tertiary">Scale</p>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="rounded-lg border border-border-secondary bg-bg-secondary p-3 text-center">
                  <p className="text-3xl font-semibold text-text-primary">{project.technologies.length}</p>
                  <p className="mt-1 font-mono text-[10px] text-text-tertiary">Components</p>
                </div>
                <div className="rounded-lg border border-border-secondary bg-bg-secondary p-3 text-center">
                  <p className="text-3xl font-semibold text-accent">{projectDecisions.length}</p>
                  <p className="mt-1 font-mono text-[10px] text-text-tertiary">Design Choices</p>
                </div>
              </div>
            </div>

            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-text-tertiary">Status</p>
              <div className="mt-2"><StatusBadge status={project.status} /></div>
            </div>

            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-text-tertiary">Stage</p>
              <p className="mt-2 font-mono text-sm text-text-secondary">Level {project.maturityLevel} — {project.maturityLevel === 2 ? 'Active Development' : 'Prototype'}</p>
            </div>

            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-text-tertiary">Timeline</p>
              <div className="mt-2 space-y-1 font-mono text-sm text-text-secondary">
                <p>Started: {project.startedAt}</p>
                <p>Updated: {project.updatedAt}</p>
              </div>
            </div>

            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-text-tertiary">Built With</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {project.technologies.map((tech) => (<Tag key={tech}>{tech}</Tag>))}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
