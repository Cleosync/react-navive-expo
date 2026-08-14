import { View, type ViewProps } from "react-native";
import { useUnistyles } from "react-native-unistyles";

export type ScreenEdge = "top" | "bottom" | "left" | "right";

export type ScreenProps = ViewProps & {
  /** Safe-area edges to reserve inset padding for. Defaults to `['top', 'bottom']`. */
  edges?: ScreenEdge[];
  /**
   * Applies the theme's horizontal layout padding, responsive to breakpoint (mobile/tablet/desktop),
   * and on desktop centers content within `layout.desktop.maxContentWidth`. Defaults to `true`.
   */
  padded?: boolean;
};

const DEFAULT_EDGES: ScreenEdge[] = ["top", "bottom"];

/**
 * Root container for a screen. Not scrollable — wrap children in a `ScrollView` yourself where
 * needed; a scrolling variant of this is a deliberate next pass, not part of this one.
 */
export function Screen({
  edges = DEFAULT_EDGES,
  padded = true,
  style,
  children,
  ...rest
}: ScreenProps) {
  const { theme, rt } = useUnistyles();
  const isDesktop =
    rt.breakpoint === "desktop" || rt.breakpoint === "desktopLg";

  const horizontalPadding = !padded
    ? 0
    : isDesktop
      ? theme.layout.desktop.horizontalPadding
      : rt.breakpoint === "tablet"
        ? theme.layout.tablet.horizontalPadding
        : theme.layout.mobile.horizontalPadding;

  return (
    <View
      style={[
        {
          flex: 1,
          backgroundColor: theme.colors.bg.primary,
          paddingTop: edges.includes("top") ? rt.insets.top : 0,
          paddingBottom: edges.includes("bottom") ? rt.insets.bottom : 0,
          paddingLeft: edges.includes("left") ? rt.insets.left : 0,
          paddingRight: edges.includes("right") ? rt.insets.right : 0,
        },
        style,
      ]}
      {...rest}
    >
      <View
        style={[
          { flex: 1, width: "100%", paddingHorizontal: horizontalPadding },
          isDesktop && {
            maxWidth: theme.layout.desktop.maxContentWidth,
            alignSelf: "center",
          },
        ]}
      >
        {children}
      </View>
    </View>
  );
}
