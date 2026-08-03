# Game sounds

Audio for the flashcard deck. Clips are fetched and decoded once via the Web
Audio API in `src/app/components/flashcards/sound.ts`, which also gives pitch
control; the event → file mapping is that file's `SOUND_FILES`. Missing files
fail silently — sound is progressive enhancement.

## Current mapping

| Event | File | Pitch |
|---|---|---|
| Flip to English | `object-paper-card-flip-over-fast-01.wav` | normal |
| Flip back to Hebrew | `object-paper-paper-snap-02.wav` | normal |
| Next (card goes to the back) | `foley-board-games-cards-slide-on-wood-04.wav` | normal |
| Each card falling away on shuffle | `shuffle_click.mp3` | starts high, drops 2 semitones per card |
| Each card landing on the restack | `shuffle_click.mp3` | climbs 2 semitones per card |

## Unused (available alternates)

- `foley-board-games-cards-paper-shuffle-riffle-fast-03.wav` — a single riffle
  for shuffle, in place of the click ladders
- `object-plastic-card-flap-04.wav` — alternate landing hit
- `ui-click-modern-classic-click-02.wav`, `ui-click-retro-click-04.wav`,
  `ui-click-retro-click-05.wav` — alternate clicks
- `ui-notification-xylophone-bell-success-01.wav` — a "deck finished" moment,
  once that concept exists
