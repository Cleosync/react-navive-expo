import type { ExpoConfig } from 'expo/config';

// Converted from app.json to app.config.ts so build-time config (Sentry, API base URL)
// can be sourced from env vars instead of being hardcoded. Secrets (SENTRY_AUTH_TOKEN)
// are never embedded in the app bundle here — only read at build time for source map upload.
const config: ExpoConfig = {
  name: 'react-navive-expo',
  slug: 'react-navive-expo',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/images/icon.png',
  scheme: 'reactnaviveexpo',
  userInterfaceStyle: 'automatic',
  ios: {
    icon: './assets/expo.icon',
    // Placeholder — change before ever submitting to the App Store (safe to change
    // freely up to that point; internal/dev/preview builds don't lock this in).
    bundleIdentifier: 'com.example.reactnaviveexpo',
  },
  android: {
    adaptiveIcon: {
      backgroundColor: '#E6F4FE',
      foregroundImage: './assets/images/android-icon-foreground.png',
      backgroundImage: './assets/images/android-icon-background.png',
      monochromeImage: './assets/images/android-icon-monochrome.png',
    },
    predictiveBackGestureEnabled: false,
    // Placeholder — change before ever submitting to Google Play (safe to change
    // freely up to that point; internal/dev/preview builds don't lock this in).
    package: 'com.example.reactnaviveexpo',
  },
  web: {
    output: 'static',
    favicon: './assets/images/favicon.png',
  },
  plugins: [
    'expo-router',
    [
      'expo-splash-screen',
      {
        backgroundColor: '#208AEF',
        image: './assets/images/splash-icon.png',
        imageWidth: 76,
      },
    ],
    [
      '@sentry/react-native/expo',
      {
        organization: process.env.SENTRY_ORG,
        project: process.env.SENTRY_PROJECT,
        // SENTRY_AUTH_TOKEN is read directly by the Sentry CLI from the environment
        // during `eas build` — it is never written into this config or the app bundle.
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
    reactCompiler: true,
  },
  extra: {
    apiBaseUrl: process.env.EXPO_PUBLIC_API_BASE_URL ?? 'https://api.example.com',
    sentryDsn: process.env.EXPO_PUBLIC_SENTRY_DSN ?? '',
    // Not linked to an EAS project yet — run `eas init` and paste the generated
    // projectId here (and set `updates.url` below to the printed update URL).
    eas: {
      projectId: '',
    },
  },
  runtimeVersion: {
    policy: 'appVersion',
  },
};

export default config;
