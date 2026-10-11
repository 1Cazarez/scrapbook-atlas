# Scrapbook Atlas (working title)

A native iOS and Android app in React Native (Expo) where a paper-cutout world map holds 3D scrapbooks. Opening one plays a fairy-tale storybook intro, then a night-sky photo gallery where a shooting star carries you from picture to picture, narrated by an AI voice. It launches focused on Georgia (USA) but must work anywhere on Earth.

## How to work
- Build one milestone at a time. The spec for each is in `docs/` (see the index at the bottom). Read this file and the milestone file before writing code.
- Run the app on a simulator or emulator after each milestone, and report every "Done when" item as pass or fail before stopping.
- Do not add features beyond the spec. When something is ambiguous, pick the simplest option and note the decision in the README.
- Never start the next milestone until asked.

## Repo layout (pnpm workspaces)
- `apps/mobile`: the Expo app (Expo Router, TypeScript strict, New Architecture on, Hermes).
- `apps/api`: a small Hono API on Node (deployable to Vercel or Fly.io). The app never holds a secret. All calls to Auth0 token validation, Tiger Data, R2 signing, Gemini, and ElevenLabs go through this API.
- `packages/shared`: shared TypeScript types, zod schemas, the Region pack type, and constants (design tokens).

## Stack (do not substitute)
- Expo (latest stable SDK) as a DEVELOPMENT BUILD via EAS Build. Expo Go will not work because of native modules, and the README must say so.
- Navigation and gestures: Expo Router, react-native-gesture-handler, @gorhom/bottom-sheet
- Map: @maplibre/maplibre-react-native with a custom keyless style. If globe projection is not supported by the installed version, fall back to Mercator and note it.
- Drawing and animation: @shopify/react-native-skia for the 3D books, sky, moon, hills, castle, and star. react-native-reanimated (latest compatible) for all timelines and gestures.
- State and data: Zustand for UI state, TanStack Query for server data with a persisted cache (react-native-mmkv)
- Auth: react-native-auth0 (Expo config plugin) with tokens in expo-secure-store
- Media: expo-image-picker (multiple selection and camera), expo-image-manipulator, expo-image, expo-file-system, expo-audio (not the deprecated expo-av; check current docs), expo-haptics, expo-location, expo-localization, expo-sharing, expo-font with @expo-google-fonts/caveat and @expo-google-fonts/bricolage-grotesque
- i18n: i18next and react-i18next, with Intl for dates, numbers, and coordinates
- Geometry: @turf/turf
- Lists: @shopify/flash-list
- Backend: Hono, jose (verify Auth0 JWTs against the tenant JWKS), postgres (Tiger Data), @aws-sdk/client-s3 and s3-request-presigner (Cloudflare R2), the official Gemini SDK, and the ElevenLabs SDK or plain fetch. Read both providers' current docs for the latest model and endpoint names.
- Tests: Jest with React Native Testing Library, Vitest for apps/api and packages/shared, Maestro for one end-to-end flow per milestone
- Targets: iOS 16+ and Android 8 (API 26)+, phones and tablets, portrait and landscape

## Architecture rules (global-ready from day one)
- Nothing may hard-code Georgia. Use a "Region" type { id, name, bbox, defaultCenter, defaultZoom, seedScrapbooks[] } in packages/shared. Ship exactly one pack, "georgia-us", as JSON. Adding a country later must mean adding a JSON file and boundary data with no code changes.
- All user-facing strings go through i18next with "en" shipped and the structure ready for es, fr, pt, de, ja, and ar. Use start/end (never left/right) in styles so right-to-left works. Never concatenate translated strings.
- Coordinates are WGS84 lng/lat, timestamps are UTC, and the user's locale and timezone are stored on their profile.
- Only public values (Auth0 domain and client id, API base URL) are in the app config. All secrets live only in apps/api env vars.
- Respect Reduce Motion (Reanimated useReducedMotion and AccessibilityInfo): replace all animation with short fades. Every control has accessibilityRole and accessibilityLabel, at least 44x44 pt touch targets, and support for Dynamic Type and font scaling.

## Design tokens (keep in packages/shared)
- Ink #2b2420, desk #2c2a28, cream #f6efdf, kraft #c8b085, accent #d9603a, gold #ffe28c, night #0b0a24
- Fonts: Caveat 500/700 for handwriting, Bricolage Grotesque 400/600/800 for UI, with system fallbacks for non-Latin scripts.

## Environment variables
- apps/mobile (public only): EXPO_PUBLIC_API_URL, EXPO_PUBLIC_AUTH0_DOMAIN, EXPO_PUBLIC_AUTH0_CLIENT_ID, EXPO_PUBLIC_AUTH0_AUDIENCE
- apps/api (secret): AUTH0_ISSUER_BASE_URL, AUTH0_AUDIENCE, DATABASE_URL, R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET, R2_PUBLIC_BASE_URL, GEMINI_API_KEY, ELEVENLABS_API_KEY, ELEVENLABS_VOICE_ID, DAILY_STORY_QUOTA, DAILY_NARRATION_QUOTA
- Provide .env.example files for both apps. Add variables only in the milestone that first needs them.

## Milestone index
- docs/m0-scaffold.md
- docs/m1-paper-world-map.md
- docs/m2-story-experience.md
- docs/m3-backend-auth-data-photos.md
- docs/m4-ai-story-voice.md
- docs/m5-global-and-release.md
