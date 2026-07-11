'use client';

import { useState } from 'react';
import { Container, Section, Grid } from '@/components/layout';
import { ProjectCard } from '@/components/features/ProjectCard';
import { FilterBar } from '@/components/features/FilterBar';
import { projects } from '@/lib/projects';

const filters = [
  { id: 'all', label: 'All' },
  { id: 'in-development', label: 'In Development' },
  { id: 'prototype', label: 'Prototype' },
];

export function ProjectsContent() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filtered =
    activeFilter === 'all'
      ? projects
      : projects.filter((p) => p.status === activeFilter);

  return (
    <>
      <Section spacing="hero">
        <Container variant="reading">
          <p className="font-mono text-xs text-text-tertiary">Projects</p>
          <h1 className="mt-6 text-5xl font-semibold tracking-tight text-text-primary sm:text-6xl">
            Systems I have
            <br />
            <span className="text-accent">designed and built.</span>
          </h1>
          <p className="mt-8 max-w-lg text-lg leading-relaxed text-text-secondary text-balance">
            Each project represents a system designed from architecture through
            implementation, with documented decisions and lessons learned.
          </p>
        </Container>
      </Section>

      <Section>
        <Container variant="wide">
          <FilterBar
            options={filters}
            active={activeFilter}
            onChange={setActiveFilter}
          />
          <div className="mt-8">
            {filtered.length > 0 ? (
              <Grid cols={2} gap="large">
                {filtered.map((project) => (
                  <ProjectCard key={project!.slug} project={project!} />
                ))}
              </Grid>
            ) : (
              <div className="py-12 text-center">
                <p className="text-text-tertiary">
                  No projects match this filter.
                </p>
                <button
                  onClick={() => setActiveFilter('all')}
                  className="mt-2 text-sm text-accent transition-colors duration-micro hover:text-accent-hover"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </Container>
      </Section>
    </>
  );
}
