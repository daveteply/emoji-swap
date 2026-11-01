import { describe, it, expect, vi } from 'vitest';
import {
  filterSupportedEmojis,
  isEmojiRenderable,
  detectMaxSupportedEmojiVersion,
  EMOJI_VERSION_CANARIES,
  EmojiGroup,
} from './emoji-support';

describe('emoji-support', () => {
  it('should have valid canary configurations from 1.0 to 16.0', () => {
    expect(EMOJI_VERSION_CANARIES.length).toBeGreaterThanOrEqual(10);
    const versions = EMOJI_VERSION_CANARIES.map((c) => c.version);
    expect(versions).toContain(1.0);
    expect(versions).toContain(13.1);
    expect(versions).toContain(14.0);
    expect(versions).toContain(15.0);
    expect(versions).toContain(16.0);
  });

  it('should filter emojis by max supported version', () => {
    const mockGroups: EmojiGroup[] = [
      {
        id: 'Smileys',
        subGroup: [
          {
            id: 'faces',
            codes: [
              { sequence: [1], version: 'E1.0', desc: 'old' },
              { sequence: [2], version: 'E12.0', desc: 'medium' },
              { sequence: [3], version: 'E14.0', desc: 'newer' },
              { sequence: [4], version: 'E16.0', desc: 'latest' },
            ],
          },
        ],
      },
    ];

    const filtered12 = filterSupportedEmojis(mockGroups, 12.0);
    expect(filtered12.length).toBe(1);
    expect(filtered12[0].subGroup[0].codes.length).toBe(2);
    expect(filtered12[0].subGroup[0].codes.map((c) => c.desc)).toEqual(['old', 'medium']);

    const filtered1 = filterSupportedEmojis(mockGroups, 1.0);
    expect(filtered1[0].subGroup[0].codes.length).toBe(1);
    expect(filtered1[0].subGroup[0].codes[0].desc).toBe('old');
  });

  it('should remove empty subgroups and groups when all emojis are above max version', () => {
    const mockGroups: EmojiGroup[] = [
      {
        id: 'Modern',
        subGroup: [
          {
            id: 'ultra-new',
            codes: [{ sequence: [10], version: 'E16.0', desc: 'futuristic' }],
          },
        ],
      },
    ];

    const filtered = filterSupportedEmojis(mockGroups, 13.0);
    expect(filtered.length).toBe(0);
  });

  it('should identify renderable vs non-renderable characters', () => {
    const mockTofuData = {
      data: new Uint8ClampedArray(24 * 24 * 4),
      width: 24,
      height: 24,
      colorSpace: 'srgb',
    } as ImageData;

    for (let i = 0; i < mockTofuData.data.length; i += 4) {
      mockTofuData.data[i] = 0;
      mockTofuData.data[i + 1] = 0;
      mockTofuData.data[i + 2] = 0;
      mockTofuData.data[i + 3] = 255;
    }

    const blankCharData = {
      data: new Uint8ClampedArray(24 * 24 * 4),
      width: 24,
      height: 24,
      colorSpace: 'srgb',
    } as ImageData;

    const mockCtxBlank = {
      clearRect: vi.fn(),
      fillText: vi.fn(),
      getImageData: () => blankCharData,
    } as unknown as CanvasRenderingContext2D;

    expect(isEmojiRenderable(mockCtxBlank, '', mockTofuData, 24)).toBe(false);

    const coloredCharData = {
      data: new Uint8ClampedArray(24 * 24 * 4),
      width: 24,
      height: 24,
      colorSpace: 'srgb',
    } as ImageData;
    coloredCharData.data[0] = 255;
    coloredCharData.data[1] = 215;
    coloredCharData.data[2] = 0;
    coloredCharData.data[3] = 255;

    const mockCtxColor = {
      clearRect: vi.fn(),
      fillText: vi.fn(),
      getImageData: () => coloredCharData,
    } as unknown as CanvasRenderingContext2D;

    expect(isEmojiRenderable(mockCtxColor, '😀', mockTofuData, 24)).toBe(true);

    const mockCtxTofu = {
      clearRect: vi.fn(),
      fillText: vi.fn(),
      getImageData: () => mockTofuData,
    } as unknown as CanvasRenderingContext2D;

    expect(isEmojiRenderable(mockCtxTofu, '🫩', mockTofuData, 24)).toBe(false);
  });

  it('should run detectMaxSupportedEmojiVersion without throwing', () => {
    const version = detectMaxSupportedEmojiVersion(document);
    expect(typeof version).toBe('number');
    expect(version).toBeGreaterThanOrEqual(1.0);
  });
});
