import type { Metadata } from 'next';
import { ExternalLink } from '@/components/ui/ExternalLink';
import { CopyButton } from '@/components/ui/CopyButton';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch — open to engineering roles, research collaborations, and interesting problems.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <section className="px-6 pb-12 pt-6 sm:px-16 lg:px-24 lg:pt-24">
        <p className="font-mono text-sm tracking-widest text-accent">CONTACT</p>
        <h1 className="mt-8 max-w-4xl text-6xl font-semibold leading-none tracking-tight text-text-primary sm:text-7xl">
          Let us build
          <br />
          <span className="text-accent">something together.</span>
        </h1>
        <p className="mt-10 max-w-2xl text-xl leading-relaxed text-text-secondary">
          Currently open to engineering roles, research collaborations, and
          interesting problems in AI systems and infrastructure.
        </p>
      </section>

      <section className="border-t border-border-secondary/50 px-8 py-16 sm:px-16 lg:px-24">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Email */}
          <div className="rounded-xl border border-border-secondary bg-bg-secondary p-8">
            <p className="font-mono text-[10px] uppercase tracking-widest text-text-tertiary">Primary</p>
            <h2 className="mt-3 text-xl font-semibold text-text-primary">Email</h2>
            <p className="mt-3 text-sm leading-relaxed text-text-secondary">The best way to reach me. I typically respond within 24 hours.</p>
            <div className="mt-5 flex items-center gap-3">
              <a href="mailto:jeeva4772@gmail.com" className="font-mono text-sm text-accent transition-colors duration-micro hover:text-accent-hover">jeeva4772@gmail.com</a>
              <CopyButton value="jeeva4772@gmail.com" label="Copy" />
            </div>
            <p className="mt-4 flex items-center gap-2 font-mono text-[10px] text-accent">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
              Typically responds within 24h
            </p>
          </div>

          {/* Profiles */}
          <div className="rounded-xl border border-border-secondary bg-bg-secondary p-8">
            <p className="font-mono text-[10px] uppercase tracking-widest text-text-tertiary">Profiles</p>
            <h2 className="mt-3 text-xl font-semibold text-text-primary">Find me elsewhere</h2>
            <div className="mt-5 space-y-3">
              <div><ExternalLink href="https://github.com/jeeva-m-21">GitHub — jeeva-m-21</ExternalLink></div>
              <div><ExternalLink href="https://www.linkedin.com/in/jeeva4772/">LinkedIn — jeeva4772</ExternalLink></div>
              <div><ExternalLink href="/resume.pdf">Download Resume (PDF)</ExternalLink></div>
            </div>
          </div>

          {/* Location & Phone */}
          <div className="rounded-xl border border-border-secondary bg-bg-secondary p-8">
            <p className="font-mono text-[10px] uppercase tracking-widest text-text-tertiary">Location</p>
            <h2 className="mt-3 text-xl font-semibold text-text-primary">Chennai, India</h2>
            <p className="mt-3 text-sm leading-relaxed text-text-secondary">Based in Chennai, Tamil Nadu. Open to remote and hybrid opportunities worldwide.</p>
            <div className="mt-5">
              <p className="font-mono text-sm text-text-secondary">+91 9445737120</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
