import { Text as RNText, type TextProps as RNTextProps } from 'react-native';
import { StyleSheet, type UnistylesVariants } from 'react-native-unistyles';

type TextStyleVariants = UnistylesVariants<typeof styles>;

export type TextVariant = NonNullable<TextStyleVariants['variant']>;
export type TextColor = NonNullable<TextStyleVariants['color']>;

export type TextProps = RNTextProps & {
  variant?: TextVariant;
  color?: TextColor;
  /** Overrides the variant's fontSize only — every other typescale property (line height, weight, tracking) is kept. */
  size?: number;
};

export function Text({ variant = 'body', color = 'primary', size, style, ...rest }: TextProps) {
  styles.useVariants({ variant, color });

  return <RNText style={[styles.text, size !== undefined && { fontSize: size }, style]} {...rest} />;
}

const styles = StyleSheet.create((theme) => ({
  text: {
    variants: {
      variant: {
        displayXl: { ...theme.typography.text.displayXl },
        displayLg: { ...theme.typography.text.displayLg },
        h1: { ...theme.typography.text.h1 },
        h2: { ...theme.typography.text.h2 },
        h3: { ...theme.typography.text.h3 },
        h4: { ...theme.typography.text.h4 },
        bodyLg: { ...theme.typography.text.bodyLg },
        body: { ...theme.typography.text.body },
        bodySm: { ...theme.typography.text.bodySm },
        labelLg: { ...theme.typography.text.labelLg },
        label: { ...theme.typography.text.label },
        caption: { ...theme.typography.text.caption },
        buttonLg: { ...theme.typography.text.buttonLg },
        button: { ...theme.typography.text.button },
        buttonSm: { ...theme.typography.text.buttonSm },
        numberXl: { ...theme.typography.text.numberXl },
        numberLg: { ...theme.typography.text.numberLg },
        numberMd: { ...theme.typography.text.numberMd },
      },
      color: {
        primary: { color: theme.colors.text.primary },
        secondary: { color: theme.colors.text.secondary },
        tertiary: { color: theme.colors.text.tertiary },
        placeholder: { color: theme.colors.text.placeholder },
        disabled: { color: theme.colors.text.disabled },
        inverse: { color: theme.colors.text.inverse },
        brand: { color: theme.colors.text.brand },
        success: { color: theme.colors.text.success },
        warning: { color: theme.colors.text.warning },
        error: { color: theme.colors.text.error },
        info: { color: theme.colors.text.info },
      },
    },
  },
}));
