# Scrapbook Atlas

A paper-cutout world map that holds 3D scrapbooks. Opening one plays a fairy-tale
storybook intro, then a night-sky photo gallery where a shooting star carries you from
picture to picture, narrated by an AI voice. It launches focused on Georgia (USA) but is
built to work anywhere on Earth.

React Native (Expo) for iOS and Android. See [CLAUDE.md](CLAUDE.md) for the project
contract and [docs/](docs/) for the milestone specs.

**Status: Milestone 0 (scaffold) complete.** The app shows a placeholder screen; the map
arrives in Milestone 1.

## Requirements

- **Node 20.19.4+** (22 LTS recommended; CI runs 22)
- **pnpm 11+** — `npm install -g pnpm`
- **A development build.** Expo Go will not work with this project, now or later,
  because it depends on native modules Expo Go does not bundle (MapLibre, Skia,
  Auth0, MMKV). See [Development builds](#development-builds) below.
- **For iOS:** macOS with Xcode, or EAS Build's cloud builders
- **For Android:** Android Studio with an API 26+ emulator, and a JDK

## Setup

```bash
pnpm install
cp apps/api/.env.example apps/api/.env
cp apps/mobile/.env.example apps/mobile/.env   # no variables needed yet
```

Then check the workspace is healthy:

```bash
pnpm typecheck
pnpm test
pnpm lint
```

## Running

### The API

```bash
pnpm api            # tsx watch, http://localhost:8787
curl http://localhost:8787/health
# {"ok":true}
```

### The mobile app

You need a development build installed first (next section), then:

```bash
pnpm mobile         # expo start --dev-client
```

## Development builds

Expo Go cannot run this app. Build a development client once per platform, install it on
the simulator, emulator or device, and from then on `pnpm mobile` reloads your JavaScript
into it.

### Locally

Requires Xcode (iOS) or Android Studio and a JDK (Android). These commands generate the
native projects and build:

```bash
pnpm --filter @scrapbook-atlas/mobile ios        # iOS simulator, macOS only
pnpm --filter @scrapbook-atlas/mobile android    # Android emulator or device
```

The `ios/` and `android/` directories are generated and git-ignored. Regenerate them with
`pnpm --filter @scrapbook-atlas/mobile prebuild` after changing `app.json` or adding a
native dependency.

### With EAS Build (no Mac needed for iOS)

```bash
pnpm add -g eas-cli
eas login
cd apps/mobile
eas build --profile development --platform ios       # or android, or all
```

Install the finished build from the link EAS prints: drag the `.app` onto a running iOS
simulator, or `adb install` the `.apk` on Android. The profiles are in
[apps/mobile/eas.json](apps/mobile/eas.json):

| Profile       | Use                                                         |
| ------------- | ----------------------------------------------------------- |
| `development` | dev client, internal distribution, iOS simulator build, APK |
| `preview`     | release build for testers, internal distribution, APK       |
| `production`  | store build, auto-incrementing version                      |

## Repo layout

```
apps/mobile        Expo app (Expo Router, New Architecture, Hermes)
apps/api           Hono API on Node — holds every secret
packages/shared    design tokens, Region and Scrapbook types
docs/              milestone specs and the build-prompt guide
```

### Commands

Run from the repo root:

| Command          | Does                                     |
| ---------------- | ---------------------------------------- |
| `pnpm typecheck` | `tsc --noEmit` in every package          |
| `pnpm test`      | Vitest in shared and api, Jest in mobile |
| `pnpm lint`      | ESLint across the workspace              |
| `pnpm format`    | Prettier write                           |
| `pnpm api`       | API in watch mode                        |
| `pnpm mobile`    | Metro for the development client         |

CI ([.github/workflows/ci.yml](.github/workflows/ci.yml)) runs typecheck, lint, a
formatting check and tests on every push and pull request.

## Environment variables

`apps/mobile` may only ever hold **public** values — anything in its env ships inside the
app bundle. Every secret lives in `apps/api`. Both apps have a `.env.example`, and
variables are added in the milestone that first needs them, so Milestone 0 declares none
beyond the API's `PORT`.

## Decisions

Where a spec was ambiguous, CLAUDE.md says to take the simplest option and record it
here.

- **Node version.** This machine runs Node 26, which works, but `package.json` declares
  `>=20.19.4` (React Native 0.86's floor) and CI pins Node 22 LTS, which is what Expo
  SDK 57 is tested against.
- **pnpm uses a hoisted `node_modules`.** Metro and Expo autolinking cannot follow
  pnpm's symlinked default, so [.npmrc](.npmrc) sets `node-linker=hoisted`.
  `pnpm-workspace.yaml` also allow-lists install scripts for `esbuild`,
  `unrs-resolver` and `@parcel/watcher`, which ship prebuilt binaries.
- **The old README moved to [docs/build-prompts.md](docs/build-prompts.md).** It is the
  guide for driving this build milestone by milestone, which is a different audience from
  a project README; Milestone 0 required the root README be setup instructions.
- **`packages/shared` has no zod schemas yet.** CLAUDE.md lists them under the package's
  eventual contents, but nothing validates input until the API grows real routes in
  Milestone 3, so adding them now would be a feature ahead of the spec.
- **`Scrapbook` omits `userId`, `shareSlug` and `isPublic`.** Those are server-owned and
  arrive with the database in Milestone 3. The type currently describes what the map and
  bottom sheet render.
- **Relative imports carry no file extension.** Metro, tsx and Vitest all resolve
  extensionless specifiers, and avoiding them means consumers of `packages/shared` do
  not need TypeScript's `allowImportingTsExtensions`.
- **`scheme` and `expo-build-properties` are set in Milestone 0.** Expo Router wants a
  URL scheme to resolve deep links, and the plugin is what pins the iOS 16 / Android
  API 26 floors CLAUDE.md requires. Both are config, not features.
- **Tests use the queries `render` resolves to, not the `screen` singleton.** React
  Native Testing Library 14 made `render` async; `screen` is not populated by a wrapped
  render, and all screens here need a `SafeAreaProvider`. See
  [apps/mobile/src/test/render.tsx](apps/mobile/src/test/render.tsx).
- **No Maestro end-to-end flow yet.** CLAUDE.md asks for one per milestone, but
  Milestone 0's placeholder screen has no flow to drive; the first one lands with the map
  in Milestone 1.
