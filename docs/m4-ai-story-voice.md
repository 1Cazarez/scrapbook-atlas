# Milestone 4: AI Story and Voice

## Goal
The gallery tells a fairy-tale story about the user's own photos, narrated aloud, with the shooting star synced to the narration.

## Story (Gemini)
- POST /api/story takes a scrapbook id and target locale, loads place name, region, coordinates, captions, and up to 5 photos, and calls Gemini with structured JSON output { intro: string, pages: [{ title: string, text: string }] }.
- One page per photo, warm fairy-tale voice, at most 2 sentences per page, written in the target locale, relying only on what is visible in the photos and captions and not inventing facts about the place.
- Cache in entries.story_text per locale. A "Retell my story" button regenerates it.
- Rate-limit per user and fall back to plain captions if Gemini fails.
- The intro field replaces "[Your story begins here…]" in the storybook, and each page's text shows under its photo.

## Narration (ElevenLabs)
- POST /api/narrate takes { scrapbookId, pageIndex, locale } (pageIndex -1 is the intro), loads the cached story text, and calls ElevenLabs text-to-speech with one warm storyteller voice and a multilingual model.
- Cache each clip at narration/{scrapbookId}/{locale}/{pageIndex}.mp3 on R2 and return a signed URL. Regenerate when the story text changes.
- Never generate audio for a scrapbook with no story text. Cap narration at 5 pages of 2 sentences. Rate-limit per user with DAILY_STORY_QUOTA and DAILY_NARRATION_QUOTA.

## Playback and sync
- Use expo-audio, configured to play in the iOS silent mode and to duck other audio.
- Prefetch the intro clip when a scrapbook is selected, and prefetch each page's clip while the star is flying.
- Start the intro clip when the cover begins opening (1.1 s) and hold the transition to the gallery until the clip ends or the user taps Skip.
- When the star lands, play that page's clip and show its text.
- "Auto-play story" (default off) launches the star to the next photo when each clip ends.
- If the ElevenLabs timestamped-audio endpoint is used, highlight each caption word as it is spoken.
- Stop audio when the app is backgrounded or the modal closes.

## Controls
- Mute/unmute, replay this page, and the auto-play toggle. Persist the mute choice.
- Text is always shown alongside audio. If audio fails to load, show the text and a "Tap to hear the story" retry button.

## Done when
- "Retell my story" produces a photo-aware story, cached after the first generation.
- The intro and each photo are narrated, and the star flights stay in sync with the audio, including in auto-play mode.
- Muting, replaying a page, and backgrounding the app behave correctly.
- Gemini and ElevenLabs failures show the text-only fallback with no crashes.
- Quotas stop further generation and show a friendly message.
