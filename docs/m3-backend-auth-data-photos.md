# Milestone 3: Backend, Auth, Data, and Photos

## Goal
Real accounts, a real database, and real photos, so scrapbooks persist across sessions and devices.

## Auth (Auth0)
- Use react-native-auth0 with PKCE. Enable Google social login and passwordless email if the tenant supports it, and optional MFA from a settings screen. Store tokens in expo-secure-store.
- Create an Auth0 API with an audience. Every apps/api route validates the access token with jose and reads the user id from the "sub" claim. Never trust a user id from the client.

## Data (Tiger Data)
- Tables: users (sub, locale, timezone), scrapbooks (id, user_id, title, region_id, country_code, admin1_code, lat, lng, cover_color, share_slug, is_public, created_at), entries (scrapbook_id, user_id, photo_key, caption, story_text, narration_key, locale, taken_at timestamptz).
- Make entries a hypertable partitioned on taken_at. Every query is parameterized and filtered by user_id = sub.
- Add continuous aggregates entries_per_month and entries_per_country. Use them for a "Your year" chart and "countries visited" counter in the bottom sheet, and a timeline slider that filters which books appear by date.
- If PostGIS is enabled, store a geometry column and use ST_Contains against admin-1 polygons to label books. Otherwise do that lookup in the app with turf.
- Migrations live in apps/api and are runnable with one command.

## Photos
- Select multiple with expo-image-picker or take one with the camera.
- Resize to 1600 px max and re-encode with expo-image-manipulator (this also removes GPS and device EXIF), then upload with expo-file-system to a presigned R2 URL from the API. Only the storage key goes in the database.
- Show photos with expo-image (disk caching, blurhash placeholder). Photos replace placeholder frames in the gallery in upload order, and captions are editable in place.

## Offline
- TanStack Query cache is persisted with MMKV so the map and scrapbooks open without a connection.
- Photo uploads go through a retrying queue that survives app restarts and shows per-photo progress.

## Sharing
- The API issues a revocable public slug per scrapbook. The share sheet (expo-sharing) sends a link.
- The API serves GET /s/:slug as a simple server-rendered HTML page (photos, captions, story text, noindex by default with an opt-in toggle, and an "Open in the app" button using a universal link and the custom scheme "scrapbookatlas://").
- Configure deep links in Expo Router so the link opens the story directly in the app.

## Privacy and compliance
- An in-app "Delete my account and data" action (required by Apple), which cascades deletion of rows and R2 objects, plus "Download my data" (JSON and photos zip).
- Privacy usage strings for photos, camera, and location in app config, a privacy policy screen, and a report button on public pages that records a moderation flag.

## Done when
- I can sign in with Google, drop a book, upload photos, and see them in the gallery.
- Closing and reopening the app offline still shows my data.
- Signing in on a second device shows the same scrapbooks.
- A second test account cannot read my scrapbooks by changing an id in an API call (covered by an automated test).
- A share link opens the HTML page in a browser and the story in the app.
- Delete my data removes the rows and R2 objects.
