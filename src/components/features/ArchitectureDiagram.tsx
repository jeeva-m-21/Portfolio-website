'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

interface Layer {
  name: string;
  description: string;
  components: { name: string; detail: string }[];
}

const architecture: Layer[] = [
  {
    name: 'API Layer',
    description: 'FastAPI routes. Thin controllers that validate input, call application services, and format responses. No business logic.',
    components: [
      { name: 'REST Endpoints', detail: 'Versioned API. All client interactions flow through here.' },
      { name: 'WebSocket', detail: 'Real-time updates for experiment monitoring and build status.' },
      { name: 'SDK', detail: 'Public SDK for third-party developers. Same interfaces used internally.' },
    ],
  },
  {
    name: 'Application Layer',
    description: 'Orchestrates use cases. Coordinates domain objects and infrastructure. No business rules — delegates to domain.',
    components: [
      { name: 'Use Cases', detail: 'Experiment workflow, paper authoring, search orchestration.' },
      { name: 'AI Pipeline', detail: 'Planner → Retriever → Tools → Reasoner → Writer → Reviewer.' },
      { name: 'Event Bus', detail: 'Redis Streams. Consumer groups. Projections. Dead letter queues.' },
    ],
  },
  {
    name: 'Domain Layer',
    description: 'DDD Aggregate Roots. All business logic lives here. Zero framework dependencies. Fully testable in isolation.',
    components: [
      { name: 'Experiment', detail: 'Tracks runs, metrics, parameters, and artifacts.' },
      { name: 'Research Graph', detail: 'Connects papers, experiments, notes, and datasets.' },
      { name: 'Notebook', detail: 'Interactive research notebooks with AI assistance.' },
      { name: 'Paper', detail: 'Authoring with AI co-pilot and reference management.' },
    ],
  },
  {
    name: 'Infrastructure Layer',
    description: 'Implements interfaces defined by the domain. Replaceable behind abstractions. PostgreSQL, Redis, AI providers.',
    components: [
      { name: 'PostgreSQL', detail: 'pgvector + FTS + JSONB + RLS. Single database for all storage.' },
      { name: 'Redis Streams', detail: 'Event streaming with consumer groups and dead letter queues.' },
      { name: 'AI Providers', detail: 'OpenAI, Anthropic, Ollama — swappable behind interfaces.' },
      { name: 'Hybrid Search', detail: 'Vector + BM25 + Trigram → RRF Fusion → Cross Encoder.' },
    ],
  },
];

export function ArchitectureDiagram() {
  const [activeLayer, setActiveLayer] = useState<number | null>(null);
  const [activeComponent, setActiveComponent] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      {architecture.map((layer, i) => {
        const isActive = activeLayer === i;
        return (
          <div
            key={layer.name}
            className={cn(
              'cursor-pointer overflow-hidden rounded-xl border transition-all duration-medium',
              isActive
                ? 'border-accent-subtle bg-accent-subtle/5'
                : 'border-border-secondary bg-bg-secondary/30 hover:border-border-primary hover:bg-bg-secondary/50',
            )}
            onClick={() => setActiveLayer(isActive ? null : i)}
          >
            <div className="flex items-center justify-between px-5 py-4">
              <div className="flex items-center gap-3">
                <span className={cn(
                  'font-mono text-xs transition-colors duration-medium',
                  isActive ? 'text-accent' : 'text-text-tertiary',
                )}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className={cn(
                  'text-sm font-medium transition-colors duration-medium',
                  isActive ? 'text-accent' : 'text-text-primary',
                )}>
                  {layer.name}
                </h3>
              </div>
              <span className={cn(
                'font-mono text-[10px] transition-all duration-medium',
                isActive ? 'rotate-180 text-accent' : 'text-text-disabled',
              )}>
                ▼
              </span>
            </div>

            {isActive && (
              <div className="border-t border-border-secondary/50 px-5 pb-5 pt-4" style={{ animation: 'fadeUp 0.25s both' }}>
                <p className="mb-4 text-sm leading-relaxed text-text-secondary">{layer.description}</p>
                <div className="grid gap-2 sm:grid-cols-2">
                  {layer.components.map((comp) => {
                    const isCompActive = activeComponent === comp.name;
                    return (
                      <button
                        key={comp.name}
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveComponent(isCompActive ? null : comp.name);
                        }}
                        className={cn(
                          'rounded-lg border px-4 py-3 text-left transition-all duration-micro',
                          isCompActive
                            ? 'border-accent bg-accent-subtle/20'
                            : 'border-border-secondary bg-bg-secondary hover:border-border-primary',
                        )}
                      >
                        <p className={cn(
                          'text-sm font-medium transition-colors duration-micro',
                          isCompActive ? 'text-accent' : 'text-text-primary',
                        )}>
                          {comp.name}
                        </p>
                        {isCompActive && (
                          <p className="mt-1.5 text-xs leading-relaxed text-text-secondary" style={{ animation: 'fadeUp 0.2s both' }}>
                            {comp.detail}
                          </p>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
