# Milestone 5: Going Global and Release

## Goal
Prove the app works beyond Georgia and in more than one language, then get it into testers' hands.

## Second region
Add a second region pack (for example "japan" or "brazil") using only JSON and boundary data, with no code changes.

## Languages
- Add a language switcher with "en" and one more complete locale.
- Add one right-to-left locale and verify it end to end: mirrored bottom sheet, controls, pager direction, and star flight direction. Switching RTL requires an app reload with expo-updates.
- Story and narration follow the viewer's locale, and the owner can set a scrapbook's original language. Cached stories and audio are stored per locale.

## Performance budgets
- The map screen holds 60 fps while panning with 40 markers on a mid-range Android device.
- Cold start is under 3 s on a recent phone.
- Photos are served from the R2 CDN as resized WebP.

## Release setup
- App icons and splash screen, EAS production build profile, EAS Update channel.
- A store listing checklist (screenshots, descriptions, privacy answers, data safety form).
- Daily per-user quotas for Gemini and ElevenLabs configured by env vars.
- Document how to add a new region in a README section called "Adding a new region".

## Done when
- The second region and the second locale (plus the RTL check) work with no code changes beyond data and message files.
- Story and narration play in the second locale.
- The performance budgets are met and measured, with numbers noted in the README.
- A TestFlight build and a Play internal-testing build install and run.
