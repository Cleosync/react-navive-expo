/// <reference types="jest" />

import { mapResponsiveValue, resolveResponsiveValue } from './responsive';

describe('resolveResponsiveValue', () => {
  it('returns a plain value unchanged', () => {
    expect(resolveResponsiveValue('column', 'tablet')).toBe('column');
  });

  it('returns undefined when no value is given', () => {
    expect(resolveResponsiveValue(undefined, 'tablet')).toBeUndefined();
  });

  it('picks the exact breakpoint match when present', () => {
    expect(resolveResponsiveValue({ xs: 'column', tablet: 'row' }, 'tablet')).toBe('row');
  });

  it('cascades down to the nearest smaller breakpoint with a value', () => {
    expect(resolveResponsiveValue({ xs: 'column', tablet: 'row' }, 'desktop')).toBe('row');
    expect(resolveResponsiveValue({ xs: 'column', tablet: 'row' }, 'mobileLg')).toBe('column');
  });

  it('returns undefined when nothing at or below the active breakpoint is set', () => {
    expect(resolveResponsiveValue({ tablet: 'row' }, 'mobileSm')).toBeUndefined();
  });

  it('defaults the active breakpoint to xs when undefined', () => {
    expect(resolveResponsiveValue({ xs: 'column', tablet: 'row' }, undefined)).toBe('column');
  });
});

describe('mapResponsiveValue', () => {
  it('returns undefined when no value is given', () => {
    expect(mapResponsiveValue<string, string>(undefined, (v) => v.toUpperCase())).toBeUndefined();
  });

  it('maps a plain value through fn', () => {
    expect(mapResponsiveValue('horizontal', (v) => v.toUpperCase())).toBe('HORIZONTAL');
  });

  it('maps every entry of a breakpoint map through fn, preserving shape', () => {
    expect(mapResponsiveValue({ xs: 'vertical', tablet: 'horizontal' }, (v) => v.toUpperCase())).toEqual({
      xs: 'VERTICAL',
      tablet: 'HORIZONTAL',
    });
  });
});
