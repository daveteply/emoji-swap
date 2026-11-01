/**
 * Emoji support detection and device version profiling utility.
 */

export interface EmojiCode {
  sequence: number[];
  version: string;
  versionNum?: number;
  desc: string;
}

export interface EmojiSubGroup {
  id: string;
  codes: EmojiCode[];
}

export interface EmojiGroup {
  id: string;
  subGroup: EmojiSubGroup[];
}

export interface EmojiDataPayload {
  metadata?: {
    unicodeVersion?: string;
    generatedAt?: string;
    source?: string;
    groupCount?: number;
    totalEmojis?: number;
  };
  groups: EmojiGroup[];
}

export interface EmojiVersionCanary {
  version: number;
  emoji: string;
}

export const EMOJI_FONT_STACK =
  '"Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", "Twemoji Mozilla", "Segoe UI Symbol", "Android Emoji", sans-serif';

/**
 * Canary emojis representing each major Unicode Emoji release from 1.0 up to 16.0.
 */
export const EMOJI_VERSION_CANARIES: EmojiVersionCanary[] = [
  { version: 1.0, emoji: '😀' }, // U+1F600 Grinning Face
  { version: 2.0, emoji: '🤖' }, // U+1F916 Robot
  { version: 3.0, emoji: '🤣' }, // U+1F923 Rolling on the Floor Laughing
  { version: 4.0, emoji: '🤦' }, // U+1F926 Facepalming
  { version: 5.0, emoji: '🤩' }, // U+1F929 Star-Struck
  { version: 11.0, emoji: '🥳' }, // U+1F973 Partying Face
  { version: 12.0, emoji: '🥱' }, // U+1F971 Yawning Face
  { version: 13.0, emoji: '🫀' }, // U+1FAC0 Anatomical Heart
  { version: 13.1, emoji: '😶‍🌫️' }, // Face in Clouds (ZWJ sequence)
  { version: 14.0, emoji: '🫠' }, // U+1FAE0 Melting Face
  { version: 15.0, emoji: '🫨' }, // U+1FAE8 Shaking Face
  { version: 15.1, emoji: '🙂‍↔️' }, // Head Shaking Horizontally (ZWJ sequence)
  { version: 16.0, emoji: '🫩' }, // U+1FA69 Face with Bags Under Eyes
];

/**
 * Tests whether a specific emoji glyph renders as a true multi-color glyph rather than
 * empty space or a missing-glyph tofu box.
 */
export function isEmojiRenderable(
  ctx: CanvasRenderingContext2D,
  emojiStr: string,
  tofuData: ImageData,
  size = 24,
): boolean {
  ctx.clearRect(0, 0, size, size);
  ctx.font = `${Math.floor(size * 0.75)}px ${EMOJI_FONT_STACK}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(emojiStr, size / 2, size / 2);

  const charData = ctx.getImageData(0, 0, size, size);
  let matchesTofu = true;
  let hasColoredPixels = false;
  let hasNonZeroAlpha = false;

  for (let i = 0; i < charData.data.length; i += 4) {
    const r = charData.data[i];
    const g = charData.data[i + 1];
    const b = charData.data[i + 2];
    const a = charData.data[i + 3];

    if (a > 0) {
      hasNonZeroAlpha = true;
      if (
        r !== tofuData.data[i] ||
        g !== tofuData.data[i + 1] ||
        b !== tofuData.data[i + 2] ||
        a !== tofuData.data[i + 3]
      ) {
        matchesTofu = false;
      }
      // Color emojis feature chromatic separation across RGB channels
      if (Math.abs(r - g) > 15 || Math.abs(r - b) > 15 || Math.abs(g - b) > 15) {
        hasColoredPixels = true;
      }
    }
  }

  if (!hasNonZeroAlpha || matchesTofu) {
    return false;
  }

  return hasColoredPixels;
}

/**
 * Detects the maximum supported Unicode Emoji version on the current device using canary profiling.
 */
export function detectMaxSupportedEmojiVersion(documentRef: Document): number {
  try {
    const canvas = documentRef.createElement('canvas');
    const size = 24;
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return 1.0;

    // Render system missing glyph (tofu) reference using an unassigned codepoint
    ctx.clearRect(0, 0, size, size);
    ctx.font = `${Math.floor(size * 0.75)}px ${EMOJI_FONT_STACK}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('\uFFFF', size / 2, size / 2);
    const tofuData = ctx.getImageData(0, 0, size, size);

    let maxSupported = 1.0;
    for (const canary of EMOJI_VERSION_CANARIES) {
      if (isEmojiRenderable(ctx, canary.emoji, tofuData, size)) {
        maxSupported = canary.version;
      } else {
        break;
      }
    }
    return maxSupported;
  } catch {
    return 1.0;
  }
}

/**
 * Filters emoji groups down to only emojis supported up to the detected version.
 */
export function filterSupportedEmojis(groups: EmojiGroup[], maxVersion: number): EmojiGroup[] {
  return groups
    .map((group) => ({
      id: group.id,
      subGroup: group.subGroup
        .map((sg) => ({
          id: sg.id,
          codes: sg.codes.filter((c) => {
            const v = c.versionNum ?? parseFloat(c.version?.replace('E', '') || '1.0');
            return v <= maxVersion;
          }),
        }))
        .filter((sg) => sg.codes.length > 0),
    }))
    .filter((group) => group.subGroup.length > 0);
}
