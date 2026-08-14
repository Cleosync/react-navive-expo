import { useState } from 'react';
import { Pressable, type PressableProps } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';

import { Text, type TextColor, type TextVariant } from './text';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'destructive' | 'ghost';
export type ButtonSize = 'small' | 'medium' | 'large';

export type ButtonProps = Omit<PressableProps, 'disabled' | 'children' | 'style'> & {
  children: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
};

// Every button text color happens to already be a generic Text color token.
const labelColorByVariant: Record<ButtonVariant, TextColor> = {
  primary: 'inverse',
  secondary: 'brand',
  tertiary: 'brand',
  destructive: 'inverse',
  ghost: 'primary',
};

const labelVariantBySize: Record<ButtonSize, TextVariant> = {
  small: 'buttonSm',
  medium: 'button',
  large: 'buttonLg',
};

export function Button({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  onPressIn,
  onPressOut,
  ...pressableProps
}: ButtonProps) {
  const { theme } = useUnistyles();
  const [pressed, setPressed] = useState(false);
  const scale = useSharedValue(1);
  const isDisabled = disabled || loading;

  styles.useVariants({ variant, size, pressed, disabled: isDisabled });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const animateTo = (value: number) => {
    scale.set(
      withTiming(value, {
        duration: theme.motion.duration.instant,
        easing: Easing.bezier(...theme.motion.easing.standard),
      }),
    );
  };

  return (
    <AnimatedPressable
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      disabled={isDisabled}
      onPressIn={(event) => {
        setPressed(true);
        animateTo(0.97);
        onPressIn?.(event);
      }}
      onPressOut={(event) => {
        setPressed(false);
        animateTo(1);
        onPressOut?.(event);
      }}
      style={[styles.button, animatedStyle]}
      {...pressableProps}
    >
      <Text
        variant={labelVariantBySize[size]}
        color={isDisabled && !loading ? 'disabled' : labelColorByVariant[variant]}
        style={loading && styles.loadingLabel}
      >
        {loading ? 'Loading...' : children}
      </Text>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create((theme) => ({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.radius.full,
    borderWidth: theme.border.width.none,
    borderColor: 'transparent',
    variants: {
      variant: {
        primary: { backgroundColor: theme.colors.palette.purple[600] },
        secondary: {
          backgroundColor: theme.colors.palette.neutral[0],
          // Figma spec's secondary border is 1.5px — between border.width.thin(1) and .medium(2).
          borderWidth: 1.5,
          borderColor: theme.colors.palette.purple[600],
        },
        tertiary: { backgroundColor: 'transparent' },
        destructive: { backgroundColor: theme.colors.palette.error[500] },
        ghost: { backgroundColor: 'transparent' },
      },
      size: {
        // Figma's Small button is 40px tall — below touch.min(44); kept as spec'd.
        small: { height: 40, paddingHorizontal: theme.space[4] },
        medium: { height: theme.touch.default, paddingHorizontal: theme.space[5] },
        large: { height: theme.touch.large, paddingHorizontal: theme.space[6] },
      },
      pressed: { true: {}, false: {}, default: {} },
      disabled: { true: {}, false: {}, default: {} },
    },
    compoundVariants: [
      {
        variant: 'primary',
        pressed: true,
        disabled: false,
        styles: { backgroundColor: theme.colors.palette.purple[500] },
      },
      { variant: 'primary', disabled: true, styles: { backgroundColor: theme.colors.palette.neutral[200] } },
      {
        variant: 'secondary',
        pressed: true,
        disabled: false,
        styles: { backgroundColor: theme.colors.palette.purple[50] },
      },
      { variant: 'secondary', disabled: true, styles: { borderColor: theme.colors.palette.neutral[300] } },
      {
        variant: 'tertiary',
        pressed: true,
        disabled: false,
        styles: { backgroundColor: theme.colors.palette.purple[50] },
      },
      {
        variant: 'destructive',
        pressed: true,
        disabled: false,
        styles: { backgroundColor: theme.colors.palette.error[600] },
      },
      { variant: 'destructive', disabled: true, styles: { backgroundColor: theme.colors.palette.neutral[200] } },
      {
        variant: 'ghost',
        pressed: true,
        disabled: false,
        styles: { backgroundColor: theme.colors.palette.neutral[100] },
      },
    ],
  },
  loadingLabel: {
    opacity: 0.7,
  },
}));
