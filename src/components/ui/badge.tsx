import { Text, View } from 'react-native';
import { StyleSheet, type UnistylesVariants } from 'react-native-unistyles';

type BadgeStyleVariants = UnistylesVariants<typeof styles>;

export type BadgeVariant = NonNullable<BadgeStyleVariants['variant']>;
export type BadgeSize = NonNullable<BadgeStyleVariants['size']>;

export type BadgeProps = {
  children: string;
  variant?: BadgeVariant;
  size?: BadgeSize;
};

export function Badge({ children, variant = 'neutral', size = 'small' }: BadgeProps) {
  styles.useVariants({ variant, size });

  return (
    <View style={styles.badge}>
      <Text style={styles.label}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  badge: {
    alignSelf: 'flex-start',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.radius.full,
    variants: {
      variant: {
        neutral: { backgroundColor: theme.colors.palette.neutral[100] },
        brand: { backgroundColor: theme.colors.palette.purple[100] },
        success: { backgroundColor: theme.colors.palette.success[100] },
        warning: { backgroundColor: theme.colors.palette.warning[100] },
        error: { backgroundColor: theme.colors.palette.error[100] },
        info: { backgroundColor: theme.colors.palette.info[100] },
      },
      size: {
        // Figma's small badge padding (6px/2px) doesn't land on the space scale (4, 8, ...).
        small: { paddingHorizontal: 6, paddingVertical: 2 },
        medium: { paddingHorizontal: theme.space[2], paddingVertical: theme.space[1] },
      },
    },
  },
  label: {
    fontFamily: theme.typography.fontFamily.body.medium,
    fontWeight: theme.typography.fontWeight.medium,
    variants: {
      variant: {
        neutral: { color: theme.colors.palette.neutral[700] },
        brand: { color: theme.colors.palette.purple[600] },
        success: { color: theme.colors.palette.success[600] },
        warning: { color: theme.colors.palette.warning[600] },
        error: { color: theme.colors.palette.error[600] },
        info: { color: theme.colors.palette.info[600] },
      },
      size: {
        // Figma's badge text (11px/small, 12px/medium) doesn't match any typography.text scale entry.
        small: { fontSize: 11, lineHeight: 14 },
        medium: { fontSize: 12, lineHeight: 16 },
      },
    },
  },
}));
