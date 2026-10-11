# Milestone 0: Scaffold

## Goal
A working empty project that builds, runs on a simulator, and has CI, so every later milestone starts from a clean base.

## Requirements
- Create the pnpm monorepo with `apps/mobile`, `apps/api`, and `packages/shared` as described in CLAUDE.md.
- Expo app with Expo Router and a development client (not Expo Go). Show a placeholder home screen using the Caveat and Bricolage Grotesque fonts and the design tokens.
- EAS config with development, preview, and production profiles.
- Lint and format config shared across the workspace, and strict TypeScript everywhere.
- CI that runs typecheck and tests on every push.
- `apps/api` with a Hono server and a `/health` route that returns { ok: true }.
- `packages/shared` exporting the design tokens, a `Region` type, and a `Scrapbook` type.
- README with setup steps and how to create and install the development build.

## Done when
- `pnpm install`, `pnpm typecheck`, and `pnpm test` all pass from the repo root.
- The development build launches on an iOS simulator and an Android emulator and shows the placeholder screen.
- `GET /health` on the API returns { ok: true }.
