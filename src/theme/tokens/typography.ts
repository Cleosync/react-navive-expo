/**
 * Kaviral Mobile Design System — Typography tokens.
 * Source: spec sections 2-5.
 *
 * Bricolage Grotesque and Inter Tight ship as one static font file per weight
 * (via @expo-google-fonts), so `fontFamily` below is already weight-specific —
 * RN's `fontWeight` won't switch weight on its own. Each `text` scale entry sets
 * both so the object can be spread straight into a style.
 *
 * `letterSpacing` is precomputed to points (em * fontSize) because RN takes an
 * absolute value, not a CSS em multiplier. Only the scale entries the spec
 * defines tracking for (display + headings) carry it.
 */

import {
  BricolageGrotesque_400Regular,
  BricolageGrotesque_500Medium,
  BricolageGrotesque_600SemiBold,
  BricolageGrotesque_700Bold,
} from '@expo-google-fonts/bricolage-grotesque';
import {
  InterTight_400Regular,
  InterTight_500Medium,
  InterTight_600SemiBold,
  InterTight_700Bold,
} from '@expo-google-fonts/inter-tight';

export const fontFamily = {
  display: {
    regular: 'BricolageGrotesque_400Regular',
    medium: 'BricolageGrotesque_500Medium',
    semibold: 'BricolageGrotesque_600SemiBold',
    bold: 'BricolageGrotesque_700Bold',
  },
  body: {
    regular: 'InterTight_400Regular',
    medium: 'InterTight_500Medium',
    semibold: 'InterTight_600SemiBold',
    bold: 'InterTight_700Bold',
  },
} as const;

/** All font files that must be loaded via useFonts before these tokens render correctly. */
export const fontsToLoad = {
  BricolageGrotesque_400Regular,
  BricolageGrotesque_500Medium,
  BricolageGrotesque_600SemiBold,
  BricolageGrotesque_700Bold,
  InterTight_400Regular,
  InterTight_500Medium,
  InterTight_600SemiBold,
  InterTight_700Bold,
} as const;

/** Section 4 — do not use arbitrary weights. */
export const fontWeight = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
} as const;

/** Section 5 — em-based tracking scale, for one-off cases computing their own em(fontSize). */
export const tracking = {
  tightXl: -0.03,
  tightLg: -0.025,
  tight: -0.02,
  normal: 0,
  wide: 0.01,
} as const;

/** em * fontSize, rounded to 2dp — converts CSS letter-spacing(em) to RN's point value. */
const em = (fontSize: number, factor: number) => Math.round(fontSize * factor * 100) / 100;

type TextStyleToken = {
  fontFamily: string;
  fontSize: number;
  lineHeight: number;
  fontWeight: (typeof fontWeight)[keyof typeof fontWeight];
  letterSpacing?: number;
};

export const text = {
  // Display
  displayXl: {
    fontFamily: fontFamily.display.semibold,
    fontSize: 48,
    lineHeight: 52,
    fontWeight: fontWeight.semibold,
    letterSpacing: em(48, tracking.tightXl),
  },
  displayLg: {
    fontFamily: fontFamily.display.semibold,
    fontSize: 40,
    lineHeight: 44,
    fontWeight: fontWeight.semibold,
    letterSpacing: em(40, tracking.tightLg),
  },

  // Headings
  h1: {
    fontFamily: fontFamily.display.semibold,
    fontSize: 32,
    lineHeight: 36,
    fontWeight: fontWeight.semibold,
    letterSpacing: em(32, tracking.tight),
  },
  h2: {
    fontFamily: fontFamily.display.semibold,
    fontSize: 28,
    lineHeight: 32,
    fontWeight: fontWeight.semibold,
    letterSpacing: em(28, -0.018),
  },
  h3: {
    fontFamily: fontFamily.display.medium,
    fontSize: 24,
    lineHeight: 28,
    fontWeight: fontWeight.medium,
    letterSpacing: em(24, -0.015),
  },
  h4: {
    fontFamily: fontFamily.display.medium,
    fontSize: 20,
    lineHeight: 24,
    fontWeight: fontWeight.medium,
    letterSpacing: em(20, -0.01),
  },

  // Body
  bodyLg: {
    fontFamily: fontFamily.body.regular,
    fontSize: 18,
    lineHeight: 26,
    fontWeight: fontWeight.regular,
  },
  body: {
    fontFamily: fontFamily.body.regular,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: fontWeight.regular,
  },
  bodySm: {
    fontFamily: fontFamily.body.regular,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: fontWeight.regular,
  },

  // Labels
  labelLg: {
    fontFamily: fontFamily.body.medium,
    fontSize: 16,
    lineHeight: 20,
    fontWeight: fontWeight.medium,
  },
  label: {
    fontFamily: fontFamily.body.medium,
    fontSize: 14,
    lineHeight: 18,
    fontWeight: fontWeight.medium,
  },
  caption: {
    fontFamily: fontFamily.body.regular,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: fontWeight.regular,
  },

  // Buttons
  buttonLg: {
    fontFamily: fontFamily.body.medium,
    fontSize: 16,
    lineHeight: 20,
    fontWeight: fontWeight.medium,
  },
  button: {
    fontFamily: fontFamily.body.medium,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: fontWeight.medium,
  },
  buttonSm: {
    fontFamily: fontFamily.body.medium,
    fontSize: 14,
    lineHeight: 18,
    fontWeight: fontWeight.medium,
  },

  // Numbers
  numberXl: {
    fontFamily: fontFamily.display.semibold,
    fontSize: 40,
    lineHeight: 44,
    fontWeight: fontWeight.semibold,
  },
  numberLg: {
    fontFamily: fontFamily.display.semibold,
    fontSize: 32,
    lineHeight: 36,
    fontWeight: fontWeight.semibold,
  },
  numberMd: {
    fontFamily: fontFamily.display.semibold,
    fontSize: 24,
    lineHeight: 28,
    fontWeight: fontWeight.semibold,
  },
} satisfies Record<string, TextStyleToken>;

export const typography = {
  fontFamily,
  fontWeight,
  tracking,
  text,
} as const;
