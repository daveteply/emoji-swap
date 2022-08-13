import { Howl } from 'howler';

export enum AudioType {
  LevelChange,
  Swipe,
  MatchFound,
  TileRemove,
  InvalidSwipe,
  Hint,
  TimeBonus,
  RareBonus,
  GameOver,
}

export interface AudioData {
  list: AudioDataTrack[];
}

export interface AudioDataTrack {
  type: AudioType;
  url: string;
  track?: any;
  howl?: Howl;
}

export const AudioDataList: AudioData = {
  list: [
    { type: AudioType.LevelChange, url: 'assets/audio/mixkit-magic-festive-melody-2986.mp3' },
    { type: AudioType.Swipe, url: 'assets/audio/mixkit-robot-positive-item-acquired-3205.mp3' },
    { type: AudioType.MatchFound, url: 'assets/audio/mixkit-fairy-magic-sparkle-871.mp3' },
    { type: AudioType.TileRemove, url: 'assets/audio/piece-remove.mp3' },
    { type: AudioType.InvalidSwipe, url: 'assets/audio/mixkit-high-tech-notification-bleep-2519.mp3' },
    { type: AudioType.Hint, url: 'assets/audio/mixkit-fast-swipe-zoom-2627.mp3' },
    { type: AudioType.TimeBonus, url: 'assets/audio/mixkit-game-flute-bonus-2313.mp3' },
    { type: AudioType.RareBonus, url: 'assets/audio/mixkit-choir-harp-bless-657.mp3' },
    { type: AudioType.GameOver, url: 'assets/audio/mixkit-fairytale-game-over-1945.mp3' },
  ],
};
