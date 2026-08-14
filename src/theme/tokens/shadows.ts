/**
 * Kaviral Mobile Design System — Elevation tokens. Source: spec section 15.
 *
 * Values are unified `boxShadow` CSS-syntax strings (RN's spec-compliant,
 * cross-platform `boxShadow` View style prop, iOS + Android + web on the New
 * Architecture — see https://reactnative.dev/docs/shadow-props#boxshadow).
 * Apply with `style={{ boxShadow: theme.shadow.md }}`; no shadowColor/
 * shadowOffset/shadowOpacity/shadowRadius/elevation split needed.
 */
export const shadow = {
  none: 'none',
  sm: '0px 1px 2px rgba(17, 17, 17, 0.04)',
  md: '0px 4px 8px rgba(17, 17, 17, 0.06)',
  lg: '0px 12px 24px rgba(17, 17, 17, 0.08)',
  xl: '0px 24px 48px rgba(17, 17, 17, 0.10)',
} as const;
