import { StyleSheet } from 'react-native-unistyles';

import { breakpoints } from './tokens/breakpoints';
import { appThemes } from './themes';

type AppBreakpoints = typeof breakpoints;
type AppThemes = typeof appThemes;

// Empty-body interfaces are the documented Unistyles pattern for typing themes/
// breakpoints via declaration merging, not a mistake — the extends is the payload.
/* eslint-disable @typescript-eslint/no-empty-object-type */
declare module 'react-native-unistyles' {
  export interface UnistylesThemes extends AppThemes {}
  export interface UnistylesBreakpoints extends AppBreakpoints {}
}
/* eslint-enable @typescript-eslint/no-empty-object-type */

// Only `light` is registered — the source design system is light-only today,
// so adaptiveThemes stays off rather than silently falling back to `light`
// for a `dark` OS setting that doesn't exist yet.
StyleSheet.configure({
  settings: {
    initialTheme: 'light',
  },
  breakpoints,
  themes: appThemes,
});
