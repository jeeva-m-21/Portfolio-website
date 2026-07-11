'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  className?: string;
}

export function CodeBlock({
  code,
  language,
  filename,
  className,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div
      className={cn(
        'group relative rounded-md border border-border-primary bg-bg-secondary',
        className,
      )}
    >
      {/* Header */}
      {(language || filename) && (
        <div className="flex items-center justify-between border-b border-border-secondary px-4 py-2">
          <span className="font-mono text-xs text-text-tertiary">
            {filename || language}
          </span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 rounded p-1 text-xs text-text-tertiary opacity-0 transition-all duration-micro hover:text-text-secondary group-hover:opacity-100"
            aria-label={copied ? 'Copied' : 'Copy code'}
          >
            {copied ? (
              <>
                <Check size={14} className="text-accent" />
                <span className="text-accent">Copied</span>
              </>
            ) : (
              <>
                <Copy size={14} />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* Code */}
      <pre className="overflow-x-auto p-6">
        <code className="font-mono text-sm leading-relaxed text-text-primary">
          {code}
        </code>
      </pre>
    </div>
  );
}
