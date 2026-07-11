'use client';

import { useEffect } from 'react';
import { Container, Section } from '@/components/layout';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Page error:', error);
  }, [error]);

  return (
    <Section spacing="hero">
      <Container variant="narrow">
        <div className="text-center">
          <h1 className="text-5xl font-semibold tracking-tight text-text-primary">
            Something went wrong
          </h1>
          <p className="mt-6 text-text-secondary text-balance">
            An unexpected error occurred. This has been logged and will be
            investigated.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={reset}
              className="rounded-lg bg-text-primary px-4 py-2 text-sm font-medium text-bg-primary transition-all duration-micro hover:bg-text-secondary"
            >
              Try again
            </button>
            <a
              href="/"
              className="text-sm text-text-tertiary transition-colors duration-micro hover:text-text-secondary"
            >
              Go Home &rarr;
            </a>
          </div>
        </div>
      </Container>
    </Section>
  );
}
