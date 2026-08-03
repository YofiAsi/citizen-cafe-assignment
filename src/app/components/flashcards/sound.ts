/**
 * Web Audio helper for the card lab.
 *
 * Clips are fetched and decoded once, then replayed with no latency;
 * playback rate gives pitch control for the ladders. Ladder hits are
 * scheduled on the audio clock (not setTimeout) so their rhythm is exact.
 *
 * Everything fails silently: sound is progressive enhancement.
 */

const SOUND_FILES = {
  flip: "/sounds/object-paper-card-flip-over-fast-01.wav",
  flipBack: "/sounds/object-paper-paper-snap-02.wav",
  next: "/sounds/foley-board-games-cards-slide-on-wood-04.wav",
  click: "/sounds/shuffle_click.mp3",
} as const;

export type SoundName = keyof typeof SOUND_FILES;

/** A pitch run: one hit per step, climbing or falling by a fixed interval. */
export type LadderSpec = {
  sound: SoundName;
  steps: number;
  stepMs: number;
  /** Silence before the first hit, so the run lines up with the animation. */
  leadMs?: number;
  semitonesPerStep: number;
  direction: "up" | "down";
  volume: number;
};

const DEFAULT_VOLUME = 0.5;
const SEMITONES_PER_OCTAVE = 12;

let context: AudioContext | null = null;
const clips = new Map<SoundName, AudioBuffer>();
const clipJobs = new Map<SoundName, Promise<AudioBuffer>>();

/** Browsers only allow audio after a user gesture — call from a handler. */
function getContext(): AudioContext {
  context ??= new AudioContext();
  if (context.state === "suspended") void context.resume();
  return context;
}

function loadClip(name: SoundName, ctx: BaseAudioContext): Promise<AudioBuffer> {
  const running = clipJobs.get(name);
  if (running) return running;

  const job = fetch(SOUND_FILES[name])
    .then((response) => response.arrayBuffer())
    .then((data) => ctx.decodeAudioData(data))
    .then((buffer) => {
      clips.set(name, buffer);
      return buffer;
    });

  clipJobs.set(name, job);
  return job;
}

/** Playback-rate multiplier for a pitch shift in semitones. */
export function semitones(steps: number): number {
  return 2 ** (steps / SEMITONES_PER_OCTAVE);
}

/**
 * Speeding a sample up shortens it and thins its low end, so a pitched-up hit
 * reads as quieter. Nudge gain with the rate to even out a ladder.
 */
function pitchCompensatedGain(volume: number, rate: number): number {
  return Math.min(1, volume * Math.sqrt(rate));
}

function play(
  ctx: AudioContext,
  buffer: AudioBuffer,
  { rate = 1, volume = DEFAULT_VOLUME, delayMs = 0 },
) {
  const source = ctx.createBufferSource();
  source.buffer = buffer;
  source.playbackRate.value = rate;
  const gain = ctx.createGain();
  gain.gain.value = pitchCompensatedGain(volume, rate);
  source.connect(gain).connect(ctx.destination);
  // A clip that decoded late still plays, just as soon as it can.
  source.start(Math.max(ctx.currentTime + delayMs / 1000, ctx.currentTime));
}

export function playSound(
  name: SoundName,
  options: { rate?: number; volume?: number; delayMs?: number } = {},
): void {
  let ctx: AudioContext;
  try {
    ctx = getContext();
  } catch {
    return; // no Web Audio support
  }

  const clip = clips.get(name);
  if (clip) {
    play(ctx, clip, options);
    return;
  }
  loadClip(name, ctx)
    .then((buffer) => play(ctx, buffer, options))
    .catch(() => {});
}

/** One hit per step, scheduled up front on the audio clock. */
export function playLadder(spec: LadderSpec): void {
  const lead = spec.leadMs ?? 0;
  for (let index = 0; index < spec.steps; index++) {
    // "down" walks the same span in reverse, so the two mirror each other.
    const step = spec.direction === "up" ? index : spec.steps - 1 - index;
    playSound(spec.sound, {
      rate: semitones(step * spec.semitonesPerStep),
      volume: spec.volume,
      delayMs: lead + index * spec.stepMs,
    });
  }
}

/** Decode every clip ahead of first use. */
export function warmUp(): void {
  let ctx: AudioContext;
  try {
    ctx = getContext();
  } catch {
    return;
  }
  for (const name of Object.keys(SOUND_FILES) as SoundName[]) {
    loadClip(name, ctx).catch(() => {});
  }
}
