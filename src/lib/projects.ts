import type { ProjectMeta, ADREntry, ExperienceEntry } from '@/types';

export const projects: ProjectMeta[] = [
  {
    slug: 'researchos',
    title: 'ResearchOS',
    description:
      'A unified operating system for AI and ML research — combining experiment tracking, paper authoring, knowledge graphs, AI assistance, and offline-first SDK into one connected platform.',
    status: 'in-development',
    maturityLevel: 2,
    technologies: [
      'FastAPI', 'PostgreSQL', 'pgvector', 'Redis Streams', 'Hybrid Search',
      'Hexagonal Architecture', 'DDD', 'Multi-Agent AI', 'Offline-First SDK',
    ],
    startedAt: '2025',
    updatedAt: '2026-07',
    links: { github: 'https://github.com/jeeva-m-21/ResearchOS' },
  },
  {
    slug: 'forgemcu-studio',
    title: 'ForgeMCU Studio',
    description:
      'Multi-agent AI platform that generates production-quality embedded firmware — architecture, drivers, testing, static analysis, and build validation — using LangGraph and MCP.',
    status: 'prototype',
    maturityLevel: 1,
    technologies: [
      'LangGraph', 'Multi-Agent', 'MCP', 'RAG', 'FastAPI',
      'STM32', 'ESP32', 'React', 'WebSockets',
    ],
    startedAt: '2025',
    updatedAt: '2026-07',
    links: { github: 'https://github.com/jeeva-m-21/Cyberforce-submission-V2' },
  },
  {
    slug: 'zevaras',
    title: 'Zevaras Legal AI',
    description:
      'Production RAG platform for legal document intelligence — hybrid retrieval with query rewriting, cross-encoder reranking, and multi-provider LLM abstraction on AWS Bedrock.',
    status: 'production',
    maturityLevel: 4,
    technologies: [
      'FastAPI', 'PostgreSQL', 'pgvector', 'AWS Bedrock', 'Hybrid RAG',
      'Cross Encoder', 'Docker', 'Streaming APIs',
    ],
    startedAt: '2024',
    updatedAt: '2025',
  },
  {
    slug: 'leaf-segmentation',
    title: 'Leaf Segmentation',
    description:
      'Lightweight YOLOv8 Nano model for precision agriculture — 3.1M parameters, 78ms latency on Snapdragon 855, deployed for drone-based field analysis.',
    status: 'production',
    maturityLevel: 4,
    technologies: [
      'YOLOv8', 'PyTorch', 'Edge AI', 'Computer Vision',
      'Raspberry Pi', 'Drone Deployment',
    ],
    startedAt: '2025',
    updatedAt: '2025',
  },
];

export const decisions: ADREntry[] = [
  {
    id: 'ADR-001',
    title: 'Hexagonal Architecture with DDD',
    project: 'ResearchOS',
    date: '2025',
    context:
      'ResearchOS manages complex research objects — Experiments, Runs, Notebooks, Papers, Datasets, Models, Artifacts — each with rich business logic. The system must remain testable and allow replacing databases, AI providers, and APIs without modifying core logic.',
    alternatives: [
      'MVC with Fat Services — rejected: business logic leaks into services, hard to test independently',
      'Microservices — rejected: operational complexity outweighs benefits for the current scale',
      'Hexagonal Architecture with DDD — selected: business logic isolated in domain layer, infrastructure behind interfaces',
    ],
    decision:
      'Use Domain-Driven Design with Hexagonal Architecture (Ports and Adapters). Each research object is an Aggregate Root. Business logic lives in the domain layer. Infrastructure implements interfaces defined by the domain. Dependency direction: API → Application → Domain. Infrastructure depends on domain, never the reverse.',
    consequences: {
      positive: [
        'Replace databases, AI providers, and APIs without modifying business logic',
        'Domain logic is fully testable without infrastructure',
        'Clear bounded contexts prevent coupling between research modules',
      ],
      negative: [
        'More files and indirection than a simple MVC approach',
        'Team must understand DDD patterns to contribute effectively',
        'Interface definitions require upfront design investment',
      ],
    },
    reflection:
      'The upfront cost of Hexagonal Architecture is real but pays off within weeks. When we needed to swap embedding providers, it was a single adapter change with zero domain code touched.',
  },
  {
    id: 'ADR-002',
    title: 'PostgreSQL as the Single Database',
    project: 'ResearchOS',
    date: '2025',
    context:
      'ResearchOS needs vector search, full-text search, JSON document storage, relational queries, and row-level security. Using multiple specialized databases would increase operational complexity.',
    alternatives: [
      'PostgreSQL + Elasticsearch + Redis — rejected: three systems to operate, synchronize, and debug',
      'PostgreSQL + ChromaDB — rejected: two vector stores, synchronization complexity',
      'PostgreSQL only — selected: pgvector for vectors, built-in FTS, JSONB for documents, RLS for security',
    ],
    decision:
      'Use PostgreSQL as the single database. pgvector handles vector search. Built-in full-text search handles keyword queries. JSONB stores flexible document structures. Row-Level Security enforces multi-tenant isolation. Extensions provide additional capabilities without additional infrastructure.',
    consequences: {
      positive: [
        'Single database to operate, backup, and monitor',
        'Vector and keyword search in the same query with JOINs',
        'Row-Level Security provides multi-tenant isolation at the database level',
      ],
      negative: [
        'pgvector performance may not match dedicated vector databases at extreme scale',
        'Full-text search lacks advanced features of Elasticsearch',
        'Single database is a single point of failure (mitigated by replication)',
      ],
    },
  },
  {
    id: 'ADR-003',
    title: 'Hybrid Search with RRF Fusion',
    project: 'ResearchOS',
    date: '2025',
    context:
      'Research requires finding papers, experiments, and notes by both semantic meaning and exact keywords. Pure vector search misses keyword-heavy queries. Pure BM25 misses semantic similarity.',
    alternatives: [
      'Vector search only — rejected: poor recall for keyword-heavy queries like "transformer architecture 2017"',
      'BM25 only — rejected: misses semantically related content with different vocabulary',
      'Hybrid with RRF — selected: combines vector, BM25, and trigram search with Reciprocal Rank Fusion',
    ],
    decision:
      'Implement hybrid search combining three retrieval methods: dense vector search (semantic), BM25 (keyword), and trigram search (fuzzy). Results are merged using Reciprocal Rank Fusion for final ranking. The objective is maximizing recall while maintaining precision.',
    consequences: {
      positive: [
        'Significantly better retrieval quality than any single method',
        'Handles both semantic queries and exact keyword searches',
        'Trigram search catches typos and partial matches',
      ],
      negative: [
        'Three retrieval methods means three times the computational cost per query',
        'RRF parameters require tuning for each domain',
        'More complex to debug when search quality issues arise',
      ],
    },
  },
  {
    id: 'ADR-004',
    title: 'Redis Streams for Event Architecture',
    project: 'ResearchOS',
    date: '2025',
    context:
      'Every state change in ResearchOS must emit domain events for projections, notifications, embedding generation, and audit logging. The event system needs consumer groups, retry, ordering, and dead letter queues.',
    alternatives: [
      'Kafka — rejected: operational complexity too high for current scale',
      'Simple message queue — rejected: no consumer groups, no replay, no ordering guarantees',
      'Redis Streams — selected: consumer groups, retry, ordering, dead letter queues without Kafka infrastructure',
    ],
    decision:
      'Use Redis Streams for the event architecture. Domain events flow through streams to consumer groups. Each consumer group processes events independently — projections, notifications, embedding generation, audit logging. Failed events route to dead letter queues for inspection and replay.',
    consequences: {
      positive: [
        'Consumer groups enable independent processing of the same event stream',
        'Event replay enables rebuilding projections from history',
        'Dead letter queues capture failures without blocking the stream',
      ],
      negative: [
        'Redis Streams are memory-backed — requires sufficient RAM for event volume',
        'Not as battle-tested as Kafka for extreme-scale event streaming',
        'Consumer group management requires careful monitoring',
      ],
    },
  },
];

