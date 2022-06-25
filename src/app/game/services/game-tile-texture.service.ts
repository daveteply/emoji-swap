import { Injectable } from '@angular/core';
import * as shuffleArray from 'shuffle-array';
import { environment } from 'src/environments/environment';
import { EmojiData } from '../emoji-data';

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
  constructor() {}

  public RandomEmojiCodeList(playableTextureCount: number): EmojiSequence[] {
    const emojiGroup = EmojiData[Math.floor(Math.random() * (EmojiData.length - 1))];

    // DEBUG
    // const emojiGroup = EmojiData.find((e) => e.id === 'Symbols') || EmojiData[0];
    // DEBUG

    if (!environment.production) {
      console.info('emoji group: ', emojiGroup.id);
    }

    const shuffledSubGroups = shuffleArray(emojiGroup.subGroup);
    // DEBUG
    // const shuffledSubGroups = emojiGroup.subGroup.filter((s) => s.id === 'arrow');
    // DEBUG

    // grab first 3 shuffled subgroups (some subgroups have a small number of sequences)
    const subGroups = shuffledSubGroups.slice(0, 3);
    const emojiSequences = subGroups.flatMap((s) => s.codes);
    const shuffledSequences = shuffleArray(emojiSequences);

    return shuffledSequences
      .map((s) => {
        return { desc: s.desc, sequence: s.sequence, ver: s.version };
      })
      .slice(0, playableTextureCount);
  }
}
