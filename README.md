# Jeeva M — Portfolio

**Systems engineer building AI-native platforms for research, embedded systems, and legal intelligence.**

[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue)](https://www.typescriptlang.org)
[![Docker](https://img.shields.io/badge/Docker-ready-blue)](https://docker.com)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

---

## Overview

A living engineering platform that demonstrates systems thinking through architecture, decisions, and craft. Built as a premium software product — not a template portfolio.

**Live:** [jeeva-m.vercel.app](https://jeeva-m.vercel.app)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS + Design Tokens |
| Animation | CSS + Framer Motion |
| Content | MDX |
| Icons | Lucide React |
| Fonts | Inter + JetBrains Mono |
| Deployment | Docker / Vercel |

---

## Quick Start

```bash
# Install
npm install

# Development
npm run dev

# Build
npm run build

# Production
npm start

# Docker
docker build -t portfolio .
docker run -p 3000:3000 portfolio

# Docker Compose
docker-compose up -d
```

---

## Features

- **System Inspector** — Three-panel layout for project detail pages (Navigator | Content | Inspector)
- **Command Palette** — Cmd+K universal search across all content
- **Architecture Explorer** — Interactive DDD + Hexagonal architecture diagrams
- **Decision Cards** — Context, alternatives, trade-offs for every architectural choice
- **Ambient Starfield** — 400-star parallax background with gravitational lensing
- **Dark Mode** — Default with smooth light mode transition
- **Design Token System** — All visual values from CSS custom properties
- **Gradual Activation** — Content sections activate as evidence becomes available
- **Platform State Dashboard** — Self-documenting page at `/state`

---

## Pages

| Route | Page |
|---|---|
| `/` | Home — hero, featured work, experience, research, philosophy |
| `/projects` | Projects index with filtering |
| `/projects/researchos` | ResearchOS — DDD + Hexagonal Architecture |
| `/projects/forgemcu-studio` | ForgeMCU Studio — Multi-agent firmware generation |
| `/projects/zevaras` | Zevaras Legal AI — Production RAG platform |
| `/projects/leaf-segmentation` | Leaf Segmentation — YOLOv8 edge AI |
| `/research` | Neuromorphic intrusion detection research |
| `/experience` | Professional timeline — IISc, HCLTech, Zevaras |
| `/about` | Engineering philosophy and focus areas |
| `/contact` | Email, GitHub, LinkedIn, location |
| `/state` | Platform state — version history, content maturity |

---

## Project Structure

```
src/
├── app/              # Next.js App Router pages
│   ├── projects/     # Project index + [slug] detail
│   ├── research/     # Research page
│   ├── experience/   # Experience timeline
│   ├── about/        # About + philosophy
│   ├── contact/      # Contact page
│   └── state/        # Platform state dashboard
├── components/
│   ├── ui/           # Atoms (Button, Badge, Tag, Callout, etc.)
│   ├── features/     # Molecules + Organisms (CommandPalette, DecisionCard, etc.)
│   └── layout/       # Layout (Navbar, Footer, Container, Grid)
├── lib/              # Data, search index, events, utilities
├── styles/           # Global CSS + design tokens
└── types/            # TypeScript type definitions
```

---

## Design System

- **Typography:** Inter (primary) + JetBrains Mono (code)
- **Color:** Dark mode default. Single accent blue (#3b82f6). No green/red/yellow.
- **Spacing:** 4px base unit. 14-step scale.
- **Shape:** 0/4/8/12px radii. Flat. Shadow-averse.
- **Motion:** 150-300ms. Ease-out. Transform + opacity only. Reduced motion respected.

---

## Contact

- **Email:** jeeva4772@gmail.com
- **GitHub:** [github.com/jeeva-m-21](https://github.com/jeeva-m-21)
- **LinkedIn:** [linkedin.com/in/jeeva4772](https://www.linkedin.com/in/jeeva4772/)
- **Location:** Chennai, Tamil Nadu, India

---

## License

MIT
