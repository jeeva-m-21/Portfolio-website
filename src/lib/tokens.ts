/**
 * Design token constants for programmatic access.
 * All visual values should reference these tokens, never hardcoded values.
 */

export const tokens = {
  spacing: {
    0: '0',
    1: '0.25rem',
    2: '0.5rem',
    3: '0.75rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    7: '2rem',
    8: '2.5rem',
    9: '3rem',
    10: '3.5rem',
    11: '4rem',
    12: '5rem',
    13: '6rem',
    14: '7.5rem',
  },
  radius: {
    none: '0',
    sm: '0.25rem',
    md: '0.5rem',
    lg: '0.75rem',
  },
  duration: {
    micro: 100,
    small: 150,
    medium: 200,
    large: 300,
    xl: 500,
  },
  maxWidth: {
    reading: '720px',
    wide: '1200px',
    narrow: '560px',
  },
} as const;

export type SpacingToken = keyof typeof tokens.spacing;
export type RadiusToken = keyof typeof tokens.radius;
export type DurationToken = keyof typeof tokens.duration;
export type MaxWidthToken = keyof typeof tokens.maxWidth;
