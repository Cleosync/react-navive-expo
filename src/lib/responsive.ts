import { breakpoints } from '@/theme/tokens/breakpoints';

export type BreakpointName = keyof typeof breakpoints;

/** Ascending — `breakpoints` is authored smallest-first and object key order preserves that. */
const breakpointOrder = Object.keys(breakpoints) as BreakpointName[];

/** A plain value, or that value pinned per breakpoint (e.g. `{ xs: 1, tablet: 2 }`). */
export type ResponsiveValue<T> = T | Partial<Record<BreakpointName, T>>;

function isResponsiveMap<T>(value: ResponsiveValue<T>): value is Partial<Record<BreakpointName, T>> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/**
 * Resolves a `ResponsiveValue` against the active breakpoint. A breakpoint map doesn't need every
 * key filled in — this cascades down to the nearest smaller breakpoint that has one, mirroring how
 * Unistyles' own breakpoint-object style values behave.
 */
export function resolveResponsiveValue<T>(
  value: ResponsiveValue<T> | undefined,
  activeBreakpoint: BreakpointName | undefined,
): T | undefined {
  if (value === undefined || !isResponsiveMap(value)) {
    return value;
  }

  const startIndex = breakpointOrder.indexOf(activeBreakpoint ?? 'xs');

  for (let i = startIndex; i >= 0; i--) {
    const entry = value[breakpointOrder[i]];
    if (entry !== undefined) {
      return entry;
    }
  }

  return undefined;
}

/** Maps every value inside a (possibly responsive) prop through `fn`, preserving its shape. */
export function mapResponsiveValue<T, U>(
  value: ResponsiveValue<T> | undefined,
  fn: (input: T) => U,
): ResponsiveValue<U> | undefined {
  if (value === undefined) {
    return undefined;
  }

  if (!isResponsiveMap(value)) {
    return fn(value);
  }

  const mapped: Partial<Record<BreakpointName, U>> = {};
  for (const key of breakpointOrder) {
    const entry = value[key];
    if (entry !== undefined) {
      mapped[key] = fn(entry);
    }
  }
  return mapped;
}