export const experiences: ExperienceEntry[] = [
  {
    organization: 'Indian Institute of Science (IISc)',
    role: 'AI/ML Research Intern',
    startDate: '2025',
    endDate: '2025',
    contributions: [
      'Developed YOLOv8 Nano segmentation models for precision agriculture — 3.1M parameters, 78ms latency',
      'Created and annotated dataset of 358 RGB images with 4,812 polygon masks using Roboflow',
      'Optimized model for edge deployment on Snapdragon 855 and Raspberry Pi',
      'Achieved mAP@0.5 of 0.674 and mAP@0.5:0.95 of 0.543 across field conditions',
    ],
    learnings: [
      'Deepened understanding of model optimization for resource-constrained edge devices',
      'Learned rigorous experimental methodology and evaluation frameworks',
      'Gained experience with full ML pipeline — data collection, annotation, training, deployment',
    ],
    technologies: ['YOLOv8', 'Python', 'PyTorch', 'Edge AI', 'Computer Vision'],
  },
  {
    organization: 'HCLTech',
    role: 'Software Engineering Intern',
    startDate: '2024',
    endDate: '2024',
    contributions: [
      'Contributed to enterprise-scale software development projects',
      'Collaborated within cross-functional engineering teams',
      'Applied software engineering best practices in a professional environment',
    ],
    learnings: [
      'Learned enterprise development workflows and code review processes',
      'Gained experience in professional team collaboration',
      'Understood the role of documentation and testing in large codebases',
    ],
    technologies: ['Enterprise Development', 'Software Engineering', 'CI/CD'],
  },
  {
    organization: 'Zevaras',
    role: 'Software Engineer',
    startDate: '2024',
    endDate: '2025',
    contributions: [
      'Built production RAG platform for legal document intelligence with hybrid retrieval',
      'Implemented query rewriting, dense retrieval, BM25, RRF fusion, and cross-encoder reranking',
      'Designed multi-provider LLM abstraction layer on AWS Bedrock supporting Nova, Claude, and DeepSeek',
      'Developed FastAPI backend with PostgreSQL, pgvector, Docker, and streaming APIs',
    ],
    learnings: [
      'Designed production-oriented architectures under startup velocity constraints',
      'Gained deep experience with hybrid search, reranking, and retrieval optimization',
      'Developed provider abstraction patterns reusable across multiple projects',
    ],
    technologies: ['FastAPI', 'PostgreSQL', 'pgvector', 'AWS Bedrock', 'RAG', 'Docker'],
  },
];

export const achievements = [
  {
    id: 'hackathon',
    title: 'First Prize',
    subtitle: 'HCLTech Embedded Systems Hackathon',
    date: '2024',
    description:
      'Built AI-assisted code generation for embedded systems using ESP32 and Arduino. The project demonstrated practical AI application in resource-constrained environments.',
  },
  {
    id: 'merit',
    title: 'Merit Student Award',
    subtitle: 'VIT Chennai — Awarded Twice',
    date: 'Multiple Semesters',
    description:
      'Recognized for academic excellence across multiple semesters in the Integrated M.Tech Software Engineering program.',
  },
];
