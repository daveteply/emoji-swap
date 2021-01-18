export enum AudioType {
  LevelChange,
  Swipe,
  MatchFound,
  TileRemove,
  InvalidSwipe,
  Hint,
  TimeBonus,
  RareBonus,
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
      element: new Audio('assets/wav/mixkit-magic-festive-melody-2986.wav'),
    },
    {
      type: AudioType.Swipe,
      element: new Audio(
        'assets/wav/mixkit-robot-positive-item-acquired-3205.wav'
      ),
    },
    {
      type: AudioType.MatchFound,
      element: new Audio('assets/wav/mixkit-fairy-magic-sparkle-871.wav'),
    },
    {
      type: AudioType.TileRemove,
      element: new Audio('assets/wav/mixkit-bubbly-achievement-tone-3193.wav'),
    },
    {
      type: AudioType.InvalidSwipe,
      element: new Audio(
        'assets/wav/mixkit-high-tech-notification-bleep-2519.wav'
      ),
    },
    {
      type: AudioType.Hint,
      element: new Audio('assets/wav/mixkit-fast-swipe-zoom-2627.wav'),
    },
    {
      type: AudioType.TimeBonus,
      element: new Audio('assets/wav/mixkit-game-flute-bonus-2313.wav'),
    },
    {
      type: AudioType.RareBonus,
      element: new Audio('assets/wav/mixkit-choir-harp-bless-657.wav'),
    },
  ],
};
