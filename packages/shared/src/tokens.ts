/**
 * Design tokens. The single source of truth for colour and type across the
 * mobile app and any server-rendered page, per CLAUDE.md.
 */
export const colors = {
  ink: '#2b2420',
  desk: '#2c2a28',
  cream: '#f6efdf',
  kraft: '#c8b085',
  accent: '#d9603a',
  gold: '#ffe28c',
  night: '#0b0a24',
} as const;

export type ColorToken = keyof typeof colors;

/**
 * Caveat carries handwriting, Bricolage Grotesque carries UI. Non-Latin
 * scripts fall through to the system face, so never hard-code these names in
 * a style without a fallback.
 */
export const fonts = {
  handwriting: {
    medium: 'Caveat_500Medium',
    bold: 'Caveat_700Bold',
  },
  ui: {
    regular: 'BricolageGrotesque_400Regular',
    semibold: 'BricolageGrotesque_600SemiBold',
    extrabold: 'BricolageGrotesque_800ExtraBold',
  },
} as const;

/** Minimum touch target in points, both axes. */
export const MIN_TOUCH_TARGET = 44;

/** Width in dp at and above which layouts switch to the tablet arrangement. */
export const TABLET_MIN_WIDTH = 768;

export const tokens = { colors, fonts, MIN_TOUCH_TARGET, TABLET_MIN_WIDTH } as const;
