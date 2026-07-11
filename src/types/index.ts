/**
 * Core type definitions for the portfolio platform.
 */

/* Content maturity levels */
export type MaturityLevel = 0 | 1 | 2 | 3 | 4 | 5;

/* Content activation state */
export type ContentState = 'active' | 'preview' | 'hidden';

/* Content types */
export type ContentType = 'project' | 'research' | 'experience' | 'writing' | 'award' | 'talk';

/* Project status */
export type ProjectStatus = 'prototype' | 'in-development' | 'beta' | 'production';

/* Navigation item */
export interface NavItem {
  label: string;
  href: string;
}

/* Command palette search item */
export interface SearchItem {
  id: string;
  label: string;
  category: 'page' | 'project' | 'decision' | 'action' | 'external';
  href?: string;
  action?: string;
  description?: string;
  keywords?: string[];
}

/* Project metadata */
export interface ProjectMeta {
  slug: string;
  title: string;
  description: string;
  status: ProjectStatus;
  maturityLevel: MaturityLevel;
  technologies: string[];
  startedAt: string;
  updatedAt: string;
  links?: {
    github?: string;
    demo?: string;
    documentation?: string;
  };
}

/* ADR entry */
export interface ADREntry {
  id: string;
  title: string;
  project: string;
  date: string;
  context: string;
  alternatives: string[];
  decision: string;
  consequences: {
    positive: string[];
    negative: string[];
  };
  reflection?: string;
}

/* Experience entry */
export interface ExperienceEntry {
  organization: string;
  role: string;
  startDate: string;
  endDate?: string;
  contributions: string[];
  learnings: string[];
  technologies: string[];
}

/* Research entry */
export interface ResearchEntry {
  slug: string;
  title: string;
  status: 'under-review' | 'published' | 'in-progress';
  venue?: string;
  date?: string;
  problem: string;
  methodology: string;
  findings: string;
  contribution: string;
}
