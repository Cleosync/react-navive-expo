import { mapResponsiveValue, type ResponsiveValue } from '@/lib/responsive';

import { Flex, type FlexDirection, type FlexProps } from './flex';

export type StackDirection = 'vertical' | 'horizontal';

export type StackProps = Omit<FlexProps, 'direction'> & {
  /** Defaults to `'vertical'` — the common case a `Stack` exists for. Use `Flex` for full control. */
  direction?: ResponsiveValue<StackDirection>;
};

const toFlexDirection = (direction: StackDirection): FlexDirection => (direction === 'horizontal' ? 'row' : 'column');

/** A friendlier `Flex` for the common "list of children, evenly spaced" case. */
export function Stack({ direction = 'vertical', ...rest }: StackProps) {
  return <Flex direction={mapResponsiveValue(direction, toFlexDirection)} {...rest} />;
}
