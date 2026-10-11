import { colors, fonts } from '@scrapbook-atlas/shared';

export { colors, fonts };

/**
 * Spacing scale. Styles use start/end rather than left/right everywhere so the
 * right-to-left locale added in Milestone 5 mirrors without edits.
 */
export const space = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 40,
} as const;
