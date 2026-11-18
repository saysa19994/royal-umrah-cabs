# Royal Immersion — Reference Deconstruction (Source-Aware)

## Evidence limitation
This is a **secondary analysis** of the repository's existing `design-references/VIDEO_REFERENCE_MAP.md` and `DUYUF_ADAPTATION_MATRIX.md`, not a claim that the three specific original videos mentioned in the latest brief were independently watched in this iteration. The source dossier documents 15 numbered recordings and six extracted frames per video. The individual three earlier references must still be explicitly matched to these recordings before a final creative sign-off.

## Reference 01 — Cinematic Travel Hero
**Recorded source in repository:** `11.11.2026_18.41.45_REC.mp4` · 68.8 seconds · 1280×640.

| Timecode | Description recorded in source dossier | Royal Immersion adaptation |
|---|---|---|
| 00:01.0 | Establishing shot with transport/terminal scene | Full-width existing hero footage, not a text/video split |
| 00:13.8 | Floating booking panel interacting with inputs | Elevated booking form immediately adjacent to hero |
| 00:27.5 | Visual change while foreground remains stable | Maintain CTA and legibility through cinematic backdrop |
| 00:41.3 | Breakpoint shift and headline reflow | Independent mobile typography and video crop |
| 00:55.1 | Search/input microinteractions | Keyboard focus and vehicle selection states |
| 01:05.4 | Transition into next editorial content | Booking panel then trust and journey explanation |

**Keyframes documented by repository:** `design-references/frames/video-01/frame_01_1.0s.jpg`, `frame_02_13.8s.jpg`, `frame_03_27.5s.jpg`, `frame_04_41.3s.jpg`, `frame_05_55.1s.jpg`, `frame_06_65.4s.jpg`.

## Reference 04 — Route Destination Slider
**Recorded source:** `11.11.2026_18.52.27_REC.mp4` · 35.5 seconds · 1280×650.

| Timecode | Description recorded in source dossier | Royal Immersion adaptation |
|---|---|---|
| 00:01.0 | Panoramic destination road image | Large imagery in route atlas |
| 00:07.1 | Journey card with fare and timing data | Verified per-vehicle fare only; do not invent travel times |
| 00:14.2 | Progress state and slide navigation | Accessible selected route row |
| 00:21.3 | Cross-fade / camera push | Motion enhancement remaining for audited future phase |
| 00:28.4 | Route CTA into booking | Real `/[locale]/booking` query handoff |
| 00:33.7 | Mobile swipe behaviors | Mobile route layout preserved; dedicated swipe testing pending |

**Keyframes documented:** `design-references/frames/video-04/frame_01_1.0s.jpg` through `frame_06_33.7s.jpg`.

## Reference 15 — Layered Automotive Fleet Deck
**Recorded source:** `12.11.2026_03.31.31_REC.mp4` · 32.9 seconds · 1280×616.

| Timecode | Description recorded in source dossier | Royal Immersion adaptation |
|---|---|---|
| 00:01.0 | Tactile layered automotive profiles | One visually dominant car showroom, not five identical cards |
| 00:06.6 | Active car elevation and transition | Accessible one-at-a-time vehicle selector |
| 00:13.2 | Passenger and luggage details | Existing approved fleet catalog specifications |
| 00:19.7 | Vehicle cutouts and grounding shadows | Existing source model photography; no simulated Ferrari/3D |
| 00:26.3 | Booking CTA | Existing booking engine and verified route price |
| 00:31.3 | Mobile cards | Horizontal vehicle selector with scroll snapping |

**Keyframes documented:** `design-references/frames/video-15/frame_01_1.0s.jpg` through `frame_06_31.3s.jpg`.

## Interpretation rules
- **Transferable:** scale, spatial hierarchy, atmospheric transitions, editorial type, route presentation, accessible vehicle switching.
- **Not transferable:** third-party product designs, proprietary logos, unlicensed media, invented vehicle imagery, unsourced timing or price claims.
- **Current implementation:** uses existing first-party hero and photography assets, real price lookup, honest published reviews and real booking handoff.
- **Unverified acceptance criteria:** direct comparison to owner-supplied three reference videos, browser screenshots, ScrollTrigger/pinned transitions, production performance measurements.

## Verified source paths
- `design-references/VIDEO_REFERENCE_MAP.md`
- `design-references/DUYUF_ADAPTATION_MATRIX.md`
- `public/assets/homepage-v2/hero.mp4`
- `public/assets/homepage-v2/hero-mobile.mp4`
- `public/assets/homepage-v2/hero-poster.jpg`
