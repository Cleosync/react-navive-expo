# AGENTS.md

> **Expo HAS CHANGED.** Read the exact versioned docs at
> https://docs.expo.dev/versions/v57.0.0/ before writing any code — don't assume
> training-data knowledge of the Expo/EAS APIs is current.

Expo Router app (React Native + web, SDK 57). `npm run <script>` in `package.json` is
the source of truth for every command below — read it before assuming a command name.

## Setup

`npm run setup` — the one-command clean-machine path. Checks the Node version, runs
`npm ci`, generates `expo-env.d.ts`, seeds `.env` from `.env.example`, and runs lint +
typecheck as a smoke test. Then `npm start`.

## Before opening a PR

`npm run verify` — runs every gate CI runs, in the same order: lint, typecheck, test,
web build, contract lint, secret scan. If `verify` is green locally, CI will be green.

## Contracts

`contracts/openapi.yaml` is the source of truth for the backend API. Edit it, then
`npm run contracts:lint` and `npm run contracts:codegen` (regenerates
`src/generated/api-types.ts`, which is gitignored — never hand-edit it, never commit
it). Full workflow: [contracts/README.md](contracts/README.md).

## Tests

Jest (`jest-expo` preset) is wired for **functions, business logic, and
integration/API tests** — not for asserting on component render output; UI is verified
manually. If you add a `src/lib/` or similar with real logic, put its tests next to it.

## Secrets

Never commit `.env` — only `.env.example` (placeholders). Local dev reads `.env`.
EAS builds pull real values from EAS environment variables, scoped per environment
(`development`, `preview`, `production`) — set with `eas env:create` or the Expo
dashboard. `EXPO_PUBLIC_*` vars are bundled into the app and are not secret;
`SENTRY_AUTH_TOKEN` and friends without that prefix are build-time-only and must
never get an `EXPO_PUBLIC_` prefix.

Every push and PR is scanned for secrets against full git history
(`npm run secrets:scan`, backed by `.gitleaks.toml`) and blocks CI on a hit.

## EAS project

Not linked yet — `app.config.ts`'s `extra.eas.projectId` is empty. Run `eas init` and
paste the generated project ID there (and set `updates.url` to the printed update URL);
dynamic config means `eas init` can't write it for you, so it's committed by hand.
`app.config.ts`'s `ios.bundleIdentifier` / `android.package` are placeholders
(`com.example.reactnaviveexpo`) — safe to change freely until the first real store
submission.

## Builds

`npm run build:<dev|prev|prod>:<android|ios>` (wraps `eas build --profile
<development|preview|production> --platform <android|ios>`).
- `dev` needs a dev-client install (`expo-dev-client`, already added) — install the
  resulting build once, then run `npm start` and connect to it, instead of
  rebuilding for every JS change.
- `dev`/`prev` are `distribution: internal` → produce an installable APK directly
  (no store credentials needed for Android).
- `prod` produces a Play Store AAB. iOS builds need a paid Apple Developer Program
  membership + `eas credentials` set up first — not configured yet.

## Deploys

All deploys are triggered manually via the `eas` CLI — no GitHub Actions automation
for this (deliberately: EAS's own channel/branch model already covers preview
without needing a CI pipeline wrapped around it).

- **Preview**: `eas update --channel preview --message "..."`. Testers need a
  `preview`-channel build installed once (`npm run build:prev:android`); after that,
  each `eas update` push is picked up without a new native build.
- **Production**: `eas submit --profile production --platform android` pushes the
  latest `production` build to the Play Store's `internal` track. Needs a real Google
  Play service account JSON at `./secrets/google-service-account.json` (gitignored,
  never commit it) — generate it in Play Console → Setup → API access. Not created
  yet; this is a deliberate manual step. iOS store submission isn't configured at all.

## Error tracking

`@sentry/react-native`, initialized in [src/app/_layout.tsx](src/app/_layout.tsx) via
[src/lib/sentry.ts](src/lib/sentry.ts). No-ops if `EXPO_PUBLIC_SENTRY_DSN` is unset
(e.g. local dev without Sentry access). Source maps upload during `eas build` using
`SENTRY_ORG` / `SENTRY_PROJECT` / `SENTRY_AUTH_TOKEN` — build-time only, set as EAS
secrets, never in `.env.example`.

## Skills

The `expo` and `sentry` Claude Code plugins are installed at project scope
(`.claude/settings.json`) — they carry the EAS/Expo Router and Sentry skills (and the
`expo` MCP server) that back the primitives above (`eas update`, Sentry setup/alerts,
stack-trace debugging). Don't hand-roll what a skill already covers; check
`claude plugin details expo@claude-plugins-official` (or `sentry@...`) first.

## CI gates (`.github/workflows/`)

`ci.yml` blocks merges on lint, typecheck, test, web build, and contract lint/codegen.
`dependency-scan` blocks on `npm audit --audit-level=critical`; `high`-severity
findings are reported but non-blocking because the current `high` set is entirely
upstream Metro/react-native build-tooling advisories with no non-breaking fix
available — re-run `npm audit` periodically and tighten this once Expo picks up the
fix. `secret-scan` blocks on any gitleaks hit across full history.

## Dependency updates

Dependabot (`.github/dependabot.yml`) opens weekly PRs for npm and GitHub Actions
deps — those PRs go through the normal `ci.yml` gates like any other PR. Every
dependency is capped to non-major bumps (a major has broken CI here before — see
commit history around 2026-08-12); `expo`, `react`, `react-native`,
`@sentry/react-native`, and their `expo-*`/`@expo/*`/`react-native-*` families are
capped further to patch-only, since they're Expo-managed native modules that must
move together via a deliberate, coordinated upgrade (`expo-upgrade` skill from the
`expo` plugin), not a lone Dependabot PR.
