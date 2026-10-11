# Milestone 2: The Story Experience

## Goal
Opening a scrapbook plays the fairy-tale intro and lands in the shooting-star gallery. Use placeholder photos ("Add photo" frames titled Arrival, The first sight, A good meal, Somebody new, Heading home) at this stage.

## Night sky
Opening a scrapbook navigates to a full-screen modal route with a night sky drawn in one Skia canvas: a radial gradient from #3d2f78 at the bottom through #1d1845 to #0b0a24, 48 twinkling stars (deterministic pseudo-random positions, 2-5 s twinkle cycles driven by a single clock value), a crescent moon, and a castle silhouette on two layered hills with a few lit windows.

## Intro timeline
Build it as one Reanimated timeline using withDelay, withSequence, and withTiming.
- 0.0-0.7 s: the sky fades in.
- 0.3-1.3 s: a storybook (about 560x340 on tablets, scaled to 90% of screen width on phones) rises from 110 pt below at 60% scale.
- 1.1-2.6 s: the cover rotates from 0 to -178 degrees about its left edge, implemented with two stacked Views using backfaceVisibility hidden, transformOrigin left center, perspective 1500, and Easing.bezier(.5,0,.2,1). The back face is cream. The right page reads "[Your story begins here…]".
- 1.9-3.7 s: a radial golden light bursts behind the book and 16 gold sparkles (6-10 pt, glowing) float up 270 pt and fade, staggered 0.14 s.
- 2.3 s: "Once upon a time in" fades up (Caveat 40, #cfc2f0). 2.8 s: the place name fades up (Caveat 84 bold, #ffe28c, scaled down to fit).
- 4.8 s: crossfade to the gallery (Milestone 4 changes this to wait for narration).
- A "Skip intro" button is always visible.

## Gallery
- Phones: a horizontal snapping pager where the active polaroid (about 190x232, scaled up to 70% of screen width) is centered and neighbors peek at 55% opacity and 0.9 scale.
- Tablets: a gentle wave of up to five polaroids as in a scrapbook spread, each rotated between -6 and 5 degrees.
- Under the active photo show its title (Caveat 38, gold) and caption.
- Controls: previous/next, one dot per photo, "Replay intro", and a close button back to the map. Swiping the pager also navigates.

## Shooting star
- A 40 pt gold five-point Skia star (glowing, pulsing) with a 170 pt gradient tail rotated by atan2 of its direction of travel.
- On entering the gallery it flies in from the top-right corner to the first photo.
- On every navigation, the pager scrolls and the star flies from its current position, arcs over the top of the screen, and lands above the new active photo over 0.95 s. Animate x and y as separate Reanimated shared values with different easings (x: Easing.bezier(.5,0,.2,1), y: Easing.bezier(.15,.8,.3,1)) so the path curves.
- On phones, the star enters from the side the story is advancing from (right for next, left for previous).
- On landing, the photo gets a one-time golden glow pulse, an expanding ring, and a light haptic.

## Done when
- Opening a book plays the full intro and lands in the gallery with no red-box errors or warnings.
- The star flies between photos on next, previous, swipe, and dot taps, and the landing pulse and haptic fire.
- Skip intro and Replay intro work.
- With Reduce Motion on, the intro and star flight become simple fades.
- Works on phone and tablet layouts, iOS and Android.
