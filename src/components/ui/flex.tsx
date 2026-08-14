import { View, type ViewProps } from 'react-native';
import { useUnistyles } from 'react-native-unistyles';

import { resolveResponsiveValue, type BreakpointName, type ResponsiveValue } from '@/lib/responsive';
import type { SpaceKey } from '@/theme/tokens/spacing';

export type FlexDirection = 'row' | 'column' | 'row-reverse' | 'column-reverse';
export type FlexAlign = 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';
export type FlexJustify = 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
export type FlexWrap = 'wrap' | 'nowrap' | 'wrap-reverse';

export type FlexProps = ViewProps & {
  direction?: ResponsiveValue<FlexDirection>;
  align?: ResponsiveValue<FlexAlign>;
  justify?: ResponsiveValue<FlexJustify>;
  wrap?: ResponsiveValue<FlexWrap>;
  flex?: ResponsiveValue<number>;
  /** All spacing props take a step on the `space` scale (e.g. `4` → 16px), not a raw pixel number. */
  gap?: ResponsiveValue<SpaceKey>;
  rowGap?: ResponsiveValue<SpaceKey>;
  columnGap?: ResponsiveValue<SpaceKey>;
  padding?: ResponsiveValue<SpaceKey>;
  paddingHorizontal?: ResponsiveValue<SpaceKey>;
  paddingVertical?: ResponsiveValue<SpaceKey>;
  margin?: ResponsiveValue<SpaceKey>;
  marginHorizontal?: ResponsiveValue<SpaceKey>;
  marginVertical?: ResponsiveValue<SpaceKey>;
};

/**
 * The general-purpose flexbox wrapper every other layout primitive (`Stack`, ...) builds on.
 * Every prop accepts either a plain value or a breakpoint map (`{ xs: 'column', tablet: 'row' }`).
 *
 * Resolved via `useUnistyles()` rather than a `StyleSheet.create` variants table, because these
 * values are arbitrary and per-instance (not a bounded design-system state set) — variants don't
 * fit that shape. The trade-off: this re-renders on breakpoint/theme change, unlike Unistyles'
 * normal zero-rerender path. Fine for a layout wrapper reacting to rare events (resize, rotation).
 */
export function Flex({
  direction,
  align,
  justify,
  wrap,
  flex,
  gap,
  rowGap,
  columnGap,
  padding,
  paddingHorizontal,
  paddingVertical,
  margin,
  marginHorizontal,
  marginVertical,
  style,
  ...rest
}: FlexProps) {
  const { theme, rt } = useUnistyles();
  const breakpoint = (rt.breakpoint as BreakpointName | undefined) ?? 'xs';

  const space = (value: ResponsiveValue<SpaceKey> | undefined) => {
    const step = resolveResponsiveValue(value, breakpoint);
    return step === undefined ? undefined : theme.space[step];
  };

  return (
    <View
      style={[
        {
          flexDirection: resolveResponsiveValue(direction, breakpoint),
          alignItems: resolveResponsiveValue(align, breakpoint),
          justifyContent: resolveResponsiveValue(justify, breakpoint),
          flexWrap: resolveResponsiveValue(wrap, breakpoint),
          flex: resolveResponsiveValue(flex, breakpoint),
          gap: space(gap),
          rowGap: space(rowGap),
          columnGap: space(columnGap),
          padding: space(padding),
          paddingHorizontal: space(paddingHorizontal),
          paddingVertical: space(paddingVertical),
          margin: space(margin),
          marginHorizontal: space(marginHorizontal),
          marginVertical: space(marginVertical),
        },
        style,
      ]}
      {...rest}
    />
  );
}
