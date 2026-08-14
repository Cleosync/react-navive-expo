import { border } from '../tokens/borders';
import { colors } from '../tokens/colors';
import { icon } from '../tokens/icons';
import { layout, space, touch } from '../tokens/spacing';
import { motion } from '../tokens/motion';
import { radius } from '../tokens/radius';
import { shadow } from '../tokens/shadows';
import { typography } from '../tokens/typography';

/**
 * Kaviral Mobile Design System — light theme.
 * Composes every core token group into the single object Unistyles hands to
 * `StyleSheet.create((theme) => ...)`. Breakpoints are registered separately
 * with `StyleSheet.configure` (see ../unistyles.ts) — Unistyles exposes the
 * active one at runtime via `rt.breakpoint`, so it isn't duplicated here.
 *
 * Only the spec's light values exist today (source doc is light-only); a
 * `dark` theme can be added later as a sibling that swaps `colors` while
 * reusing every other token group as-is.
 */
export const lightTheme = {
  colors,
  typography,
  space,
  touch,
  layout,
  radius,
  border,
  shadow,
  icon,
  motion,
} as const;
