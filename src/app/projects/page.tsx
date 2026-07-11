import type { Metadata } from 'next';
import { ProjectsContent } from './ProjectsContent';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Systems I have designed and built — ResearchOS, AI Incident OS, Banking Platform, and ForgeMCU Studio.',
};

export default function ProjectsPage() {
  return <ProjectsContent />;
}
