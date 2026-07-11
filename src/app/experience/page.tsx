import type { Metadata } from 'next';
import { Timeline } from '@/components/features/Timeline';
import { ExternalLink } from '@/components/ui/ExternalLink';
import { experiences, achievements } from '@/lib/projects';

export const metadata: Metadata = {
  title: 'Experience',
  description: 'Professional experience across research, enterprise, and startup environments.',
};

export default function ExperiencePage() {
  const expEntries = experiences.map((exp) => ({
    id: exp.organization.toLowerCase().replace(/\s+/g, '-'),
    title: exp.role,
    subtitle: exp.organization,
    date: `${exp.startDate} — ${exp.endDate || 'Present'}`,
    details: exp.contributions,
  }));
  const achEntries = achievements.map((a) => ({
    id: a.id, title: a.title, subtitle: a.subtitle, date: a.date, description: a.description,
  }));

  return (
    <div className="min-h-screen">
      <section className="px-8 pb-16 pt-20 sm:px-16 lg:px-24 lg:pt-24">
        <p className="font-mono text-sm tracking-widest text-accent">EXPERIENCE</p>
        <h1 className="mt-8 max-w-4xl text-6xl font-semibold leading-none tracking-tight text-text-primary sm:text-7xl">
          Where I have applied
          <br />
          <span className="text-accent">systems thinking in practice.</span>
        </h1>
        <p className="mt-10 max-w-2xl text-xl leading-relaxed text-text-secondary">
          Research internships, startup engineering, and enterprise development.
        </p>
      </section>

      <section className="border-t border-border-secondary px-8 py-16 sm:px-16 lg:px-24">
        <div className="grid gap-16 lg:grid-cols-2">
          <div>
            <p className="font-mono text-xs tracking-widest text-text-tertiary">PROFESSIONAL</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-text-primary">Where I have worked</h2>
            <div className="mt-10"><Timeline entries={expEntries} /></div>
          </div>
          <div>
            <p className="font-mono text-xs tracking-widest text-text-tertiary">ACHIEVEMENTS</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-text-primary">Recognition</h2>
            <div className="mt-10"><Timeline entries={achEntries} /></div>
            <div className="mt-10 rounded-xl border border-border-secondary bg-bg-secondary p-8 text-center">
              <h3 className="text-xl font-semibold text-text-primary">Download Resume</h3>
              <p className="mt-3 leading-relaxed text-text-secondary">Complete professional history with detailed contributions.</p>
              <ExternalLink href="/resume.pdf" className="mt-5 inline-flex justify-center">Download PDF</ExternalLink>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
