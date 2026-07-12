import Link from 'next/link';
import { ProjectCard } from '@/components/features/ProjectCard';
import { Timeline } from '@/components/features/Timeline';
import { projects, experiences, achievements } from '@/lib/projects';

export default function HomePage() {
  const featured = projects.slice(0, 2);
  const timelineEntries = [
    ...experiences.map((exp) => ({
      id: exp.organization.toLowerCase().replace(/\s+/g, '-'),
      title: exp.role,
      subtitle: exp.organization,
      date: `${exp.startDate} — ${exp.endDate || 'Present'}`,
      details: exp.contributions.slice(0, 2),
    })),
    ...achievements.map((a) => ({
      id: a.id, title: a.title, subtitle: a.subtitle, date: a.date, description: a.description,
    })),
  ];

  // Pull quote from first ADR
  return (
    <div className="min-h-screen">
      {/* Hero — rewritten with Constitution positioning */}
      <section className="relative -mt-14 flex min-h-[70vh] sm:min-h-[90vh] items-center px-6 sm:px-16 lg:px-24">
        <div className="relative z-10 max-w-4xl">
          <p
            className="font-mono text-sm tracking-widest text-accent"
            style={{ animation: 'fadeUp 0.5s 0.05s both' }}
          >
            JEEVA M
          </p>
          <h1 className="mt-8 text-4xl font-semibold leading-tight tracking-tight text-text-primary sm:text-6xl lg:text-8xl">
            <span style={{ animation: 'fadeUp 0.6s 0.1s both', display: 'block' }}>I build AI-native</span>
            <span style={{ animation: 'fadeUp 0.6s 0.2s both', display: 'block' }}>systems for</span>
            <span className="text-accent" style={{ animation: 'fadeUp 0.6s 0.3s both', display: 'block' }}>research and</span>
            <span className="text-accent" style={{ animation: 'fadeUp 0.6s 0.4s both', display: 'block' }}>operations.</span>
          </h1>
          <p
            className="mt-8 max-w-2xl text-base leading-relaxed sm:text-xl text-text-secondary"
            style={{ animation: 'fadeUp 0.6s 0.55s both' }}
          >
            Currently designing ResearchOS — an operating system for the
            complete research lifecycle. Previously at IISc, HCLTech, and Zevaras.
          </p>
          <div
            className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6"
            style={{ animation: 'fadeUp 0.6s 0.7s both' }}
          >
            <Link
              href="/projects/researchos"
              className="inline-flex items-center gap-2 rounded-xl bg-text-primary px-6 py-3 text-sm font-medium text-bg-primary transition-all duration-medium hover:bg-text-secondary active:scale-[0.98]"
            >
              Explore ResearchOS
              <span className="font-mono text-xs opacity-60">&rarr;</span>
            </Link>
            <Link
              href="/about"
              className="text-sm text-text-tertiary transition-colors duration-micro hover:text-text-secondary"
            >
              How I think &rarr;
            </Link>
          </div>
        </div>

        <div
          className="absolute bottom-8 left-12 right-12 sm:left-20 sm:right-20 lg:left-28 lg:right-28"
          style={{ animation: 'drawLine 0.8s 0.85s both' }}
        >
          <div className="h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent shadow-[0_0_8px_rgba(59,130,246,0.15)]" />
        </div>
      </section>

      {/* Featured Work — SYSTEMS label */}
      <section className="relative px-6 py-16 sm:px-16 sm:py-24 lg:px-24">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/10 to-transparent" />
        <div className="mb-16 flex items-end justify-between">
          <div>
            <p className="font-mono text-xs tracking-widest text-text-tertiary">SYSTEMS</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-text-primary sm:text-5xl">
              What I am building
            </h2>
          </div>
          <Link href="/projects" className="hidden text-sm text-text-tertiary transition-colors duration-micro hover:text-text-secondary sm:block">
            All projects &rarr;
          </Link>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          {featured.map((project) => (
            <ProjectCard key={project!.slug} project={project!} variant="featured" />
          ))}
        </div>
      </section>

      {/* Experience + Research — EVIDENCE + METHODOLOGY labels */}
      <section className="grid gap-16 px-8 py-24 sm:px-16 lg:grid-cols-2 lg:px-24">
        <div>
          <p className="font-mono text-xs tracking-widest text-text-tertiary">EVIDENCE</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-text-primary">Where I have worked</h2>
          <div className="mt-10"><Timeline entries={timelineEntries.slice(0, 4)} /></div>
          <Link href="/experience" className="mt-6 inline-block text-sm text-text-tertiary transition-colors duration-micro hover:text-text-secondary">
            Full timeline &rarr;
          </Link>
        </div>
        <div>
          <p className="font-mono text-xs tracking-widest text-text-tertiary">METHODOLOGY</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-text-primary">
            Neuromorphic intrusion<br />detection
          </h2>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-text-secondary">
            Applying Spiking Neural Networks to automotive CAN network security.
            Detecting intrusions through voltage fingerprinting on resource-constrained embedded systems.
          </p>
          <div className="mt-6 space-y-2">
            <p className="font-mono text-xs text-text-tertiary">Papers under review</p>
            <p className="font-mono text-xs text-text-tertiary">Research conducted at IISc</p>
          </div>
          <Link href="/research" className="mt-6 inline-flex items-center gap-2 text-sm text-accent transition-colors duration-micro hover:text-accent-hover">
            View research &rarr;
          </Link>
        </div>
      </section>

      {/* Philosophy — systems ambition */}
      <section className="border-t border-border-secondary px-6 py-16 sm:px-16 sm:py-24 lg:px-24">
        <div className="mx-auto max-w-3xl">
          <p className="text-center font-mono text-xs tracking-widest text-text-tertiary">PRINCIPLES</p>
          <h2 className="mt-8 text-center text-5xl font-semibold tracking-tight text-text-primary">
            I design systems,
            <br />
            <span className="text-accent">not just features.</span>
          </h2>
          <p className="mt-10 text-center text-lg leading-relaxed text-text-secondary">
            Every project starts with architecture — understanding the problem,
            designing the system, then building with intention. I believe the
            best engineering happens before code is written, and the best
            engineers think in systems that remain understandable as they grow.
          </p>
          <div className="mt-10 flex items-center justify-center gap-6">
            <Link href="/about" className="text-sm text-text-tertiary transition-colors duration-micro hover:text-text-secondary">
              How I think &rarr;
            </Link>
            <Link href="/contact" className="inline-flex items-center gap-2 rounded-xl bg-text-primary px-6 py-3 text-sm font-medium text-bg-primary transition-all duration-medium hover:bg-text-secondary active:scale-[0.98]">
              Get in touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
