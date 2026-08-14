/**
 * Kaviral Mobile Design System — Color tokens.
 * Source: KAVIRAL MOBILE DESIGN SYSTEM spec, sections 6-9, 21, 35.
 * Primitive scales first, semantic aliases second — never consume `palette` directly
 * from a component; always go through the semantic layer (or a component token).
 */

export const palette = {
  purple: {
    50: '#F5F3FF',
    100: '#EDE9FE',
    200: '#DDD6FE',
    300: '#C4B5FD',
    400: '#A78BFA',
    500: '#8B5CF6',
    600: '#7C3AED',
    700: '#6D28D9',
    800: '#5B21B6',
    900: '#4C1D95',
  },
  neutral: {
    0: '#FFFFFF',
    50: '#FAFAFA',
    100: '#F4F4F5',
    200: '#E4E4E7',
    300: '#D4D4D8',
    400: '#A1A1AA',
    500: '#71717A',
    600: '#52525B',
    700: '#3F3F46',
    800: '#27272A',
    900: '#18181B',
    950: '#111111',
  },
  success: {
    50: '#F0FDF4',
    100: '#DCFCE7',
    500: '#22C55E',
    600: '#16A34A',
    700: '#15803D',
  },
  warning: {
    50: '#FFFBEB',
    100: '#FEF3C7',
    500: '#F59E0B',
    600: '#D97706',
    700: '#B45309',
  },
  error: {
    50: '#FEF2F2',
    100: '#FEE2E2',
    500: '#EF4444',
    600: '#DC2626',
    700: '#B91C1C',
  },
  info: {
    50: '#EFF6FF',
    100: '#DBEAFE',
    500: '#3B82F6',
    600: '#2563EB',
    700: '#1D4ED8',
  },
} as const;

/** Primary brand color, section 6. */
export const brand = palette.purple[600];

const bg = {
  primary: palette.neutral[0],
  secondary: palette.neutral[50],
  tertiary: palette.neutral[100],
  elevated: palette.neutral[0],
  inverse: palette.neutral[950],
  brand: palette.purple[600],
  brandSubtle: palette.purple[50],
} as const;

const text = {
  primary: palette.neutral[950],
  secondary: palette.neutral[600],
  tertiary: palette.neutral[500],
  placeholder: palette.neutral[400],
  disabled: palette.neutral[400],
  inverse: palette.neutral[0],
  brand: palette.purple[600],
  success: palette.success[700],
  warning: palette.warning[700],
  error: palette.error[700],
  info: palette.info[700],
} as const;

const border = {
  subtle: palette.neutral[200],
  default: palette.neutral[300],
  strong: palette.neutral[400],
  focus: palette.purple[600],
  error: palette.error[500],
} as const;

const action = {
  primary: palette.purple[600],
  primaryHover: palette.purple[700],
  primaryPressed: palette.purple[800],

  secondaryBg: palette.neutral[0],
  secondaryBorder: palette.purple[600],
  secondaryText: palette.purple[600],

  danger: palette.error[600],
  dangerHover: palette.error[700],
} as const;

/** Section 10 — gradient stop colors. Not applied to any component yet; use sparingly. */
const gradient = {
  brand: {
    angle: 135,
    stops: [palette.purple[600], palette.purple[400]] as const,
  },
} as const;

/** Section 21 — status chips. */
const chip = {
  transit: { bg: palette.info[100], text: palette.info[700] },
  delivered: { bg: palette.success[100], text: palette.success[700] },
  pending: { bg: palette.warning[100], text: palette.warning[700] },
  cancelled: { bg: palette.error[100], text: palette.error[700] },
} as const;

/** Section 35 — alert/banner variants. */
const alert = {
  success: {
    bg: palette.success[50],
    border: palette.success[100],
    icon: palette.success[600],
    text: palette.success[700],
  },
  warning: {
    bg: palette.warning[50],
    border: palette.warning[100],
    icon: palette.warning[600],
    text: palette.warning[700],
  },
  error: {
    bg: palette.error[50],
    border: palette.error[100],
    icon: palette.error[600],
    text: palette.error[700],
  },
  info: {
    bg: palette.info[50],
    border: palette.info[100],
    icon: palette.info[600],
    text: palette.info[700],
  },
} as const;

/** Section 27 — modal/sheet scrim. */
const overlay = 'rgba(17, 17, 17, 0.48)';

export const colors = {
  palette,
  brand,
  bg,
  text,
  border,
  action,
  gradient,
  chip,
  alert,
  overlay,
} as const;
