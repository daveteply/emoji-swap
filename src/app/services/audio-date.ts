import { IAudioContext } from 'angular-audio-context';

export enum AudioType {
  LevelChange,
  TileRemove,
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
      element: new Audio('/assets/wav/mixkit-fast-sweeping-transition-164.wav'),
    },
    {
      type: AudioType.TileRemove,
      element: new Audio('/assets/wav/mixkit-quick-swoosh-accent-1464.wav'),
    },
  ],
};
