import { useState } from 'react';
import { TextInput, View, type TextInputProps } from 'react-native';
import { StyleSheet, useUnistyles, type UnistylesVariants } from 'react-native-unistyles';

import { Text } from './text';

type InputStyleVariants = UnistylesVariants<typeof styles>;

export type InputProps = Omit<TextInputProps, 'style' | 'placeholderTextColor' | 'editable'> & {
  label?: string;
  error?: string;
  disabled?: boolean;
};

export function Input({ label, error, disabled = false, onFocus, onBlur, ...textInputProps }: InputProps) {
  const { theme } = useUnistyles();
  const [focused, setFocused] = useState(false);
  const state: NonNullable<InputStyleVariants['state']> = disabled
    ? 'disabled'
    : error
      ? 'error'
      : focused
        ? 'focused'
        : 'idle';

  styles.useVariants({ state });

  return (
    <View style={styles.container}>
      {label ? (
        <Text variant="label" color={disabled ? 'disabled' : 'primary'}>
          {label}
        </Text>
      ) : null}
      <TextInput
        editable={!disabled}
        placeholderTextColor={disabled ? theme.colors.palette.neutral[300] : theme.colors.palette.neutral[400]}
        style={styles.field}
        onFocus={(event) => {
          setFocused(true);
          onFocus?.(event);
        }}
        onBlur={(event) => {
          setFocused(false);
          onBlur?.(event);
        }}
        {...textInputProps}
      />
      {error ? <Text style={styles.errorMessage}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    // Figma's 6px label-to-field gap doesn't land on the space scale (4, 8, ...).
    gap: 6,
    width: '100%',
  },
  field: {
    ...theme.typography.text.body,
    borderRadius: theme.radius.md,
    paddingHorizontal: theme.space[4],
    // Figma's field is 55px tall — doesn't land on the touch scale (44/48/52/56).
    height: 55,
    variants: {
      state: {
        idle: {
          backgroundColor: theme.colors.palette.neutral[0],
          // Figma's default/disabled border is 1.5px — between border.width.thin(1) and .medium(2).
          borderWidth: 1.5,
          borderColor: theme.colors.palette.neutral[200],
          color: theme.colors.palette.neutral[950],
        },
        focused: {
          backgroundColor: theme.colors.palette.neutral[0],
          borderWidth: theme.border.width.medium,
          borderColor: theme.colors.palette.purple[600],
          color: theme.colors.palette.neutral[950],
        },
        error: {
          backgroundColor: theme.colors.palette.neutral[0],
          borderWidth: theme.border.width.medium,
          borderColor: theme.colors.palette.error[500],
          color: theme.colors.palette.neutral[950],
        },
        disabled: {
          backgroundColor: theme.colors.palette.neutral[100],
          borderWidth: 1.5,
          borderColor: theme.colors.palette.neutral[200],
          color: theme.colors.palette.neutral[300],
        },
      },
    },
  },
  errorMessage: {
    ...theme.typography.text.caption,
    color: theme.colors.palette.error[500],
  },
}));
