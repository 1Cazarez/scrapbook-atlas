# Milestone 1: The Paper World Map

## Goal
A paper-cutout world map with standing 3D scrapbooks that you can place anywhere on land.

## Map
- Full-screen MapLibre map using a custom style with no third-party API keys. Background kraft (#c8b085) with a subtle dot texture (a tiled Skia or image overlay at low opacity).
- Land is cream (#f6efdf) with a dashed accent outline (2.5 pt, dash 7 6) and a soft offset drop-shadow layer (a duplicate of the land layer, blurred and offset down).
- Country and admin-1 borders come from Natural Earth GeoJSON, bundled or lazily downloaded per zoom level (110m below zoom 3, 50m above). Include data-preparation scripts.
- From zoom 9 add streets, water, and place names from a vector tile source that works with MapLibre Native (verify PMTiles support; if absent, use OpenFreeMap tiles) restyled in kraft, cream, and soft blue-green.
- Start fitted to the active region's bbox. The user can zoom out to a spinning globe (if supported) or a world view. Pitch defaults to 48 degrees, adjustable 0-65 by a "Tilt" slider in the bottom sheet.

## Dropping scrapbooks
- Tapping land drops a new scrapbook at that lng/lat, with a light haptic.
- Tapping water shows a toast ("That spot is in the water") using point-in-polygon against the land polygons.
- New books are named by reverse lookup against the Natural Earth data (country, admin-1) in the user's locale.
- A "Drop one where I am" button uses expo-location after a permission prompt with a clear usage string.

## The 3D book
- Each scrapbook is drawn as a 3D book in a small Skia canvas used as a map marker (MarkerView). Do not use CSS-style 3D transforms.
- Use a simple parallel projection driven by a rotation angle theta: the front face is a parallelogram of width 64*cos(theta) and height 82, a spine strip of width 18*sin(theta) to its left, a page-edge strip with ruled cream lines on the right when theta is negative, a cream top face, and a ground-shadow ellipse.
- The front shows the cover color, a cream label with a map-pin icon, a washi-tape strip, and a dashed stitch line.
- Rest at theta = 32 degrees. On press-in and selection, animate to theta = 52 degrees and lift 12 px over 350 ms with Easing.bezier(.2,.8,.3,1), driven by a Reanimated shared value read by Skia.
- Keep the book upright regardless of map pitch. Show the title in a cream pill below (Caveat 19, bold), accent-colored when selected.
- Performance: render at most 40 marker books at once (those nearest the viewport center), and cluster the rest into a numbered paper-stamp marker that zooms in when tapped.

## Seed data
Seed the "georgia-us" region with 11 scrapbooks at real coordinates: Atlanta, Blue Ridge, Athens, Augusta, Macon, Columbus, Savannah, Albany, Brunswick, Valdosta, Okefenokee. Cover colors cycle through #e9744c #3e8e86 #c98a1c #7a4e7e #4d7c5a #34506b #c2506a.

## Bottom sheet
- A draggable bottom sheet (snap points 12%, 45%, 90%) lists scrapbooks (FlashList) with cover swatch, name, and locale-formatted coordinates, plus a search field and the Tilt slider. Selecting one flies the map there.
- On tablets (width at least 768 dp), show it as a fixed left column of 320 pt instead.

## Done when
- On both an iOS simulator and an Android emulator I can pan and zoom the paper map.
- Tapping land drops a standing 3D book, and press-and-select lifts and turns it.
- The Tilt slider changes the map pitch and books stay upright.
- Tapping water shows the toast.
- The bottom sheet lists and searches the 11 seeded books and flying to one works.
- Map panning stays smooth with 40 markers on screen.
