import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { EmojiData } from '../emoji-data';
import { shuffleArray } from 'src/app/services/array.utils';
import {
  detectMaxSupportedEmojiVersion,
  EmojiGroup,
  filterSupportedEmojis,
} from './emoji-support';

export interface EmojiSequence {
  desc: string;
  sequence: number[];
  ver: string;
  dataUrl?: string;
}

@Injectable({
  providedIn: 'root',
})
export class GameTileTextureService {
  private document = inject(DOCUMENT);
  private _emojiDataCache: EmojiGroup[] | null = null;
  private _maxSupportedEmojiVersion: number | null = null;

  public get MaxSupportedEmojiVersion(): number {
    if (this._maxSupportedEmojiVersion === null) {
      this._maxSupportedEmojiVersion = detectMaxSupportedEmojiVersion(this.document);
      if (!environment.production) {
        console.info(`Detected max supported Emoji version: E${this._maxSupportedEmojiVersion}`);
      }
    }
    return this._maxSupportedEmojiVersion;
  }

  public SetEmojiDataCache(groups: EmojiGroup[]): void {
    this._emojiDataCache = groups;
  }

  public GetSupportedEmojiGroups(): EmojiGroup[] {
    if (!this._emojiDataCache) {
      const filtered = filterSupportedEmojis(EmojiData, this.MaxSupportedEmojiVersion);
      this._emojiDataCache = filtered.length > 0 ? filtered : EmojiData;
    }
    return this._emojiDataCache;
  }

  public RandomEmojiCodeList(playableTextureCount: number): EmojiSequence[] {
    const groups = this.GetSupportedEmojiGroups();
    if (!groups.length) {
      return [];
    }

    const emojiGroup = groups[Math.floor(Math.random() * groups.length)];

    if (!environment.production) {
      console.info('emoji group: ', emojiGroup.id);
    }

    const shuffledSubGroups = shuffleArray(emojiGroup.subGroup);

    // Grab up to 5 shuffled subgroups so levels have a rich pool of sequences
    const subGroups = shuffledSubGroups.slice(0, 5);
    const emojiSequences = subGroups.flatMap((s) => s.codes);
    const shuffledSequences = shuffleArray(emojiSequences);

    return shuffledSequences
      .map((s) => ({
        desc: s.desc,
        sequence: s.sequence,
        ver: s.version,
      }))
      .slice(0, playableTextureCount);
  }
}
