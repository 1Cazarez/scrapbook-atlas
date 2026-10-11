# Scrapbook Atlas: build prompts

The big prompt, split into a shared project file and one file per milestone, so you never paste more than a couple of lines at a time.

## Setup
1. Create an empty project folder and open it in Claude Code (or another coding agent).
2. Copy `CLAUDE.md` and the `docs/` folder from this package into the project root. Claude Code reads `CLAUDE.md` automatically. For other agents, copy it to `AGENTS.md` as well.
3. Paste the short prompt for the current milestone (below). Start a fresh session for each milestone and commit when it passes.

## Short prompts (one per milestone)

Milestone 0: Scaffold
Read CLAUDE.md and docs/m0-scaffold.md. Implement Milestone 0 exactly as written. When done, report each "Done when" item as pass or fail. Do not start Milestone 1.

Milestone 1: The paper world map
Read CLAUDE.md and docs/m1-paper-world-map.md. Implement Milestone 1 exactly as written, run it on an iOS simulator and an Android emulator, and report each "Done when" item as pass or fail. Do not start Milestone 2.

Milestone 2: The story experience
Read CLAUDE.md and docs/m2-story-experience.md. Implement Milestone 2 exactly as written, using placeholder photos, and report each "Done when" item as pass or fail. Do not start Milestone 3.

Milestone 3: Backend, auth, data, and photos
Read CLAUDE.md and docs/m3-backend-auth-data-photos.md. Implement Milestone 3 exactly as written and report each "Done when" item as pass or fail. List any env vars or accounts I need to set up first and wait for me if something is missing. Do not start Milestone 4.

Milestone 4: AI story and voice
Read CLAUDE.md and docs/m4-ai-story-voice.md. Implement Milestone 4 exactly as written and report each "Done when" item as pass or fail. Do not start Milestone 5.

Milestone 5: Going global and release
Read CLAUDE.md and docs/m5-global-and-release.md. Implement Milestone 5 exactly as written and report each "Done when" item as pass or fail.

## Accounts you will need
- Milestone 3: Auth0, Tiger Data, Cloudflare R2
- Milestone 4: Gemini API key, ElevenLabs API key
- Milestone 5: Apple Developer account and Google Play developer account (for TestFlight and Play internal testing)
- A Mac is needed to run the iOS simulator. EAS Build can compile iOS in the cloud if you do not have one.

## Tips
- If a milestone is too big for one session, ask the agent to do it in two halves and stop between them.
- If you later switch to Google Maps, only docs/m1-paper-world-map.md and CLAUDE.md need to change.
