import { colors } from './colors';

/**
 * Kaviral Mobile Design System — Border tokens. Source: spec section 14.
 * `color` re-exports the semantic border colors from colors.ts so a component
 * can reach everything border-related — `theme.border.width` and
 * `theme.border.color` — from one place.
 */
export const border = {
  width: {
    none: 0,
    thin: 1,
    medium: 2,
  },
  color: colors.border,
} as const;
