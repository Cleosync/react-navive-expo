/**
 * Kaviral Mobile Design System — Motion tokens. Source: spec section 40.
 * `easing` values are cubic-bezier control points — pass them to Reanimated's
 * `Easing.bezier(...theme.motion.easing.standard)` or use directly in a CSS
 * `cubic-bezier(...)` string on web. Keep animation subtle and fast; don't
 * animate every element.
 */
export const motion = {
  duration: {
    instant: 100,
    fast: 150,
    normal: 200,
    slow: 300,
    slower: 400,
  },
  easing: {
    standard: [0.2, 0, 0, 1],
    enter: [0, 0, 0.2, 1],
    exit: [0.4, 0, 1, 1],
  },
} as const;
