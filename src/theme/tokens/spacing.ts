/**
 * Kaviral Mobile Design System — Spacing, layout, and touch-target tokens.
 * Source: spec sections 11, 12, 17, 42, 43.
 */

/** Section 11 — 4px base unit. Keys match the `--space-N` suffix, not a linear index. */
export const space = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  7: 28,
  8: 32,
  10: 40,
  12: 48,
  14: 56,
  16: 64,
  20: 80,
  24: 96,
  32: 128,
} as const;

/** A valid step on the `space` scale — e.g. `4` (16px), not an arbitrary pixel number. */
export type SpaceKey = keyof typeof space;

/** Section 17 — never size an interactive control below `min`. */
export const touch = {
  min: 44,
  default: 48,
  large: 52,
  xl: 56,
} as const;

/**
 * Sections 12 + 43 — page/layout rules per platform width class.
 * Safe-area insets are NOT included here: use `useSafeAreaInsets()`
 * (react-native-safe-area-context) or a Unistyles `rt.insets` callback instead
 * of a static token, since they're runtime device values.
 */
export const layout = {
  mobile: {
    horizontalPadding: 20,
    horizontalPaddingLarge: 24,
    sectionGap: 32,
    componentGap: 16,
    smallGap: 8,
  },
  tablet: {
    horizontalPadding: 32,
  },
  desktop: {
    horizontalPadding: 48,
    maxContentWidth: 1200,
  },

  contentMaxWidth: 1200,
  sectionGap: { sm: 24, md: 32, lg: 48 },
  cardGap: 16,
  listGap: 0,
  headerHeight: 56,
  bottomNavHeight: 72,
} as const;
