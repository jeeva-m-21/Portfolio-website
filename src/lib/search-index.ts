import type { SearchItem } from '@/types';

/**
 * Static search index for the command palette.
 * Generated at build time. Add new content here as the platform grows.
 */
export const searchIndex: SearchItem[] = [
  /* Pages */
  {
    id: 'home',
    label: 'Home',
    category: 'page',
    href: '/',
    keywords: ['portfolio', 'landing'],
  },
  {
    id: 'projects',
    label: 'Projects',
    category: 'page',
    href: '/projects',
    keywords: ['work', 'portfolio'],
  },
  {
    id: 'research',
    label: 'Research',
    category: 'page',
    href: '/research',
    keywords: ['papers', 'publications', 'neuromorphic'],
  },
  {
    id: 'experience',
    label: 'Experience',
    category: 'page',
    href: '/experience',
    keywords: ['work', 'internships', 'career'],
  },
  {
    id: 'about',
    label: 'About',
    category: 'page',
    href: '/about',
    keywords: ['philosophy', 'background', 'story'],
  },
  {
    id: 'contact',
    label: 'Contact',
    category: 'page',
    href: '/contact',
    keywords: ['email', 'reach', 'hire'],
  },
  {
    id: 'state',
    label: 'Platform State',
    description: 'Version history, content maturity, project status',
    category: 'page',
    href: '/state',
    keywords: ['version', 'changelog', 'maturity', 'status', 'dashboard'],
  },

  /* Projects */
  {
    id: 'project-researchos',
    label: 'ResearchOS',
    description: 'AI-powered Research Operating System',
    category: 'project',
    href: '/projects/researchos',
    keywords: ['ai', 'research', 'operating system', 'wal', 'offline-first', 'sdk'],
  },
  {
    id: 'project-ai-incident-os',
    label: 'AI Incident OS',
    description: 'AI-powered incident management platform',
    category: 'project',
    href: '/projects/ai-incident-os',
    keywords: ['ai', 'incident', 'operations', 'automation', 'agents'],
  },
  {
    id: 'project-banking',
    label: 'Banking Platform',
    description: 'Enterprise banking application',
    category: 'project',
    href: '/projects/banking-platform',
    keywords: ['banking', 'enterprise', 'security', 'authentication', 'transactions'],
  },
  {
    id: 'project-forgemcu',
    label: 'ForgeMCU Studio',
    description: 'AI-assisted embedded firmware generation',
    category: 'project',
    href: '/projects/forgemcu-studio',
    keywords: ['embedded', 'firmware', 'stm32', 'esp32', 'rag', 'multi-agent'],
  },

  /* Actions */
  {
    id: 'action-resume',
    label: 'Download Resume',
    category: 'action',
    action: 'resume',
    keywords: ['cv', 'pdf', 'download'],
  },
  {
    id: 'action-email',
    label: 'Copy Email',
    category: 'action',
    action: 'email', href: 'mailto:jeeva4772@gmail.com',
    keywords: ['contact', 'mail', 'reach'],
  },
  {
    id: 'action-github',
    label: 'GitHub Profile',
    category: 'external',
    action: 'github', href: 'https://github.com/jeeva-m-21',
    keywords: ['code', 'repos', 'open source'],
  },
  {
    id: 'action-linkedin',
    label: 'LinkedIn Profile',
    category: 'external',
    action: 'linkedin', href: 'https://www.linkedin.com/in/jeeva4772/',
    keywords: ['social', 'professional', 'network'],
  },
  {
    id: 'action-theme',
    label: 'Toggle Theme',
    category: 'action',
    action: 'theme',
    keywords: ['dark', 'light', 'mode'],
  },
];

/**
 * Fuzzy search across the search index.
 * Matches against label, description, and keywords.
 */
export function search(query: string): SearchItem[] {
  if (!query.trim()) return searchIndex;

  const q = query.toLowerCase().trim();
  const terms = q.split(/\s+/);

  return searchIndex
    .map((item) => {
      const searchText = [
        item.label,
        item.description,
        ...(item.keywords ?? []),
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      // Score: exact match > prefix match > contains match > fuzzy
      let score = 0;
      for (const term of terms) {
        if (searchText === term) score += 100;
        else if (searchText.startsWith(term)) score += 50;
        else if (searchText.includes(term)) score += 25;
        else {
          // Simple fuzzy: check if most characters appear in order
          let ti = 0;
          for (let si = 0; si < searchText.length && ti < term.length; si++) {
            if (searchText[si] === term[ti]) ti++;
          }
          if (ti >= term.length * 0.7) score += 10;
        }
      }

      return { item, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .map(({ item }) => item);
}

/**
 * Group search results by category for display.
 */
export function groupResults(items: SearchItem[]) {
  const groups: Record<string, SearchItem[]> = {
    page: [],
    project: [],
    action: [],
    external: [],
  };

  for (const item of items) {
    const cat = item.category;
    if (cat in groups) {
      groups[cat]!.push(item);
    }
  }

  return Object.entries(groups).filter(([, items]) => items.length > 0);
}

export const categoryLabels: Record<string, string> = {
  page: 'Pages',
  project: 'Projects',
  action: 'Actions',
  external: 'External',
};
