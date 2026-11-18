# Cinematic reference deconstruction

**Project** Duyuf Al Rahman VIP · ضيوف الرحمن VIP
**Evidence status** The three recordings described in the brief and the approximately 373 px Arabic mobile screenshot remain unavailable. The repository includes a separate archive of 15 recordings represented by 90 timestamped stills. The checked-in hero media was decoded and reviewed directly. This document cites the frames actually observed and identifies the limits of still-frame analysis.

## Repository reference frames

The archived names and timestamps below identify specific frames in `design-references/frames/`. Several textual entries in the archive’s reference map label the imagery as a Duyuf adaptation or describe a behavior the still does not show. The observations below use the images themselves. Timing, software, easing and input behavior require an original recording or source implementation.

| Reference and frame range | Observed visual behavior | Duyuf adaptation |
| --- | --- | --- |
| Video 01 · [27.5s](../../design-references/frames/video-01/frame_03_27.5s.jpg) and [41.3s](../../design-references/frames/video-01/frame_04_41.3s.jpg) | A top-down kitchen surface fills the frame. The main object changes scale and position between the two compositions, with a compact control floating over a clear patch of the image. Warm edge light and the darker work surface define visual layers. | Keep the approved vehicle or arrival action dominant. Place the title on a shadowed quiet side and the booking surface below the film. A short camera-like push can move the framing toward the next chapter. |
| Video 02 · [1.0s](../../design-references/frames/video-02/frame_01_1.0s.jpg) and [21.7s](../../design-references/frames/video-02/frame_04_21.7s.jpg) | A fixed-size centered headline sits above an arc of oblique photos on a near-white field. Different images enter the middle of the arc while the type retains its hierarchy. | Keep destination titles stable while a restrained image mask and route line show progression. Use a simple vertical or touch-selectable sequence on compact screens. |
| Video 04 · [1.0s](../../design-references/frames/video-04/frame_01_1.0s.jpg), [14.2s](../../design-references/frames/video-04/frame_03_14.2s.jpg) and [21.3s](../../design-references/frames/video-04/frame_04_21.3s.jpg) | An atmospheric full-frame destination changes with the featured route. Adjacent image previews stay visible and a left text block maintains its location and contrast through the changes. | Give each active journey a verified destination frame, steady route information and a separate selection control. Crossfade photographs behind readable controls. |
| Video 06 · [1.0s](../../design-references/frames/video-06/frame_01_1.0s.jpg) and [21.5s](../../design-references/frames/video-06/frame_04_21.5s.jpg) | Interior and exterior photos share an uninterrupted arc. The alternating bright and shaded scenes supply contrast and apparent depth while the caption stays anchored. | Use related cropped images to move from exterior silhouette to seating and cabin detail. Keep each caption tied to the selected verified vehicle. |
| Video 15 · [13.2s](../../design-references/frames/video-15/frame_03_13.2s.jpg) and [19.7s](../../design-references/frames/video-15/frame_04_19.7s.jpg) | Several overlapping screen thumbnails move through different positions against a white background. The foreground frame is visually heavier through overlap, contrast and scale. | Place one accurately sourced vehicle in a dominant image, with vehicle options in a quieter strip. Use a brief masked transition between selected models. |

## Existing Duyuf hero footage

The preview baseline references `public/assets/homepage-v2/hero.mp4` and `hero-mobile.mp4`, with `hero-poster.jpg`. The full-resolution source is H.264 at 1920×1080, 30 fps, 11.8 seconds and 4.68 MB. The matching mobile encode is H.264 at 960×540, 24 fps, 11.79 seconds and 622 KB. Both are 16:9 with matching subject framing. The repository’s design notes identify the project hero as owner-approved, and the prior implementation review lists these same paths. A separate upload of the master was not available for a byte-level comparison. [Archived adaptation notes](../design/all-15-video-adaptation-20261117.md) · [Prior implementation review](./implementation-review.md)

