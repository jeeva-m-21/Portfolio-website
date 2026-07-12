import type { Metadata } from 'next';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Callout } from '@/components/ui/Callout';
import { Tag } from '@/components/ui/Tag';

export const metadata: Metadata = {
  title: 'Research',
  description: 'Applied research at the intersection of AI, security, and embedded systems.',
};

export default function ResearchPage() {
  return (
    <div className="min-h-screen">
      <section className="px-6 pb-12 pt-20 sm:px-16 lg:px-24 lg:pt-24">
        <p className="font-mono text-sm tracking-widest text-accent">RESEARCH</p>
        <h1 className="mt-8 max-w-4xl text-4xl font-semibold leading-tight sm:text-6xl sm:leading-none tracking-tight text-text-primary sm:text-7xl">
          Applied research at the intersection
          <br />
          <span className="text-accent">of AI, security, and embedded systems.</span>
        </h1>
        <p className="mt-10 max-w-2xl text-base leading-relaxed sm:text-xl text-text-secondary">
          Investigating how neuromorphic computing can make embedded systems
          more secure, efficient, and intelligent.
        </p>
      </section>

      <section className="border-t border-border-secondary px-8 py-16 sm:px-16 lg:px-24">
        <div className="grid gap-16 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <p className="font-mono text-xs tracking-widest text-text-tertiary">ACTIVE RESEARCH</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-text-primary">
              Neuromorphic Intrusion Detection
            </h2>
            <div className="mt-6 flex items-center gap-3">
              <StatusBadge status="in-development" />
              <span className="font-mono text-xs text-text-tertiary">Under Review</span>
            </div>
            <Callout variant="info">
              This research is currently under peer review. Detailed methodology
              and results will be published upon acceptance.
            </Callout>
            <div className="mt-10 space-y-8 max-w-3xl">
              {[
                { title: 'Problem', body: 'Modern vehicles rely on CAN buses for internal communication. These networks were designed without security and are vulnerable to intrusion attacks. Existing detection systems struggle with real-time constraints and resource limitations of automotive embedded systems.' },
                { title: 'Approach', body: 'Applying Spiking Neural Networks — a biologically-inspired computing paradigm — to detect intrusions through voltage fingerprinting. SNNs process information as discrete spikes, offering significant energy efficiency for resource-constrained automotive ECUs.' },
                { title: 'Methodology', body: 'Collecting voltage fingerprint data from CAN networks, designing SNN architectures for intrusion detection and ECU attribution, and evaluating against traditional ML approaches on automotive-grade embedded hardware.' },
                { title: 'My Contribution', body: 'Experimental design, SNN model implementation, and performance evaluation. Focused on bridging theoretical neuromorphic research and practical embedded deployment with millisecond latency budgets.' },
              ].map((item) => (
                <div key={item.title}>
                  <h3 className="text-lg font-medium text-text-primary">{item.title}</h3>
                  <p className="mt-3 leading-relaxed text-text-secondary">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="font-mono text-xs tracking-widest text-text-tertiary">INTERESTS</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {['Spiking Neural Networks', 'Embedded AI', 'Edge Computing', 'Cybersecurity', 'Intelligent Systems', 'Automotive Security'].map((i) => (
                <Tag key={i}>{i}</Tag>
              ))}
            </div>
            <div className="mt-10">
              <p className="font-mono text-xs tracking-widest text-text-tertiary">PUBLICATIONS</p>
              <div className="mt-4 space-y-3">
                {['Neuromorphic Voltage-Fingerprint Intrusion Detection for Automotive CAN Networks', 'ECU Attribution Using Spiking Neural Networks'].map((title) => (
                  <div key={title} className="rounded-lg border border-border-secondary bg-bg-secondary p-4">
                    <StatusBadge status="in-development" />
                    <h3 className="mt-2 text-sm font-medium leading-relaxed text-text-primary">{title}</h3>
                    <p className="mt-1 font-mono text-xs text-text-tertiary">Under Review</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
