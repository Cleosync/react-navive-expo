/**
 * Kaviral Mobile Design System — Breakpoints. Source: spec section 42.
 * Registered directly with `StyleSheet.configure({ breakpoints })` in unistyles.ts.
 * `xs: 0` is required by Unistyles itself (at least one breakpoint must be 0,
 * to seed the cascade below `mobileSm`) — it isn't in the original spec.
 */
export const breakpoints = {
  xs: 0,
  mobileSm: 375,
  mobile: 390,
  mobileLg: 430,
  tablet: 768,
  desktop: 1024,
  desktopLg: 1280,
} as const;
