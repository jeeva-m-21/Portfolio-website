import type { Metadata } from 'next';
import Link from 'next/link';
import { Callout } from '@/components/ui/Callout';
import { Tag } from '@/components/ui/Tag';

export const metadata: Metadata = {
  title: 'About',
  description: 'Engineering philosophy, background, and what I am building now.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <section className="px-8 pb-16 pt-20 sm:px-16 lg:px-24 lg:pt-24">
        <p className="font-mono text-sm tracking-widest text-accent">JEEVA M</p>
        <h1 className="mt-8 max-w-4xl text-6xl font-semibold leading-none tracking-tight text-text-primary sm:text-7xl">
          I build platforms,
          <br />
          <span className="text-accent">not just applications.</span>
        </h1>
        <p className="mt-10 max-w-2xl text-xl leading-relaxed text-text-secondary">
          Integrated M.Tech Software Engineering at VIT Chennai. Building at the
          intersection of backend engineering, AI infrastructure, and distributed systems.
        </p>
      </section>

      <section className="border-t border-border-secondary/50 px-8 py-16 sm:px-16 lg:px-24">
        <div className="grid gap-16 lg:grid-cols-2">
          <div>
            <p className="font-mono text-xs tracking-widest text-text-tertiary">PHILOSOPHY</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-text-primary">How I engineer</h2>
            <div className="mt-8 space-y-6">
              <div>
                <h3 className="text-lg font-medium text-text-primary">Architecture first.</h3>
                <p className="mt-3 leading-relaxed text-text-secondary">
                  Every project begins with architecture — identifying domains, bounded contexts,
                  responsibilities, dependencies, data flow, and failure points before writing code.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-text-primary">Modularity by default.</h3>
                <p className="mt-3 leading-relaxed text-text-secondary">
                  Every major subsystem should be replaceable. LLMs, embeddings, vector databases,
                  storage, authentication, and cloud providers — all behind interfaces, never directly coupled.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-text-primary">Production mindset.</h3>
                <p className="mt-3 leading-relaxed text-text-secondary">
                  Projects are designed beyond prototypes. Docker deployment, configuration management,
                  authentication, logging, testing, dependency injection, and provider abstraction
                  are standard, not afterthoughts.
                </p>
              </div>
            </div>
          </div>
          <div>
            <p className="font-mono text-xs tracking-widest text-text-tertiary">FOCUS</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-text-primary">What I am building</h2>
            <div className="mt-8 flex flex-wrap gap-2">
              {[
                'Backend Engineering', 'AI Infrastructure', 'RAG Systems',
                'Distributed Systems', 'Multi-Agent AI', 'System Architecture',
                'Research Tooling', 'Developer Platforms', 'Cloud Computing',
                'Computer Vision',
              ].map((t) => (<Tag key={t}>{t}</Tag>))}
            </div>
            <div className="mt-10">
              <p className="font-mono text-xs tracking-widest text-text-tertiary">GOAL</p>
              <p className="mt-4 leading-relaxed text-text-secondary">
                Become a backend and AI systems engineer specializing in distributed software,
                AI infrastructure, and developer platforms. Continue building production-grade
                open-source platforms that combine scalable backend engineering with modern AI.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border-secondary/50 px-8 py-16 sm:px-16 lg:px-24">
        <Callout variant="info">
          I believe the best engineering happens before code is written — in understanding
          the problem, designing the system, then building with intention. Every project
          should remain understandable, maintainable, and scalable over time.
        </Callout>
        <div className="mt-10 flex items-center gap-6">
          <Link href="/projects/researchos" className="inline-flex items-center gap-2 rounded-xl bg-text-primary px-6 py-3 text-sm font-medium text-bg-primary transition-all duration-medium hover:bg-text-secondary active:scale-[0.98]">
            Explore ResearchOS &rarr;
          </Link>
          <Link href="/contact" className="text-sm text-text-tertiary transition-colors duration-micro hover:text-text-secondary">
            Get in touch &rarr;
          </Link>
        </div>
      </section>
    </div>
  );
}
