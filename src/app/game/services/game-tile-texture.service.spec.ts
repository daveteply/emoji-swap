import { TestBed } from '@angular/core/testing';
import { describe, beforeEach, expect, it } from 'vitest';

import { GameTileTextureService } from './game-tile-texture.service';
import { EmojiGroup } from './emoji-support';

describe('GameTileTextureService', () => {
  let service: GameTileTextureService;

  const mockEmojiGroups: EmojiGroup[] = [
    {
      id: 'TestGroup',
      subGroup: [
        {
          id: 'sub-1',
          codes: [
            { sequence: [0x1f600], version: 'E1.0', versionNum: 1.0, desc: 'grinning face' },
            { sequence: [0x1f603], version: 'E1.0', versionNum: 1.0, desc: 'smiley' },
          ],
        },
        {
          id: 'sub-2',
          codes: [
            { sequence: [0x1f604], version: 'E1.0', versionNum: 1.0, desc: 'smile' },
            { sequence: [0x1f601], version: 'E1.0', versionNum: 1.0, desc: 'grin' },
          ],
        },
      ],
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameTileTextureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should detect a valid MaxSupportedEmojiVersion >= 1.0', () => {
    expect(service.MaxSupportedEmojiVersion).toBeGreaterThanOrEqual(1.0);
  });

  it('should return supported emoji groups from default dataset', () => {
    const groups = service.GetSupportedEmojiGroups();
    expect(groups.length).toBeGreaterThan(0);
    expect(groups[0].subGroup.length).toBeGreaterThan(0);
  });

  it('should allow overriding the emoji data cache and return requested count', () => {
    service.SetEmojiDataCache(mockEmojiGroups);
    expect(service.GetSupportedEmojiGroups()).toBe(mockEmojiGroups);

    const list = service.RandomEmojiCodeList(3);
    expect(list.length).toBe(3);
    for (const item of list) {
      expect(item.desc).toBeTruthy();
      expect(Array.isArray(item.sequence)).toBe(true);
      expect(item.ver).toBe('E1.0');
    }
  });

  it('should return an empty array if emoji groups cache is empty', () => {
    service.SetEmojiDataCache([]);
    expect(service.RandomEmojiCodeList(6)).toEqual([]);
  });
});