| Sample point in both encodes | Observed subject and light | Crop implication |
| --- | --- | --- |
| 0–2s | Airport canopy spans the frame and the vehicle enters from the far right. Reflected daylight warms the canopy and pavement. | Use more right-side space early in the shot to retain the entering vehicle. |
| 4–6s | A dark vehicle sits center-right in profile against an open dusk horizon. Detail comes from reflected light and the bright headlamp. | Preserve the profile width. A narrow portrait crop cannot show the complete profile in the existing source. |
| 8–11s | A chauffeur approaches the door at roughly 58–64% of frame width. The dark vehicle extends to the right edge against an illuminated entrance. | Keep the chauffeur and door action in view. The previous 55% mobile crop warrants comparison with a right-weighted crop and wider video stage. |

For the three original references, add clip filename, native dimensions, duration, shot start/end and actual keyframes. Record foreground and background movement, lighting, type placement, mask edges and changes across each shot. Identify pinning or scrubbing only when the recording shows the user input and the resulting movement. Keep sample timestamps separate from measured cut points.

## Proposed translation into Duyuf scenes

| Scene | Composition and lighting | Motion and typography | First review |
| --- | --- | --- | --- |
| Arrival | Let the approved film fill the frame with navy shadow in the text-safe space. Use shot analysis to choose an overlay away from vehicle, chauffeur and passenger action. | Reveal the headline by line and stage the supporting message with the booking action available immediately. Match the film exit to the arrival chapter with a short shift in the depth of the surrounding frame. | Examine every shot at 375, 390, 430, 768, 1024 and 1440 px. Approve the focal point against screen captures in Arabic and English. |
| Handoff to booking | Open the lower edge of the film into an ivory surround and a white booking surface. Keep labels and form controls clear of the image mask. | Use a short visual transition at the seam. Keep the form fixed in document order with native interaction. | Start booking by keyboard and touch while the film plays, and with reduced motion enabled. |
| Journey and route exploration | Use a dominant destination image against a restrained route index. Connect geographically meaningful points with a line extension. | Reveal the path on a short desktop scrub and crossfade when the visitor changes the route. Render the final path and readable route information in reduced motion. | Reverse scroll, change routes by keyboard and confirm the selected route is visible without scrolling through a pinned scene. |
| Fleet | Use one accurate vehicle image at a time, with the body large enough to show its shape. Allow dark and light references around the tires and windows to preserve the vehicle silhouette. | Mask and crossfade the selected image in place. Keep specifications and booking links anchored. Consider a brief desktop pin only while the featured vehicle composition changes. | Match images to every approved category, then exercise keyboard selection, rapid switching, preselection from booking and mobile operation. |
| Cabin and hospitality | Cut from exterior proportions to real cabin details, then to a chauffeur-led arrival using approved photography. Use crops that show actual seating and luggage details. | Use restrained directional reveals for a sense of movement through the ride. Keep copy concentrated in clear lines beside the subject. | Review the subjects and captions against the approved fleet information. Check that focus and contrast hold at all supported widths. |
| Makkah and Madinah | Give each destination a distinct, verified architectural view. Let white space and stable typography carry the respectful tone. | Crossfade or use a restrained image mask to move between locations. Keep each destination’s service links available throughout. | Confirm location, licensing and crop with the source owner. Check that no reveal hides the subject or an exploration link. |
| Closing | Use one approved still with an editorial crop and an ivory heading against a navy field. | Let the final image settle as the booking CTA enters the viewport. | Check visual separation from the opening and test the return to booking by keyboard and touch. |

## Hero inspection procedure

1. Resolve the approved source to a single exact asset and capture its version. Record dimensions, duration, codec, aspect ratio and audio track presence.
2. Extract frames at every cut and at the point of greatest subject movement in each shot. Mark chauffeur, main vehicle and passenger bounds on the frames.
3. Overlay the headline, navigation and CTA safe areas on a desktop frame and on a narrow portrait frame. Compare Arabic and English text widths and contrast over the darkest and brightest shots.
4. Select and document object positioning for each responsive layout. Compare a centered crop with aspect-ratio-preserving framing where portrait cropping would remove significant action.
5. Capture the actual poster and inline playback in preview. Verify the original video source, playback and poster behavior against the approved baseline.

Borrow compositional principles such as a dominant subject, restrained negative space, controlled depth and movement across scenes. Commission or reuse approved Duyuf imagery for the actual compositions. The reference products, logos, packaging, wording and original digital assets stay with their source work.
