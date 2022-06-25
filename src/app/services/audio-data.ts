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
  element: HTMLAudioElement;
  track?: any;
}

export const AudioDataList: AudioData = {
  list: [
    {
      type: AudioType.LevelChange,
      element: new Audio('assets/audio/mixkit-magic-festive-melody-2986.mp3'),
    },
    {
      type: AudioType.Swipe,
      element: new Audio('assets/audio/mixkit-robot-positive-item-acquired-3205.mp3'),
    },
    {
      type: AudioType.MatchFound,
      element: new Audio('assets/audio/mixkit-fairy-magic-sparkle-871.mp3'),
    },
    {
      type: AudioType.TileRemove,
      element: new Audio('assets/audio/mixkit-bubbly-achievement-tone-3193.mp3'),
    },
    {
      type: AudioType.InvalidSwipe,
      element: new Audio('assets/audio/mixkit-high-tech-notification-bleep-2519.mp3'),
    },
    {
      type: AudioType.Hint,
      element: new Audio('assets/audio/mixkit-fast-swipe-zoom-2627.mp3'),
    },
    {
      type: AudioType.TimeBonus,
      element: new Audio('assets/audio/mixkit-game-flute-bonus-2313.mp3'),
    },
    {
      type: AudioType.RareBonus,
      element: new Audio('assets/audio/mixkit-choir-harp-bless-657.mp3'),
    },
    {
      type: AudioType.GameOver,
      element: new Audio('assets/audio/mixkit-fairytale-game-over-1945.mp3'),
    },
  ],
};
