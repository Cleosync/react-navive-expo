/**
 * Kaviral Mobile Design System — Icon tokens. Source: spec section 16.
 * `style` describes the icon set convention to follow once an icon library is
 * chosen (e.g. lucide-react-native) — not enforced by these tokens alone.
 */
export const icon = {
  size: {
    xs: 16,
    sm: 20,
    md: 24,
    lg: 32,
    xl: 40,
    default: 24,
  },
  stroke: 2,
  lineCap: 'round',
  lineJoin: 'round',
  style: 'outline',
} as const;
